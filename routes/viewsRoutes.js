const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const AppError = require('./../utils/appError');

//-------------------------------------------//
const router = express.Router();
//-------------Views Routes-----------------//
router.use(viewsController.alerts);

router.get('/', authController.isLogin, viewsController.getOverview);
router.get('/tour/:slug', authController.isLogin, viewsController.getTour);
router.get('/signup', authController.isLogin, viewsController.getSignupForm);
router.get(
  '/resetPass',
  authController.isLogin,
  viewsController.getResetPassForm
);
router.get('/login', authController.isLogin, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);
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
