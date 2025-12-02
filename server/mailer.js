// Nodemailer config for sending emails
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // TLS is required but not 'secure' for port 587
  auth: {
    user: process.env.BOSS_EMAIL_USER,
    pass: process.env.BOSS_EMAIL_PASS,
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

module.exports = transporter;
