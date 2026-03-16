import express from 'express';
import product from './routes/productRoutes.js';
import errorHandleMiddleware from './middlewares/error.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
//app.use to use cookie parser middleware

const app = express()
//MIDDLEWARE
app.use(express.json());//to accept json data
 app.use(cookieParser()); 
 app.use(fileUpload());
//to activate routes
app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1',order);
app.use(errorHandleMiddleware);
//module.exports = app;
export default app; //ES6
