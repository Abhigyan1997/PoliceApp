
const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Replace with the path to your service account key file
const emergancycallModal = require('../Model/emergancycall.Modal');
const rounter = express.Router();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sendNotification = rounter.post('/send-notification', async (req, res) => {
    const { token, longitude, latitude, mynearbyLocation } = await req.body;
    // const token = "dWUtTNUnRoK1cHgvG6amtq:APA91bFV1tsuOP60nFAOVEHM-YIgkeIruZh7TGpsqS8KG7LT8Qflm3RHDf_FtXMzWFIgOpB0nDZnTiUzev9t-_mPKmzTqsLNi_EXLCjcd73_YDMGYwVqAOQGA_H53A-LRhbL7VxyoAeO"
    const message = {
        token,
        notification: {
            title: "New Notification",
            body: `Latitude: ${latitude}, Longitude: ${longitude}, Nearby Location: ${mynearbyLocation}`
        },
    };
    await admin.messaging().send(message)
        .then((response) => {
            console.log('Notification sent successfully:', response);
            const newCall = new emergancycallModal({ ...req.body, timestamp: Date });
            newCall.save();
            res.json({ success: true, message: 'Notification sent successfully' ,newCall});
        })
        .catch((error) => {
            console.error('Error sending notification:', error);
            res.status(500).json({ success: false, message: 'Error sending notification' });
        });
});


module.exports = { sendNotification };