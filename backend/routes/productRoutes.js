import express from 'express';
import { createProducts, getAllProducts,updateProduct,deleteProduct,getSingleProduct,adminGetProduct, createReviewForProduct, getProductReviews, deleteReview } from '../controller/productcontroller.js';
import { VerifyUserAuth } from '../middlewares/userAuth.js';
import { roleBasedAccess } from '../middlewares/userAuth.js';
const router = express.Router(); //handle http requests
router.route('/products')
.get(getAllProducts)

router.route('/admin/products')
.get(VerifyUserAuth,adminGetProduct);
router.route('/admin/product/create').post(VerifyUserAuth,roleBasedAccess("admin"),createProducts);

router.route('/admin/product/:id')
.put(VerifyUserAuth,roleBasedAccess("admin"),updateProduct)
.delete(VerifyUserAuth,roleBasedAccess("admin"),deleteProduct)
router.route('/product/:id').get(getSingleProduct);
router.route('/reviews').get(getProductReviews).delete(VerifyUserAuth,deleteReview);
router.route('/review').put(VerifyUserAuth,createReviewForProduct);

//router.route('/product').get(getOneProduct);
export default router;


//this the waiter, directs the request to chef (controller)