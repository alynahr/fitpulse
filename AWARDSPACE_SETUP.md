# FitPulse on AwardSpace (PHP + MySQL + Stripe)

How it fits together:

```
React app  ──fetch /api/*.php──▶  PHP backend (public/api)  ──▶  MySQL
    │
    └── PAY button ──▶ Stripe Payment Link (hosted by Stripe)
                              │
Stripe ──webhook──▶ /api/stripe-webhook.php  (activations, renewals, cancellations)
```

AwardSpace's free plan blocks outgoing connections, so the site never calls Stripe.
Members pay on a Stripe Payment Link, and Stripe notifies the site by webhook.
No Stripe secret key is stored on the server.

- `database/fitpulse.sql` – the tables (import with phpMyAdmin). Your three Stripe price IDs are already filled in.
- `public/api/` – the PHP backend. Vite copies it into `dist/` when you build, so one upload puts everything online.
- `public/api/config.php` – your passwords and keys. Created from `config.sample.php`. Never commit or share it.

The PHP code runs on PHP 7.0+ and needs no Composer.

---

## Part 1 – Stripe Payment Links (do this first)

1. In Stripe (test mode), open **Product catalog** and click **FitPulse Basic**.
2. In the Pricing section, click the **⋯** next to the ₱999/month price and choose **Create payment link** (or go to **Payment Links → + New** and pick that product).
3. Open the **After payment** tab and choose **Don't show confirmation page → Redirect customers to your website**. Enter:
   `http://fitpulse.atwebpages.com/?checkout=success`
   If Stripe won't accept an `http://` address, keep Stripe's own confirmation page instead; members can return to the site themselves.
4. Click **Create link**. Copy the link (`https://buy.stripe.com/test_...`) and the link's ID (`plink_...`, shown on the link's details page).
5. Repeat for **Premium** and **Elite**.
6. In phpMyAdmin → SQL (on AwardSpace, and locally if you use XAMPP):
   - If your database was created before this update, run `database/add-payment-links.sql` first.
   - Then save the links:
   ```sql
   UPDATE plans SET stripe_payment_link_id = 'plink_...', stripe_payment_link_url = 'https://buy.stripe.com/test_...' WHERE id = 'basic';
   UPDATE plans SET stripe_payment_link_id = 'plink_...', stripe_payment_link_url = 'https://buy.stripe.com/test_...' WHERE id = 'premium';
   UPDATE plans SET stripe_payment_link_id = 'plink_...', stripe_payment_link_url = 'https://buy.stripe.com/test_...' WHERE id = 'elite';
   ```
7. **Webhook:** Stripe → **Developers → Webhooks → Add destination**. Events: `checkout.session.completed`, `invoice.paid`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`. URL: `http://fitpulse.atwebpages.com/api/stripe-webhook.php`. Copy the **Signing secret** (`whsec_...`) into `stripe_webhook_secret` in the live `api/config.php`.

Stripe accepts plain `http://` in test mode. Before taking real payments you'll need HTTPS (a paid plan or your own domain with SSL).

## Part 2 – Run it on your computer (XAMPP)

1. Install **XAMPP** from apachefriends.org. Open the XAMPP Control Panel and click **Start** next to **MySQL** (Apache is not needed).
2. Click **Admin** next to MySQL to open phpMyAdmin. Click **New**, name the database `fitpulse`, click **Create**.
3. With `fitpulse` selected, open the **Import** tab, choose `database/fitpulse.sql`, click **Import** (or **Go**). You should see 7 tables.
4. In VS Code, copy `public/api/config.sample.php` to `public/api/config.php` and fill in:
   - `db_host` `localhost`, `db_name` `fitpulse`, `db_user` `root`, `db_pass` empty (XAMPP defaults)
   - `site_url` → the address `npm run dev` shows, e.g. `http://localhost:5174`
5. Open **two terminals** in the project folder:
   ```
   C:\xampp\php\php.exe -S localhost:8000 -t public
   ```
   ```
   npm install
   npm run dev
   ```
   The first one is the PHP backend; keep it running. Vite forwards every `/api/...` request to it.
6. Check the setup: open `http://localhost:5174/api/health.php`. You want `database: 3 plans found` and `payment_links: all plans have a Payment Link`.
7. Test sign-up and login locally. Payments can be started locally, but Stripe can't send the webhook to your computer, so **test payment activation on the AwardSpace site**.
8. Make yourself staff: in phpMyAdmin → SQL, run
   ```sql
   UPDATE users SET role = 'staff' WHERE email = 'you@example.com';
   ```

## Part 3 – Put it on AwardSpace

1. Log in to AwardSpace. Set up your free domain/subdomain if you haven't yet, and note the address (e.g. `https://yourname.atwebpages.com`).
2. **Hosting Tools → MySQL Databases**: create a database. Write down the **database name, user, password and host** it shows (the host is NOT `localhost` on AwardSpace – it looks like `fdb12.awardspace.net`).
3. Open **phpMyAdmin** from that page, select the new database, **Import** `database/fitpulse.sql`.
4. **SSL / HTTPS**: in the control panel, look for an SSL option for your domain and turn it on if your plan has it. Google sign-in only works on `https://` addresses (except localhost), and real payments should always use HTTPS.
5. Build the site in VS Code:
   ```
   npm run build
   ```
   This creates the `dist` folder with the website **and** the `api` folder.
6. Open `dist/api/config.php` (copied from your local one) and change it to the AwardSpace values: the 4 `db_` settings from step 2, and `site_url` = your AwardSpace address (no trailing slash).
7. **File Manager**: open your domain's folder and upload **everything inside `dist`** (not the `dist` folder itself), including the `.htaccess` files and the `api` folder with `api/lib`. If the File Manager hides files starting with a dot, zip the contents of `dist`, upload the zip, and use **Extract** instead.
8. Open `http://your-site/api/health.php`. You want `database: 3 plans found`, `payment_links: all plans have a Payment Link`, and `webhook_secret: set`.
9. Open your site, sign up, pick a plan, and pay with `4242 4242 4242 4242`. Back on the site, the membership turns active within a few seconds of the webhook arriving. Check the `memberships` table.

**Updating the site later:** run `npm run build` and upload again, but **skip `api/config.php`** so you don't overwrite the live settings with your local ones.

## Google sign-in

Google sign-in needs outgoing connections, which AwardSpace's free plan blocks. The Google buttons show a message instead. It works on a host that allows outgoing connections: fill in `google_client_id` / `google_client_secret` and add `https://your-site/api/google-callback.php` as a redirect URI in Google Cloud.

## Troubleshooting

| Message | Fix |
|---|---|
| "Can't reach the server. Is the PHP backend running?" | Start `php -S localhost:8000 -t public` (local). |
| "Missing api/config.php" | Copy `config.sample.php` to `config.php`. |
| "Could not connect to the database" | Wrong `db_` settings. On AwardSpace the host is not `localhost`. |
| "Server error (500)" with no message | A PHP error – check the error log in AwardSpace, or the PHP terminal locally. |
| "This plan has no Stripe Payment Link yet" | Fill `stripe_payment_link_id` / `_url` in the `plans` table. |
| Paid, but membership stays pending | Check the webhook's event log in Stripe. 400 = wrong `stripe_webhook_secret`; 500 = check the plan's `plink_` ID matches. |

## Still to do

- **Dashboards still show sample data.** Use the functions in `src/lib/api.js` (`getMyBilling`, `getClasses`, `getMyBookings`, `bookClass`, `getAllMembers`, `checkInByMemberCode`, `getCheckIns`), e.g. in `MemberDashboard.jsx`:
  ```jsx
  const [billing, setBilling] = useState({ membership: null, payments: [] });
  useEffect(() => { getMyBilling().then(setBilling); }, []);
  ```
- **Prices don't match:** the member dashboard shows $19.99/$49.99/$79.99; the real prices are ₱999/₱1,499/₱2,499.
- **Password reset:** not built yet (the Forgot Password screen asks members to contact staff). It needs an email service, which the free plan may not provide.
- **Changing plans** for someone who already has an active membership isn't supported yet (the PAY button refuses a second subscription).
