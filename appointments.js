import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// Create new appointment
router.post('/', async (req, res) => {
  const { name, service, date, timeSlot } = req.body;

  if (!name || !service || !date || !timeSlot) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const appt = await Appointment.create({ name, service, date, timeSlot });
    res.status(201).json(appt);
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ error: 'This time slot is already booked' });
    } else {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  }
});

// ✅ Fetch all appointments
router.get('/', async (req, res) => {
  try {
    const allAppointments = await Appointment.find().sort({ date: 1 });
    res.json(allAppointments);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Fetch booked slots for a specific date
router.get('/booked', async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'Date is required' });

  try {
    const bookedSlots = await Appointment.find({ date });
    res.json(bookedSlots);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

export default router;
