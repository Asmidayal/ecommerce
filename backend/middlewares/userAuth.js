import handleAsyncErrors from "./handleAsyncErrors.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; //for user to access all products
import handleError from "../utils/handleError.js";
export const VerifyUserAuth= handleAsyncErrors(async(req, res, next) => {
    const {token}= req.cookies; // for postman we use headers and for frontend we use cookies
   // console.log(token);

//if no token present in cookies
if(!token){
   return next(new handleError("Please login to access this resource",401)); // if not having cookie
}
const decodedData= jwt.verify(token, process.env.JWT_SECRET);
//console.log(decodedData);
req.user= await User.findById(decodedData.id);
next(); // move to next middleware or controller that is to access get all products
});
export const roleBasedAccess= (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new handleError(`Role: ${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    }
}
//User
//roleBasedAccess('admin'); // only admin can access this route roles is array in whihc admin is there
