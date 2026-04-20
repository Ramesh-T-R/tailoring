import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes';
import measurementTypeRoutes from './routes/measurementTypeRoutes';
import sizeChartRoutes from './routes/sizeChartRoutes';
import dressTypeRoutes from './routes/dressTypeRoutes';
import designCategoryRoutes from './routes/designCategoryRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thaiyalagam';

if (MONGODB_URI.includes('<username>')) {
  console.warn('WARNING: MongoDB URI contains placeholders. Please update server/.env with your real connection string.');
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/measurement-types', measurementTypeRoutes);
app.use('/api/size-charts', sizeChartRoutes);
app.use('/api/dress-types', dressTypeRoutes);
app.use('/api/design-categories', designCategoryRoutes);

// Database Connection
console.log('Connecting to MongoDB...');
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection error:');
    console.error(error.message);
    console.log('\nTip: If you are using MongoDB Atlas, ensure your IP is whitelisted and credentials are correct.');
    console.log('If testing locally, ensure MongoDB is running: brew services start mongodb-community');
  });
