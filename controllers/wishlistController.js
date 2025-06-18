const Wishlist = require('../models/wishlist');
const  Product = require('../models/Product');

exports.getWishlist = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }
    
    const total = wishlist.products.length;
    const products = wishlist.products.slice(skip, skip + +limit);
    
    const populatedProducts = await Product.find({ _id: { $in: products } })
      .populate('category', 'name');
    
    res.json({
      products: populatedProducts,total,page: +page, pages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await Wishlist.updateOne(
      { user: req.user._id },
      { $addToSet: { products: product._id } },
      { upsert: true }
    );

    res.json({ message: 'Product added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

 const wishlist = await Wishlist.findOneAndUpdate(
  { user: req.user._id },
  { $pull: { products: product._id } },
  { new: true }
);
res.json(wishlist || { message: 'Wishlist not found' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};