import React, { useState } from 'react';
import useInput from '../../hooks/use-input';
import SignIn from '../../models/SignIn';
import SignUp from '../../models/SignUp';
import classes from './AuthForm.module.css';

const isNotEmpty = (value: string) => value.trim() !== '';
const isEmail = (value: string) => {
  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return pattern.test( value );
}

const isCorrectPassword = (value: string) => isNotEmpty(value) && value.length >= 5;

const AuthForm: React.FC<{ onLogin: (data: SignUp | SignIn) => void}> = (props) => {
  const [roleSelected, setRoleSelected] = useState('admin');
  const [isLogin, setIsLogin] = useState(true);

  const {
    value: enteredFullName,
    isValid: enteredFullNameIsValid,
    hasError: fullNameInputHasError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHanlder,
    reset: resetFullNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHanlder,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHanlder,
    reset: resetPasswordInput,
  } = useInput(isCorrectPassword);

  let formIsValid = false;

  if (isLogin) {
    formIsValid = enteredEmailIsValid && enteredPasswordIsValid;
  } else {
    formIsValid = enteredFullNameIsValid && enteredEmailIsValid && enteredPasswordIsValid;
  }

  const roleChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleSelected(event.target.value);
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (isLogin) {
      props.onLogin({
        email: enteredEmail,
        password: enteredPassword,
      });
    } else {
      props.onLogin({
        fullName: enteredFullName,
        email: enteredEmail,
        password: enteredPassword,
        role: roleSelected
      });
    }
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  }

  const fullNameClasses = !fullNameInputHasError ? classes.control : classes.control + ' ' + classes.invalid;
  const emailClasses = !emailInputHasError ? classes.control : classes.control + ' ' + classes.invalid;
  const passwordClasses = !passwordInputHasError ? classes.control : classes.control + ' ' + classes.invalid;

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        { !isLogin && <div className={fullNameClasses}>
          <label htmlFor='fullName'>Your full name</label>
          <input type='text' id='fullName' onChange={fullNameChangeHandler} value={enteredFullName} onBlur={fullNameBlurHanlder} aria-label='fullName-input'/>
          {fullNameInputHasError && <p className={classes['error-text']}>Please enter a full name.</p>}
        </div>}
        <div className={emailClasses}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' onChange={emailChangeHandler} value={enteredEmail} onBlur={emailBlurHanlder} aria-label='email-input'/>
          {emailInputHasError && <p className={classes['error-text']}>Please enter a valid email address.</p>}
        </div>
        <div className={passwordClasses}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' onChange={passwordChangeHandler} value={enteredPassword} onBlur={passwordBlurHanlder} aria-label='password-input'/>
          {passwordInputHasError && <p className={classes['error-text']}>Please enter a valid password (min length 5 characters)</p>}
        </div>
        { !isLogin && <div className={classes.control}>
          <label htmlFor='role'>Your role</label>
          <select name='role' id='role' value={roleSelected} onChange={roleChangeHandler}>
            <option value='admin'>Admin</option>
            <option value='student'>Student</option>
            <option value='teacher'>Teacher</option>
          </select>
        </div>}
        <div className={classes.actions}>
          <button type='submit' disabled={!formIsValid}>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
