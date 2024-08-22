const mongoose = require("mongoose")
const MONGO_URI = 'mongodb+srv://shrivedkakde00:shrived00@cluster0.l5x7cmf.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {

            useUnifiedTopology: true,

            useNewUrlParser: true,

        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(`Error: ${error.message}`);

        process.exit();
    }
}

module.exports = connectDB;