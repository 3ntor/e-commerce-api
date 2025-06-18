const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const categories = await Category
            .find()
            .skip((page - 1) * limit)
            .limit(+limit);
        const count = await Category.countDocuments();
        res.json({ categories, total: count, page: +page, pages: Math.ceil(count / limit) });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const category = await Category.create({ name, parent: parent || null });
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        category.name = name;
        category.parent = parent || null;
        await category.save();
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};