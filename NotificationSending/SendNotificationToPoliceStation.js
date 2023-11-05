

// const admin = require('firebase-admin');
// const serviceAccount = require('../serviceAccountKey.json');


// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// }, 'PoliceClub1');

// const sendNotificationToNearestPolice = async (notificationData,token) => {

 
    
//     const message = {
//         token,
//         notification: {
//             title: `One New complaint registered`,
//             body: `Complaint registered in ${notificationData.MissingReport_Data}`,
//         },
//     };

//     admin.messaging().send(message)
//         .then((response) => {
//             console.log('Notification sent successfully:', response);
//         })
//         .catch((error) => {
//             console.error('Error sending notification:', error.message);
//         });
// };

// module.exports = sendNotificationToNearestPolice;

// const PoliceModel = require("./../Model/PoliceMan.model")
// const admin = require('firebase-admin');
// const serviceAccount = require('../serviceAccountKey.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// }, 'PoliceClub1');


// const sendNotificationToNearestPolice = async (notificationData) => {
//     try {
//         const policeStations = await PoliceModel.find({}, 'Fcm_Token'); // Fetch FCM tokens of all police stations

//         const messages = policeStations.map((policeStation) => ({
//             token: policeStation.Fcm_Token,
//             notification: {
//                 title: 'New Complaint Registered',
//                 body: `registered Complaint -  ${notificationData.MissingReport_Data}`,
//             },
//         }));

//         const sendPromises = messages.map((message) =>
//             admin.messaging().send(message)
//         );

//         await Promise.all(sendPromises);

//         console.log('Notifications sent successfully');
//     } catch (error) {
//         console.error('Error sending notifications:', error.message);
//     }
// };

// module.exports = sendNotificationToNearestPolice;


//working but getting SenderId mismatch

// const admin = require('firebase-admin');
// const serviceAccount = require('../serviceAccountKey.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// }, 'PoliceClub1');

// const sendNotificationToNearestPolice = async (notificationData, policeStationTokens) => {
//     try {
//         if (!policeStationTokens || policeStationTokens.length === 0) {
//             console.error('No police station tokens found....');
//             return;
//         }

        
//         const messages = policeStationTokens.map((token) => ({
//             token,
//             notification: {
//                 title: 'New Complaint Registered',
//                 body: `Complaint registered in ${notificationData.MissingReport_Data}`,
//             },
//         }));

//         const sendPromises = messages.map((message) =>
//             admin.messaging().send(message)
//         );

//         await Promise.all(sendPromises);

//         console.log('Notifications sent successfully');
//     } catch (error) {
//         console.error('Error sending notifications:', error.message);
//     }
// };

// module.exports = sendNotificationToNearestPolice;



const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
}, 'PoliceClub1');

const sendNotificationToNearestPolice = async (notificationData, policeStationTokens) => {
    try {
        for (const token of policeStationTokens) {
            console.log(token);
            const message = {
                token,
                notification: {
                    title: 'New Complaint Registered',
                    body: `Registered Complaint detrails - ${notificationData.MissingReport_Data}`,
                },
            };

            console.log(message);
            await admin.messaging().send(message);
            console.log('Notification sent successfully to', token);
        }

        console.log('All notifications sent successfully');
    } catch (error) {
        console.error('Error sending notifications:', error.message);
    }
};

module.exports = sendNotificationToNearestPolice;


