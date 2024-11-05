import { Link } from "react-router-dom";
import './header.css'

export const Header = () => {
    return(
        <div className="header">
            <header>
                <div>
                <Link to='/' className="logo">LOGO</Link>
                </div>

                <details>
                    <summary className="menue">menue</summary>
                    <nav className="navigates">
                        <ul>
                            <li>
                                <Link to={'/'} className="link">Home</Link>
                            </li>
                            <li>
                                <Link to={'/login'} className="link">Login</Link>
                            </li>
                            <li>
                                <Link to={'/bluebutton'} className="link">BlueBotton</Link>
                            </li>
                            <li>
                                <Link to={'/map'} className='link'>map</Link>
                            </li>
                        </ul>
                    </nav>
                </details>
            </header>
        </div>
    )
}

export default Header;