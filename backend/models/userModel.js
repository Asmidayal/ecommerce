import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[25,"Your name cannot exceed 30 characters"],
        minLength:[4,"Your name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email address"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Your password must be longer than 8 characters"],
        select:false //password will not be shown when we get user details
    },
    avatar:{
        public_id:{
            type:String,
            required:true
    },
    url:{
        type:String,
        required:true
    }
},
role:{
    type:String,
    default:"user"
},

resetPasswordToken:String,
resetPasswordExpire:Date,

}, {timestamps:true});

//password hashing
userSchema.pre("save",async function(){
     if(!this.isModified("password")){ //to prevent re-hashing
       return;
        // exit if password is not modified, and save to database as it is
    }
    if(this.password){
    this.password=await bcrypt.hash(this.password,10);
}
    
   // if(!this.isModified("password")){ //to prevent re-hashing
     //  return next(); // exit if password is not modified, and save to database as it is
   // }

});
 userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN,
    });
 }  
 userSchema.methods.verifyPassword= async function(userEnteredPassword){
    return await bcrypt.compare(userEnteredPassword,this.password); // password in database (this.passwor)
 }
 //generating token for reset password
 userSchema.methods.generatePasswordResetToken=function(){
const resetToken= crypto.randomBytes(20).toString(`hex`);
this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
this.resetPasswordExpire=Date.now()+60*60*1000;//60min
return resetToken;
 }
export default mongoose.model("User", userSchema);
