import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const handleRegClick = async (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link
          to="/"
          style={{ color: "red", textDecoration: "none", fontSize: 20 }}
        >
          <span className="logo">MakeYourTrip ©</span>
        </Link>
        {user ? (
          user.username
        ) : (
          <div className="navItems">
            <button onClick={handleRegClick} className="navButton">
              Register
            </button>
            <button onClick={handleClick} className="navButton">
              User Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
