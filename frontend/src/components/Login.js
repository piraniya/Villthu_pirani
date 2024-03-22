import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import '../assets/css/styles.css' 


const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-top",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      // position: "bottom-top",
    });

    

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4009/api/users/auth",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
   const { success, message, role } = data;
   

  if (success) {
    handleSuccess(message);
   
      if (inputValue.email) {
        console.log(inputValue)
          localStorage.setItem('email', inputValue.email );
      } setTimeout(()=>{
        window.location="/";
      },1000);
    
  } else {
    handleError(message);
  }
} catch (error) {
  // Handle error
}

setInputValue({
  ...inputValue,
  email: "",
  password: "",
});
};

  return (

    
    <div className="customer">
    <div className="form_container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <span style={{ display: "block", marginTop: "10px" }}>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
  
        <button
          type="submit"
          style={{
            backgroundColor: "brown",
            color: "white",
            padding: "10px 70px",
            marginLeft:"70px",
            marginTop:"20px",
            borderRadius: "5px",
            border: "none",
          }}
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
    </div>
    
  );
};

export default Login;