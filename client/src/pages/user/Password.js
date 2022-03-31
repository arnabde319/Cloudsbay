import React, {useState} from 'react';
import UserNav from '../../components/nav/UserNav';
import {auth} from '../../firebase';
import { toast } from 'react-toastify'; 
import { updatePassword } from "firebase/auth";

const Password = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const user = auth.currentUser;
        await updatePassword(user, password)
        .then(() => {
            setLoading(false);
            setPassword('');
            toast.success('Password updates')
        })
        .catch(err => {
            setLoading(false);
            toast.error(err.message);
        })
    }

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='form-label'>Your Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)} className='form-control' placeholder='Enter new password' disabled={loading} vlaue={password}/>
                <button className='btn btn-primary mt-3' disabled={!password || password.length < 6 || loading}>Submit</button>
            </div>
        </form>
    );

    return ( 
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'><UserNav/></div>
                <div className='col'>
                    {loading ? <h4 className='danger'>Loading...</h4> : <h4>Password Update</h4>}
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    );
}

export default Password;