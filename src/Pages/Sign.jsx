import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import log from '../Assets/Images/log.avif'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import swal from 'sweetalert'
import { auth } from '../firebase'

const Sign = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const nevigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                // Signed up 
                const user = res.user;
                setIsLoggedIn(true);
                swal("Login successful!", "You clicked the button!", "success");
                nevigate('/');
                // ...
            })
            .catch((error) => {
                alert('fff');
                const errorCode = error.code;
                const errorMessage = error.message;
                swal("Login Unsuccessful!", "You clicked the button!", "error");
                // ..
            });
    };



    return (
        <div className="container mt-5">
            <div className='d-flex text-center d-flex  justify-content-center mt-3 align-items-center'>
                <div className='me-3'>
                    <h4 className='text-center mt-3 fs-2 '>Login </h4>
                    Or <span className='text-warning'>create an account</span>
                </div>
                <div className="logo d-flex  justify-content-center mt-3 align-items-center ">
                    <img src={log} alt="" className='img-fluid' style={{ width: '200px' }} />
                </div>
            </div>
            <div className="d-flex  align-items-center  justify-content-center ">
                <div className='form'>
                    <form className="mt-3" onSubmit={handleSubmit}>

                        <div className="inputForm mb-3">
                            <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
                            <input type="email" name='email' className="input" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="inputForm mb-3 ">
                            <input type="password" name='password' className="input" placeholder="Creat your Password" onChange={(e) => setPassword(e.target.value)} required />
                            <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                        </div>

                        <div className="flex-row">

                            <span className="span">Forgot password?</span>
                        </div>

                        <div className='w-100 text-center '>
                            <button className="button-submit btn-warn text-white rounded-5  px-4" >Sign Up</button>
                        </div>
                        <p className="p">Already have an account? <Link className="span text-decoration-underline text-primary " to="/">Sign In</Link>
                        </p>

                    </form>

                </div>
            </div>
        </div>
    )
}
export default Sign