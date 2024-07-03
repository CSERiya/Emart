import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import './ProductDetails.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData';
import { addItemsToCart } from "../../actions/cartAction";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { cartItems } = useSelector((state) => state.cart);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState(0);

  const increaseQuantity = () => {
    if (stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
    setStock(stock - quantity); 
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  useEffect(() => {
    if (product && product._id === id) {
      const cartItem = cartItems.find((item) => item.product === id);
      let currentStock = product.Stock;
      if (cartItem) {
        currentStock -= cartItem.quantity;
      }

      setStock(currentStock);
      setQuantity(currentStock > 0 ? 1 : 0);
    }
  }, [product, cartItems, id]);

  return (
    <>
      {loading ? (<Loader />) : (
        <>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className='productDetails'>
            <div>
              <Carousel>
                {product.images && product.images.map((item, i) => (
                  <Carousel.Item key={`${item.url}-${i}`}>
                    <img
                      className='CarouselImage'
                      src={item.url}
                      alt={`${i} Slide`}
                      style={{
                        height: 'auto',
                        maxWidth: '100%',
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            <div>
              <div className='detailsBlock-1'>
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className='detailsBlock-2'>
                <ReactStars {...options} /> <span> ({product.numOfReviews} Reviews)</span>
              </div>

              <div className='detailsBlock-3'>
                <h1>{`₹${product.price}`}</h1>
                <div className='detailsBlock-3-1'>
                  <div className='detailsBlock-3-1-1'>

<button className={quantity <= 1 || stock === 0 ? 'disabled' : ''} onClick={decreaseQuantity} 
                      disabled={quantity <= 1 || stock === 0}>-
                    </button>
                    <input readOnly value={quantity} type='number' />
                    <button className={quantity >= stock || stock === 0 ? 'disabled' : ''} onClick={increaseQuantity} 
                      disabled={quantity >= stock || stock === 0}>+
                    </button>
                  </div>
                  <button
                    className={stock < 1 ? 'disabled' : ''}
                    disabled={stock < 1}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={stock < 1 ? "redColor" : "greenColor"}>
                    {stock < 1 ? "OutOfStock" : "Available"}
                  </b>
                </p>
              </div>

              <div className='detailsBlock-4'>
                Description: <p>{product.description}</p>
              </div>

              <button className='submitReview'>Submit Review</button>
            </div>
          </div>

          <h3 className='reviewsHeading'>REVIEWS </h3>

          {product.reviews && product.reviews[0] ? (
            <div className='reviews'>
              {product.reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
            </div>
          ) : (
            <p className='noReviews'>No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;

