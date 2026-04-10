const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
  ].filter(Boolean),
  credentials: true,
}));
app.use(express.json());

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend API is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message, website_name } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Name, email, and message are required',
      });
    }

    // Send email to website owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `New Contact Form Submission - ${website_name || 'Unknown Site'}`,
      html: `
        <h2>You have a new contact form submission:</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send confirmation email to visitor
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your message',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>We've received your message and will get back to you shortly.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to send message. Please try again later.',
    });
  }
});

// Booking/Appointment endpoint
app.post('/api/booking', async (req, res) => {
  try {
    const { name, email, phone, date, time, service, website_name } = req.body;

    // Validation
    if (!name || !email || !phone || !date || !service) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Name, email, phone, date, and service are required',
      });
    }

    // Send booking confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Booking Confirmation - ${website_name || 'Service'}`,
      html: `
        <h2>Your booking has been received!</h2>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time || 'To be confirmed'}</p>
        <p>We'll confirm your booking shortly.</p>
      `,
    });

    // Send booking notification to website owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Booking - ${website_name || 'Unknown Site'}`,
      html: `
        <h2>New booking received:</h2>
        <p><strong>Customer Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time || 'Not specified'}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: 'Your booking has been submitted successfully',
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to submit booking. Please try again later.',
    });
  }
});

// Newsletter subscription endpoint
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Email is required',
      });
    }

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to our newsletter!',
      html: `
        <h2>Thank you for subscribing!</h2>
        <p>You'll now receive updates and offers from us.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to subscribe. Please try again later.',
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong. Please try again later.',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: 'API endpoint not found',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend API running on port ${PORT}`);
  console.log(`📝 Health check: ${PORT}/api/health`);
});
