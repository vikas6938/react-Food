import React from 'react'
import im01 from '../Assets/Images/Home/Vada.png'
import im1 from '../Assets/Images/burger.png'
import im2 from '../Assets/Images/Home/Burger.png'
import im3 from '../Assets/Images/Home/Cakes.png'
import im4 from '../Assets/Images/Home/Chinese.png'
import im5 from '../Assets/Images/Home/Chole_Bature.png'
import im6 from '../Assets/Images/Home/Dosa.png'
import im7 from '../Assets/Images/Home/Idli.png'
import im8 from '../Assets/Images/Home/Khichdi.png'
import im9 from '../Assets/Images/Home/North_Indian_4.png'
import im10 from '../Assets/Images/Home/Pancake.png'
import im11 from '../Assets/Images/Home/Home1/01.webp'
import im12 from '../Assets/Images/Home/Home1/02.webp'
import im13 from '../Assets/Images/Home/Home1/03.webp'
import im14 from '../Assets/Images/Home/Home1/04.webp'

import Header from './Header'

const Dashboard = ({ isLoggedIn, setIsLoggedIn, name }) => {
  return (
    <>
      <section class="popular">
        <div class="container border-bottom">
          <h1 class="fs-4 fw-bold mt-5">Popular Cuisines</h1>
          <div class="d-flex">
            {/* <div class="main-p">
          <img src={im1} alt="" className='w-100 ps-4 ' />
          </div> */}
          <div class="main-p">
              <img src={im01} alt="" className='w-100 ps-4 ' />
            </div>
            <div class="main-p">
              <img src={im2} alt="" className='w-100 ps-4 ' />
            </div>
            <div class="main-p">
              <img src={im3} alt="" className='w-100 ps-4 ' />
            </div>
            <div class="main-p">
              <img src={im4} alt="" className='w-100 ps-4 ' />
            </div>
            <div class="main-p">
              <img src={im5} alt="" className='w-100 ps-4 ' />
            </div>
            <div class="main-p">
              <img src={im6} alt="" className='w-100 ps-4 ' />
            </div>
            <div class="main-p">
              <img src={im7} alt="" className='w-100 ps-4 ' />
            </div>
            <div class="main-p">
              <img src={im8} alt="" className='w-100 ps-4 ' />
            </div>
            <div class="main-p">
              <img src={im9} alt="" className='w-100 ps-4 ' />
            </div>
            <div class="main-p">
              <img src={im10} alt="" className='w-100 ps-4 ' />
            </div>
            
          </div>
        </div>
      </section>

      <section className='offers'>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center  align-items-center ">
            <div className="col-4">
              <div className="d-flex justify-content-between align-items-center  align-items-center ">
                <img src={im1} alt="" className='w-100 py-4' />
              </div>
            </div>
            <div className="col-8">
              <div className="d-flex justify-content-between align-items-center ">
                <div className="col-4">
                  <img src={im11} alt="" className='w-100 ps-4 ' />
                </div>
                <div className="col-4 ">
                  <img src={im12} alt="" className='w-100  ps-4' />
                </div>
                <div className="col-4">
                  <img src={im13} alt="" className='w-100 ps-4 py-4' />
                </div>

              </div>
              <div className="d-flex justify-content-between align-items-center ">
                <div className="col-4">
                  <img src={im14} alt="" className='w-100 ps-4 ' />
                </div>
                <div className="col-4 ">
                  <img src={im13} alt="" className='w-100  ps-4' />
                </div>
                <div className="col-4">
                  <img src={im14} alt="" className='w-100 ps-4 py-4' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard
