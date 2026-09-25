-- Run this ONCE in phpMyAdmin (SQL tab) on a database that was created
-- from the older fitpulse.sql. It adds the Payment Link columns.
ALTER TABLE plans
  ADD COLUMN stripe_payment_link_id  VARCHAR(64)  NULL UNIQUE AFTER stripe_price_id,
  ADD COLUMN stripe_payment_link_url VARCHAR(255) NULL AFTER stripe_payment_link_id;

-- Then fill in your three links (replace the values):
-- UPDATE plans SET stripe_payment_link_id = 'plink_...', stripe_payment_link_url = 'https://buy.stripe.com/test_...' WHERE id = 'basic';
-- UPDATE plans SET stripe_payment_link_id = 'plink_...', stripe_payment_link_url = 'https://buy.stripe.com/test_...' WHERE id = 'premium';
-- UPDATE plans SET stripe_payment_link_id = 'plink_...', stripe_payment_link_url = 'https://buy.stripe.com/test_...' WHERE id = 'elite';
