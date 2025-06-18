const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
});

module.exports = mongoose.model('Category', categorySchema);