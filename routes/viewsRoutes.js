const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const AppError = require('./../utils/appError');

//-------------------------------------------//
const router = express.Router();
//-------------Views Routes-----------------//
router.use(authController.isLogin);

router.get('/', viewsController.getOverview);
router.get('/tour/:slug', authController.protect, viewsController.getTour);
router.get('/signup', viewsController.getSignupForm);
router.get('/login', viewsController.getLoginForm);

// Handling invalid Routes
router.all('*', (req, res, next) => {
  next(
    new AppError(
      `Sorry, the page you are trying to access is not available`,
      404
    )
  );
});
//-----------------------------------------//
module.exports = router;
