import React from 'react';
import DayListItem from "./DayListItem";


export default function DayList(props){

  function getSpots(state, dayToCheck) {
    let spotsLeft;
    for (let day of state.days) {
      if(state.days[day].name === dayToCheck) {
        spotsLeft = 5 - state.days[day].appointments.length;
      }
    }
    return spotsLeft;
  }

  const daysArr = props.days.map(day => {
    return (
      <DayListItem
        key = {day.id}
        name={day.name} 
        getSpots = {getSpots}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay} 
      />
    );
  })
  return (
    <ul>
      {daysArr}
    </ul>
  );
};
