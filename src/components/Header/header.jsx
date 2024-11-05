import { Link } from "react-router-dom";
import './header.css'

export const Header = () => {
    return(
        <div className="header">
            <header>
                <div>
                <Link to='/' className="logo">LOGO</Link>
                </div>

                <div>
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
                    </ul>
                </nav>
                </div>
            </header>
        </div>
    )
}

export default Header;