const Order=require("../models/orderModel");
const Product=require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError= require('../middleware/catchAsyncErrors');
const ApiFeatures = require("../utils/apifeatures");

// Create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    try {
        const {
            shippingInfo, 
            orderItems, 
            paymentInfo, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        } = req.body;

        const order = await Order.create({
            shippingInfo, 
            orderItems, 
            paymentInfo, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id, 
        });

        res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Order creation error:", error); 
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// get Single order details
exports.getSingleOrder= catchAsyncError(async(req,res,next)=>{

    const order= await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler("Order not found with this id", 404));
    }

    res.status(200).json({
        success:true,
        order,
    })
}); 

// get logged in user Orders -- logged in user can see his/her orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id }); // Fetch orders by user ID

    res.status(200).json({
        success: true,
        orders,
    });
});

// get all Orders -- Admin
exports.allOrders= catchAsyncError(async(req,res,next)=>{

    const orders= await Order.find(); 

    let totalAmount=0;

    orders.forEach(order=>{
       totalAmount+=order.totalPrice;
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    });
}); 

// update Order Status --Admin
exports.updateOrderstatus= catchAsyncError(async(req,res,next)=>{

    const order= await Order.findById(req.params.id); 

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    order.orderItems.forEach(async(o)=>{
        await updateStock(o.product, o.quantity);
    });

    order.orderStatus= req.body.status;

    if(req.body.status==="Delivered"){
        order.deliveredAt= Date.now();
    }

    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        order,
    });
}); 

async function updateStock(id, quantity){
const product= await Product.findById(id);

if(product.Stock<=0)product.Stock=0;
product.Stock-=quantity;

await product.save({validateBeforeSave:false});
}

// delete Order --Admin
exports.deleteOrder= catchAsyncError(async(req,res,next)=>{

    const order= await Order.findById(req.params.id); 

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success:true,
    });
}); 

