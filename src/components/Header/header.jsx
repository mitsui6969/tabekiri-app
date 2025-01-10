import { Link } from "react-router-dom";
import React from "react";
import './header.css';
import { colors } from "@mui/material";

export const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                {/* ロゴセクション */}
                <Link to="/" className="logo">LOGO</Link>


                {/* メニューセクション */}
                <details className="menu-details">
                    <summary className="menu-button">☰ Menu</summary>
                    <nav className="menu">

                        <ul>
                            <li>
                                <Link to="/" className="menu-link">Home</Link>
                            </li>
                            {/* <li>
                                <Link to="/login" className="menu-link">Login</Link>
                            </li> */}
                            <li>

                                <Link to="/map" className="menu-link">Map</Link>
                            </li>
                            <li>
                                <Link to="/QRcode" className="menu-link">QRコード</Link>
                            </li>
                            <li>
                                <Link to="/inquiry" className="menu-link">お問い合わせ</Link>
                            </li>
                            <li>
                                <Link to="/Logout" className="menu-link" style={{ color: 'red' }}>ログアウト</Link>
                            </li>
                        </ul>
                    </nav>
                </details>
            </div>
        </header>
    );
};

export default Header;
