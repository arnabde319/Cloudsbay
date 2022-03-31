import React, {useEffect, useState} from "react";
import {Route} from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadingToredirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({children,...rest}) => {
    const {user} = useSelector((state) => ({...state}));
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if(user && user.token) {
            currentAdmin(user.token)
            .then(res => {
                console.log('current admin res', res);
                setOk(true);
            })
            .catch((err) => {
                console.log("ADMIN ROUTE ERR", err);
                setOk(false);
            });
        }
    }, [user])

    return ok ? (
        <Route {...rest}/>
    ) : (
        <LoadingToredirect/>
    );
}

export default AdminRoute;
