import React from 'react';
import { Route } from 'react-router-dom';
import auth from '../services/authService';

const ProtectedRoute = (props) => {
    return ( <Route path={path} render={props => {
        if(!auth.get)
    }} /> );
}
 
export default ProtectedRoute;