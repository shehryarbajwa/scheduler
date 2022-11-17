import { useState, useEffect } from "react";
import axios from "axios";
import { updateSpots } from "../helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function getNullSpots(day, appointments) {
    let count = 0;
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count++
      }
    }
    return count;
  };
  function updateSpots(dayName, days, appointments) {
    const spreadDays = [...days];
    const day = spreadDays.find(item => item.name === dayName);
    const nulls = getNullSpots(day, appointments);
    day.spots = nulls;
    //console.log(day.spots);
    return spreadDays;
  };

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state.day, state.days, appointments);
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
    .then( () => {
      setState({
        ...state,
        appointments,
        days
      });
    })
  }

  function cancelInterview(id) {
    console.log(id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state.day, state.days, appointments);

    
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then( () => {
      
      setState({
        ...state,
        appointments,
        days
      });
    })

  }

  // function getSpots(state, dayToCheck) {
  //   let spotsLeft;
  //   for (let day of state.days) {
  //     if(state.days[day].name === dayToCheck) {
  //       spotsLeft = 5 - state.days[day].appointments.length;
  //     }
  //   }
  //   return spotsLeft;
  // }

  const setDay = (day) => {
    setState({ ...state, day });
  };

  useEffect(() => {

    Promise.all([axios.get('/api/days'),
      axios.get('/api/appointments'), axios.get('/api/interviewers')]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }
        ));
        // console.log(all[0].data);
        // console.log(all[1].data);
    });
  }, [])

  return { setDay, cancelInterview, bookInterview, state };
}