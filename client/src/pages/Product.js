import React,{ useState, useEffect } from 'react';
import { getProduct, productStar, getRelated } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';


const Product = ({match}) => {
    const [product, setProduct] = useState({});
    const [star,setStar] = useState(0);
    const [related,setRelated] = useState([]);
    const {slug} = match.params;

    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        loadSingleProduct();
    },[slug])

    useEffect(() => {
        if(product.ratings && user) {
            let existingRatingObject = product.ratings.find((ele) => (ele.postedBy.toString() === user._id.toString()));
            existingRatingObject && setStar(existingRatingObject.star);
        }   
    })

    const loadSingleProduct = () => {
        getProduct(slug).then(res => {
            setProduct(res.data);
            //load related products
            getRelated(res.data._id)
                .then(response => {
                    setRelated(response.data);
                })
        });
    }

    const onStartClick = (newRating, name) => {
        setStar(newRating);
        // console.table(newRating, name);
        productStar(name, newRating, user.token)
        .then(res => {
            console.log('rating clicked',res.data);
            loadSingleProduct(); //if you want to show rating in real time
        });
    }

    return (
        <div className='container-fluid'>
            <div className='row pt-4'>
                <SingleProduct product={product} onStartClick={onStartClick} star={star}/>
            </div>
            <div className='row py-5'>
                <hr/>
                <h3 className='text-center'>Related Products</h3>
                <hr/>
                    {related.length ? related.map((r) => (
                        <div key={r._id} className='col-lg-3 mb-3'>
                            <ProductCard product={r}/>
                        </div>
                    )) : 
                    <h5 className='text-center mb-3'>No related products</h5>}
                <hr/>
            </div>
        </div>
    )
}

export default Product;