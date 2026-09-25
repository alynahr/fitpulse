<?php
// Shared setup for every API endpoint: config, database, session, JSON helpers.
// Written for PHP 7.0+ so it runs on AwardSpace's free plan.

error_reporting(E_ALL);
ini_set('display_errors', '0');

$configFile = __DIR__ . '/../config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(array('error' => 'Missing api/config.php. Copy config.sample.php to config.php and fill it in.'));
    exit;
}
$CONFIG = require $configFile;

function config($key, $default = null)
{
    global $CONFIG;
    return isset($CONFIG[$key]) && $CONFIG[$key] !== '' ? $CONFIG[$key] : $default;
}

// ---------- JSON responses ----------
function json_out($data, $status = 200)
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data);
    exit;
}

function fail($message, $status = 400)
{
    json_out(array('error' => $message), $status);
}

function require_method($method)
{
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        fail('Method not allowed', 405);
    }
}

// Reads a JSON request body. Requiring the JSON content type also blocks
// simple cross-site form posts (basic CSRF protection).
function read_json()
{
    $type = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
    if (stripos($type, 'application/json') === false) {
        fail('Expected a JSON request', 415);
    }
    $data = json_decode(file_get_contents('php://input'), true);
    return is_array($data) ? $data : array();
}

function field($data, $key, $default = '')
{
    return isset($data[$key]) ? trim((string) $data[$key]) : $default;
}

// ---------- Database ----------
function db()
{
    static $pdo = null;
    if ($pdo === null) {
        try {
            $pdo = new PDO(
                'mysql:host=' . config('db_host') . ';dbname=' . config('db_name') . ';charset=utf8mb4',
                config('db_user'),
                (string) config('db_pass', ''),
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                )
            );
        } catch (PDOException $e) {
            error_log($e->getMessage());
            fail('Could not connect to the database. Check db_ settings in api/config.php.', 500);
        }
    }
    return $pdo;
}

function query($sql, $params = array())
{
    $stmt = db()->prepare($sql);
    $stmt->execute($params);
    return $stmt;
}

// ---------- Session (login state) ----------
function start_session()
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    $secure = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    if (PHP_VERSION_ID >= 70300) {
        session_set_cookie_params(array(
            'lifetime' => 60 * 60 * 24 * 30,
            'path' => '/',
            'secure' => $secure,
            'httponly' => true,
            'samesite' => 'Lax',
        ));
    } else {
        session_set_cookie_params(60 * 60 * 24 * 30, '/; samesite=Lax', '', $secure, true);
    }
    ini_set('session.gc_maxlifetime', (string) (60 * 60 * 24 * 30));
    session_name('fitpulse_session');
    session_start();
}

function login_user($userId)
{
    start_session();
    session_regenerate_id(true);
    $_SESSION['user_id'] = (int) $userId;
}

function current_user()
{
    start_session();
    if (empty($_SESSION['user_id'])) {
        return null;
    }
    $user = query('SELECT * FROM users WHERE id = ?', array($_SESSION['user_id']))->fetch();
    return $user ?: null;
}

function require_login()
{
    $user = current_user();
    if (!$user) {
        fail('Please log in first.', 401);
    }
    return $user;
}

function require_staff()
{
    $user = require_login();
    if ($user['role'] !== 'staff') {
        fail('Staff access only.', 403);
    }
    return $user;
}

// What the frontend is allowed to see about a user (never the password hash).
function public_user($u)
{
    return array(
        'id' => (int) $u['id'],
        'memberCode' => $u['member_code'],
        'email' => $u['email'],
        'fullName' => $u['full_name'],
        'phone' => $u['phone'],
        'dateOfBirth' => $u['date_of_birth'],
        'gender' => $u['gender'],
        'address' => $u['address'],
        'city' => $u['city'],
        'province' => $u['province'],
        'postalCode' => $u['postal_code'],
        'country' => $u['country'],
        'role' => $u['role'],
        'hasPassword' => !empty($u['password_hash']),
        'createdAt' => $u['created_at'],
    );
}

// Creates a user and gives them a member code like FP-2026-0007.
function create_user($fields)
{
    $columns = array_keys($fields);
    $placeholders = implode(',', array_fill(0, count($columns), '?'));
    query(
        'INSERT INTO users (' . implode(',', $columns) . ') VALUES (' . $placeholders . ')',
        array_values($fields)
    );
    $id = (int) db()->lastInsertId();
    $code = 'FP-' . date('Y') . '-' . str_pad((string) $id, 4, '0', STR_PAD_LEFT);
    query('UPDATE users SET member_code = ? WHERE id = ?', array($code, $id));
    return $id;
}

// Simple HTTPS request helper (used for Stripe and Google).
function http_request($method, $url, $fields = array(), $headers = array(), $basicAuthUser = null)
{
    $ch = curl_init();
    if ($method === 'GET' && $fields) {
        $url .= (strpos($url, '?') === false ? '?' : '&') . http_build_query($fields);
    }
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    if ($basicAuthUser !== null) {
        curl_setopt($ch, CURLOPT_USERPWD, $basicAuthUser . ':');
    }
    if ($method !== 'GET') {
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($fields));
    }
    $body = curl_exec($ch);
    $error = curl_error($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($body === false) {
        return array('status' => 0, 'data' => null, 'error' => 'Network error: ' . $error);
    }
    return array('status' => $status, 'data' => json_decode($body, true), 'error' => null);
}
