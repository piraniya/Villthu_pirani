const express = require('express');
const router  = express.Router(); 
const fertilizersController = require('../controller/fertilizersController'); 
// const { upload } = require('../middleware/multer.js');
const upload = require('../utils/multer')


 router.post('/new',upload.single("image"), fertilizersController.newFertilizers);
 router.get('/', fertilizersController.getAllFertilizers);
 router.get('/:id', fertilizersController.getFertilizerByID);
 router.put('/:id', fertilizersController.updateFertilizer);
 router.delete('/:id', fertilizersController.deleteFertilizer);
//  router.put('/:id/add-stock', fertilizerController.addStockToFertilizer);




module.exports = router;