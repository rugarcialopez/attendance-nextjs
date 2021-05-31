
import React, { useReducer } from 'react';

type InputState = {
  value: string,
  isTouched: boolean
};

type InputPayload = {
  type: string,
  value: string,
};

const initialInputState: InputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state: InputState, action: InputPayload) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value };
  }
  if (action.type === 'RESET') {
    return { isTouched: false, value: '' };
  }
  if (action.type === 'SET') {
    return { value: action.value, isTouched: state.isTouched };
  }
  return initialInputState;
};

const useInput = (validateValue: (value: string) => boolean) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR', value: '' });
  };

  const reset = () => {
    dispatch({ type: 'RESET', value: '' });
  };

  const set = (value: string) => {
    dispatch({ type: 'SET', value: value });
  };

  const response: {
    value: string,
    isValid: boolean,
    hasError: boolean,
    valueChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    inputBlurHandler: () => void,
    reset: () => void,
    set: (value: string) => void
  } = {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    set,
  }
  return response;
};

export default useInput;