import React from 'react'
import logo from '../Assets/Images/logo.png'
import delivery from '../Assets/Images/delivery.png'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import swal from 'sweetalert'

const Header = ({ isLoggedIn, setIsLoggedIn, name }) => {

  const nevigate = useNavigate()

  const handleLogout = () => {
    signOut(auth)
      .then((res) => {
        setIsLoggedIn(false)
        localStorage.removeItem('token')
        swal("Login Out succesfull!", "You clicked the button!", "success");
      })
      .catch((err) => {
        console.log('error')
      })
  }



  return (
    <header className=' position-sticky top-0 bg-white  w-100 shadow  ' style={{ zIndex: '555' }}>
      <div className=' container '>
        <div className="d-flex justify-content-between align-items-center ">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo">
              <a href="/">
                <img src={logo} alt="logo" className='img-fluid' width={80} height={120} />
              </a>
            </div>
            <div className='ms-3'>
              <h1 className='fs-6 border-2 border-dark border-bottom'>Other <span className='text-warning'>Live in Aadajan </span><i class="fa-solid fa-chevron-down"></i></h1>

            </div>
          </div>
          <div className="menu ">
            <ul className='d-flex justify-content-between align-items-center fw-semibold fs-5 m-0 p-0'>
              <li className='ms-5 '><Link to="/"><i class="fa-solid fa-hand-peace me-2"></i>Offer</Link></li>
              <li className='ms-5 '><Link to="/menu"><i class="fa-solid fa-bars me-2"></i>Menu</Link></li>
              <li className='ms-5 '><Link to=""><i class="fa-solid fa-life-ring me-2"></i>Help</Link></li>


              {
                isLoggedIn ? (
                  <Link onClick={handleLogout} className='ms-5 '><i class="fa-solid fa-person-running me-2"></i>Sign Out</Link>
                ) : (
                  <Link to="/login" className='ms-5 '><i class="fa-solid fa-user"></i> Sign In</Link>
                )
              }

              <li className='ms-5 me-2'><Link to="/cart"><i class="fa-solid fa-heart me-2"></i>Cart</Link></li>
              
            </ul>

            {/* <div className="menu-right d-flex justify-content-between align-items-center col-4"> */}

            {/* <div className="delivery">
              <img src={delivery} alt="" className='img-fluid' width={55} />
            </div>
            <div className="order-content fw-bold ">
              <span className=' d-block text-theme fs-6'>Delivery order</span>
              <span className=' d-block text-danger fs-5'>+91-9913138325</span>
            </div> */}

          </div>
        </div>

      </div>
      {/* </div> */}
    </header>
  )
}

export default Header
