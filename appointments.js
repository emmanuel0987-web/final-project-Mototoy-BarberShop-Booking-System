import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

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

router.get('/booked', async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'Date is required' });

  const bookedSlots = await Appointment.find({ date });
  res.json(bookedSlots);
});

export default router;
