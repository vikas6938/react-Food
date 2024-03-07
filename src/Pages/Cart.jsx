import React, { useEffect, useState } from 'react'
import Header from './Header'
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore'
import { app, auth } from '../firebase'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'


const Cart = ({ cart, setCart, isLoggedIn }) => {

    const [data, setData] = useState(cart)
    const [subtotal, setSubtotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [noRecord, setNoRecord] = useState(false)
    const nevigate = useNavigate()

    // console.log(data);

    useEffect(() => {
        const calculateTotals = () => {
            let total = 0;
            if (Array.isArray(data)) {
                data.forEach((item) => {
                    total += item.price * item.quantity;
                });
            }
            setSubtotal(total);
            setGrandTotal(total); 
        };

        calculateTotals();
    }, [data]);

    useEffect(()=>{
        if(data.length === 0 ){
            setNoRecord(true)
        }else{
            setNoRecord(false)
        }
    }, [data])


 

    const db = getFirestore(app)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userEmail = user.email;
                let userCart = JSON.parse(localStorage.getItem(userEmail)) || [];
                setData(userCart);
            } else {
                setData([]);
            }
        });

        return () => unsubscribe();
    }, []);


    const handleDelete = async (index) => {
        if (isLoggedIn) {
            const user = auth.currentUser;
            const userEmail = user.email;
            let userCart = JSON.parse(localStorage.getItem(userEmail)) || [];

            userCart.splice(index, 1);

            localStorage.setItem(userEmail, JSON.stringify(userCart));

            setData([...userCart]);
        } else {
            swal("Login First!", "You clicked the button!", "error");
            nevigate('/login');
        }
    };

    const handleDecrement = (index) => {
        const newData = [...data];
        newData[index].quantity++;
        setData(newData);
        updateLocalStorage(newData);
    };

    const handleIncrement = (index) => {
        const newData = [...data];
        if (newData[index].quantity > 1) {
            newData[index].quantity--;
            setData(newData);
            updateLocalStorage(newData);
        }
    };

    const updateLocalStorage = (newData) => {
        if (isLoggedIn) {
            const user = auth.currentUser;
            const userEmail = user.email;
            localStorage.setItem(userEmail, JSON.stringify(newData));
        }
    };


    return (
        <>
            <section className='menu position-relative  '>
                <div className="bradcamp py-5 ">
                    <div className="position-relative z-3 container " style={{ zIndex: '2' }}>
                        <h1 className='text-dark fw-bold '>Secure Checkout</h1>
                        <span className='text-dark fw-semibold '>Home / Your Cart</span>
                    </div>
                </div>
                <div className="bg-overlap position-absolute w-100 h-100   start-0  top-0 "></div>
            </section>
            <section className='d-flex container mt-3 '>
                <div className="col-8">
                    <table className='table table-hover mb-0 table-rounded table-bordered p-3 text-center align-middle shadow '>
                        <thead className='table-light'>
                            <tr>
                                <th className='text-dark col-5'>Items</th>
                                <th className='text-dark col'>Price</th>
                                <th className='text-dark col'>Qty</th>
                                <th className='text-dark col'>Sub-Total</th>
                                <th className='text-dark col'>Choice</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {
                                noRecord ? (
                                    <tr>
                                        <td className='text-center fw-bold pe-0 py-3 fs-4 text-danger' colSpan={5}>
                                            cart is Empty</td>
                                    </tr>
                                ) : (
                                    data && data.map((item, index) => {
                                        // console.log(item);
                                        return (
                                            <tr key={index}>
                                                <td className='d-flex justify-content-between align-items-center py-3'>
                                                    <div className="pro-img me-3">
                                                        <img src={item.image} alt="" className='image-fluid bor-rad' width={120} height={120} />
                                                    </div>
                                                    <div className="title-cart">
                                                        <h6 className='text-start fw-bold mb-0 clr-gr'>{item.name}</h6>
                                                        <p className='font-sz mb-2 text-justify'>{item.disc}</p>
                                                    </div>
                                                </td>
                                                <td className=''>{item.price}/-</td>
                                                <td className=''>
                                                    <div className="quantity-field d-flex   " >
                                                        <button className="value-button decrease-button"  onClick={()=>handleIncrement(index)}>-</button>
                                                        <div className="number">{item.quantity}</div>
                                                        <button className="value-button increase-button" onClick={()=>handleDecrement(index)}>+</button>
                                                    </div>
                                                </td>
                                                <td className=''>{item.quantity * item.price}/-</td>
                                                <td className=''>
                                                    <button className="btn btn-danger " onClick={() => handleDelete(index)} >
                                                        <i class="fa-solid fa-trash-can text-white"></i>
                                                    </button></td>
                                            </tr>
                                        )
                                    })
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-4 ms-3">
                    <div className="cart-billing px-5 py-4 border-rad-header bg-light shadow ">
                        <h3 className='text-center border-bottom pb-2  m-0 clr-gr title'>Order-Summary </h3>
                        <div className="bill mt-3 px-3 border-bottom pb-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <span className='fs-5 fw-bold clr-gr'>Sub-Total</span>
                                <span className='fs-5'>{subtotal}/-</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <span className='fs-5 fw-bold clr-gr'>Delivery Charges</span>
                                <span className='fs-5'><span className='linethrough ms-2 lightslategrey text-decoration-line-through '>70/-</span></span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-3 px-3 border-bottom pb-3">
                            <span className='fs-5 fw-bold clr-gr'>Grand Total</span>
                            <span className='fs-4 fw-bold'>{grandTotal}/- </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart
