const OrderModel = require("../models/orderModel");
const ProductModel = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await OrderModel.create({
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
});



// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id).populate(
      "user",
      "name email"
    );
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      order,
    });
  });




  // get loggined user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await OrderModel.find({ user: req.user._id });
  
    res.status(200).json({
      success: true,
      orders,
    });
  });


  // get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await OrderModel.find();
  
    let totalAmount = 0;
  
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  });
  


  // update Order Status -- Admin
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHander("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
  
  async function updateStock(id, quantity) {
    const product = await ProductModel.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }
  


  // delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    await order.remove();
  
    res.status(200).json({
      success: true,
    });
  });
  