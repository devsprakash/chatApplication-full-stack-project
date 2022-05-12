
 import React, { useState, useEffect } from "react";
 import axios from "axios";
 import '../css/register.css'
 import { useNavigate, Link } from "react-router-dom";
 import logo from "../assets/logo.svg";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
 import { registerRoute } from "../utils/APIRoutes";
 
 const Register = () => {
   const navigate = useNavigate();
   const toastOptions = {
     position: "bottom-right",
     autoClose: 8000,
     pauseOnHover: true,
     draggable: true,
     theme: "dark",
   };
   const [values, setValues] = useState({
     username: "",
     email: "",
     password: "",
     confirmPassword: "",
   });
 
   useEffect(() => {
     if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
       navigate("/");
     }
   }, []);
 
   const handleinput = (event) => {
     setValues({ ...values, [event.target.name]: event.target.value });
   };
 
   const handleValidation = () => {
     const { password, confirmPassword, username, email } = values;
     if (password !== confirmPassword) {
       toast.error(
         "Password and confirm password should be same.",
         toastOptions
       );
       return false;
     } else if (username.length < 3) {
       toast.error(
         "Username should be greater than 3 characters.",
         toastOptions
       );
       return false;
     } else if (password.length < 8) {
       toast.error(
         "Password should be equal or greater than 8 characters.",
         toastOptions
       );
       return false;
     } else if (email === "") {
       toast.error("Email is required.", toastOptions);
       return false;
     }
 
     return true;
   };
 
   const handlesumbit = async (event) => {
     event.preventDefault();
     if (handleValidation()) {
       const { email, username, password } = values;
       const { data } = await axios.post(registerRoute, {
         username,
         email,
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
              <h2>CHAT<span className='span_tag'>APP</span></h2>
            </div>
            <input type="text" placeholder='Enter your username' name='username'
             onChange={handleinput}
             />

            <input type="text" placeholder='Enter your email' name='email'
            onChange={handleinput}
            />

            <input type="password" placeholder='Enter your password' name='password'
            onChange={handleinput}
            />

            <input type="password" placeholder='Enter your confirmpassword' name='confirmpassword'
            onChange={handleinput}
            />
          <button type='sumbit'>Create an account</button>

          <span>Already have an account <Link to='/login'>Login</Link></span>
        </form>
    </formcontainer>
    <ToastContainer />
    </>
  )
}

export default Register