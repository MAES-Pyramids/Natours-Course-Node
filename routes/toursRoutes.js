const express = require('express');
const toursController = require('./../controllers/toursController');
//-------------------------------------------//
const router = express.Router();
//------------------ROUTES------------------//

// router.param('id', toursController.checkID);
router
  .route('/top_5_rated')
  .get(toursController.aliasTopTours, toursController.getAllTours);

router
  .route('/')
  .get(toursController.getAllTours)
  .post(toursController.createTour);

router
  .route('/:id')
  .get(toursController.getTour)
  .patch(toursController.updateTour)
  .delete(toursController.deleteTour);
//-------------------------------------------//
module.exports = router;
