# Honeypot Spam Filter Verification Guide

This guide shows how to verify the honeypot spam filter is working correctly on all three lead capture forms.

## Forms Protected

1. **Income Report Form** - `/components/forms/income-report-form.tsx` → `/api/income-report`
2. **Contact Form** - `/components/forms/contact-form.tsx` → `/api/contact`
3. **Switch Analysis Form** - `/app/property-management/switch-property-managers-san-diego/analysis-form.tsx` → `/api/switch-analysis`

## How the Honeypot Works

### Client-Side
- Each form has a hidden field named `company_website` (for Income/Contact) or `website` (for Switch Analysis)
- The field is positioned off-screen using CSS (`.honeypot-field` class in `app/globals.css`)
- Real users never see or interact with this field
- Bots typically auto-fill all fields, including the honeypot

### Server-Side
- API routes check if the honeypot field contains any value
- If filled → Return success response but:
  - Don't send email notification
  - Don't write to database
  - Log one line noting the blocked submission
- If empty → Process normally (send email, write to DB)

### Timestamp Check
- Forms also track render time and submission time
- Submissions faster than 3 seconds are blocked (same silent treatment)
- This catches bots that submit instantly

## Manual Verification Steps

### Test 1: Normal Submission (Should Work)

1. Visit the form in a browser
2. Fill out all required fields normally
3. **Do NOT fill the honeypot field** (you won't see it anyway)
4. Wait at least 3 seconds
5. Submit the form

**Expected Result:**
- ✅ Form shows success message
- ✅ Email notification sent to mike@allurahomes.com
- ✅ Record saved to database
- ✅ No blocking logs in server console

### Test 2: Honeypot Filled (Should Block)

Using browser DevTools:

1. Visit the form in a browser
2. Open DevTools (F12) → Console
3. Run this to fill the honeypot:
   ```javascript
   // For Income Report or Contact form:
   document.getElementById('company_website').value = 'bot-test'
   
   // For Switch Analysis form:
   document.getElementById('switch-website').value = 'bot-test'
   ```
4. Fill out other required fields normally
5. Submit the form

**Expected Result:**
- ✅ Form shows success message (fake success)
- ❌ NO email notification sent
- ❌ NO database record created
- ✅ Server console logs: `[form-name] Blocked spam submission (honeypot filled): { name, email }`

### Test 3: Too Fast Submission (Should Block)

1. Visit the form
2. **Immediately** fill and submit (within 3 seconds of page load)
3. This simulates bot behavior

**Expected Result:**
- ✅ Form shows success message (fake success)
- ❌ NO email notification sent
- ❌ NO database record created
- ✅ Server console logs: `[form-name] Blocked spam submission (too fast): { name, email, elapsed }`

## Monitoring Blocked Submissions

Check server logs (Vercel logs for production) for lines containing:
- `Blocked spam submission (honeypot filled)`
- `Blocked spam submission (too fast)`

Each log includes:
- Form name (income-report, contact, or switch-analysis)
- Submitter's name and email (for tracking patterns)
- Elapsed time (for timestamp blocks)

## Production Verification

After deploying to production:

1. **Check existing spam patterns**: Monitor if spam submissions from bots decrease
2. **Verify legitimate submissions still work**: Test each form manually
3. **Monitor logs**: Check for blocked submission logs in Vercel dashboard
4. **Email notifications**: Confirm only legitimate submissions send emails

## Testing in Development

```bash
# Start dev server
pnpm dev

# Visit forms at:
# - http://localhost:3000/san-diego-airbnb-income (Income Report)
# - http://localhost:3000/contact (Contact)
# - http://localhost:3000/property-management/switch-property-managers-san-diego (Switch Analysis)

# Watch server console for blocking logs
```

## False Positive Handling

If legitimate users are blocked:

1. **Honeypot false positive**: Very unlikely - users can't see or interact with the field
2. **Timestamp false positive**: 
   - Users with aggressive autofill might trigger this
   - Consider increasing from 3 seconds to 5 seconds if needed
   - Edit API routes to adjust threshold

## Future Enhancements (Not in This PR)

- Cloudflare Turnstile
- CAPTCHA for repeated failures
- Name/email/phone pattern heuristics
- Rate limiting by IP
- Email validation against known spam domains
