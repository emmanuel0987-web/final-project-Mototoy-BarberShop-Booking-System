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

// ✅ API route
app.use('/appointments', appointmentsRouter);

// ✅ Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Optional: fallback to adminDashboard.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Homepage.html'));
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 3001, () =>
      console.log(`🚀 Server running`)
    );
  })
  .catch(err => console.error('MongoDB connection error:', err));
