import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '../.env.local');

let MONGODB_URI = '';
let DB_NAME = 'unifostedu_data';

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    for (const line of lines) {
        if (line.startsWith('MONGO_URI=')) {
            MONGODB_URI = line.split('=')[1].trim();
        }
        if (line.startsWith('MONGODB_URI=')) {
            MONGODB_URI = line.split('=')[1].trim();
        }
        if (line.startsWith('DB_NAME=')) {
            DB_NAME = line.split('=')[1].trim();
        }
    }
}

async function debugDB() {
    console.log('--- DB Debug Start ---');
    console.log('URI:', MONGODB_URI ? 'FOUND (masked)' : 'NOT FOUND');
    console.log('DB_NAME:', DB_NAME);

    if (!MONGODB_URI) {
        console.error('Error: MONGODB_URI/MONGO_URI is not defined in .env.local');
        process.exit(1);
    }

    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, {
            dbName: DB_NAME,
            connectTimeoutMS: 5000,
            serverSelectionTimeoutMS: 5000,
        });
        console.log('✅ Successfully connected to MongoDB!');

        const db = mongoose.connection.db;
        console.log('Database Name:', db.databaseName);

        // List collections
        const collections = await db.listCollections().toArray();
        console.log('Collections in database:', collections.map(c => c.name));

        console.log('--- DB Debug End ---');
        await mongoose.disconnect();
    } catch (error) {
        console.error('❌ Connection Failed:', error);
        process.exit(1);
    }
}

debugDB();
