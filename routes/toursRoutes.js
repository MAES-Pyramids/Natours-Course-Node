const express = require('express');
const toursController = require('./../controllers/toursController');
const reviewsRouter = require('./reviewsRoutes');
const authController = require('./../controllers/authController');

//-------------------------------------------//
const router = express.Router();
//------------------ROUTES-------------------//
router
  .route('/top_5_rated')
  .get(toursController.aliasTopTours, toursController.getAllTours);

router.route('/tour-stats').get(toursController.getTourStats);

router.route('/monthly-plan/:year').get(toursController.getMonthlyPlan);
// ------------------------------------------//
router.use('/:tourID/reviews', reviewsRouter);

router
  .route('/')
  .get(authController.protect, toursController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    toursController.createTour
  );

router
  .route('/:id')
  .get(authController.protect, toursController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    toursController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    toursController.deleteTour
  );

// router
//   .route('/:tourID/review')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewsController.createReview
//   );
//-------------------------------------------//
module.exports = router;
