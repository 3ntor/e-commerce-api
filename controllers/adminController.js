const User = require('../models/User');


exports.getAdmins = async(req,res) => {
    try {
        const { page=1 ,limit=10} =req.query;
        const admins = await User.find({role: 'admin'})
        .select('-password')  
        .skip((page-1)*limit)
        .limit(+limit);

        const count = await User.countDocuments({role: 'admin'});
        res.json({admins, total: count, page: +page, pages: Math.ceil(count/limit)});
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
};

exports.creatAdmin = async (req, res) =>{
    try {
        const {name , email , password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }
        const exists = await User.findOne({email});
        if(exists){
            return res.status(400).json({message: 'Email already exists'});
        }
        const admin = await User.create({name , email , password , role: 'admin'});
        res.status(201).json({id: admin._id, name: admin.name, email: admin.email, role: admin.role});
    } catch (err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
};

exports.updateAdmin = async (req , res) => {
    try {
        const {name , email ,password} = req.body;
        const admin = await User.findById(req.params.id ,{ role: 'admin'});
        if(!admin){
            return res.status(404).json({message: 'Admin not found'});
        }
        if(name) admin.name = name;
        if(email) admin.email = email;
        if(password) admin.password = password;
        await admin.save();
        res.json({ id: admin._id, name: admin.name, email: admin.email, role: admin.role });
        } catch (err) {
            res.status(500).json({message: 'Server error', error: err.message});
        }
}

exports.deleteAdmin = async (req , res) => {
    try {
        const admin = await User.findOneAndDelete({_id: req.params.id , role: 'admin'});
        if(!admin){
            return res.status(404).json({message: 'Admin not found'});
        }
        res.json({message: 'Admin deleted'});
    } catch(err){
        res.status(500).json({message: 'Server error'});
    }
};