import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import './ProductDetails.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/Loader/Loader.js'

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id],loading,error); 

  const options={
    edit:false,
    color: "rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size: window.innerWidth< 600 ? 20:25,
    value:product.ratings,
    isHalf:true,
}

  return (
    <>
    {loading? (<Loader/>) : (  <>
    <div className='productDetails'>
        <div>
          <Carousel>
      {product.images &&
        product.images.map((item, i) => (
          <Carousel.Item key={item.url}>
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
    <button>-</button>
    <input value='1' type='number'/>
    <button>+</button>
  </div>
  <button>Add to Cart</button>
</div>
<p>
  Status:
  <b className={product.Stock<1? "redColor":"greenColor"}>
    {product.Stock<1?"OutOfStock":"Available"}
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

      {product.reviews && product.reviews[0]? (<div className='reviews'>
        {product.reviews && product.reviews.map((review)=> <ReviewCard review={review}/>)}
      </div>
      ): (<p className='noReviews'>No Reviews Yet</p>)};
      </>
  )};
  </>)};

export default ProductDetails;

