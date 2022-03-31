import React from "react";
import {Route} from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadingToredirect from "./LoadingToRedirect";

const UserRoute = ({children,...rest}) => {
    const {user} = useSelector((state) => ({...state}));
    return user && user.token ? (
        <Route {...rest}/>
    ) : (
        <LoadingToredirect/>
    );
}

export default UserRoute;
