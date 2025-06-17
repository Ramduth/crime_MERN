require('dotenv').config();
const { sendEmail, emailTemplates } = require('./services/emailService');

async function testEmail() {
    console.log('🧪 Testing Email Service...\n');
    
    // Check environment variables
    console.log('1. Checking email configuration...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Configured' : '❌ Not configured');
    console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✅ Configured' : '❌ Not configured');
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.log('❌ Email configuration missing. Please check your .env file.');
        return;
    }
    
    // Test email sending
    console.log('\n2. Sending test email...');
    const testEmail = 'ramduthrajesh4@gmail.com'; // Use the email from your test case
    
    try {
        const result = await sendEmail(
            testEmail,
            'Test Email - Crime Reporting System',
            'This is a test email to verify that the email service is working correctly.'
        );
        
        if (result.success) {
            console.log('✅ Test email sent successfully!');
            console.log('📧 Message ID:', result.messageId);
        } else {
            console.log('❌ Test email failed:', result.error);
        }
    } catch (error) {
        console.log('❌ Test email error:', error.message);
    }
    
    // Test email templates
    console.log('\n3. Testing email templates...');
    const templates = [
        emailTemplates.caseSubmitted('TEST123', '789654123635'),
        emailTemplates.caseApproved('TEST123', 'Test Police Station'),
        emailTemplates.caseRejected('Test Police Station'),
        emailTemplates.caseUpdate('TEST123', 'Test update message')
    ];
    
    templates.forEach((template, index) => {
        console.log(`Template ${index + 1}: ${template.subject}`);
    });
    
    console.log('\n✅ Email service test completed!');
}

testEmail().catch(console.error); 