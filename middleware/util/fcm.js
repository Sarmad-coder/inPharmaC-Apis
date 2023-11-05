const admin = require('firebase-admin');
const serviceAccount = require('../config/inpharmac-98125-firebase-adminsdk-v55ab-9c1a71f9cc.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: '<your-database-url>'
});

const sendNotification = async (registrationToken, payload) => {
    try {
        const response = await admin.messaging().send({
            token: registrationToken,
            notification: payload.notification,
            data: payload.data
        });
        console.log(`FCM notification sent: ${response}`);
    } catch (error) {
        console.error(`Error sending FCM notification: ${error}`);
    }
};

module.exports = {
    sendNotification
};
