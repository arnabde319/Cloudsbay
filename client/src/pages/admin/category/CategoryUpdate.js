import React, { useState, useEffect } from "react";
import AdminNav from '../../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import { useSelector } from "react-redux";
import { updateCategory, getCategory } from '../../../functions/category';
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = (props) => {
    const {history,match} = props;

    const [name,setName] = useState('');
    const [loading,setLoading] = useState(false);

    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        loadCategory()
    },[]);

    const loadCategory = () => 
        getCategory(match.params.slug).then(c => setName(c.data.name));


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateCategory(match.params.slug, {name}, user.token)
        .then(res => {
            setLoading(false);
            setName('');
            toast.success(`Successfully updated "${res.data.name}"`);
            history.push('/admin/category');
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            if(err.response.status === 4000) 
                toast.error(err.response.data);
        });
    }

    return ( 
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'><AdminNav/></div>
                <div className='col-md-6'>
                    {loading? <h4>Loading...</h4> : <h4>Update Category</h4>}
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                    <hr/>
                </div>
            </div>
        </div>
    );
}


export default CategoryUpdate;