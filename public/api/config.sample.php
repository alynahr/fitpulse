<?php
// =====================================================================
// FitPulse backend settings.
// 1. Copy this file to config.php (same folder).
// 2. Fill in your own values. config.php is git-ignored – never commit it.
// =====================================================================

return array(
    // ---- MySQL (AwardSpace: Hosting Tools > MySQL Databases) ----
    'db_host' => 'localhost',        // AwardSpace shows a host like fdb1234.awardspace.net
    'db_name' => 'fitpulse',
    'db_user' => 'root',
    'db_pass' => '',

    // ---- Your site address, no trailing slash ----
    // Local:      http://localhost:5174
    // AwardSpace: https://yourname.atwebpages.com  (or your own domain)
    'site_url' => 'http://localhost:5174',

    // ---- Stripe (Developers > Webhooks > your destination > Signing secret) ----
    // Payments use Payment Links, so no secret API key is stored on this server.
    'stripe_webhook_secret' => 'whsec_...',

    // ---- Google sign-in – needs a host that allows outgoing connections
    //      (NOT AwardSpace free). Leave blank and the Google buttons show a message. ----
    'google_client_id'     => '',
    'google_client_secret' => '',
);
