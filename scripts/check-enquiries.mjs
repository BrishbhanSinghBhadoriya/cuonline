 import fs from "node:fs";
 import mongoose from "mongoose";
 
 function readEnv() {
   const envPath = new URL("../.env.local", import.meta.url);
   const raw = fs.readFileSync(envPath, "utf8");
   const map = {};
   raw.split(/\r?\n/).forEach((line) => {
     const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
     if (m) map[m[1]] = m[2];
   });
   return map;
 }
 
 async function main() {
   const env = readEnv();
   const uri = env.MONGODB_URI || env.MONGO_URI;
   const dbName = env.DB_NAME || "unifostedu_data";
   if (!uri) {
     console.error("Missing MONGO_URI/MONGODB_URI");
     process.exit(1);
   }
   const conn = await mongoose.connect(uri, { dbName });
   const count = await conn.connection.db.collection("enquiries").countDocuments();
   console.log("db:", dbName, "count:", count);
   const one = await conn.connection.db.collection("enquiries").find().sort({ _id: -1 }).limit(1).toArray();
   if (one[0]) console.log("latest _id:", one[0]._id?.toString());
   await conn.disconnect();
 }
 
 main().catch((e) => {
   console.error(e);
   process.exit(1);
 });
