const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getMyProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await Product.find({ user: req.user._id })
      .populate('category', 'name')
      .skip((page - 1) * limit)
      .limit(+limit);

    const count = await Product.countDocuments({ user: req.user._id });
    
    res.json({ products, total: count, page: +page, pages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, category } = req.body;
    if (!name || !category) {
      return res.status(400).json({ message: 'Name and category are required' });
    }
    const cat = await Category.findById(category);
    if (!cat) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const product = await Product.create({ name, category, user: req.user._id });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
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
    const product = await Product.findOne(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


