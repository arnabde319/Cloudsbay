import React, { useState, useEffect } from "react";
import AdminNav from '../../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import { useSelector } from "react-redux";
import {  getSub, updateSub } from '../../../functions/sub';
import { getCategories } from '../../../functions/category';
import CategoryForm from "../../../components/forms/CategoryForm";

const SubUpdate = (props) => {
    const {match,history} = props;

    const [name,setName] = useState('');
    const [loading,setLoading] = useState(false);
    const [categories,setCategories] = useState([]);
    const [parent,setParent] = useState('');

    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        loadCategories();
        loadSub();
    });

    const loadCategories = () => 
        getCategories().then(c => setCategories(c.data));

    const loadSub = () => 
        getSub(match.params.slug).then(s => {
            setName(s.data.name);
            setParent(s.data.parent);
        });


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateSub(match.params.slug, {name,parent}, user.token)
        .then(res => {
            setLoading(false);
            setName('');
            toast.success(`Successfully updated "${res.data.name}"`);
            history.push('/admin/sub')
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            if(err.response.status === 400) 
                toast.error(err.response.data);
        });
    }

    return ( 
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'><AdminNav/></div>
                <div className='col-md-6'>
                    {loading? <h4>Loading...</h4> : <h4>Update Sub Category</h4>}
                    
                    <div className='form-group'>
                        <label className="form-label">Parent Category</label>
                        <select name='category'  value={parent} className="form-control" onChange={e => setParent(e.target.value)}>
                            <option>Please select</option>
                            {
                                categories.length>0 && categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))
                            }
                        </select>
                    </div>
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                </div>
            </div>
        </div>
    );
}


export default SubUpdate;
