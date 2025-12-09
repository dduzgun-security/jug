import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ratingRoutes from './routes/ratings.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'jug-node-service' });
});

// Routes
app.use('/api/ratings', ratingRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Node.js BFF running on port ${PORT}`);
  console.log(`📡 User Service: ${process.env.USER_SERVICE_URL || 'localhost:50051'}`);
  console.log(`📡 Rating Service: ${process.env.RATING_SERVICE_URL || 'localhost:50052'}`);
});
