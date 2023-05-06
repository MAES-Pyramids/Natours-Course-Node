const express = require('express');
const toursController = require('./../controllers/toursController');
const reviewsRouter = require('./reviewsRoutes');
const authController = require('./../controllers/authController');
//-----------------------------------------//
const router = express.Router();
//-------------------Router----------------//
// Reviews Routes
router.use('/:tourID/reviews', reviewsRouter);
//--------------Aggregation----------------//
// Tours Statistics and Aggregation Routes
router.get('/tour-stats', toursController.getTourStats);
router.get(
  '/top_5_rated',
  toursController.aliasTopTours,
  toursController.getAllTours
);
router.get(
  '/monthly-plan/:year',
  authController.protect,
  toursController.getMonthlyPlan
);
//-------------------Alias----------------//
// Geospatial Routes
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
//----------------MAIN--------------------//
// Tours Routes
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
    toursController.uploadTourImages,
    toursController.resizeTourImages,
    toursController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    toursController.deleteTour
  );
//-----------------------------------------//
// router
//   .route('/:tourID/review')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewsController.createReview
//   );
//-----------------------------------------//
module.exports = router;
