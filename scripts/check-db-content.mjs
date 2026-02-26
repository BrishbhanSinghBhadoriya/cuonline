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
    console.log('--- DB Content Check ---');
    if (!MONGODB_URI) {
        console.error('Error: MONGODB_URI/MONGO_URI is not defined in .env.local');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: DB_NAME,
        });
        console.log('✅ Connected to:', DB_NAME);

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);
        console.log('Collections:', collectionNames);

        if (collectionNames.includes('enquiries')) {
            const count = await db.collection('enquiries').countDocuments();
            console.log('Total Enquiries Count:', count);
            if (count > 0) {
                const latest = await db.collection('enquiries').find().sort({ createdAt: -1 }).limit(1).toArray();
                console.log('Latest Enquiry:', JSON.stringify(latest[0], null, 2));
            }
        } else {
            console.log('❌ Collection "enquiries" does not exist in this database.');
        }

        console.log('--- DB Content Check End ---');
        await mongoose.disconnect();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

debugDB();
