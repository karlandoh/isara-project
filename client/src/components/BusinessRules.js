import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { staffOptions } from '../constants/constants';

const styles = {
  bordered: {
    border: '1px dashed black',
    padding: '10px',
    margin: '10px',
    backgroundColor: 'lightyellow'
  }
};


function hasConsecutiveLunchSlots(schedule) {
  const employeesWithConsecutiveLunchSlots = [];
  for (const day of Object.values(schedule)) {
    let lastLunchEmployee = null;
    for (const slot of ['lunchA', 'lunchB', 'lunchC', 'lunchD']) {
      const employee = day[slot];
      if (employee && employee === lastLunchEmployee) {
        if (!employeesWithConsecutiveLunchSlots.includes(employee)) {
          employeesWithConsecutiveLunchSlots.push(employee);
        }
      }
      if (employee && slot !== 'lunchD') {
        lastLunchEmployee = employee;
      } else {
        lastLunchEmployee = null;
      }
    }
  }
  return employeesWithConsecutiveLunchSlots;
}


function getEmployeesWithMoreThanTwoShifts(schedule) {
  const employeesWithMoreThanTwoShifts = [];
  for (const day of Object.values(schedule)) {
    const employeeShifts = {};
    for (const slot of Object.keys(day)) {
      const employee = day[slot];
      if (employee) {
        if (employeeShifts[employee]) {
          employeeShifts[employee]++;
        } else {
          employeeShifts[employee] = 1;
        }
      }
    }
    for (const employee of Object.keys(employeeShifts)) {
      if (employeeShifts[employee] > 2 && !employeesWithMoreThanTwoShifts.includes(employee)) {
        employeesWithMoreThanTwoShifts.push(employee);
      }
    }
  }
  return employeesWithMoreThanTwoShifts;
}

function getEmployeesWithMoreThanSevenShifts(schedule) {
  const employeeShiftCounts = {};
  for (const day of Object.values(schedule)) {
    const employees = Object.values(day);
    for (const employee of employees) {
      if (employee) {
        if (employeeShiftCounts[employee]) {
          employeeShiftCounts[employee]++;
        } else {
          employeeShiftCounts[employee] = 1;
        }
      }
    }
  }
  const employeesWithMoreThanSevenShifts = [];
  for (const [employee, shiftCount] of Object.entries(employeeShiftCounts)) {
    if (shiftCount > 7) {
      employeesWithMoreThanSevenShifts.push(employee);
    }
  }
  return employeesWithMoreThanSevenShifts;
}

const BusinessRules = () => {
    // Define the options for the staff members

    const schedule = useSelector((state) => state.schedule.data);

    if (!schedule){
      return (<h1>Loading "Load" Table</h1>)
    }

    return (
      <>
        <div style={styles.bordered}>
            Consecutive Lunch Slots {hasConsecutiveLunchSlots(schedule).map(employeeValue => {
              const employeeLabel = staffOptions.find(option => option.value === employeeValue).label;
              return <div>{employeeLabel}</div>;
            })}
        </div>
        <div style={styles.bordered}>
            More than two shifts {getEmployeesWithMoreThanTwoShifts(schedule).map(employeeValue => {
              const employeeLabel = staffOptions.find(option => option.value === employeeValue).label;
              return <div>{employeeLabel}</div>;
            })}
        </div>
        <div style={styles.bordered}>
            More than seven shifts {getEmployeesWithMoreThanSevenShifts(schedule).map(employeeValue => {
              const employeeLabel = staffOptions.find(option => option.value === employeeValue).label;
              return <div>{employeeLabel}</div>;
            })}           
        </div>   
      </>


    );

    };

export {BusinessRules, hasConsecutiveLunchSlots, getEmployeesWithMoreThanTwoShifts, getEmployeesWithMoreThanSevenShifts};