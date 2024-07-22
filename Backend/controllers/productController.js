const Product=require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError= require('../middleware/catchAsyncErrors');
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary").v2;


// Create product -- Admin can access only
exports.createProduct = catchAsyncError(async (req, res, next) => {
    let images = [];
    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }
    req.body.images = imagesLink;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

// Get all Products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
  
     const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();
  
    let products = await apiFeature.query.clone();
  
    let filteredProductsCount = products.length;
  
    apiFeature.pagination(resultPerPage);
  
    products = await apiFeature.query;
  
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  });

  // Get All Product (Admin)
  exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });




// Update Product -- Accessible by Admin only
exports.updateProduct= catchAsyncError(async(req,res,next)=>{
let product= await Product.findById(req.params.id);

if(!product){
    return next(new ErrorHandler("Product not found",404));
}

product= await Product.findByIdAndUpdate(req.params.id,req.body,{new:true, 
    runValidators:true,
useFindAndModify:false
});

res.status(200).json({
    success:true,
    product
})
});

// Delete Product -- Admin

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product= await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    
    await product.deleteOne();
    
    res.status(200).json({
        success:true,
       message:"Product deleted successfully"
    })
    }); 

    // Get single product details
    exports.getProductDetails= catchAsyncError(async(req,res,next)=>{

        const product= await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        success:true,
      product,
    });
    });

    // Create New Review or Update the review
exports.createProductReview= catchAsyncError(async(req,res,next)=>{
    const {rating, comment, productId}= req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    };

    const product=await Product.findById(productId);

const isReviewed= product.reviews.find(
    (rev)=>rev.user.toString()===req.user._id.toString());

    if(isReviewed){
product.reviews.forEach((rev)=>{
    if(rev.user.toString()===req.user._id.toString())
    (rev.rating=rating),
(rev.comment=comment);
});
    }
    else{
        product.reviews.push(review);
        product.numOfReviews= product.reviews.length
    }

    // overall or average rating-
    let avg=0;
    product.reviews.forEach((rev)=>{
        avg+=rev.rating
    })
    
    product.ratings=avg/product.reviews.length; 

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    })
});

// Get All Reviews of a Product
exports.getProductReviews= catchAsyncError(async(req,res,next)=>{

    const product= await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success:true,
        reviews: product.reviews,
    });
});

// Delete Review
exports.deleteReview= catchAsyncError(async(req,res,next)=>{
    const product= await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    // Storing the reviews which we don't want to delete
    const reviews= product.reviews.filter((rev)=> rev._id.toString() !== req.query.id.toString());

    let avg=0;
    reviews.forEach((rev)=>{
        avg+=rev.rating
    });

    const ratings=avg/reviews.length; 

    const numOfReviews= reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
    });
}); 