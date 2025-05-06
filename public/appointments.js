import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments', details: error.message });
  }
});

// Book a new appointment
router.post('/', async (req, res) => {
  const { name, service, date, timeSlot } = req.body;

  if (!name || !service || !date || !timeSlot) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newAppointment = await Appointment.create({ name, service, date, timeSlot });
    res.status(201).json(newAppointment);
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ error: 'This time slot is already booked' });
    } else {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  }
});

export default router;
