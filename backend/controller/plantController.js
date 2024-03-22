// const cloudinary = require('cloudinary').v2;
const addPlants = require("../schema/plantSchema");
const cloudinary = require("../utils/cloudinary");
const multer = require("../utils/multer")
// const cloudinary = require('cloudinary').v2;


// post plants
const newPlants = async (req, res, next) => {
  try {
    // Validate request
    if (!req.body.plantName) {
      return res.status(400).send({ message: "Plant name cannot be empty!" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Viluthu",
    });

    // Create a Plant object
    const plantSchema = new addPlants({
      plantImage: {
        public_id: result.public_id,
        url: result.secure_url
    }, // Use result.secure_url from Cloudinary
      plantName: req.body.plantName,
      soilType: req.body.soilType,
      fertilizerType: req.body.fertilizerType,
      botanicalName: req.body.botanicalName,
      description: req.body.description, // Fixed typo in property name
      categories: req.body.categories
    });

    // Save the plant object to the database
    const savedPlantSchema = await plantSchema.save();
    res.status(200).json(savedPlantSchema);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get plants
const getAllPlants = (req, res) => {

  addPlants.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// update plants
const updatePlant = (req, res) => {
  console.log(req.body);
  if (req.body.plantName == null) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;

  addPlants.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};


// delete plants
const deletePlant = (req, res) => {
  const id = req.params.id;

  addPlants.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });


};

const getPlantByID = (req, res) => {
  const id = req.params.id;

  addPlants.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Plant with id=${id} was not found.`
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving plant with id=${id}: ${err.message}`
      });
    });
};



module.exports = {
  newPlants,
  getAllPlants,
  updatePlant,
  getPlantByID,
  deletePlant

}

