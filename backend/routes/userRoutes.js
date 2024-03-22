const express = require('express');
const router = express.Router();

 const protect=require('../middleware/authMiddleware')

const userController = require('../controller/userController'); 
router.post('/auth', userController.authUser);






router.post('/',userController.registerUser);
router.post('/auth', userController.authUser);
router.post('/logout',userController.logoutUser);
router.route('/profile').get(userController.getUserProfile).put(userController.updateUserProfile);


module.exports = router;

