import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
}, { timestamps: true });

AppointmentSchema.index({ date: 1, timeSlot: 1 }, { unique: true });

export default mongoose.model('Appointment', AppointmentSchema);
