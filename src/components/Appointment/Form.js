import Button from "../Button";
import InterviewerList from "../InterviewerList";
import React, { useState } from 'react';

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  console.log(props.interviewer);

  function submitHandler(event) {
    event.preventDefault();
    console.log(name);
  }
  function reset() {
    setName("");
    setInterviewer(null);
  }
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    setError("");
    props.onSave(name, interviewer);
  }
  function cancel() {
    reset();
    props.onCancel();
  }
  


  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={submitHandler} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
            /*
              This must be a controlled component
            */
          />
          
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}