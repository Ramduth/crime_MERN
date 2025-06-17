const { sendEmail, emailTemplates } = require('./emailService');

// Simple notification service - Email only
class NotificationService {
    constructor() {
        this.channels = {
            email: { enabled: true, priority: 1 }
        };
    }

    // Send notification through email
    async sendNotification(notificationData) {
        const results = {
            email: null
        };

        const { type, email, caseId, aadhar, policeStation, update } = notificationData;

        // Send Email if email provided
        if (email && this.channels.email.enabled) {
            try {
                let template = null;
                switch (type) {
                    case 'caseSubmitted':
                        template = emailTemplates.caseSubmitted(caseId, aadhar);
                        break;
                    case 'caseApproved':
                        template = emailTemplates.caseApproved(caseId, policeStation);
                        break;
                    case 'caseRejected':
                        template = emailTemplates.caseRejected(policeStation);
                        break;
                    case 'caseUpdate':
                        template = emailTemplates.caseUpdate(caseId, update);
                        break;
                }
                if (template) {
                    results.email = await sendEmail(email, template.subject, template.message);
                }
            } catch (error) {
                results.email = { success: false, error: error.message };
            }
        }

        return results;
    }

    // Send notification through specific channel (email only)
    async sendNotificationByChannel(channel, notificationData) {
        const { type, email, caseId, aadhar, policeStation, update } = notificationData;

        if (channel !== 'email') {
            return { success: false, error: 'Only email notifications are enabled' };
        }

        if (!email) {
            return { success: false, error: 'Email required for email notification' };
        }

        let emailTemplate = null;
        switch (type) {
            case 'caseSubmitted':
                emailTemplate = emailTemplates.caseSubmitted(caseId, aadhar);
                break;
            case 'caseApproved':
                emailTemplate = emailTemplates.caseApproved(caseId, policeStation);
                break;
            case 'caseRejected':
                emailTemplate = emailTemplates.caseRejected(policeStation);
                break;
            case 'caseUpdate':
                emailTemplate = emailTemplates.caseUpdate(caseId, update);
                break;
        }

        return await sendEmail(email, emailTemplate.subject, emailTemplate.message);
    }

    // Get notification status
    getStatus() {
        return this.channels;
    }
}

module.exports = new NotificationService(); 