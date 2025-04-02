// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Twilio credentials
const accountSid = 'ACadd04fc25dccdeff5cbadefdbf96abfd';
const authToken = 'bbf7fdece3447edc4adf5d3f692f50a6';
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = '+19862164534';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to send SMS
app.post('/send-sms', (req, res) => {
  const { message, to } = req.body;

  twilioClient.messages
    .create({
      body: message,
      from: twilioPhoneNumber,
      to: to,
    })
    .then((message) => {
      console.log(`Message sent: ${message.sid}`);
      res.status(200).send('SMS sent successfully');
    })
    .catch((error) => {
      console.error('Error sending SMS:', error);
      res.status(500).send('Error sending SMS');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});