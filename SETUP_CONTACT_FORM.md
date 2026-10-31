# 🚀 Setup Instructions - Contact Form

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Portfolio Contact Form"
3. Rename the first sheet to "Responses"
4. Add these column headers in row 1:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Message`
   - E1: `Status`

## Step 2: Setup Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code
3. Copy the code from `google-apps-script/ContactFormHandler.gs`
4. Paste it into the Apps Script editor
5. Update the email address on line 42 if needed:
   ```javascript
   to: 'abdullah.shaban165@gmail.com',
   ```
6. Click **Save** (💾 icon)

## Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the settings:
   - **Description**: Portfolio Contact Form
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** > **Go to [Project Name] (unsafe)**
9. Click **Allow**
10. **Copy the Web app URL** - it looks like:
    ```
    https://script.google.com/macros/s/AKfycbx.../exec
    ```

## Step 4: Add URL to Your Project

1. In your project root, create a file named `.env`
2. Add this line (replace with your actual URL):
   ```
   VITE_CONTACT_FORM_URL=https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec
   ```
3. Save the file

## Step 5: Test the Form

### Option 1: Test in Apps Script (Recommended First)

1. In Apps Script editor, select the `testDoPost` function from the dropdown
2. Click **Run** (▶️ icon)
3. Check your email - you should receive a test message
4. Check your Google Sheet - a new row should appear

### Option 2: Test on Your Website

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Go to the Contact section
3. Fill out the form and submit
4. You should see a success message
5. Check your email and Google Sheet
## Troubleshooting
### "Contact form URL not configured" error
- Make sure you created the `.env` file
- Make sure the variable name is exactly `VITE_CONTACT_FORM_URL`
- Restart your dev server after creating `.env`
### Not receiving emails
- Check your spam folder
- Verify the email address in the Apps Script code
- Check the Apps Script execution logs: **Executions** tab
### Form submits but no data in Sheet
- Check the sheet name is exactly "Responses"
- Check column headers are correct
- View Apps Script logs for errors
## Security Notes
⚠️ **Important:**
- Never commit your `.env` file to Git
- The `.env` file is already in `.gitignore`
- Only share the `.env.example` file
- Anyone can submit to your form (it's public)
- Consider adding rate limiting if you get spam
## Next Steps
Once the contact form is working:
- [ ] Add Google Analytics (see action_plan.md)
- [ ] Add Meta Tags for SEO
- [ ] Test on mobile devices
- [ ] Deploy to production
---
Need help? Check the full action plan in `action_plan.md` or the technical report in `technical_analysis_report.md`