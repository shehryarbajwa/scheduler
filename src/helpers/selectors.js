export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const result = [];
  const requiredDay = day;
  const filteredAppointmentIds = state.days.filter(day => day.name === requiredDay)[0];
  if (!filteredAppointmentIds) {
    return [];
  }
  filteredAppointmentIds.appointments.forEach(id => {
    result.push(state.appointments[id]);
  })
  return result;
}

export function getInterview(state, interview) {
  if (interview !== null) {
    const results = {student: interview.student, interviewer: state.interviewers[interview.interviewer]};
    return results;
  }
  return null;
  
}

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const result = [];
  const requiredDay = day;
  const filteredAppointmentIds = state.days.filter(day => day.name === requiredDay)[0];
  if (!filteredAppointmentIds) {
    return [];
  }
  filteredAppointmentIds.interviewers.forEach(id => {
    result.push(state.interviewers[id]);
  })
  return result;
}


export function updateSpots(days, appointments, id, value) {
  days.forEach(day => {
    if (!appointments[id].interview && value === -1) {
      if(day.appointments.includes(id)) {
        day.spots = parseInt(day.spots) + value
      }
    }
    if (value === 1) {
      if(day.appointments.includes(id)) {
        day.spots = parseInt(day.spots) + value
      }
    }
  })
  return days;
}