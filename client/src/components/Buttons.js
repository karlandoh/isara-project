import { useDispatch, useSelector } from 'react-redux';
import { changeSchedule } from '../store/scheduleSlice';
import { staffOptions } from '../constants/constants';
import { hasConsecutiveLunchSlots, getEmployeesWithMoreThanTwoShifts, getEmployeesWithMoreThanSevenShifts } from '../components/BusinessRules'



function Buttons() {

    const dispatch = useDispatch();
    const schedule = useSelector((state) => state.schedule.data);

    const populateScheduleWithRandomValues = async () => {

        await dispatch(changeSchedule({ reset: true }));

        const scheduleCopy = JSON.parse(JSON.stringify(schedule));
        
        const getRandomIndex = () => {
            return Math.floor(Math.random() * staffOptions.length);
        }
    
        for (const day in scheduleCopy) {
            for (const timeSlot in scheduleCopy[day]) {
                let loopCounter = 0;
                while (true) {
                    let randomIndex = getRandomIndex();
    
                    scheduleCopy[day][timeSlot] = staffOptions[randomIndex].value;
    
                    try {
                        if (hasConsecutiveLunchSlots(scheduleCopy).length > 0 ||
                            getEmployeesWithMoreThanTwoShifts(scheduleCopy).length > 0 ||
                            getEmployeesWithMoreThanSevenShifts(scheduleCopy).length > 0) {
                            loopCounter++;
                            if (loopCounter > 1000) {
                                throw new Error('Every staff member will create a warning. Reset!');
                            }
                            continue;
                        } else {
                            await dispatch(changeSchedule({ day, shift: timeSlot, value: staffOptions[randomIndex].value }));
                            break;
                        }
                    } catch (err) {
                        if (err.message === 'Every staff member will create a warning. Reset!') {
                            return populateScheduleWithRandomValues();
                        }
                    }
                }
            }
        }
    };



    if (!schedule) {
        return (<h1>Loading "Load" Table...</h1>)
    }


    const handleSelectChange = () => {
        dispatch(changeSchedule({ reset: true }))
    };

    return (
        <div>
            <button onClick={() => {
            if (staffOptions.length <= 7) {
                alert("It is mathematically impossible to randomize shifts without any warnings. Please add at least 8 employees.");
            } else {
                populateScheduleWithRandomValues(dispatch, schedule);
            }
            }}>Random Populate</button>

            <button onClick={handleSelectChange}
            >Clear
            </button>
        </div>
    );
};

export default Buttons;