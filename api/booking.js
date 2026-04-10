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
    const { name, email, phone, date, time, service, website_name, notes } = req.body;

    // Validation
    if (!name || !email || !phone || !date || !service) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Name, email, phone, date, and service are required',
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

    // Send booking confirmation email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Booking Confirmation - ${website_name || 'Service'}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Your booking has been received!</h2>
          <p>Thank you for booking with us. Here are your booking details:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Service:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${new Date(date).toLocaleDateString()}</td>
            </tr>
            ${time ? `<tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Time:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${time}</td>
            </tr>` : ''}
            ${notes ? `<tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Additional Notes:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${notes}</td>
            </tr>` : ''}
          </table>
          <p>We'll confirm your booking shortly.</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Please don't reply to this email. Contact us directly for changes.</p>
        </div>
      `,
    });

    // Send booking notification to website owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Booking - ${website_name || 'Unknown Site'}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>New booking received:</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Customer Name:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Service:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${service}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${new Date(date).toLocaleDateString()}</td>
            </tr>
            ${time ? `<tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Time:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${time}</td>
            </tr>` : ''}
            ${notes ? `<tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Notes:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${notes}</td>
            </tr>` : ''}
          </table>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: 'Your booking has been submitted successfully',
      bookingId: `BOOK_${Date.now()}`,
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to submit booking. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
