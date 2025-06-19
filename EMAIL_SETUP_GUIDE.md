# 📧 Email Notification Setup Guide

This guide will help you set up email notifications for the Crime Buster System using Gmail SMTP (FREE).

## 🚀 Quick Setup

### Step 1: Create Gmail App Password

1. **Go to your Google Account settings:**
   - Visit: https://myaccount.google.com/
   - Sign in with your Gmail account

2. **Enable 2-Factor Authentication:**
   - Go to "Security" tab
   - Click "2-Step Verification"
   - Enable it if not already enabled

3. **Generate App Password:**
   - Go to "Security" tab
   - Click "App passwords" (under 2-Step Verification)
   - Select "Mail" and "Other (Custom name)"
   - Enter "Crime Buster System" as the name
   - Click "Generate"
   - **Copy the 16-character password** (you'll need this)

### Step 2: Configure Environment Variables

1. **Create/Update your `.env` file in the server directory:**

```env
# Email Configuration (Gmail SMTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_character_app_password

# Optional: Test email address
TEST_EMAIL=test@example.com
```

2. **Replace the values:**
   - `your_email@gmail.com` → Your Gmail address
   - `your_16_character_app_password` → The app password from Step 1
   - `test@example.com` → Email address for testing

### Step 3: Test Email Configuration

Run the test script to verify everything works:

```bash
cd server
node ../test_email.js
```

You should see:
```
🧪 Testing Email Service...

1. Checking email configuration...
✅ Email configuration found

2. Sending test email...
✅ Test email sent successfully!
📧 Message ID: <message_id>

3. Testing email templates...
Template 1: Crime Report Received - Case ID: TEST123
Template 2: Crime Report Approved - Case ID: TEST123
Template 3: Crime Report - Additional Information Required
Template 4: Case Update - Case ID: TEST123

✅ Email service test completed!
```

## 📧 Email Templates

The system includes these email templates:

### 1. Case Submitted
- **Trigger:** When anonymous crime report is submitted
- **Content:** Case ID, Aadhar number, confirmation message

### 2. Case Approved
- **Trigger:** When police approves a case
- **Content:** Case ID, police station name, approval confirmation

### 3. Case Rejected
- **Trigger:** When police rejects a case
- **Content:** Contact information for follow-up

### 4. Case Update
- **Trigger:** When police adds updates to a case
- **Content:** Case ID, update details

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid login" error:**
   - Make sure you're using the App Password, not your regular Gmail password
   - Verify 2-Factor Authentication is enabled

2. **"Less secure app access" error:**
   - Use App Passwords instead of regular passwords
   - App Passwords are more secure and required for modern Gmail

3. **"Authentication failed" error:**
   - Double-check your email and app password
   - Make sure there are no extra spaces

4. **"Connection timeout" error:**
   - Check your internet connection
   - Verify Gmail SMTP settings are correct

### Gmail SMTP Settings:
- **Server:** smtp.gmail.com
- **Port:** 587
- **Security:** TLS
- **Authentication:** Required

## 📱 Frontend Integration

The email field is automatically added to the crime buster form. Users will receive:

1. **Confirmation email** when they submit a report
2. **Approval/Rejection emails** when police processes their case
3. **Update emails** when police adds case updates

## 🔒 Security Notes

- ✅ App Passwords are secure and recommended by Google
- ✅ Emails are sent only to the email provided by the user
- ✅ No email addresses are stored in plain text
- ✅ Email notifications are optional (system works without email)

## 📞 Support

If you encounter issues:

1. Check the test script output for specific error messages
2. Verify your Gmail account settings
3. Ensure your `.env` file is properly configured
4. Check that nodemailer is installed: `npm install nodemailer`

---

**🎉 You're all set!** Email notifications will now work automatically when users submit crime reports. 