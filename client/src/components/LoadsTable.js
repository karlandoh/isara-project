import { useState, useEffect } from 'react';
import { staffOptions } from '../constants/constants';

import {useSelector } from 'react-redux';

function calculateStaffTotals(schedule) {
  const totals = {};

  // loop through each staff member
  staffOptions.forEach((staff) => {
    // initialize totals for each staff member
    totals[staff.label] = {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
    };

    // loop through each day of the week
    Object.keys(schedule).forEach((day) => {
      // loop through each time slot on the day
      Object.keys(schedule[day]).forEach((time) => {
        // check if the staff member is scheduled for the time slot
        if (schedule[day][time] === staff.value) {
          // increment the staff member's total for the day
          totals[staff.label][day]++;
        }
      });
    });

    // calculate the total for the week
    totals[staff.label]['totals'] =
      totals[staff.label]['monday'] +
      totals[staff.label]['tuesday'] +
      totals[staff.label]['wednesday'] +
      totals[staff.label]['thursday'] +
      totals[staff.label]['friday'];
  });

  return totals;
}

function Loads() {

    const schedule = useSelector((state) => state.schedule.data);

    const [staffTotals, setStaffTotals] = useState({});

    useEffect(() => {
      if (schedule) {
        setStaffTotals(calculateStaffTotals(schedule));
      }
    }, [schedule]);

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

    const renderTableRows = () => {
      return Object.keys(staffTotals).map((staffMember) => {
        const row = [];
        row.push(<td key="staff-member">{staffMember}</td>);
  
        days.forEach((day) => {
          row.push(<td key={`${staffMember}-${day}`}>{staffTotals[staffMember][day]}</td>);
        });
  
        row.push(<td key={`${staffMember}-totals`}>{staffTotals[staffMember]['totals']}</td>);
  
        return <tr key={staffMember}>{row}</tr>;
      });
    };
    
    if (!schedule){
      return (<h1>Loading "Load" Table...</h1>)
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Staff Member</th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
            <th>Totals</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    );
  };

  export default Loads;