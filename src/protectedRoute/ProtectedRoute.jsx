import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import swal from 'sweetalert';

const ProtectedRoute = (props) => {
    const token = localStorage.getItem('token')
    if(!token){
        swal("Please Sign In First!", "You clicked the button!", "error");
        return <Navigate to="/" replace/>
    }
    return <>{props.children}</>;

}

export default ProtectedRoute

