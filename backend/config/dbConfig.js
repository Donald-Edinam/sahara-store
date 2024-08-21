import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

class MongoConnection {
    constructor() {
        this.dbUrl = "mongodb+srv://ibrahim:ibra12aji@cluster0.430wd.mongodb.net/Saharastore?retryWrites=true&w=majority&appName=Cluster0";
        this.connect();
    }

    connect() {
        mongoose.connect(this.dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('Database connected successfully');
        })
        .catch(err => {
            console.error('Database connection failed:', err.message);
            process.exit(1);  // Exit the process if connection fails
        });
    }

    isAlive() {
        return mongoose.connection.readyState === 1; // Check if connection is still alive
    }
}

const dbClient = new MongoConnection();
export default dbClient;