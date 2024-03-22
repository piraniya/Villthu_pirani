const ProductModel = require('../schema/productSchema');
const multer = require('../utils/multer')
const cloudinary = require('../utils/cloudinary');


exports.createProduct = async (req, res) => {
    try {
      // Upload image to Cloudinary
     
  
      // Create a new Product instance
      const product = new ProductModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        seller: req.body.seller,
        ratings: req.body.ratings // Assuming ratings field is also present
      });
  
      // Save the product to the database
      const savedProduct = await product.save();
  
      // Respond with the saved product
      res.status(200).json(savedProduct);
    } catch (error) {
      // Handle errors
      console.error("Error creating product:", error);
      res.status(400).json({ message: "Failed to create product" });
    }
  };
  
// Get Products API - /api/v1/products
exports.getProducts = async (req, res, next) => {


    try {
        const query = req.query.keyword ? { 
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};

        const products = await ProductModel.find(query);

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No products found.'
            });
        }

        res.json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};


//Get Single Product API - /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        res.json({
            success: true,
            product
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Unable to get Product with that ID'
        })
    }
}
// Delete Single Product API - DELETE /api/v1/product/:id
exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        
        // Check if the product exists
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Delete the product
        await ProductModel.findByIdAndDelete(productId);

        // Return success response
        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        // Handle errors
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
// Update Single Product API - PUT or PATCH /api/v1/product/:id
exports.updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const updateData = req.body; // Data to update the product

        // Check if the product exists
        let product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Update the product
        product = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });

        // Return success response with updated product data
        res.json({
            success: true,
            product
        });
    } catch (error) {
        // Handle errors
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}