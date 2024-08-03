import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import {Link, useParams} from 'react-router-dom';
import { Typography } from '@material-ui/core';
import SideBar from './Sidebar';
import { clearErrors } from '../../actions/productAction';
import { getOrderDetails } from '../../actions/orderAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';

const ProcessOrder = () => {
    const {order, error, loading}=useSelector((state)=>state.orderDetails);
    const dispatch= useDispatch();
    const { id } = useParams();
    const alert= useAlert();

const proceedToPayment= ()=>{};
useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <>
            <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (   
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                      </div>
                      </div>
                      </div>
                      <div>
                      <div className='orderSummary'>
        <Typography>Order Summary</Typography>
        <div>
            <div>
                <p>Subtotal:</p>
                <span>₹{12312}</span>
            </div>
            <div>
                <p>Shipping Charges:</p>
                <span>₹{276}</span>
            </div>
            <div>
                <p>GST:</p>
                <span>₹{333}</span>
            </div>
        </div>

        <div className='orderSummaryTotal'>
            <p>
                <b>Total:</b>
            </p>
            <span>₹{13123}</span>
        </div>
  
        <button onClick={proceedToPayment}>Proceed To Payment</button>
    </div>
</div>

        </div>
          )}
      </div>
      </div>
        </>
  )
}

export default ProcessOrder
