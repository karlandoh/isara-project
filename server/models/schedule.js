import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  monday: {
    morningUpstairs: { type: String, default: '' },
    morningDownstairs: { type: String, default: '' },
    morningParkingLot: { type: String, default: '' },
    lunchA: { type: String, default: '' },
    lunchB: { type: String, default: '' },
    lunchC: { type: String, default: '' },
    lunchD: { type: String, default: '' },
    afternoonUpstairs: { type: String, default: '' },
    afternoonDownstairs: { type: String, default: '' },
    afternoonParkingLot: { type: String, default: '' },
  },
  tuesday: {
    morningUpstairs: { type: String, default: '' },
    morningDownstairs: { type: String, default: '' },
    morningParkingLot: { type: String, default: '' },
    lunchA: { type: String, default: '' },
    lunchB: { type: String, default: '' },
    lunchC: { type: String, default: '' },
    lunchD: { type: String, default: '' },
    afternoonUpstairs: { type: String, default: '' },
    afternoonDownstairs: { type: String, default: '' },
    afternoonParkingLot: { type: String, default: '' },
  },
  wednesday: {
    morningUpstairs: { type: String, default: '' },
    morningDownstairs: { type: String, default: '' },
    morningParkingLot: { type: String, default: '' },
    lunchA: { type: String, default: '' },
    lunchB: { type: String, default: '' },
    lunchC: { type: String, default: '' },
    lunchD: { type: String, default: '' },
    afternoonUpstairs: { type: String, default: '' },
    afternoonDownstairs: { type: String, default: '' },
    afternoonParkingLot: { type: String, default: '' },
  },
  thursday: {
    morningUpstairs: { type: String, default: '' },
    morningDownstairs: { type: String, default: '' },
    morningParkingLot: { type: String, default: '' },
    lunchA: { type: String, default: '' },
    lunchB: { type: String, default: '' },
    lunchC: { type: String, default: '' },
    lunchD: { type: String, default: '' },
    afternoonUpstairs: { type: String, default: '' },
    afternoonDownstairs: { type: String, default: '' },
    afternoonParkingLot: { type: String, default: '' },
  },
  friday: {
    morningUpstairs: { type: String, default: '' },
    morningDownstairs: { type: String, default: '' },
    morningParkingLot: { type: String, default: '' },
    lunchA: { type: String, default: '' },
    lunchB: { type: String, default: '' },
    lunchC: { type: String, default: '' },
    lunchD: { type: String, default: '' },
    afternoonUpstairs: { type: String, default: '' },
    afternoonDownstairs: { type: String, default: '' },
    afternoonParkingLot: { type: String, default: '' },
  },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;