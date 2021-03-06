import React, {useEffect, useState} from 'react';
import { getProducts,getProductsCount } from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { Pagination } from 'antd';

const BestSeller = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [productsCount, setProductsCount] = useState(0);

    useEffect(() => {
        loadAllProducts();
    }, [page])

    useEffect(() => {
        getProductsCount().then(res => setProductsCount(res.data));
    }, [])

    const loadAllProducts = async () => {
        setLoading(true);
        //sort, order,limit
        await getProducts('sold','desc', page)
        .then(res => {
            setProducts(res.data);
            // console.log(res.data);
            setLoading(false);
        });
    }


    return (
        <>
            <div className='container'>
                { loading ? <LoadingCard count={4}/> : (
                    <div className='row'>
                    {products.map((product) => (
                        <div className='col-md-3' key={product._id}>
                            <ProductCard product={product}/>
                        </div>
                    ))}
                    </div>
                )}                
            </div>
            <div className='row'>
                <nav className='col-md-4 offset-4 text-center pt-5'>
                    <Pagination 
                        current={page} 
                        total = {(Math.ceil(productsCount/4))*10} 
                        onChange = {(value) => setPage(value)}
                    />
                </nav>
            </div>
        </>
    );
};

export default BestSeller;