import express from 'express';
const router = express.Router();
import { VerifyUserAuth, roleBasedAccess } from '../middlewares/userAuth.js';
import { allOrders, deleteOrder, getAllOrders, CreatenewOrder, singleOrder, updateOrderStatus, getRevenueByMonth } from '../controller/orderController.js';

router.route('/new/order').post(VerifyUserAuth,CreatenewOrder);
router.route('/order/:id')
.get(VerifyUserAuth,singleOrder)
router.route('/admin/order/:id')
//.get(VerifyUserAuth,roleBasedAccess('admin'),singleOrder)
.put(VerifyUserAuth,roleBasedAccess('admin'),updateOrderStatus)
.delete(VerifyUserAuth,roleBasedAccess('admin'),deleteOrder);
router.route('/orders/user').get(VerifyUserAuth,allOrders);
router.route('/admin/orders').get(VerifyUserAuth,roleBasedAccess('admin'),getAllOrders);
router.route('/admin/revenue').get(VerifyUserAuth,roleBasedAccess('admin'),getRevenueByMonth);
export default router;