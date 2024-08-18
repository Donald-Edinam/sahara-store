import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

class MongoConnection {
    constructor() {
        const port = process.env.dbPORT || 27017;
        const host = process.env.dbHOST || 'localhost';
        this.dbUrl = `mongodb://${host}:${port}/afrimart`
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