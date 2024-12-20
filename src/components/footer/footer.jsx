import React from 'react';
import './footer.css'
import { Link } from 'react-router-dom';

export const Footer = () => {
    
    
    return(
        <div>
            <div className="background-bar">
                <Link to='/QRcode'>
                    <div className="circle-button">
                        <img src="https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_qrcode_1.png" alt="QR Code" />
                    </div>
                </Link>
            </div>
            <div className="under-bar">
                <Link to='/QRcode'>
                    <div className="coupon-button">
                        <img src="https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_coupon_3.png" alt="AAA" />
                    </div>
                </Link>
            </div>
            <div className="Post-bar">
                <Link to='/CreatPost'>
                    <div className="Post-button">
                        <img src="https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_coupon_3.png" alt="AAA" />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Footer;