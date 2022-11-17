import React, { Fragment } from 'react'
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import Form from "./Form";
import Empty from "./Empty";
import Error from "./Error";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";




const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const EDIT = "EDIT";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition('SAVING');
    props
      .bookInterview(props.id, interview)
      .then(() => transition('SHOW'))
      .catch(error => transition(ERROR_SAVE, true));
    
  }
  function edit(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition('SAVING');
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW)) 
  }

  function deleteConfirmInterview() {
    transition('CONFIRM');
    
    // transition('SAVING');
    // props.cancelInterview(props.id)
    // .then(() => transition('EMPTY'));
  }
  function deleteInterview() {
    transition('SAVING');
    transition('DELETING');
    props.cancelInterview(props.id)
    .then(() => transition('EMPTY'))
    .catch(error => transition(ERROR_DELETE, true));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <div className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition('CREATE')} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteConfirmInterview}
          onEdit = {() => transition('EDIT')}
      />
      )}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers} onSave={save} onCancel={() => back()} setInterviewer={console.log("setInterviewer")} bookInterview={props.bookInterview}
      />
      )}
      {mode === EDIT && (
        <Form
        interviewer={props.interview.interviewer.id}
        name={props.interview.student}
        interviewers={props.interviewers} onSave={edit} onCancel={() => back()} setInterviewer={console.log("setInterviewer")} bookInterview={props.bookInterview}
      />
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
      {mode === DELETING && (
        <Status message="Deleting"/>
      )}
      {mode === CONFIRM && (
        <Confirm message="Are you sure you would like to delete?"
        onCancel={() => back()}
        onConfirm= {deleteInterview}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error err={"Could not save appointment"} onClose={()=> back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error err={"Could not delete appointment"} onClose={()=> back()}/>
      )}
    </div>
  )
}

// onDelete={deleteInterview}