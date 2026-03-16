import mongoose from 'mongoose';
export const connectDB = () => {
    mongoose.connect(process.env.DB_URI)
.then((data) => {
    console.log(`Connected to MongoDB ${data.connection.host}`);
})
//.catch((err) => {
   // console.log(err.message);
//});
}
