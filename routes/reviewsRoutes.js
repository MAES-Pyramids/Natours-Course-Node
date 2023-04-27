const express = require('express');
const authController = require('./../controllers/authController');
const reviewsController = require('./../controllers/reviewsController');
//-------------------------------------------//
const router = express.Router({ mergeParams: true });
//------------------ROUTES-------------------//
router.use(authController.protect);
router
  .route('/')
  .get(reviewsController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewsController.setTourUserIds,
    reviewsController.createReview
  );

router
  .route('/:id')
  .get(reviewsController.getReview)
  .patch(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    reviewsController.updateReview
  )
  .delete(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    reviewsController.deleteReview
  );
//-------------------------------------------//
module.exports = router;
