import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import ProductCartInCheckout from '../components/cards/ProductCartInCheckout'
import {userCart} from '../functions/user'


const Cart = ({history}) => {
    const {cart, user} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + (nextValue.count * nextValue.price);
        }, 0)
    }

    const saveOrderToDb = () => {
        userCart(cart, user.token)
        .then(res => {
            console.log('CART POST RES', res)
            if(res.data.ok)
                history.push('/checkout');
        })
        .catch((err) => {
            console.log('cart save err', err)
        })      
    }

    const saveCashOrderToDb = () => {
        dispatch({
            type: 'COD',
            payload: true
        })
        userCart(cart, user.token)
        .then(res => {
            console.log('CART POST RES', res)
            if(res.data.ok)
                history.push('/checkout');
        })
        .catch((err) => {
            console.log('cart save err', err)
        })      
    }

    const showcartItems = () => {
        return (<table className='table table-striped table-hover'>
            <thead>
                <tr>
                    <th scope='col'>Image</th>
                    <th scope='col'>Title</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>brand</th>
                    <th scope='col'>Color</th>
                    <th scope='col'>Count</th>
                    <th scope='col'>Shipping</th>
                    <th scope='col'>Remove</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((p) => <ProductCartInCheckout key={p._id} p={p}/>)}
            </tbody>
        </table>
        )
    }

    return (
        <div className='container-fluid pt-2'>
            <div className='row my-3 px-4'>
                <h4>Cart / {cart.length} product</h4>
            </div>
            <div className='row'>
                <div className='col-md-8'>
                    {!cart.length ? (
                        <p>No products in cart. <Link to='/shop'>Continue Shopping</Link></p>
                    ) : (
                        showcartItems()
                    )}
                </div>
                <div className='col-md-4'>
                    <h4>Order summary</h4>
                    <hr/>
                    <p>products</p>
                    {cart.map((c,i) => (
                        <div key={i}>
                            <p>{c.title} x {c.count} = ₹{c.price*c.count}</p>
                        </div>
                    ))}
                    <hr/>
                    Total: <b>₹{getTotal()}</b>
                    <hr/>
                    {
                        user ? (
                            <>
                            <button onClick={saveOrderToDb} className='btn btn-sm btn-primary mt-2' disabled={!cart.length} >Checkout</button>
                            <br/>
                            <button onClick={saveCashOrderToDb} className='btn btn-sm btn-warning mt-2' disabled={!cart.length} >Pay Cash on Delivery</button>
                            </>
                        ) : (
                            <button className='btn btn-sm btn-outline-primary mt-2'>
                                <Link to={{
                                    pathname: '/login',
                                    state: {from: 'cart'}
                                }}>Login to checkout</Link>
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Cart;