const express = require('express');
const usersController = require('./../controllers/usersController');
const authController = require('./../controllers/authController');
//------------------------------------------//
const router = express.Router();
//-------------Users Routes-----------------//
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
//------------------------------------------//
router.use(authController.protect);

router.get('/Me', usersController.getMe, usersController.getUser);
router.patch('/UpdateMe', usersController.UpdateMe);
router.delete('/DeleteMe', usersController.DeleteMe);
router.patch('/updatePassword', authController.updatePassword);
//---------------Admin Routes---------------//
router
  .route('/')
  .get(authController.restrictTo('admin'), usersController.getAllUsers)
  .post(authController.restrictTo('super_admin'), usersController.createUser);

router.use(authController.restrictTo('admin'));
router
  .route('/:id')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);
//-----------------------------------------//
module.exports = router;
