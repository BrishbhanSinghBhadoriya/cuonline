import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

async function test() {
    console.log('Testing connection to:', MONGO_URI);
    console.log('Database:', DB_NAME);

    try {
        await mongoose.connect(MONGO_URI, {
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Connection successful!');
        process.exit(0);
    } catch (err) {
        console.error('Connection failed!');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);
        if (err.reason) console.error('Reason:', err.reason);
        process.exit(1);
    }
}

test();
