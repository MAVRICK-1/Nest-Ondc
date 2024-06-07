import React, { useState } from 'react';
import './style.css';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Button } from '@mui/material';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleInputChange = (event) => {
        setEmail(event.target.value);
        setIsValidEmail(true); // Reset validation on input change
    };

    const handleSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setIsValidEmail(false);
            return; // Exit if email is not valid
        }
        // Email is valid, perform further actions (e.g., submit form)
    };

    return (
        <div className='newsLetterBanner'>
            <SendOutlinedIcon />
            <input
                type='email'
                placeholder='Your email address'
                value={email}
                onChange={handleInputChange}
            />
            <Button className='bg-g' onClick={handleSubmit}>Subscribe</Button>
            {!isValidEmail && <p style={{ color: 'red' }}>Please enter a valid email address</p>}
        </div>
    );
};

export default Newsletter;
