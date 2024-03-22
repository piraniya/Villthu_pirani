const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../schema/userSchema');
const Plant = require('../schema/plantSchema');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Get user profile by ID
// @route   GET /api/admin/users/profile/:id
// @access  Private/Admin
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
  
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { name,email,password } = req.body;

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


  const updateUser = (req, res) => {
    if (req.body.name == null || req.body.email == null) {
      return res.status(400).send({
        message: "Name and email are required fields."
      });
    }
  
    const id = req.params.id;
  
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update user with id=${id}. User not found.`
          });
        } else {
          res.send({ message: "User updated successfully." });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + id
        });
      });
  };
  



// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  try {
    await user.deleteOne();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500);
    throw new Error('Error deleting user');
  }
});


module.exports = {
  getUsers,
  getUserProfile,
  getUserById,
  createUser,
  updateUser, 
  deleteUser
};
