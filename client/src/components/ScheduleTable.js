import React, { useEffect } from 'react';

import { staffOptions } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getSchedule, changeSchedule } from '../store/scheduleSlice';

const ScheduleTable = () => {
    // Define the options for the staff members

    const dispatch = useDispatch();
    const schedule = useSelector((state) => state.schedule.data);
    
    useEffect(() => {
        dispatch(getSchedule());
    }, []);

    // Define the change handler for the select inputs
    const handleSelectChange = (event, day, shift) => {
        const value = event.target.value;
        dispatch(changeSchedule({day, shift, value}))
    };

    if (!schedule){
        return (<h1>Loading "Schedule" Table...</h1>)
    }
    const days = Object.keys(schedule);
    const timeSlots = Object.keys(schedule[Object.keys(schedule)[0]])

    return (
        <table>
            <thead>
                <tr>
                    <th>Schedule</th>
                    {days.map((day) => (
                        <th key={day}>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {timeSlots.map((timeSlot) => (
                    <tr key={timeSlot}>
                        <td>{timeSlot}</td>
                        {days.map((day) => (
                            <td key={day}>
                                <select
                                    value={schedule[day][timeSlot]}
                                    onChange={(event) =>
                                        handleSelectChange(event, day, timeSlot)
                                    }
                                >
                                    <option value=""></option>
                                    {staffOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    };

export default ScheduleTable;