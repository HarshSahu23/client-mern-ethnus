import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    country: undefined,
    img: "https://www.flaticon.com/free-icon/user_456212",
    city: undefined,
    phone: undefined,
  });

  const [confirmPass, setConfirmPass] = useState({
    confirmPassword: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handlePassChange = (e) => {
    setConfirmPass((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      // console.log("confirmed password = ", confirmPass.confirmPassword);
      // console.log("created password = ", credentials.password);
      // console.log(confirmPass.confirmPassword == credentials.password);

      if (confirmPass.confirmPassword == credentials.password) {
        const res = await axios.post("/auth/register", credentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/login");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: new Error("passwords do not match, please enter again"),
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="password"
          placeholder="Create Password"
          id="password"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="text"
          placeholder="Confirm Password"
          id="confirmPassword"
          onChange={handlePassChange}
          className="rInput"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="number"
          placeholder="Phone Number"
          id="phone"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="text"
          placeholder="Country"
          id="country"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="text"
          placeholder="City"
          id="city"
          onChange={handleChange}
          className="rInput"
        />
        <button disabled={loading} onClick={handleClick} className="rButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
