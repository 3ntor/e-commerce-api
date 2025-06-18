const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await Product.find()
      .populate('category', 'name')
      .populate('user', 'name email')
      .skip((page - 1) * limit)
      .limit(+limit);
    const count = await Product.countDocuments();
    res.json({ products, total: count, page: +page, pages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, category } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.name = name;
        product.category = category;
        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await Product.findByIdAndDelete(req.params.id); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};