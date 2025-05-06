import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true }
}, { timestamps: true });

// Prevent double-booking same date/time
appointmentSchema.index({ date: 1, timeSlot: 1 }, { unique: true });

export default mongoose.model('Appointment', appointmentSchema);
