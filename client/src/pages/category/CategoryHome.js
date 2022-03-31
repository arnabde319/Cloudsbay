import React, { useEffect, useState } from 'react';
import { getCategory } from '../../functions/category';
import {Link} from 'react-router-dom';
import ProductCard from '../../components/cards/ProductCard';

const CategoryHome = ({match}) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const {slug} = match.params;

    useEffect(() => {
        setLoading(true)
        getCategory(slug)
        .then(res => {
            // console.log(JSON.stringify(c.data,null,4));
            setCategory(res.data.category);
            setProducts(res.data.products);
            setLoading(false);
        })
    },[])

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    {loading ? (
                        <h4 className='text-center p-3 mb-5 display-6' style={{'backgroundColor': '#EFEFEF'}}>
                            Loading...
                        </h4>
                    ) : (
                        <h4 className='text-center p-3 mb-5 display-6' style={{'backgroundColor': '#EFEFEF'}}>
                            {products.length} Product(s) in "{category.name}" category
                        </h4>
                    )}
                </div>
            </div>
            <div className='row mx-4'>
                {products.map((p) => <div className='col-lg-3' key={p._id}>
                    <ProductCard product={p}/>
                </div>)}
            </div>
        </div>
        
    )
}

export default CategoryHome;
