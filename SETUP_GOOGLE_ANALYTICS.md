# 📊 Google Analytics Setup Guide

## Step 1: Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com)
2. Click **Start measuring** (or **Admin** if you have existing properties)
3. Click **Create Account**
4. Fill in:
   - **Account name**: "Abdullah Shaban Portfolio" (or any name)
   - Check all data sharing settings (recommended)
5. Click **Next**

## Step 2: Create Property

1. **Property name**: "Portfolio Website"
2. **Reporting time zone**: (GMT+02:00) Cairo
3. **Currency**: Egyptian Pound (EGP) or USD
4. Click **Next**

## Step 3: Business Information

1. **Industry**: Technology / Professional Services
2. **Business size**: Small (1-10 employees)
3. **How you plan to use Google Analytics**: Check relevant options
4. Click **Create**
5. Accept Terms of Service

## Step 4: Set Up Data Stream

1. Choose platform: **Web**
2. Fill in:
   - **Website URL**: https://yoursite.com (use your actual domain, or localhost:3000 for testing)
   - **Stream name**: "Portfolio Website"
3. Click **Create stream**

## Step 5: Get Your Measurement ID

After creating the stream, you'll see:
- **Measurement ID**: `G-XXXXXXXXXX` ← Copy this!

## Step 6: Add to Your Project

1. Open your `.env` file
2. Add this line (replace with your actual ID):
   ```
   VITE_GA_ID=G-XXXXXXXXXX
   ```
3. Save the file
4. **Restart your dev server** (important!):
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

## Step 7: Test Analytics

### In Development:

1. Open your website in browser
2. Open browser console (F12)
3. You should see: "Google Analytics initialized"
4. Navigate around your site
5. Click "Download CV" button
6. Submit contact form

### In Google Analytics:

1. Go to Google Analytics
2. Click **Reports** > **Realtime**
3. You should see:
   - Active users (you!)
   - Page views
   - Events (CV downloads, form submissions)

## Tracked Events

Your website automatically tracks:

| Event Category | Event Action | When It Happens |
|---------------|--------------|-----------------|
| CV | Download | User clicks "Download CV" |
| Contact | Form Submit | User successfully submits contact form |
| Contact | Form Error | Contact form submission fails |

## Viewing Analytics Data

### Real-time (immediate):
- **Reports** > **Realtime** > See live activity

### Historical (after 24-48 hours):
- **Reports** > **Acquisition** > See where visitors come from
- **Reports** > **Engagement** > See what pages they visit
- **Reports** > **Events** > See CV downloads, form submissions

## Common Issues

### "Google Analytics ID not found" warning:
- Make sure `.env` file exists
- Make sure variable name is exactly `VITE_GA_ID`
- Restart dev server after creating/editing `.env`

### No data showing in GA:
- Wait 24-48 hours for data to appear (except Realtime)
- Check Realtime reports first
- Make sure you're not using ad blocker
- Check browser console for errors

### Events not tracking:
- Check browser console for errors
- Make sure GA initialized (check console message)
- Test in incognito mode (ad blockers disabled)

## Privacy & GDPR Compliance

For production deployment, consider:

1. **Cookie Consent Banner** (required in EU/Egypt):
   - Use a library like `react-cookie-consent`
   - Only initialize GA after user consent

2. **Privacy Policy**:
   - Add a privacy policy page
   - Mention Google Analytics usage
   - Explain what data is collected

3. **IP Anonymization** (already enabled in GA4):
   - GA4 automatically anonymizes IPs

## Next Steps

After setup:
- [ ] Monitor analytics weekly
- [ ] Set up custom goals (optional)
- [ ] Create custom reports (optional)
- [ ] Add more event tracking as needed

## Useful Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/9304153)
- [GA4 Events Guide](https://support.google.com/analytics/answer/9267735)
- [GA4 Realtime Report](https://support.google.com/analytics/answer/9271392)

---

**Note:** Replace `yoursite.com` with your actual domain when deploying to production!
