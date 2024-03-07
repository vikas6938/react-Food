import './App.css';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Sign from './Pages/Sign';
import { useEffect, useState } from 'react';
import Header from './Pages/Header';
import Menu from './Pages/Menu';
import { app, auth } from './firebase';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Cart from './Pages/Cart';
import swal from 'sweetalert';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import UserProtected from './protectedRoute/UserProtected';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [LoggedInUser, setLoggedInUser] = useState(null);
  const [food, setFood] = useState([])
  const [cart, setCart] = useState([])
  const [name, setName] = useState("")

  const db = getFirestore(app)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true)
        setName(user.email)
        let userCart = JSON.parse(localStorage.getItem(user.email)) || [];
        setCart(userCart);
      } else {
        setIsLoggedIn(false);
        setName('')
        setCart([]);
      }
    })
  }, [])

  useEffect(() => {
    fetchList()
  }, [])

  const fetchList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Products'))
      var list = []
      querySnapshot.forEach((doc) => {
        var data = doc.data()
        list.push({ id: doc.id, ...data })
      });
      setFood(list)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  return (
    <>
      <BrowserRouter >
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} name={name} />
        <Routes>
          <Route path="/" element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} name={name} />} ></Route>
          <Route path="/menu" element={<Menu food={food} setFood={setFood} isLoggedIn={isLoggedIn} cart={cart} setCart={setCart} />} ></Route>
          <Route path="/login" element={
            <UserProtected>
              <Login setIsLoggedIn={setIsLoggedIn} />
            </UserProtected>
          } ></Route>
          <Route path="/signup" element={<Sign setIsLoggedIn={setIsLoggedIn} />} ></Route>
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} cart={cart} setCart={setCart} />
            </ProtectedRoute>
          } ></Route>
          <Route path='*' element={<h1 className='container text-white '>404 Page Error...</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
