const addFertilizers = require("../schema/fertilizersSchema");
const cloudinary = require('../utils/cloudinary');
const multer = require("../utils/multer")


// post Fertilizers
const newFertilizers = async (req, res, next) => {
  try {
    // Validate request
    if (!req.body.name || !req.body.price || !req.body.description || !req.body.stock) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Upload image to Cloudinary
   
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Organic",
    });

  

    // Create a new fertilizer
    const fertilizer = new addFertilizers({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: {
        public_id: result.public_id,
        url: result.secure_url
    },
      quantity: 0, // Set initial quantity to 0
      stock: req.body.stock,
      ratings: req.body.ratings || "", // Assuming ratings and seller can be empty
      seller: req.body.seller || "",
      numOfReviews: req.body.numOfReviews || "",
      createdAt: new Date()
    });

    // Save fertilizer to the database
    const savedFertilizer = await fertilizer.save();

    res.status(201).json(savedFertilizer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get Fertilizers
const getAllFertilizers = async (req, res) => {
  try {
    const fertilizers = await addFertilizers.find();
    res.json(fertilizers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update Fertilizers
const updateFertilizer = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFertilizer = await addFertilizers.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedFertilizer) {
      return res.status(404).json({ message: `Fertilizer with id ${id} not found.` });
    }

    res.json({ message: "Fertilizer updated successfully.", data: updatedFertilizer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete Fertilizers
const deleteFertilizer = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedFertilizer = await addFertilizers.findByIdAndDelete(id);

    if (!deletedFertilizer) {
      return res.status(404).json({ message: `Fertilizer with id ${id} not found.` });
    }

    res.json({ message: "Fertilizer deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFertilizerByID = async (req, res) => {
  try {
    const id = req.params.id;
    const fertilizer = await addFertilizers.findById(id);

    if (!fertilizer) {
      return res.status(404).json({ message: `Fertilizer with id ${id} not found.` });
    }

    res.json(fertilizer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  newFertilizers,
  getAllFertilizers,
  getFertilizerByID,
  updateFertilizer,
  deleteFertilizer,
  // addStockToFertilizer
};


// // Add stock to Fertilizer
// const addStockToFertilizer = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { quantity } = req.body;

//     // Check if quantity is a positive number
//     if (!quantity || quantity <= 0) {
//       return res.status(400).json({ message: "Quantity must be a positive number." });
//     }

//     // Find the fertilizer by ID
//     const fertilizer = await addFertilizers.findById(id);

//     // Check if fertilizer exists
//     if (!fertilizer) {
//       return res.status(404).json({ message: `Fertilizer with id ${id} not found.` });
//     }

//     // Add the quantity to the current stock
//     fertilizer.stock += quantity;

//     // Save the updated fertilizer
//     await fertilizer.save();

//     res.json({ message: `Stock updated successfully. New stock: ${fertilizer.stock}` });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };






