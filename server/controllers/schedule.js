import express from 'express';
import Schedule from '../models/schedule.js'

const emptyDict = {
    monday: {
        morningUpstairs: '',
        morningDownstairs: '',
        morningParkingLot: '',
        lunchA: '',
        lunchB: '',
        lunchC: '',
        lunchD: '',
        afternoonUpstairs: '',
        afternoonDownstairs: '',
        afternoonParkingLot: '',
    },
    tuesday: {
        morningUpstairs: '',
        morningDownstairs: '',
        morningParkingLot: '',
        lunchA: '',
        lunchB: '',
        lunchC: '',
        lunchD: '',
        afternoonUpstairs: '',
        afternoonDownstairs: '',
        afternoonParkingLot: '',
    },
    wednesday: {
        morningUpstairs: '',
        morningDownstairs: '',
        morningParkingLot: '',
        lunchA: '',
        lunchB: '',
        lunchC: '',
        lunchD: '',
        afternoonUpstairs: '',
        afternoonDownstairs: '',
        afternoonParkingLot: '',
    },
    thursday: {
        morningUpstairs: '',
        morningDownstairs: '',
        morningParkingLot: '',
        lunchA: '',
        lunchB: '',
        lunchC: '',
        lunchD: '',
        afternoonUpstairs: '',
        afternoonDownstairs: '',
        afternoonParkingLot: '',
    },
    friday: {
        morningUpstairs: '',
        morningDownstairs: '',
        morningParkingLot: '',
        lunchA: '',
        lunchB: '',
        lunchC: '',
        lunchD: '',
        afternoonUpstairs: '',
        afternoonDownstairs: '',
        afternoonParkingLot: '',
    },
}

const router = express.Router();

export const getSchedule = async (req, res) => {
    try {
        const post = await Schedule.findOne();
        if (!post) {
            const newPost = new Schedule();
            await newPost.save();
            res.json(newPost);
        } else {
            res.json(post);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const updateSchedule = async (req, res) => {
    try {
        const { day, shift, value, reset } = req.body;

        let setParameter;

        if (reset === true) {
            setParameter = { $set: emptyDict }
        } else {
            setParameter = { $set: { [`${day}.${shift}`]: value } };
        }

        const updatedSchedule = await Schedule.findOneAndUpdate(
            {},
            setParameter,
            { new: true }
        );

        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json(updatedSchedule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const resetSchedule = async (req, res) => {
    try {
        const my_id = await Schedule.findOne()
        const updatedSchedule = await Schedule.findOneAndUpdate(
            {},
            new Schedule({ _id: my_id }),
            { new: true, upsert: true }
        );

        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.status(200).json(updatedSchedule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default router;
