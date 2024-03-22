import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../assets/css/styles.css";


const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: ""
  });
  const { name, email, password, phoneNumber } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left"
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right"
    });

  const validatePhoneNumber = () => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!validatePhoneNumber()) {
      handleError("Please enter a valid 10-digit phone number");
      return phoneNumber.length === 10 && /^\d{10}$/.test(phoneNumber);
    }

   
    


    try {
      const { data } = await axios.post(
        "http://localhost:4009/api/users/",
        {
          ...inputValue
        },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      handleError("An error occurred during signup");
    }

    setInputValue({
      name: "",
      email: "",
      password: "",
      phoneNumber: ""
    });
  };

  return (
    <div className="customer">
    <div className="form_container" style={{  }}>
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit} style={{  }}>
        <div>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={handleOnChange}
          />
        </div>
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
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            placeholder="Enter your phone number"
            onChange={handleOnChange}
          />
        </div>
  
        <span style={{ display: "block", marginTop: "10px" }}>
          Already have an account? <Link to={"/login"}>Login</Link>
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
        <ToastContainer />
      </form>
      {/* <ToastContainer /> */}
    </div>
  </div>
  
  );
};

export default Signup;






