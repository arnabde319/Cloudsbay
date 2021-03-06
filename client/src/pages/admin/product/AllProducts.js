import React, {useState, useEffect} from "react";
import AdminNav from '../../../components/nav/AdminNav';
import { getProductsByCount, removeProduct } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    //redux
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(10)
        .then(res => {
            setProducts(res.data);
            setLoading(false);   
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }

    const handleRemove = (slug) => {
        let answer = window.confirm('Delete?');
        if(answer) {
            removeProduct(slug, user.token)
            .then(res => {
                loadAllProducts();
                toast.error(`${res.data.title} is deleted`);
            })
            .catch(err => {
                if(err.response.status === 400) toast.error(err.message.data);
                console.log(err);
            })
        }
    }

    return ( 
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'><AdminNav/></div>
                <div className='col-md-10'>
                    {loading ? (<h4>Loading...</h4>) : (<h4>All Products</h4>)}
                    <div className="row">
                    {products.map((product) => (
                        <div className="col-md-3" key={product._id}>
                            <AdminProductCard product ={product} handleRemove={handleRemove}/>
                        </div>
                    ))}
                    </div>
                   
                </div>
            </div>
        </div>
    );
}


export default AllProducts;