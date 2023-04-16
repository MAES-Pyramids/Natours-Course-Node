const express = require('express');
const toursController = require('./../controllers/toursController');
const reviewsRouter = require('./reviewsRoutes');
const authController = require('./../controllers/authController');

//-------------------------------------------//
const router = express.Router();
//------------------ROUTES-------------------//
router.use('/:tourID/reviews', reviewsRouter);
router.get('/tour-stats', toursController.getTourStats);
router.get(
  '/top_5_rated',
  toursController.aliasTopTours,
  toursController.getAllTours
);
router.get(
  '/monthly-plan/:year',
  authController.protect,
  authController.restrictTo('admin', 'lead-guide', 'guide'),
  toursController.getMonthlyPlan
);
//--------------Geospatial Routes-------------//
router.get(
  '/tours-within/:distance/center/:latlng/unit/:unit',
  authController.protect,
  toursController.getToursWithin
);
router.get(
  '/distances/:latlng/unit/:unit',
  authController.protect,
  toursController.getDistances
);
// ------------------------------------------//
router
  .route('/')
  .get(toursController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    toursController.createTour
  );

router
  .route('/:id')
  .get(toursController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    toursController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
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
