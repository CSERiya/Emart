import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import './ProductDetails.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData';
import { addItemsToCart } from "../../actions/cartAction";
import {
Dialog,
DialogActions,
DialogContent,
DialogTitle,
Button,
}
from '@material-ui/core'
import { Rating } from '@material-ui/lab';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { cartItems } = useSelector((state) => state.cart);

  const {success, error:reviewError}= useSelector(
    (state)=> state.newReview
  )

  const options = {
    size: 'medium',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
     className: 'responsiveRating',
  };

  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState(0);
  const[open, setOpen]= useState(false);
  const[rating, setRating]= useState(0);
  const[comment, setComment]= useState("");

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

  const submitReviewToggle = ()=>{
open? setOpen(false): setOpen(true);
  };

  const reviewSubmitHandler = ()=>{
    const myForm= new FormData();
    myForm.set('rating', rating);
    myForm.set('comment', comment);
    myForm.set('productId', id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

      if (reviewError) {
        alert.error(reviewError);
        dispatch(clearErrors());
      }

      if(success){
        alert.success('Review Submitted Successfully');
        dispatch({type: NEW_REVIEW_RESET});
      }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

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
                <Rating {...options} /> <span className='detailsBlock-2-span'> ({product.numOfReviews} Reviews)</span>
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

              <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
            </div>
          </div>

          <h3 className='reviewsHeading'>REVIEWS </h3>

          <Dialog aria-labelledby='simple-dialog-title'
          open={open}
          onClose={submitReviewToggle}>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className='submitDialog'>
              <Rating 
              onChange={(e)=> setRating(e.target.value)}
               value={rating}
              size="large"
              />

<textarea className='submitDialogTextArea' cols='30' rows='5' value={comment} 
onChange={(e)=> setComment(e.target.value)}></textarea>

            </DialogContent>
<DialogActions>
  <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
  <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>
</DialogActions>
          </Dialog>

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

