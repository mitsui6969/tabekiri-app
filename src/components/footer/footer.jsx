import React from 'react';
import './footer.css'
import { Link } from 'react-router-dom';

export const Footer = () => {
    
    return(
        <div className="background-bar">
            <Link to='/QRcode'>
                <div className="circle-button">
                    <img src="https://via.placeholder.com/60x60.png?text=QR" alt="QR Code" />
                </div>
            </Link>
        </div>
    )
}

export default Footer;