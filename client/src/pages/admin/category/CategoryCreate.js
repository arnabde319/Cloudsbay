import React, { useState, useEffect } from "react";
import AdminNav from '../../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import { useSelector } from "react-redux";
import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
    const [name,setName] = useState('');
    const [loading,setLoading] = useState(false);
    const [categories,setCategories] = useState([]);
    const {user} = useSelector((state) => ({...state}));
    //searching
    //step 1
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => 
        getCategories().then(c => setCategories(c.data));


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({name},user.token)
        .then(res => {
            setLoading(false);
            setName('');
            toast.success(`Successfully created "${res.data.name}"`);
            loadCategories();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            if(err.response.status === 400) 
                toast.error(err.response.data);
        });
    }

    const handleRemove = async (slug) => {
        if(window.confirm("Delete?")) {
            setLoading(true);
            removeCategory(slug, user.token)
            .then(res => {
                setLoading(false);
                toast.error(`${res.data.name} deleted`);
                loadCategories();
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                if(err.response.status === 400) 
                    toast.error(err.response.data);
            })
        }
    }
    
    //step 4
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

    return ( 
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'><AdminNav/></div>
                <div className='col-md-6'>
                    {loading? <h4>Loading...</h4> : <h4>Create Category</h4>}
                    
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                    
                    {/* step 2 and step 3 */}
                    <LocalSearch keyword ={keyword} setKeyword={setKeyword}/>

                    <hr/>
                    {/* step 5 */}
                    {categories.filter(searched(keyword)).map((c) => (
                        <div className="alert alert-secondary mb-3" key={c._id}>
                            {c.name} <span onClick={() => handleRemove(c.slug)} className="btn btn-sm float-end"><DeleteOutlined className="text-danger"/></span>
                            <Link to={`/admin/category/${c.slug}`}>
                                <span className="btn btn-sm float-end"><EditOutlined className="text-info"/></span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default CategoryCreate;