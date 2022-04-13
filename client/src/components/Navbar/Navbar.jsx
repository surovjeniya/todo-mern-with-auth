import "./Navbar.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logOut, isLogin } = useContext(AuthContext);

  const logOutHandler = () => {
    logOut();
  };

  return (
    <nav>
      <div className="nav-wrapper navbar blue">
        <a href="/" className="brand-logo">
          Todo App
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            {isLogin ? (
              <button onClick={logOutHandler} className="btn">
                LogOut
              </button>
            ) : (
              <Link to="/login">
                <button className="btn">Log in</button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
