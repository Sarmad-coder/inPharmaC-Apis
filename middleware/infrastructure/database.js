const mongoose = require('mongoose');

const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/inpharmaC'

const database = {
    connect: function(startServer) {
        mongoose.connect(url);
        mongoose.connection.on('connected', () => {
            console.log(`Connected to database ${url}`);
            startServer();
        });
        mongoose.connection.on('error', (err) => {
            if (err) {
                console.log('Error in database connection: ' + err);
            }
        });
    }
}

module.exports = database;