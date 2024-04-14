const express= require("express");
const { newOrder, myOrders, getSingleOrder, allOrders, updateOrderstatus, deleteOrder } = require("../controllers/orderController");

const {isAuthenticatedUser, authorizeRoles}= require("../middleware/auth");

const router=express.Router();

router.route('/order/new').post(isAuthenticatedUser,newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

router.route('/orders/me').get(isAuthenticatedUser ,myOrders);

router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);

router.route('/admin/update/order-status/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrderstatus);

router.route('/admin/order/delete/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

module.exports= router;