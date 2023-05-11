import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import '../Button/Button.css';

export const Navbar = () => {
    // useNavigate to change the page url when called
    const navigate = useNavigate(); 

    const handleLogout = () => {
      // Remove saved data from sessionStorage
      sessionStorage.removeItem("token");
      navigate("/login");
    };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <p>Plattegrond</p>
        </div>
        <div className="nav-elements">
          <ul>
            <li>
                <button className={`button ${sessionStorage.getItem('token') ? 'logout' : null}`} role="button" onClick={() => handleLogout()}>{sessionStorage.getItem('token') ? 'Logout' : 'Login'}</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
};