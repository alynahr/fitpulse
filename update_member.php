<?php
// ==============================================================================
// FitPulse Studio - update_member.php
// Place this file in your AwardSpace hosting root (e.g. htdocs or /www/fitpulse)
// ==============================================================================

// 1. Enable CORS & JSON Response Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. Database Connection Credentials
// IMPORTANT: Make sure $username, $password, and $dbname match your add_member.php!
$host     = "fdb1028.awardspace.net";
$username = "4591461_fitpulse"; // <-- Your AwardSpace MySQL Username
$password = "your_db_password";   // <-- Your AwardSpace MySQL Password
$dbname   = "4591461_fitpulse"; // <-- Your AwardSpace MySQL Database Name

// 3. Connect to Database using mysqli
$conn = mysqli_connect($host, $username, $password, $dbname);

if (!$conn) {
    echo json_encode([
        "status"  => "error",
        "message" => "Database connection failed: " . mysqli_connect_error()
    ]);
    exit();
}

// 4. Extract input parameters (supports both standard POST form-data and JSON body)
$raw_input = file_get_contents("php://input");
$json_data = json_decode($raw_input, true);

$data = !empty($_POST) ? $_POST : (is_array($json_data) ? $json_data : $_REQUEST);

$email       = trim($data['email'] ?? '');
$name        = trim($data['name'] ?? $data['fullName'] ?? '');
$phone       = trim($data['phone'] ?? '');
$dob         = trim($data['dob'] ?? $data['dateOfBirth'] ?? '');
$address     = trim($data['address'] ?? '');
$city        = trim($data['city'] ?? '');
$province    = trim($data['province'] ?? '');
$postal_code = trim($data['postal_code'] ?? $data['postalCode'] ?? '');
$country     = trim($data['country'] ?? '');
$gender      = trim($data['gender'] ?? '');

// 5. Validation - Email is required to know which row to update
if (empty($email)) {
    echo json_encode([
        "status"  => "error",
        "message" => "Email address is required."
    ]);
    mysqli_close($conn);
    exit();
}

// 6. Escape all inputs to prevent SQL errors / injection
$email_safe       = mysqli_real_escape_string($conn, $email);
$name_safe        = mysqli_real_escape_string($conn, $name);
$phone_safe       = mysqli_real_escape_string($conn, $phone);
$dob_safe         = mysqli_real_escape_string($conn, $dob);
$address_safe     = mysqli_real_escape_string($conn, $address);
$city_safe        = mysqli_real_escape_string($conn, $city);
$province_safe    = mysqli_real_escape_string($conn, $province);
$postal_code_safe = mysqli_real_escape_string($conn, $postal_code);
$country_safe     = mysqli_real_escape_string($conn, $country);
$gender_safe      = mysqli_real_escape_string($conn, $gender);

// 7. Build dynamic UPDATE fields
$updates = [];
if ($name !== '')        $updates[] = "name = '$name_safe'";
if ($phone !== '')       $updates[] = "phone = '$phone_safe'";
if ($dob !== '')         $updates[] = "dob = '$dob_safe'";
if ($address !== '')     $updates[] = "address = '$address_safe'";
if ($city !== '')        $updates[] = "city = '$city_safe'";
if ($province !== '')    $updates[] = "province = '$province_safe'";
if ($postal_code !== '') $updates[] = "postal_code = '$postal_code_safe'";
if ($country !== '')     $updates[] = "country = '$country_safe'";
if ($gender !== '')      $updates[] = "gender = '$gender_safe'";

if (empty($updates)) {
    echo json_encode([
        "status"  => "success",
        "message" => "No new fields provided to update."
    ]);
    mysqli_close($conn);
    exit();
}

$sql = "UPDATE members SET " . implode(", ", $updates) . " WHERE LOWER(TRIM(email)) = LOWER(TRIM('$email_safe'))";

if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "status"  => "success",
        "message" => "Member updated successfully."
    ]);
} else {
    echo json_encode([
        "status"  => "error",
        "message" => "SQL Update Error: " . mysqli_error($conn)
    ]);
}

mysqli_close($conn);
?>
