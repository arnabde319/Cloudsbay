import React, { useState, useEffect } from "react";
import AdminNav from '../../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from '../../../functions/product';
import { getCategories,getCategorySubs } from '../../../functions/category';
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from '@ant-design/icons';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';


const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ['Black','Brown','Silver','White','Blue'],
    brands: ['Apple','Samsung','Microsoft','Lenovo','Asus','Dell','HP','Realme','Redmi'],
    color: '',
    brand: ''    
};


const ProductUpdate = ({history, match}) => {
    //state
    const {user} = useSelector((state) => ({...state}));
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [categories, setCatagories] = useState([]);
    const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);
    
    const {slug} = match.params;

    useEffect(() => {
        loadProduct();
        loadCategories();
    },[])

    const loadProduct = () => {
        getProduct(slug)
        .then(p => {
            // console.log('product',p);
            //;oad single product
            setValues({...values, ...p.data});
            //load single product category subs
            getCategorySubs(p.data.category._id)
            .then(res => {
                setSubOptions(res.data); //on first load default subs
            })
            //prepare array of sub ids to show as default in ant design select
            let array = []
            p.data.subs.map(s => {
                array.push(s._id);
            })
            setArrayOfSubIds(prev => array) //required for ant design to work
        })
    }

    const loadCategories = () => 
        getCategories().then(c => setCatagories(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        values.subs = arrayOfSubIds;
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug, values, user.token)
        .then(res => {
            setLoading(false);
            toast.success(`${res.data.title} is updated`);
            history.push('/admin/products');
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
            toast.error(err.response.data.err);
        })
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();
        // console.log('clicked', e.target.value);
        setValues({...values, subs: []});

        setSelectedCategory(e.target.value);

        getCategorySubs(e.target.value)
        .then(res => {
            // console.log('SUB OPTIONS', res);
            setSubOptions(res.data);
        });

        //if user click back to original category
        //show its sub category in default
        if(values.category._id === e.target.value) {
            loadProduct();
        }

        //clear old sub-category when category is changed
        setArrayOfSubIds([]);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                {loading ? <LoadingOutlined className="h1"/> : <h4>Product Update</h4>}
                    <hr/>
                    {/* {JSON.stringify(values)} */}
                    <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
                    <ProductUpdateForm
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        values={values}
                        setValues={setValues}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        arrayOfSubIds={arrayOfSubIds}
                        setArrayOfSubIds={setArrayOfSubIds}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </div>
    );
}


export default ProductUpdate;