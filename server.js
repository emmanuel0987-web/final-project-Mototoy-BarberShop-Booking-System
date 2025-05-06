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

// ✅ 1. API Routes FIRST (before static and fallback)
app.use('/appointments', appointmentsRouter);

// ✅ 2. Serve static files AFTER routes
app.use(express.static(path.join(__dirname, 'public')));

// ✅ 3. Catch-all (for frontend routing) — LAST
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Booking.html'));
});

// ✅ 4. Connect DB and Start Server
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
