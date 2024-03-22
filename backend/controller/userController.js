require("dotenv").config();
const asyncHandler=require('express-async-handler');
const generateToken= require('../utils/generateToken.js');
const User = require('../schema/userSchema.js')



//@desc   Auth user/settoken
//route POST/api/users/auth
//@access Public


const authUser = asyncHandler (async (req, res) =>{
const { email, password } = req.body;

const user = await User.findOne({ email});

if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        
        role: user.role,
        token: user.token,

        success:true, 
          message :"Welcome our world"
          
    });
} else {
    res.status(401);
    throw new Error('Invalid email or password');
}

});


//@desc   Register a new user
//route POST/api/users/auth
//@access Public


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber, userType } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Check if the registering user is an admin
    const isAdmin = userType === 'admin';

    const user = await User.create({
        name,
        email,
        password,
        phoneNumber 
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber, 
            success: true,
            message: "Welcome",
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//@desc   Logout user
//route POST/api/users/auth
//@access Public


const logoutUser = asyncHandler (async (req, res) =>{

    res.clearCookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message:'User logged out'});
    });


//@desc   Get User Profile
//route POST/api/users/profile
//@access Private


const getUserProfile = asyncHandler (async (req, res) =>{
    
const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
}
    res.status(200).json(user);
    });


//@desc   Update User Profile
//route Put/api/users/profile
//@access Public


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
       user.name = req.body.name || user.name;
       user.email = req.body.email || user.email;

       if (req.body.password) {
        user.password = req.body.password;
       }

       const updatedUser = await user.save();

       res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
       });
    } else {
        res.status(404);
        throw new Error('User not found')
    }

    res.status(200).json({ message:'Update user profile'});
    });

    
    module.exports = {
        authUser,
        registerUser,
        logoutUser,
        getUserProfile,
        updateUserProfile
    }




