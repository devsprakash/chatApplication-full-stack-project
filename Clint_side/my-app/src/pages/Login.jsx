import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/login.css'
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

const  Login  = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleinput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handlesumbit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };


  return (

    <> 
    <formcontainer>
        <form onSubmit={handlesumbit}>
            <div className='brand'>
              <img src={logo} alt='logo' />
              <h2>LOGIN</h2>
            </div>
            <input type="text" placeholder='Enter your username' name='username'
             onChange={handleinput}
             />

            
            <input type="password" placeholder='Enter your password' name='password'
            onChange={handleinput}
            />

          <button type='sumbit'>Create an account</button>

          <span>Did't have an account <Link to='/register'>Register</Link></span>
        </form>
    </formcontainer>
    <ToastContainer />
    </>
  )
}

export default Login