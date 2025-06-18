const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find({ role: 'user' })
      .select('-password')
      .skip((page - 1) * limit)
      .limit(+limit);

    const count = await User.countDocuments({ role: 'user' });

    res.json({ users, total: count, page: +page, pages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser = async (req , res) => {
    try {
        const user = await User.findById({_id: req.params.id , role: 'user'});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User deleted'});
} catch(err){
    res.status(500).json({message: 'Server error'});
}
}
