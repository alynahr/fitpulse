-- =====================================================================
-- FitPulse Studio – MySQL database
-- Import this in phpMyAdmin: select your database > Import > choose this file > Go
-- Works on MySQL 5.7+ / MariaDB 10.2+
-- =====================================================================

SET NAMES utf8mb4;

-- ---------- USERS (members and staff) ----------
CREATE TABLE users (
  id                 INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  member_code        VARCHAR(20)  NULL UNIQUE,
  email              VARCHAR(190) NOT NULL UNIQUE,
  password_hash      VARCHAR(255) NULL,          -- NULL for Google-only accounts
  google_id          VARCHAR(64)  NULL UNIQUE,
  full_name          VARCHAR(150) NULL,
  phone              VARCHAR(30)  NULL,
  date_of_birth      DATE         NULL,
  gender             VARCHAR(20)  NULL,
  address            VARCHAR(255) NULL,
  city               VARCHAR(100) NULL,
  province           VARCHAR(100) NULL,
  postal_code        VARCHAR(20)  NULL,
  country            VARCHAR(100) NULL,
  role               ENUM('member','staff') NOT NULL DEFAULT 'member',
  stripe_customer_id VARCHAR(64)  NULL UNIQUE,
  created_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------- PLANS ----------
CREATE TABLE plans (
  id              VARCHAR(20)  PRIMARY KEY,       -- 'basic' | 'premium' | 'elite'
  name            VARCHAR(50)  NOT NULL,
  price_php       DECIMAL(10,2) NOT NULL,
  stripe_price_id VARCHAR(64)  NULL,
  stripe_payment_link_id  VARCHAR(64)  NULL UNIQUE,   -- plink_...
  stripe_payment_link_url VARCHAR(255) NULL,          -- https://buy.stripe.com/...
  description     VARCHAR(255) NULL,
  popular         TINYINT(1)   NOT NULL DEFAULT 0,
  active          TINYINT(1)   NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------- MEMBERSHIPS ----------
CREATE TABLE memberships (
  id                     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id                INT UNSIGNED NOT NULL,
  plan_id                VARCHAR(20)  NOT NULL,
  status                 ENUM('pending','active','past_due','canceled','expired','suspended') NOT NULL DEFAULT 'pending',
  stripe_subscription_id VARCHAR(64)  NULL UNIQUE,
  current_period_end     DATETIME     NULL,
  created_at             TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at             TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES plans(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------- PAYMENTS ----------
CREATE TABLE payments (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id           INT UNSIGNED NOT NULL,
  amount            DECIMAL(10,2) NOT NULL,
  currency          VARCHAR(10)  NOT NULL DEFAULT 'php',
  description       VARCHAR(255) NULL,
  status            VARCHAR(20)  NOT NULL DEFAULT 'paid',
  stripe_invoice_id VARCHAR(64)  NULL UNIQUE,
  created_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------- CLASSES & BOOKINGS ----------
CREATE TABLE classes (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  studio      VARCHAR(100) NULL,
  instructor  VARCHAR(100) NULL,
  starts_at   DATETIME     NOT NULL,
  ends_at     DATETIME     NOT NULL,
  capacity    INT          NOT NULL DEFAULT 20,
  description TEXT         NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE bookings (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id    INT UNSIGNED NOT NULL,
  class_id   INT UNSIGNED NOT NULL,
  status     ENUM('confirmed','canceled','attended') NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY one_booking_per_class (user_id, class_id),
  FOREIGN KEY (user_id)  REFERENCES users(id)   ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------- CHECK-INS ----------
CREATE TABLE check_ins (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id       INT UNSIGNED NOT NULL,
  location      VARCHAR(100) NOT NULL DEFAULT 'Main Gym',
  type          VARCHAR(50)  NOT NULL DEFAULT 'Workout',
  checked_in_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------- PLANS with your Stripe price IDs ----------
-- Add each plan's Payment Link afterwards (see AWARDSPACE_SETUP.md).
INSERT INTO plans (id, name, price_php, stripe_price_id, description, popular) VALUES
  ('basic',   'BASIC',    999.00, 'price_1UJ1DT4BeBjrzGXobothbuMk', 'Perfect for getting started with your fitness journey.', 0),
  ('premium', 'PREMIUM', 1499.00, 'price_1UJ1Dr4BeBjrzGXor4zEbGI8', 'Ideal for those who want more from their workouts.',     1),
  ('elite',   'ELITE',   2499.00, 'price_1UJ1E44BeBjrzGXoZIKqwC3K', 'The ultimate experience for serious results.',            0);
