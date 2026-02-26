import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '../.env.local');

let MONGODB_URI = '';

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
    }
}

async function verifyFix() {
    console.log('--- Verification Start ---');
    if (!MONGODB_URI) {
        console.error('Error: MONGODB_URI/MONGO_URI is not defined in .env.local');
        process.exit(1);
    }

    try {
        // We don't pass dbName here anymore, should use whatever is in URI (or 'test' by default)
        await mongoose.connect(MONGODB_URI);
        const db = mongoose.connection.db;
        console.log('✅ Connected to Database:', db.databaseName);

        // Check if enquiries collection exists in THIS database
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);
        console.log('Collections:', collectionNames);

        if (collectionNames.includes('enquiries')) {
            console.log('Collection "enquiries" exists.');
        } else {
            console.log('Collection "enquiries" does not exist yet. Creating it with a test record...');
            await db.collection('enquiries').insertOne({
                name: "Verification Test",
                email: "verify@test.com",
                phone: "9999999999",
                program: "BCA",
                state: "Delhi",
                status: "new",
                source: "verification_script",
                createdAt: new Date(),
                updatedAt: new Date()
            });
            console.log('✅ Test record inserted into:', db.databaseName);
        }

        console.log('--- Verification End ---');
        await mongoose.disconnect();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

verifyFix();
