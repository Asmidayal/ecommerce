import express from 'express';
const router = express.Router(); //handle http requests
import { registerUser,loginUser, logoutUser,resetPassword, requestPasswordReset,userDetails,updatePassword,updateProfile, getUsersList, getSingleUser, updateUserRole, deleteUser } from '../controller/userController.js';
import { VerifyUserAuth } from '../middlewares/userAuth.js';
import { roleBasedAccess } from '../middlewares/userAuth.js';
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/password/forgot').post(requestPasswordReset);
router.route('/reset/:token').post(resetPassword);
router.route('/profile').get(VerifyUserAuth,userDetails);
router.route('/password/update').post(VerifyUserAuth,updatePassword);
router.route('/profile/update').post(VerifyUserAuth,updateProfile);
router.route('/admin/users').get(VerifyUserAuth,roleBasedAccess("admin"),getUsersList);
router.route('/admin/user/:id')
.get(VerifyUserAuth,roleBasedAccess('admin'),getSingleUser)
.put(VerifyUserAuth,roleBasedAccess('admin'),updateUserRole)
.delete(VerifyUserAuth,roleBasedAccess('admin'),deleteUser);
export default router;