

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountuserKey.json'); // Replace with the path to your service account key file
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
}, 'PoliceClub');


const EmergancyCall = require("./../Model/emergancycall.Modal");

const postEmergancyCall = async (req, res) => {
    try {
        // const {_id} = await req.civilian
        const newPhonebook = new EmergancyCall({ ...req.body, timestamp: Date });
        await newPhonebook.save();
        res.json({ message: 'Thanks ! Your location is tracked', status: 200 }).status(200);
    } catch (error) {
        console.log('Error occurred ! ', error);
        res.send(error.message).status(500);
    }
}



const getemergancynotification = async (req, res) => {
    try {
        const latestData = await EmergancyCall.findOne({}, {}, { sort: { 'createdAt': -1 } })
        if (latestData) {
            res.json({ message: 'New notification', status: 200, latestData }).status(201);
        } else {
            res.json({ message: ' No any New notification', status: 200 }).status(201);
        }
    } catch (error) {
        res.send(error.message).status(500);
    }
}


const getAllnotification = async (req, res) => {
    try {
        const allNotification = await EmergancyCall.find()
        const peddinRequests = allNotification.filter((item) => item.requestAcceptStatus == false)
        if (allNotification) {
            res.json({ message: 'Total notification', status: 200, allNotification, peddinRequests }).status(201);
        } else {
            res.json({ message: ' No any New notification', status: 200 }).status(201);
        }
    } catch (error) {
        res.send(error.message).status(500);
    }
}

const deletenotification = async (req, res) => {
    const { id } = await req.params
    try {
        const deleteData = await EmergancyCall.findByIdAndDelete(id);
        // console.log(latestData);
        res.json({ message: 'notification deleted success', status: 200 }).status(200);
    } catch (error) {
        res.send(error.message).status(500);
    }
}

const acceptCallRequest = async (req, res) => {
    var { id } = await req.params
    try {
        const findData = await EmergancyCall.findById(id);
        // console.log(findData, "<<<<",);
        if (findData) {
            const token = "dWUtTNUnRoK1cHgvG6amtq:APA91bFV1tsuOP60nFAOVEHM-YIgkeIruZh7TGpsqS8KG7LT8Qflm3RHDf_FtXMzWFIgOpB0nDZnTiUzev9t-_mPKmzTqsLNi_EXLCjcd73_YDMGYwVqAOQGA_H53A-LRhbL7VxyoAeO"
            const message = {
                token,
                notification: {
                    title: "New Notification",
                    body: `Your request in is accepted by ASI KALA`
                },
            };
            await admin.messaging().send(message)
                .then((response) => {
                    console.log('Notification sent successfully:', response);
                    res.json({ success: true, message: 'Your request is accepted' });
                })
                .catch((error) => {
                    console.error('Error sending notification:', error);
                    res.status(500).json({ success: false, message: 'Error sending notification' });
                });

            await EmergancyCall.findByIdAndUpdate(id, {
                requestAcceptStatus: true
            }, { new: true })
            // res.json({ message: 'Request accepted sccuess', status: 200, updateStatus }).status(200);
        } else {
            res.json({ message: 'Request Data is not found', status: 404 }).status(404);
        }

    } catch (error) {
        res.send(error.message).status(500);
    }
}






module.exports = { postEmergancyCall, acceptCallRequest, getemergancynotification, deletenotification, getAllnotification }