import React from "react";
import { Select } from 'antd';

const { Option } = Select;

const ProductUpdateForm = (props) => (
    <form onSubmit = {props.handleSubmit}>

        <div className="form-group mt-3">
            <label className="form-label">Title</label>
            <input type='text' name='title' className="form-control" value={props.values.title} onChange={props.handleChange} />
        </div>

        <div className="form-group">
            <label className="form-label">Description</label>
            <textarea name='description' className="form-control" value={props.values.description} onChange={props.handleChange} />
        </div>

        <div className="form-group">
            <label className="form-label">Price</label>
            <input type='number' name='price' className="form-control" value={props.values.price} onChange={props.handleChange} />
        </div>

        <div className="form-group">
            <label className="form-label">Shipping</label>
            <select name='shipping' value={props.values.shipping === 'Yes' ? 'Yes' : 'No'} className="form-control" onChange={props.handleChange}>
                <option value='No'>No</option>
                <option value='Yes'>Yes</option>
            </select>
        </div>

        <div className="form-group">
            <label className="form-label">Quantity</label>
            <input type='number' name='quantity' className="form-control" value={props.values.quantity} onChange={props.handleChange} />
        </div>

        <div className="form-group">
            <label className="form-label">Color</label>
            <select name='color' value={props.values.color} className="form-control" onChange={props.handleChange}>
                {props.values.colors.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>

        <div className="form-group">
            <label className="form-label">Brand</label>
            <select name='brand' value={props.values.brand} className="form-control" onChange={props.handleChange}>
                {props.values.brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
        </div>

        <div className='form-group'>
            <label className="form-label">Category</label>
            <select name='category' value={props.selectedCategory ? props.selectedCategory : props.values.category._id} className="form-control" onChange={props.handleCategoryChange}>
                {
                    props.categories.length>0 && props.categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))
                }
            </select>
        </div>
        
        <div>
            <label className="form-label">Sub Categories</label>
            <Select mode="multiple" value={props.arrayOfSubIds} allowClear style={{ width: '100%' }} placeholder="Please select" onChange={value => props.setArrayOfSubIds(value)}>
                {props.subOptions.length && 
                    props.subOptions.map((s) => <Option key={s._id} value={s._id}>{s.name}</Option>)}
            </Select>
        </div>
        

        <button className="btn btn-outline-info mt-3 mb-5">Save</button>
    </form>
)

export default ProductUpdateForm;