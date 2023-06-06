const mongoose = require('mongoose');

exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // eslint-disable-next-line no-console
        console.log(`MongoDB Connected: ${conn.connection.name} on ${conn.connection.port} at ${conn.connection.host}`);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('MongoDB Connection Error:', error);
        throw error;
    }
};
