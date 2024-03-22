const express = require('express');
const router = express.Router();

const {
  getUsers,
 
  getUserById,
  createUser,
  deleteUser,
  updateUser,
 
} = require('../controller/adminController');

router.route('/users').get(getUsers);
router.route('/users/:id').get(getUserById);
router.route('/users').post(createUser)
router.route('/user/new/:id').put(updateUser);
router.route('/user/:id').delete(deleteUser);


module.exports = router;

