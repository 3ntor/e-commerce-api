const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const createDefaultAdmin = require('./creatadmin(test)/createDefaultAdmin');
const authRoutes = require('./routes/auth');
const userProductRoutes = require('./routes/userProduct');
const wishlistRoutes = require('./routes/wishlist');
const adminRoutes = require('./routes/admin');
const adminUserRoutes = require('./routes/adminUser');
const adminProductRoutes = require('./routes/adminProduct');
const adminCategoryRoutes = require('./routes/adminCategory');

dotenv.config();

const app = express();

// CORS configuration to allow credentials and specific frontend origins
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('AUVNET Backend Task API Running');
});

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');
  await createDefaultAdmin();
})
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/user/products', userProductRoutes);
app.use('/api/user/wishlist', wishlistRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/user', adminUserRoutes);
app.use('/api/admin/product', adminProductRoutes);
app.use('/api/admin/category', adminCategoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
