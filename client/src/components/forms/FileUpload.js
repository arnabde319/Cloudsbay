import React from "react";
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { Avatar, Badge } from "antd";

const FileUpload = ({values,setValues,setLoading}) => {
    const {user} = useSelector((state) => ({...state}));

    const fileUploadAndResize = (e) => {
        // console.log(e.target.files);
        //resize 
        //send back to server to upload to cloudinary
        //set url to images[] in the parent component -ProductCreate
        let files = e.target.files;
        let allUploadedFiles = values.images;

        if(files) {
            setLoading(true);
            for(let i=0; i<files.length; i++) {
                Resizer.imageFileResizer(files[i], 720,720,'JPEG', 100, 0, (uri) => {
                    axios.post(`${process.env.REACT_APP_API}/uploadimages`,{image: uri}, {
                        headers: {
                            authtoken: user? user.token : ''
                        }
                    })
                    .then(res => {
                        console.log('IMAGE UPLOAD RES DATA', res.data.public_id);
                        setLoading(false);
                        allUploadedFiles.push(res.data);
                        setValues({...values, images: allUploadedFiles});
                    })
                    .catch(err => {
                        setLoading(false);
                        console.log('cloudinary upload error ', err);
                    })
                },'base64');
            }
        }  
    }

    const handleImageRemove = (public_id) => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API}/removeimages`,{public_id},{
            headers: {
                authtoken: user ? user.token: '',
            }
        })
        .then((res) => {
            setLoading(false);
            const {images} = values;
            let filteredimages = images.filter((item) => {
                return item.public_id !== public_id
            });
            setValues({...values, images: filteredimages});
        })
        .catch(err => {
            
            console.log(err);
            setLoading(false);
        })
    }

    return (
        <>  
            <div className="input-group mb-3">
                <input type='file' className='form-control' multiple accept='images/*' onChange={fileUploadAndResize}/> 
                <label className="input-group-text">Upload images</label>
            </div>
            {values.images && values.images.map((image,index) => ( 
                <Badge className="avatar-item me-3" key={image.public_id} onClick={() => handleImageRemove(image.public_id)} count={'X'} style={{cursor: 'pointer'}}>
                    <Avatar shape="square" src={image.url} size={100}/>
                </Badge>
            ))}
        </>
    )
}

export default FileUpload;
