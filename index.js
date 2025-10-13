import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

let myusername = process.env.MY_APP_USERNAME; 

console.log("Username from .env file:", myusername);

console.log("Hello, World!");
console.log("This is a sample Node.js application.");
console.log("Enjoy coding! 😊");