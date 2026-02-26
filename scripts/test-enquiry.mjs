 const url = "http://localhost:3005/api/enquiry";
 const payload = {
   name: "Test User",
   email: "test@example.com",
   phone: "9876543210",
   program: "MBA",
   state: "Delhi",
   message: "Hello",
 };
 
 async function main() {
   try {
     const res = await fetch(url, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(payload),
     });
     const text = await res.text();
     console.log("status:", res.status);
     console.log("body:", text);
   } catch (e) {
     console.error("request error:", e);
     process.exitCode = 1;
   }
 }
 
 main();
