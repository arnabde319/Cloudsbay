import React from "react";
import ModalImage from 'react-modal-image';
import { useDispatch } from "react-redux";
import laptop from '../../images/laptop.jpg';
import {toast} from 'react-toastify';
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';

const ProductCartInCheckout = ({p}) => {

    const colors = ['Black','Brown','Silver','White','Blue'];
    let dispatch = useDispatch();

    const handleColorChange = (e) => {
        let cart = [];
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.map((product, i) => {
                if(product._id === p._id) {
                    cart[i].color = e.target.value;
                }
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            });
        }
    }

    const handleQuantityChange = (e) => {

        let count = e.target.value < 1 ? 1 : e.target.value;

        if(count > p.quantity) {
            toast.error(`Max available quantity: ${p.quantity}`);
            return;
        }

        let cart = [];
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.map((product, i) => {
                if(product._id === p._id) {
                    cart[i].count = count;
                }
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            });
        }
    }

    const handleRemove = () => {

        let cart = [];
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.map((product, i) => {
                if(product._id === p._id) {
                    cart.splice(i,1)
                }
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            });
        }
    }

    return (
        <tr>
            <td>
                <div style={{width: '80px'}}>
                    {p.images.length ? (
                        <ModalImage small={p.images[0].url} large={p.images[0].url}/>
                    ) : (
                        <ModalImage small={laptop} large={laptop}/>
                    )}
                </div>
            </td>
            <td style={{verticalAlign: 'middle'}}>{p.title}</td>
            <td style={{verticalAlign: 'middle'}}>₹ {p.price}</td>
            <td style={{verticalAlign: 'middle'}}>{p.brand}</td>
            <td style={{verticalAlign: 'middle'}}>
                <select name='color' onChange={handleColorChange} className='form-control'>
                    {p.color ? <option value={p.color}>{p.color}</option> : <option>Select</option>}
                    {colors
                        .filter((c) => c !== p.color)
                        .map((c) => (<option value={c} key={c}>{c}</option>))}
                </select>
            </td>
            <td className="text-center" style={{width: '140px',verticalAlign: 'middle'}}>
                <input type='number' className="form-control" value={p.count} onChange={handleQuantityChange}/>
            </td>
            <td style={{verticalAlign: 'middle'}} className="text-center">{p.shipping === "Yes" ? <CheckCircleOutlined className='text-success'/> : <CloseCircleOutlined className='text-danger'/>}</td>
            <td style={{verticalAlign: 'middle'}} className="text-center">
                <CloseOutlined onClick={handleRemove} className='text-danger pointer'/>
            </td>
        </tr>  
    );
}

export default ProductCartInCheckout;