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
router.patch('/resetPassword/:token', authController.resetPassword);
//------------------------------------------//
router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);
//------------------------------------------//
router.patch('/UpdateMe', authController.protect, usersController.UpdateMe);
router.delete('/DeleteMe', authController.protect, usersController.DeleteMe);
//---------------Admin Routes---------------//
router
  .route('/')
  .get(usersController.getAllUsers)
  .post(authController.restrictTo('super_Admin'), usersController.createUser);

router
  .route('/:id')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);
//-----------------------------------------//
module.exports = router;
