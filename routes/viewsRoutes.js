const express = require('express');
const viewsController = require('./../controllers/viewsController');
const AppError = require('./../utils/appError');

//-------------------------------------------//
const router = express.Router();
//-------------Views Routes-----------------//
router.get('/', viewsController.getOverview);
router.get('/tour/:slug', viewsController.getTour);
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
