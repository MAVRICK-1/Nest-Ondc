import React from 'react';
import './style.css';

//importing diff produt images.
import img1 from '../../../assets/images/nestle_coffee_creamer.webp';
import img2 from '../../../assets/images/amul_cheese.jpg';
import img3 from '../../../assets/images/thumbnail-2.jpg';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const TopProducts = (props) => {
    return (
        <>
            <div className='topSelling_box'>
                <h3>{props.title}</h3>

                <div className='items d-flex align-items-center'>

                    <div className='img'>
                        <Link to="">
                            <img src={img1} className='w-100' />
                        </Link>
                    </div>


                    <div className='info px-3'>
                        <Link to=""><h4>Nestle Original Coffee-Mate Coffee Creamer</h4></Link>
                        <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                        <div className='d-flex align-items-center'>
                            <span className='price text-g font-weight-bold'>₹460.0</span> <span className='oldPrice'>₹506.8</span>
                        </div>
                    </div>
                </div>


                <div className='items d-flex align-items-center'>

                    <div className='img'>
                        <Link to="">
                            <img src={img2} className='w-100' />
                        </Link>
                    </div>


                    <div className='info px-3'>
                        <Link to=""><h4>Amul Cheese Block</h4></Link>
                        <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                        <div className='d-flex align-items-center'>
                            <span className='price text-g font-weight-bold'>₹128.85</span> <span className='oldPrice'>₹132.8</span>
                        </div>
                    </div>
                </div>


                <div className='items d-flex align-items-center'>

                    <div className='img'>
                        <Link to="">
                            <img src={img3} className='w-100' />
                        </Link>
                    </div>


                    <div className='info px-3'>
                        <Link to=""><h4>Fresh Produce Capsicums</h4></Link>
                        <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                        <div className='d-flex align-items-center'>
                            <span className='price text-g font-weight-bold'>₹50.04</span> <span className='oldPrice'>₹75.2</span>
                        </div>
                    </div>
                </div>




            </div>
        </>
    )
}

export default TopProducts;