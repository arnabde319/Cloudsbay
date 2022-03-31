import React, {useState, useEffect} from 'react';
import { toast } from "react-toastify";
import {auth} from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import {useSelector} from 'react-redux';

const ForgotPassword = (props) => {
    const {history} = props;    
    const [email,setEmail] = useState('');
    const [loading,setLoading] = useState(false);

    const {user} =useSelector((state) => ({...state}));

    useEffect(() => {
        if(user && user.token) 
            history.push('/');
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        };
        await sendPasswordResetEmail(auth,email,config)
        .then(() => {
            setEmail('');
            setLoading(false);
            toast.success("Check your email for password reset link");
        })
        .catch((error) => {
            setLoading(false);
            toast.error(error.message);
            console.log('error msg in forgot pass', error.message);
        })

    }

    return (
        <div className='row'>
            <div className='col-md-6 offset-md-3 p-5'>
                {loading? <h4 className='text-danger'>Loading</h4> : <h4>Forgot Password</h4>}
                <form onSubmit={handleSubmit}>
                    <input type="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Type your email" autofocus/>
                    <br/>
                    <button className='btn btn-primary' disabled={!email}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
