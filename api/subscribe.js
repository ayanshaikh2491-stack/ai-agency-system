const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                error: 'VALIDATION_ERROR',
                message: 'Email is required',
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'INVALID_EMAIL',
                message: 'Please provide a valid email address',
            });
        }

        // Send confirmation email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to our newsletter!',
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Thank you for subscribing!</h2>
          <p>You'll now receive updates, news, and exclusive offers from us.</p>
          <p>We're excited to have you in our community!</p>
          <hr>
          <p style="color: #666; font-size: 12px;">If you wish to unsubscribe, please reply to this email.</p>
        </div>
      `,
        });

        res.status(200).json({
            success: true,
            message: 'Successfully subscribed to newsletter',
            email: email,
        });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({
            error: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to subscribe. Please try again later.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
};
