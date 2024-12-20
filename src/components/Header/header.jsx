import { Link } from "react-router-dom";
import React from "react";
import './header.css'

export const Header = () => {
    return(
        <div className="header">
            <div className="header-component">
                <div>
                <Link to='/' className="logo">LOGO</Link>
                </div>

                <details>
                    <summary className="menue">menu</summary>
                    <nav className="navigates">
                        <ul>
                            <li>
                                <Link to={'/'} className="link">Home</Link>
                            </li>
                            <li>
                                <Link to={'/login'} className="link">Login</Link>
                            </li>
                            <li>
                                <Link to={'/bluebutton'} className="link">map</Link>
                            </li>
                            <li>
                                <Link to={'/Inquiry'} className='link'>お問い合わせ</Link>
                            </li>
                        </ul>
                    </nav>
                </details>
            </div>
        </div>
    )
}

export default Header;