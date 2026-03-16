import express from 'express';
const router = express.Router();
import { VerifyUserAuth, roleBasedAccess } from '../middlewares/userAuth.js';
import { allOrders, deleteOrder, getAllOrders, newOrder, singleOrder, updateOrderStatus } from '../controller/orderController.js';

router.route('/new/order').post(VerifyUserAuth,newOrder);
router.route('/admin/order/:id')
.get(VerifyUserAuth,roleBasedAccess('admin'),singleOrder)
.put(VerifyUserAuth,roleBasedAccess('admin'),updateOrderStatus)
.delete(VerifyUserAuth,roleBasedAccess('admin'),deleteOrder);
router.route('/orders/user').get(VerifyUserAuth,allOrders);
router.route('/admin/orders').get(VerifyUserAuth,roleBasedAccess('admin'),getAllOrders);
export default router;