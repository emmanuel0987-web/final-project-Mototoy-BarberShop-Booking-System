import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// ✅ Add this route to support GET /appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments', details: error.message });
  }
});

// Existing POST route to create a booking
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

// ✅ Route to get all booked slots by date
router.get('/booked', async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'Date is required' });

  const bookedSlots = await Appointment.find({ date });
  res.json(bookedSlots);
});

// ✅ Route to delete a booking (only accessible by admin)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the user is an admin (this can be improved with JWT or other auth methods)
  const isAdmin = req.headers['x-admin'] === 'true'; // Simple header check for admin flag
  if (!isAdmin) {
    return res.status(403).json({ error: 'Permission denied. Admin access required.' });
  }

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete appointment', details: error.message });
  }
});

export default router;
