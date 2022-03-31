import React from "react";
import { Select } from 'antd';

const { Option } = Select;

const ProductCreateForm = (props) => (
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
            <select name='shipping' className="form-control" onChange={props.handleChange}>
                <option>Please Select</option>
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
            <select name='color' className="form-control" onChange={props.handleChange}>
                <option>Please Select Color</option>
                {props.values.colors.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>

        <div className="form-group">
            <label className="form-label">Brand</label>
            <select name='brand' className="form-control" onChange={props.handleChange}>
                <option>Please Select Brand</option>
                {props.values.brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
        </div>

        <div className='form-group'>
            <label className="form-label">Category</label>
            <select name='category' className="form-control" onChange={props.handleCategoryChange}>
                <option>Please select</option>
                {
                    props.values.categories.length>0 && props.values.categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))
                }
            </select>
            </div>
        {props.showSub && (  
        <div>
            <label className="form-label">Sub Categories</label>
            <Select mode="multiple" allowClear style={{ width: '100%' }} placeholder="Please select" value={props.values.subs} onChange={value => props.setValues({...props.values, subs: value})}>
                {props.subOptions.length && 
                    props.subOptions.map((s) => <Option key={s._id} value={s._id}>{s.name}</Option>)}
            </Select>
        </div>
        )}

        <button className="btn btn-outline-info mt-3 mb-5">Save</button>
    </form>
)

export default ProductCreateForm;