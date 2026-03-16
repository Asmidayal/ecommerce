import app from './app.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
// Setting up config file
dotenv.config({ path: 'backend/config/config.env' });
import {v2 as cloudinary} from 'cloudinary';
connectDB();
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
})
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});
const port = process.env.PORT || 5000;



const server=app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});