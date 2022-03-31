import React,{ useState } from "react";
import {Card,Tabs, Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import laptop from '../../images/laptop.jpg';
import ProductListItem from './ProductListItem';
import StarRating from 'react-star-ratings';
import RatingModal from "../modal/RatingModal";
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const {TabPane} = Tabs;

//this is children componenet of product
const SingleProduct = ({product,onStartClick,star}) => {
    const [tooltip, setTooltip] = useState('Click to add')

    //redux
    const {user, cart} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();
    
    //history
    const history = useHistory();

    const {title, images, description, _id} = product;

    const handleAddToCart = () => {
        
        //create cart array
        let cart=[];
        if(typeof window !== 'undefined') {
            //if cart is in localstorage GET it
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            //pusg new product to cart
            cart.push({
                ...product,count: 1 
            });
            //remove duplicate
            let unique=_.uniqWith(cart, _.isEqual);
            //save to local storage
            localStorage.setItem('cart', JSON.stringify(unique));
            //show tooltip
            setTooltip('Added');

            //add to redux state
            dispatch({
                type: 'ADD_TO_CART',
                payload: unique
            })

            //show cart items in side drawer
            dispatch({
                type: 'SET_VISIBLE',
                payload: true
            })
        }
    }

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user.token)
        .then(res => {
            // console.log('ADDED TO WISHLIST', res.data);
            toast.success('Added to wishlist');
            history.push('/user/wishlist');
        })
    }
    
    return (
        <>
            <div className="col-lg-6 px-4">
                <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.length ? 
                        images.map((i) => (
                        <div key={i.public_id} className='productImg'>
                            <img src={i.url} alt=''/>
                        </div>
                    )) :
                        (<div className='productImg'>
                            <img src={laptop} alt=''/>
                        </div>)
                    }
                </Carousel>

            </div>
            <div className="col-lg-6 px-4">
                <div className="bg-light rounded-3">
                    <div className="container-fluid py-2">
                        <h1 className="display-6 fw-bold">{title}</h1>
                    </div>
                </div>

                {product && product.ratings && product.ratings.length>0 
                    ? showAverage(product) 
                    : <div className="text-center pt-3 pb-3">No ratings yet</div> }

                <Card
                    actions = {[
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart}>
                                <ShoppingCartOutlined className="text-danger"/><br/>Add To Cart
                            </a>
                        </Tooltip>,
                        <a onClick={handleAddToWishlist}>
                            <HeartOutlined className="text-info"/><br/>Add to Wishlist
                        </a>,
                        <RatingModal>
                            <StarRating 
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStartClick}
                                isSelectable={true}
                                starRatedColor='red'
                            />
                        </RatingModal>
                    ]}
                >
                    <ProductListItem product={product}/> 
                </Card>
                <Tabs type='card'>
                    <TabPane tab='Description' key='1' className="px-2">
                        {description && description}
                    </TabPane>
                    <TabPane tab='More' key='2' className="px-2">
                        Call us on xxxx xxx xxxx to learn more about this product
                    </TabPane>
                </Tabs>
                <hr/>
            </div>
        </>
    )
}

export default SingleProduct;