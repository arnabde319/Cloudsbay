import React from "react";
import {Link} from 'react-router-dom';

const ProductListItem = ({product}) => {
    const {price,category,subs,shipping,color,brand,quantity,sold} = product;
    return (
        <ul className="list-group list-group-flush fs-5 fw-light">
            <li className="list-group-item mx-3 d-flex justify-content-between">
                <div>Price</div><div>₹ {price}</div>
            </li>
            {category && (
                <li className="list-group-item mx-3 d-flex justify-content-between">
                    <div>category</div>
                    <Link to={`/category/${category.slug}`}>
                        {category.name}
                    </Link>
                </li>
            )}
            {subs && (
                <li className="list-group-item mx-3 d-flex justify-content-between">
                    <div>Sub categories</div>
                    <div>
                        {subs.map((s) => {
                            return <>
                                <Link key='s._id' to={`/sub/${s.slug}`}>
                                    {s.name} 
                                </Link>
                                <span> </span>
                            </>
                        })}
                    </div>
                </li>
            )}
            <li className="list-group-item mx-3 d-flex justify-content-between">
                <div>Shipping</div><div>{shipping}</div>
            </li>
            <li className="list-group-item mx-3 d-flex justify-content-between">
                <div>Color</div><div>{color}</div>
            </li>
            <li className="list-group-item mx-3 d-flex justify-content-between">
                <div>Brand</div><div>{brand}</div>
            </li>
            <li className="list-group-item mx-3 d-flex justify-content-between">
                <div>Available</div><div>{quantity}</div>
            </li>
            <li className="list-group-item mx-3 d-flex justify-content-between">
                <div>Sold</div><div>{sold}</div>
            </li>
        </ul>
    )
}

export default ProductListItem;