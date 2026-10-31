/**
 * Google Apps Script for Portfolio Contact Form
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet named "Portfolio Contact Form"
 * 2. Create a sheet named "Responses" with columns: Timestamp | Name | Email | Message | Status
 * 3. Go to Extensions > Apps Script
 * 4. Paste this code
 * 5. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the deployment URL and add it to your .env file as VITE_CONTACT_FORM_URL
 */

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Responses');
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: false, 
          message: 'Missing required fields' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Save to Google Sheet
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.message,
      'New'
    ]);
    
    // Send email notification
    MailApp.sendEmail({
      to: 'abdullah.shaban165@gmail.com',
      subject: '🔔 New Contact Form Submission - Portfolio',
      htmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">New message from your portfolio!</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 4px;">${data.message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">
            Sent from Portfolio Website on ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo' })}
          </p>
        </div>
      `
    });
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'An error occurred. Please try again or email me directly.' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function - run this to test the script
 */
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message from the contact form.'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
