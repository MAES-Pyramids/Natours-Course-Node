const express = require('express');
const usersController = require('./../controllers/usersController');
const authController = require('./../controllers/authController');
//------------------------------------------//
const router = express.Router();
//------------------ROUTES------------------//
//-------------Users Routes-----------------//
router.post('/signup', authController.signup);
router.post('/login', authController.login);
//------------------------------------------//
router.post('/forgotPassword', authController.forgotPassword);
//---------------Admin Routes---------------//
router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createUser);

router
  .route('/:id')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);
//-----------------------------------------//
module.exports = router;
