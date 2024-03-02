import mongoose from 'mongoose'

const connectToMongoDB = async () => {
    mongoose.connect('mongodb://mongo:27017/users', {
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Database connected");
    });
};

export { connectToMongoDB };
