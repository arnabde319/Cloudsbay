import React from "react";
import { Card } from 'antd';
import laptop from '../../images/laptop.jpg';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({product, handleRemove}) => {
    //destructure
    const {title, description, images, slug} = product;
    return (
        <Card 
            hoverable 
            cover={<img alt='' src={images && images.length ? images[0].url : laptop}/>} 
            style={{height: '200'}} 
            className='m-2' 
            actions={[
                <Link to={`/admin/product/${slug}`}>
                    <EditOutlined className="text-info"/>       
                </Link>,
                <DeleteOutlined onClick={() => handleRemove(slug)} className="text-danger"/>
            ]}
        >
            <Meta title={title} description={`${description && description.substring(0,30)}...`} />
        </Card>
    )
}

export default AdminProductCard;