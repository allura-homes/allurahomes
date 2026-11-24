# Guesty Booking Engine API Setup Guide

This guide walks through the complete setup required to enable on-domain checkout with real-time quotes and reservations.

---

## Prerequisites

- Guesty account with API access
- Access to Guesty Marketplace
- Neon database with `guesty_token_cache` table
- Stripe or GuestyPay configured in Guesty (for payment processing)

---

## Step 1: Create Booking Engine API Credentials

### In Guesty Admin:

1. Navigate to **Marketplace** → **API Integrations**
2. Search for **"Booking Engine API"** (not "Open API")
3. Click **Connect** or **Create Instance**
4. Set the following:
   - **Name**: Allura Homes Direct Booking
   - **Scopes**: Select all booking-related scopes:
     - `bookings:read`
     - `bookings:write`
     - `quotes:read`
     - `quotes:write`
5. Click **Generate Credentials**
6. Copy the **Client ID** and **Client Secret** (you won't see the secret again!)

### Add to Environment Variables:

```bash
# In Vercel project settings OR .env.local
GUESTY_BE_CLIENT_ID=abc123...
GUESTY_BE_CLIENT_SECRET=xyz789...
```

---

## Step 2: Configure Payment Processing

The Booking Engine API supports two payment methods:

### Option A: GuestyPay (Recommended)

1. In Guesty: **Settings** → **Payments** → **GuestyPay**
2. Complete merchant onboarding
3. Set default payment processor to **GuestyPay**
4. Test with a sandbox transaction

### Option B: Stripe Connected Account

1. In Guesty: **Settings** → **Payments** → **Stripe**
2. Connect your Stripe account
3. Enable **Stripe Payment Intents API**
4. Configure webhook endpoints (Guesty handles this)

**Note**: The code currently uses `guesty_pay` as the payment method. To use Stripe, update:

```typescript
// In checkout-modal.tsx, line ~80
paymentMethod: 'stripe', // Change from 'guesty_pay'
```

---

## Step 3: Verify Database Schema

Ensure your Neon database has the token cache table:

```sql
CREATE TABLE IF NOT EXISTS guesty_token_cache (
  id TEXT PRIMARY KEY,
  access_token TEXT NOT NULL,
  expires_at BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_token_expires 
  ON guesty_token_cache(expires_at);
```

This table stores OAuth tokens for both Open API and Booking Engine API.

---

## Step 4: Test in Mock Mode (No Credentials Required)

Before setting up real credentials, you can test the checkout flow with mock data:

1. Leave `GUESTY_BE_CLIENT_ID` and `GUESTY_BE_CLIENT_SECRET` **unset**
2. The app will automatically use `MOCK_MODE = true`
3. Navigate to any property: `/stays/[slug]`
4. Select dates and click **Book Now**
5. Complete the checkout flow with test data
6. Verify you reach the confirmation page

**Mock behavior**:
- Quotes return realistic pricing (~$250-400/night + cleaning + tax)
- Reservations return confirmation codes like `ALHABC123`
- No actual API calls are made
- No payment processing occurs

---

## Step 5: Enable Real API (Production)

Once credentials are set:

1. Add environment variables to Vercel:
   ```bash
   vercel env add GUESTY_BE_CLIENT_ID production
   vercel env add GUESTY_BE_CLIENT_SECRET production
   ```

2. Redeploy the application

3. Test the quote endpoint:
   ```bash
   curl -X POST https://www.allurahomes.com/api/guesty/quotes \
     -H "Content-Type: application/json" \
     -d '{
       "listingId": "your_listing_id",
       "checkIn": "2026-12-01",
       "checkOut": "2026-12-05",
       "guests": 2
     }'
   ```

4. Verify the response contains real Guesty pricing

---

## Step 6: Configure Payment Tokenization

### For GuestyPay:

The current implementation uses a mock token. To enable real tokenization:

1. Add GuestyPay SDK to the project:
   ```bash
   npm install @guesty/pay-sdk
   ```

2. Update `checkout-modal.tsx` to initialize GuestyPay:
   ```typescript
   import { GuestyPay } from '@guesty/pay-sdk'
   
   const guestyPay = new GuestyPay({
     clientId: process.env.NEXT_PUBLIC_GUESTY_BE_CLIENT_ID,
     environment: 'production', // or 'sandbox'
   })
   
   const paymentToken = await guestyPay.tokenizeCard({
     cardNumber,
     expMonth,
     expYear,
     cvv,
   })
   ```

### For Stripe:

1. Add Stripe SDK:
   ```bash
   npm install @stripe/stripe-js
   ```

2. Use Stripe Elements for tokenization:
   ```typescript
   import { loadStripe } from '@stripe/stripe-js'
   
   const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)
   const { token } = await stripe.createToken(cardElement)
   ```

**Important**: Never send raw card data to your server. Always tokenize on the client.

---

## Step 7: GA4 Key Events Setup

After the first successful booking:

1. Go to [Google Analytics](https://analytics.google.com)
2. Select property **G-WHT06K3ZFQ** (Allura Homes - All Properties)
3. Navigate to **Admin** → **Events**
4. Mark these events as **Key Events** (conversions):
   - ✅ `view_item` — Property page views
   - ✅ `begin_checkout` — Checkout starts
   - ✅ `add_payment_info` — Payment details entered
   - ✅ `purchase` — Completed bookings (PRIMARY CONVERSION)

5. Create a funnel report:
   - **Exploration** → **Funnel exploration**
   - Steps: `view_item` → `begin_checkout` → `add_payment_info` → `purchase`
   - Add filters for `/stays/*` pages

---

## Step 8: Verification Checklist

Before going live, verify:

- [ ] Booking Engine API credentials are set in production
- [ ] Database connection is working (`guesty_token_cache` accessible)
- [ ] Payment processor is configured in Guesty
- [ ] Test booking completes end-to-end
- [ ] Confirmation email is sent from Guesty
- [ ] GA4 `purchase` event fires with `transaction_id`
- [ ] Reservation appears in Guesty admin
- [ ] Guest receives booking confirmation
- [ ] Cross-domain tracking works (reservations.allurahomes.com fallback)

---

## Troubleshooting

### "Guesty Booking Engine credentials not configured"

- Verify `GUESTY_BE_CLIENT_ID` and `GUESTY_BE_CLIENT_SECRET` are set
- Restart the application after adding env vars
- Check Vercel deployment logs for environment variable injection

### "Failed to get quote"

- Verify listing ID is correct
- Check dates are in `YYYY-MM-DD` format
- Ensure listing is `active: true` and `listed: true` in Guesty
- Review Guesty API logs in Marketplace console

### "Payment token invalid"

- Ensure payment processor is configured in Guesty Settings
- Verify `paymentMethod` matches your setup (`guesty_pay` or `stripe`)
- Check that tokenization is implemented (not using mock token)

### GA4 events not firing

- Open Chrome DevTools → Network → Filter `collect`
- Verify `gtag` requests are being sent
- Check GA4 DebugView (enable with `?debug_mode=true` query param)
- Confirm GA4 ID `G-WHT06K3ZFQ` is correct

---

## Migration from Legacy reservations.allurahomes.com

The old "Book Now" button opened `reservations.allurahomes.com` in a new tab. The new flow:

1. **Keeps the fallback** behind a feature flag (optional)
2. **Prioritizes on-domain checkout** for better UX
3. **Tracks the full funnel** in GA4
4. **Maintains price accuracy** with real Guesty quotes

To re-enable the legacy flow temporarily:

```typescript
// In booking-widget.tsx
const useLegacyCheckout = true // Set to true to use old flow

if (useLegacyCheckout) {
  window.open(getBookingUrl(property.id, checkIn, checkOut, guests), '_blank')
} else {
  setShowCheckout(true) // On-domain checkout
}
```

---

## Support

For Guesty API issues:
- **Guesty Support**: support@guesty.com
- **API Docs**: https://booking-api-docs.guesty.com

For implementation questions:
- **Allura Homes Tech**: Review this PR or codebase
- **Developer Documentation**: See `/docs/STAYS-VISION.md`

---

## Legal & Compliance

**Entity**: Allura Homes LLC  
**Phone**: (858) 244-9400  
**Address**: 3643 Grim Avenue, San Diego, CA 92104

Ensure all booking confirmations and guest communications reflect these details.

---

**Last Updated**: November 2026
