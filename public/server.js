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

// ✅ API routes first
app.use('/appointments', appointmentsRouter);

// ✅ Serve static frontend files after API
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Fallback to Booking.html ONLY after all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Booking.html'));
});

// Set the port
const PORT = process.env.PORT || 3001;

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
