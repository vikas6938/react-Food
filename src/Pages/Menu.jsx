import React, { useEffect, useState } from 'react'
import Header from './Header'
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import { app, auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'



const Menu = ({ food, setFood, isLoggedIn, cart, setCart }) => {

    const [sortByPrice, setSortByPrice] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [originalList, setOriginalList] = useState([]);


    const nevigate = useNavigate()

    const db = getFirestore(app)



    useEffect(() => {
        const fetch = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Products'))
                const list = querySnapshot.docs.map((doc) => doc.data());
                setFood(list);
                setOriginalList(list);
            } catch (err) {
                console.error('Error fetching dishes:', err);
                alert('Error fetching dishes');
            }
        }
        fetch();
    }, [db, setFood])

    const handleSort = () => {
        const sorted = sortByPrice ? [...food].sort((a, b) => a.price - b.price) : [...food].sort((a, b) => b.price - a.price);
        setFood(sorted);
        setSortByPrice(!sortByPrice);
    }

    const HandleAdd = async (item) => {
        if (isLoggedIn) {
            const user = auth.currentUser;
            const userEmail = user.email;
            let userCart = JSON.parse(localStorage.getItem(userEmail)) || [];

            const existingItemIndex = userCart.findIndex((cartItem) => cartItem.id === item.id);
            console.log(existingItemIndex);

            if (existingItemIndex !== -1) {
                userCart[existingItemIndex].quantity += 1;
            } else {
                userCart.push({ ...item, quantity: 1 });
            }

            localStorage.setItem(userEmail, JSON.stringify(userCart));

            setCart([...userCart]);
        } else {
            swal("Login First!", "You clicked the button!", "error");
            nevigate('/login');
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim() === '') {
            setFood(originalList); // Reset to the original list
        } else {
            const filteredList = originalList.filter((item) => item.name.toLowerCase().includes(query));
            setFood(filteredList);
        }
    };

    console.log(cart);
    return (
        <>
            <section className='menu position-relative  '>
                <div className="bradcamp py-3 ">
                    <div className="position-relative z-3 container" style={{ zIndex: '2' }}>
                        <span className='text-dark fw-semibold '>Home / Offers</span>
                        <h1 className='text-dark fw-bold fs-5 '>Restaurants With Great Offers Near Me</h1>
                    </div>
                </div>
                <div className="bg-overlap position-absolute w-100 h-100   start-0  top-0 "></div>
            </section>
            <div className="container">
                <div className="text-end mt-3 d-flex justify-content-between align-items-center    w-100 ">
                    <div className="mb-3 mt-3 col-6">
                        <input type="text" className="form-control" placeholder="Search Swiggy Food" value={searchQuery} onChange={handleSearch} />
                    </div><i class="bi bi-search"></i>
                    <div>
                        <button className='btn btn-success  px-4  fs-6 text-white fw-bold ' onClick={handleSort}>
                            Sort {sortByPrice ? <i className="ms-2 fa-regular fa-circle-up text-white"></i> : <i className="ms-2 text-white fa-regular fa-circle-down"></i>}
                        </button>
                    </div>
                </div>
                <div className="menu-list  ">
                    <div className="row ">
                        {
                            food && food.map((item, id) => {
                                return (
                                    <div className="col-3 mt-4" key={id}>
                                        <div className="card  " >
                                            <div className='border-rad'>
                                                <img src={item.image} className="card-img-top p-3 border-rad " alt="..." height={280} />
                                            </div>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between  align-items-center">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <p className='card-title text-warning fw-bold'>$ {item.price}</p>
                                                </div>
                                                <p className="card-text">{item.disc}</p>
                                                <div className="d-flex justify-content-between  align-items-center ">
                                                    <a href="#" className="btn btn-warn text-white fw-bold " onClick={() => HandleAdd(food[id])}>Add to Cart</a>
                                                    <div className="d-flex justify-content-between  align-items-center">
                                                        <i class="fa-solid fa-motorcycle text-success me-2"></i>
                                                        <span>Arrived 25 min</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu

