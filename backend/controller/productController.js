import Product from '../models/productModel.js'
import handleError from "../utils/handleError.js";
import handleAsyncErrors from '../middlewares/handleAsyncErrors.js';
import APIFunctionality from '../utils/apiFunctionality.js';
import {v2 as cloudinary} from 'cloudinary';



export const createProducts=handleAsyncErrors(async (req, res,next) =>{
  //console.log(req.body);
 
  let images = [];
  if (req.body.images) {
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  }

  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.image = imagesLinks;
 
  req.body.user= req.user.id;
 const product= await Product.create(req.body);
 res.status(201).json({
    success:true,
    product
 });
}); 
export const getAllProducts= handleAsyncErrors(async(req, res,next) => {//handle req and res, if an api call iscustomer ordering food, this code is chef in kitchen
  const resultPerPage=4;
  const apiFeatures=new APIFunctionality(Product.find(),req.query).search().filter();

  //filtered query before pagination
const filteredQuery=apiFeatures.query.clone();
const productCount= await filteredQuery.countDocuments();
//calculating total count of products after search and filter but before pagination
const totalPages=Math.ceil(productCount / resultPerPage);
const page=Number(req.query.page) || 1; //converting query to number to show on site
// console.log("backend recieved page",req.query.page);
if(page > totalPages && productCount>0){
    return next(new handleError("Page not found", 404));
  }

  //apply pagination
  apiFeatures.pagination(resultPerPage);
  const products= await apiFeatures.query;//Product.find();  
 if(!products|| products.length===0){
   return next(new handleError("No products found", 404)); // if there are no products
  }
  res.status(200).json({
     success:true,
    products,
    productCount,
    totalPages,
    resultPerPage,
    currentPage:page,
    });
});

export const updateProduct= async(req, res, next) => {
   let product= await Product.findById(req.params.id )
   if(!product){
  return next(new handleError("product not found", 404));
   }
  let images=[];
if(typeof req.body.image==="String"){
    images.push(req.body.image)
}else if(Array.isArray(req.body.image)){
    images=req.body.image
}
if(images.length>0){
    for(let i=0;i<product.image.length;i++){
await cloudinary.uploader.destroy(product.image[i].public_id);
    }
    //upload new images
     const imagesLinks = [];
  for (let i = 0; i < image.length; i++) {
    const result = await cloudinary.uploader.upload(image[i], {
      folder: "products",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.image=imagesLinks;
}
 //let product= await Product.findById(req.params.id);
 // console.log(product);
 // if(!product){
    //return res.status(500).json({
     // success:false,
     // message:"product not found"
   // });
 // }
   product= await Product.findByIdAndUpdate(req.params.id, req.body,{
      new:true,
      runValidators:true,
   })
//if(!product){
 // return next(new handleError("product not found", 404));
   // return res.status(500).json({
      //success:false,
      //message:"product not found"
   // });
 // }
   res.status(200).json({
    success:true,
    product
   });
}
//DELETE PRODUCT
export const deleteProduct= async(req, res,next) => {
  //const product= await Product.findById(req.params.id);
    //if(!product){
    //return res.status(500).json({
     // success:false,
     // message:"product not found"
    //});
  //}
  const product= await Product.findByIdAndDelete(req.params.id);
   if(!product){
    return next(new handleError("product not found", 404));
    //
    return res.status(500).json({
      success:false,
      message:"product not found"
    });//
  }
   res.status(200).json({
    success:true,
    message:"product deleted successfully"
   });
}
// GETTING ONE PRODUCT DETAILS
export const getSingleProduct= async(req, res,next) => {
  const product= await Product.findById(req.params.id);
    if(!product){
      return next(new handleError("product not found", 404));
    
    return res.status(500).json({
      success:false,
      message:"product not found"
    });
  }
   res.status(200).json({
    success:true,
    product
   });
  
   
}
 // creating and updating review
export const createReviewForProduct= handleAsyncErrors(async(req, res,next) => {
  //console.log(req.body);
  //console.log(req.user.id);
  const{rating,comment,productId}=req.body;
  const review={
user:req.user._id,
name:req.user.name,
rating:Number(rating),
comment
}
const product = await Product.findById(productId);
//console.log(product);
const reviewExists=product.reviews.find(review=>review.user.toString
  ()===req.user.id);
  if(reviewExists){
product.reviews.forEach(review=>{
  if(reviewExists.user.toString()===req.user.id){
  review.rating=rating,
  review.comment=comment
}
})
  }else{
    product.reviews.push(review);
    //product.numOfReviews=product.reviews.length;
  }
  product.numOfReviews=product.reviews.length;
  let sum=0;
  product.reviews.forEach(review=>{
    sum+=review.rating;
  })
  product.ratings=product.reviews.length>0?sum/product.reviews.length:0
  await product.save({validateBeforeSave:false});
  res.status(200).json({
    success:true,
    product
  })

});

//getting reviews
export const getProductReviews= handleAsyncErrors(async(req, res,next) => {
  const product= await Product.findById(req.query.id);
  if(!product){
       return next(new handleError("product not found", 400));
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews
  })
})

//deleting review
export const deleteReview= handleAsyncErrors(async(req, res,next) => {
  const product= await Product.findById(req.query.productId);
   if(!product){
       return next(new handleError("product not found", 400));
  }
  const reviews=product.reviews.filter(review=>review._id.toString()
!==req.query.id.toString())
let sum=0;
reviews.forEach(review=>{
  sum+=review.rating
})
const ratings=reviews.length>0?sum/reviews.length:0;
const numOfReviews=reviews.length;
await Product.findByIdAndUpdate(req.query.productId,{
  reviews,
  ratings,
  numOfReviews
}, {
  new:true,
  runValidators:true
})
res.status(200).json({
  success:true,
  message:"review deleted succesfully"
})
//console.log(reviews);
})


//ADMIN-GET ALL PRODUCTS
export const adminGetProduct=handleAsyncErrors(async(req, res,next) => {
  const products=await Product.find();
  res.status(200).json({
    success:true,
    products
  })
})
