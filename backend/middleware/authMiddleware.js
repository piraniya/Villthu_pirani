// import jwt from 'jsonwebtoken';
const jwt=require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
// import asyncHandler from 'express-async-handler';
const User =require("../schema/userSchema")
// import User from '../schema/userSchema';


const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
           const decoded = jwt.verify(token, process.env.JWT_SECRET);

           req.user = await User.findById(decoded.userId).select('-password');

           next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token');

        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Admin 
const isAdmin = asyncHandler(async (req, res, next) => {
    const { email} = req.user;
    const adminUser = await User.findOne({ email });
    console.log(adminUser);
    if (adminUser.role !== "admin") {
    throw new Error("You are not an admin");
    } else {
    next();
    }
    });
  


  

module.export={ protect , isAdmin};
// export { protect };