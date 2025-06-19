const nodemailer = require('nodemailer');

// Email configuration using Gmail (FREE)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your_email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your_app_password'
    }
});

// Email notification functions
const sendEmail = async (toEmail, subject, message) => {
    try {
        // Check if email is properly configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
            console.log('Email not configured, email will not be sent');
            return { success: false, error: 'Email not configured' };
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: subject,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
                        <h2 style="color: #dc3545; margin: 0;">Crime Buster System</h2>
                    </div>
                    <div style="padding: 20px; background-color: white;">
                        <p style="font-size: 16px; line-height: 1.6; color: #333;">
                            ${message}
                        </p>
                        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
                        <p style="font-size: 12px; color: #666; text-align: center;">
                            This is an automated notification from the Crime Buster System.<br>
                            Please do not reply to this email.
                        </p>
                    </div>
                </div>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result.messageId);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error('Email sending failed:', error.message);
        return { success: false, error: error.message };
    }
};

// Email message templates
const emailTemplates = {
    caseSubmitted: (caseId, aadhar) => ({
        subject: 'Crime Report Received - Case ID: ' + caseId,
        message: `
            <h3>Your crime report has been received successfully!</h3>
            <p><strong>Case ID:</strong> ${caseId}</p>
            <p><strong>Aadhar Number:</strong> ${aadhar}</p>
            <p>We have received your crime report and it is currently under review by the police station. 
            We will contact you if any clarification is needed.</p>
            <p><strong>Important:</strong> Please keep your Aadhar number for future reference.</p>
        `
    }),
    
    caseApproved: (caseId, policeStation) => ({
        subject: 'Crime Report Approved - Case ID: ' + caseId,
        message: `
            <h3>Your crime report has been approved!</h3>
            <p><strong>Case ID:</strong> ${caseId}</p>
            <p><strong>Police Station:</strong> ${policeStation}</p>
            <p>Your crime report has been approved and investigation has started. 
            The police station will contact you for any updates or additional information.</p>
        `
    }),
    
    caseRejected: (policeStation) => ({
        subject: 'Crime Report - Additional Information Required',
        message: `
            <h3>Additional Information Required</h3>
            <p>Your crime report requires additional information for processing.</p>
            <p><strong>Please contact:</strong> ${policeStation}</p>
            <p>Please provide your Aadhar number when contacting the police station for verification.</p>
        `
    }),
    
    caseUpdate: (caseId, update) => ({
        subject: 'Case Update - Case ID: ' + caseId,
        message: `
            <h3>Case Update</h3>
            <p><strong>Case ID:</strong> ${caseId}</p>
            <p><strong>Update:</strong> ${update}</p>
            <p>Please contact us if you have any questions about this update.</p>
        `
    })
};

module.exports = {
    sendEmail,
    emailTemplates
}; 