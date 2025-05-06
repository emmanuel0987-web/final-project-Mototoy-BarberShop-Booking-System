import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import appointmentsRouter from './routes/appointments.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve API route
app.use('/appointments', appointmentsRouter);

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all for frontend routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'adminDashboard.html'));
});

// MongoDB connection and server start
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
