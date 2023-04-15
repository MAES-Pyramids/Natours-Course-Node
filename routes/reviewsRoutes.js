const express = require('express');
const authController = require('./../controllers/authController');
const reviewsController = require('./../controllers/reviewsController');

//-------------------------------------------//
const router = express.Router({ mergeParams: true });
//------------------ROUTES-------------------//
router
  .route('/')
  .get(reviewsController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewsController.createReview
  );

router
  .route('/:id')
  .get(reviewsController.getReview)
  .patch(
    authController.protect,
    authController.restrictTo('user'),
    reviewsController.updateReview
  )
  .delete(
    authController.protect,
    authController.restrictTo('user'),
    reviewsController.deleteReview
  );
//-------------------------------------------//
module.exports = router;
