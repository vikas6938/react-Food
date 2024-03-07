import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const UserProtected = (props) => {
    const token = localStorage.getItem('token')
    if(token){
        swal("Please Sign Out First!", "You clicked the button!", "error");
        return <Navigate    to="/" replace/>
    }
    return <>{props.children}</>;
}

export default UserProtected
