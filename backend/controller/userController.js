import handleAsyncErrors from "../middlewares/handleAsyncErrors.js";
import User from "../models/userModel.js";
import handleError from "../utils/handleError.js";
import sendToken from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from 'crypto';
export const registerUser= handleAsyncErrors(async(req, res,next) => {
    const {name, email, password}=req.body;
    const user= await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicUrl",
        }
    });
    sendToken(user,201,res);
    //const token=user.getJWTToken();
   // res.status(201).json({ 
        //success:true,
       // user,// returning user details
       // token // returning jwt token
    //});
});

// user login
export const loginUser= handleAsyncErrors(async(req, res,next) => {
    const {email, password}=req.body;
    if(!email || !password){
        return next(new Error("Please enter email and password",400));
    }
    const user= await User.findOne({email}).select("+password");
    if(!user){
        return next(new handleError("Invalid email or password",401));
    }
const ispasswordvalid= await user.verifyPassword(password);
    if(!ispasswordvalid){
        return next(new handleError("Invalid email or password",401));
   }
   // const token=user.getJWTToken();
    //const ispasswordvalid= await user.verifyPassword(password);
    //if(!ispasswordvalid){
        //return next(new handleError("Invalid email or password",401));
   // }
   sendToken(user,200,res); //helper function
});
// user logout
export const logoutUser= handleAsyncErrors(async(req, res,next) => {
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged out successfully",
    });
    });
    // request reset/forgot 
    export const requestPasswordReset= handleAsyncErrors(async(req, res,next) => {
        const {email}=req.body;
        const user= await User.findOne({email});
        if(!user){
            return next(new handleError("user doesnt exist",401));
        }
        let resetToken;
        try {
            resetToken= user.generatePasswordResetToken();
            await user.save({validateBeforeSave:false});
        } catch (error) {
            console.log(error);
            return next(new handleError("could not save reset token",500)); 
            
        }
        const resetPasswordURL=`http://localhost/api/v1/reset/${resetToken}`;
        const message=`use the following link to reset password ${resetPasswordURL}, ignore if request not sent`;
        try {
            // send email
            await sendEmail({
            email:user.email,
            subject:'password reset request',
            message:message
            })
            res.status(200).json({
                success:true,
                message: `email sent successfully to ${user.email}`
            })
        } catch (error) {
            console.log(error);
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire=undefined;
            await user.save({validateBeforeSave:false});
             return next(new handleError("email could not be sent",500))
        }
    });
    //reset password
export const resetPassword=handleAsyncErrors(async(req,res,next)=>{
    //console.log(req.params.token);
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    });
    if(!user){
        return next(new handleError("reset passsword is invalid or password token is expired",400))
}
const {password,confirmPassword}=req.body;
if(password!==confirmPassword){
     return next(new handleError("password doesnt match",400)); 
}
//user.password=req.body.password;
user.password=password;
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;
await user.save();
sendToken(user,200,res);
})
//get user details
export const userDetails=handleAsyncErrors(async(req,res,next)=>{
    const user= await User.findById(req.user.id); //decoded id
   // console.log(req.user.id);
    res.status(200).json({
     success:true,
     user
    })
})
//update password
export const updatePassword=handleAsyncErrors(async(req,res,next)=>{
    const {oldPassword,newPassword,confirmPassword}= req.body;
    const user =await User.findById(req.user.id).select('+password');
    const checkPasswordMatch= await user.verifyPassword(oldPassword);
    if(!checkPasswordMatch){
        return next(new handleError("old password is incorrect",400))
    }
     if(newPassword!==confirmPassword){
        return next(new handleError("password does not mathc",400))
    }
    user.password=newPassword;
    await user.save();
    sendToken(user,200,res);
})
//update user profile
export const updateProfile=handleAsyncErrors(async(req,res,next)=>{
    const{name,email}=req.body;
    const updateUserDetails={
        name,
        email
    }
   const user = await User.findByIdAndUpdate(req.user.id,updateUserDetails,{
    new:true,
    runValidators:true,
   })
   res.status(200).json({
    success:true,
    message:"profile updated successfully",
    user
   })
})
//admin getting user info
export const getUsersList= handleAsyncErrors(async(req,res,next)=>{
    const users= await User.find();
    res.status(200).json({
        success:true,
        users
    })
})
// Admin getting single user info
export const getSingleUser= handleAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
         return next(new handleError(`user doesnt exist with this id ${req.params.id}`,400))
    }
    res.status(200).json({
        success:true,
        user
    })
    })
    //Admin- changing user roles
    export const updateUserRole= handleAsyncErrors(async(req,res,next)=>{
    const {role}= req.body;
    const newUserData={
        role
    }
    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
    })
    if(!user){
        return next(new handleError("user doesnt exist",400))
    }
    res.status(200).json({
        success:true,
        user
    })
    })
    //Admin-deleting user profile
 export const deleteUser= handleAsyncErrors(async(req,res,next)=>{
const user =await User.findById(req.params.id);
if(!user){
  return next(new handleError("user doesnt exist",400))
}
await User.findByIdAndDelete(req.params.id);
res.status(200).json({
    success:true,
    message: "user deleted succesfully"
})
 })

 