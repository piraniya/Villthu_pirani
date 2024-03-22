const express = require('express');
const router  = express.Router(); 
const plantController = require('../controller/plantController'); 
// const { upload } = require('../middleware/multer.js');
const upload = require('../utils/multer')

// router.post('/plant/new', upload.single("image"), createPlant);
// router.route('/part/new').post(createPart);

 router.post('/new',upload.single("plantImage"), plantController.newPlants);
 router.get('/', plantController.getAllPlants);
 router.get('/:id', plantController.getPlantByID);
 router.put('/:id', plantController.updatePlant);
 router.delete('/:id', plantController.deletePlant);


module.exports = router;







