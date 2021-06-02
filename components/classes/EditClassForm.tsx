import React, { FormEvent, useEffect } from 'react';
import useInput from '../../hooks/use-input';
import Class from '../../models/Class';

import classes from './Form.module.css';

const isNotEmpty = (value: string) => value.trim() !== '';

const EditClassForm: React.FC<{ subject: string, startDate: string, endDate: string, onUpdateClass: (classData: Class) => void }> = (props) => {
  const { subject, startDate, endDate } = props;
  const {
    value: enteredSubject,
    isValid: enteredSubjectIsValid,
    hasError: subjectInputHasError,
    valueChangeHandler: subjectChangeHandler,
    inputBlurHandler: subjectBlurHanlder,
    set: setSubject,
  } = useInput(isNotEmpty);

  const {
    value: enteredStartDate,
    isValid: enteredStartDateIsValid,
    hasError: startDateInputHasError,
    valueChangeHandler: startDateChangeHandler,
    inputBlurHandler: startDateBlurHanlder,
    set: setStartDate,
  } = useInput(isNotEmpty);

  const {
    value: enteredEndDate,
    isValid: enteredEndDateIsValid,
    hasError: endDateInputHasError,
    valueChangeHandler: endDateChangeHandler,
    inputBlurHandler: endDateBlurHanlder,
    set: setEndDate,
  } = useInput(isNotEmpty);

  useEffect(() => {
    setSubject(subject);
    setStartDate(startDate);
    setEndDate(endDate);
  }, []);

  let formIsValid = enteredSubjectIsValid && enteredStartDateIsValid && enteredEndDateIsValid;


  function submitHandler(event: FormEvent) {
    event.preventDefault();
    const classData: Class = {
      subject: enteredSubject,
      startDate: enteredStartDate,
      endDate: enteredEndDate,
    };

    props.onUpdateClass(classData);
  }

  const subjectClasses = !subjectInputHasError ? classes.control : classes.control + ' ' + classes.invalid;
  const startDateClasses = !startDateInputHasError ? classes.control : classes.control + ' ' + classes.invalid;
  const endDateClasses = !endDateInputHasError ? classes.control : classes.control + ' ' + classes.invalid;

  return (
    <section className={classes.classForm}>
    <h1>Edit class</h1>
    <form onSubmit={submitHandler}>
      <div className={subjectClasses}>
        <label htmlFor='fullName'>Subject</label>
        <input type='text' id='subject' onChange={subjectChangeHandler} value={enteredSubject} onBlur={subjectBlurHanlder} aria-label='subject-input'/>
        { subjectInputHasError && <p className={classes['error-text']}>Please enter a subject.</p> }
      </div>
      <div className={startDateClasses}>
        <label htmlFor='startDate'>Start date</label>
        <input type='date' id='start-date' onChange={startDateChangeHandler} value={enteredStartDate} onBlur={startDateBlurHanlder} aria-label='startDate-input'/>
        { startDateInputHasError && <p className={classes['error-text']}>Please enter a valid start date.</p>}
      </div>
      <div className={endDateClasses}>
        <label htmlFor='endDate'>End date</label>
        <input type='date' id='end-date' onChange={endDateChangeHandler} value={enteredEndDate} onBlur={endDateBlurHanlder} aria-label='endDate-input'/>
        { endDateInputHasError && <p className={classes['error-text']}>Please enter a valid end date.</p>}
      </div>
      <div className={classes.actions}>
        <button type='submit' disabled={!formIsValid}>Update</button>
      </div>
    </form>
  </section>
  );
}

export default EditClassForm;
