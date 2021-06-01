import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';
import Auth from '../../../pages/auth/index';

describe('Login page', () => {
  describe('Sign In form' , () => {

    beforeEach(() => {
      render(<Auth />);
    });

    test('renders Sign In form', () => {
      const signInElement = screen.getByText('Sign In');
      expect(signInElement).toBeInTheDocument();
    });

    test('renders email field', () => {
      const emailLabel = screen.getByLabelText('Your Email');
      expect(emailLabel).toBeInTheDocument();
    });

    test('renders password field', () => {
      const passwordLabel = screen.getByLabelText('Your Password');
      expect(passwordLabel).toBeInTheDocument();
    });

    test('does not render full name field', () => {
      const fullNameLabel = screen.queryByLabelText('Your full name');
      expect(fullNameLabel).not.toBeInTheDocument();
    });

    test('does not render role field', () => {
      const roleLabel = screen.queryByLabelText('Your role');
      expect(roleLabel).not.toBeInTheDocument();
    });

    test('renders email error if email format is invalid', () => {
      const emailInput = screen.getByLabelText('email-input');
      fireEvent.change(emailInput, { target: { value: 'asfdasfd' } });
      fireEvent.focusOut(emailInput);
      const error = screen.queryByText('Please enter a valid email address.');
      expect(error).toBeInTheDocument();
    });

    test('does not render email error if email format is invalid', () => {
      const emailInput = screen.getByLabelText('email-input');
      fireEvent.change(emailInput, { target: { value: 'learner01@example.com' } });
      fireEvent.focusOut(emailInput);
      const error = screen.queryByText('Please enter a valid email address.');
      expect(error).not.toBeInTheDocument();
    });

    test('renders password error if password lenght is not equal or greater than 5 chars', () => {
      const passwordInput = screen.getByLabelText('password-input');
      fireEvent.change(passwordInput, { target: { value: '1234' } });
      fireEvent.focusOut(passwordInput);
      const error = screen.queryByText('Please enter a valid password (min length 5 characters)');
      expect(error).toBeInTheDocument();
    });

    test('does not render password error if password lenght is  equal or greater than 5 chars', () => {
      const passwordInput = screen.getByLabelText('password-input');
      fireEvent.change(passwordInput, { target: { value: '12345' } });
      fireEvent.focusOut(passwordInput);
      const error = screen.queryByText('Please enter a valid password (min length 5 characters)');
      expect(error).not.toBeInTheDocument();
    });
  });

  describe('Sign Up form' , () => {
    beforeEach(() => {
      render(<Auth />);
      const buttonElement = screen.getByText('Create new account');
      userEvent.click(buttonElement);
    });

    test('renders Sign Up form if the button was clicked', () => {
      const signUpElement = screen.getByText('Sign Up');
      expect(signUpElement).toBeInTheDocument();
    });
    test('renders email field', () => {
      const emailLabel = screen.getByLabelText('Your Email');
      expect(emailLabel).toBeInTheDocument();
    });

    test('renders password field', () => {
      const passwordLabel = screen.getByLabelText('Your Password');
      expect(passwordLabel).toBeInTheDocument();
    });

    test('renders full name field', () => {
      const fullNameLabel = screen.queryByLabelText('Your full name');
      expect(fullNameLabel).toBeInTheDocument();
    });

    test('renders role field', () => {
      const roleLabel = screen.queryByLabelText('Your role');
      expect(roleLabel).toBeInTheDocument();
    });

    test('renders email error if email format is invalid', () => {
      const emailInput = screen.getByLabelText('email-input');
      fireEvent.change(emailInput, { target: { value: 'asfdasfd' } });
      fireEvent.focusOut(emailInput);
      const error = screen.queryByText('Please enter a valid email address.');
      expect(error).toBeInTheDocument();
    });

    test('does not render email error if email format is invalid', () => {
      const emailInput = screen.getByLabelText('email-input');
      fireEvent.change(emailInput, { target: { value: 'learner01@example.com' } });
      fireEvent.focusOut(emailInput);
      const error = screen.queryByText('Please enter a valid email address.');
      expect(error).not.toBeInTheDocument();
    });

    test('renders password error if password lenght is not equal or greater than 5 chars', () => {
      const passwordInput = screen.getByLabelText('password-input');
      fireEvent.change(passwordInput, { target: { value: '1234' } });
      fireEvent.focusOut(passwordInput);
      const error = screen.queryByText('Please enter a valid password (min length 5 characters)');
      expect(error).toBeInTheDocument();
    });

    test('does not render password error if password lenght is  equal or greater than 5 chars', () => {
      const passwordInput = screen.getByLabelText('password-input');
      fireEvent.change(passwordInput, { target: { value: '12345' } });
      fireEvent.focusOut(passwordInput);
      const error = screen.queryByText('Please enter a valid password (min length 5 characters)');
      expect(error).not.toBeInTheDocument();
    });

    test('renders full name error if full name is empty', () => {
      const fullNameInput = screen.getByLabelText('fullName-input');
      fireEvent.change(fullNameInput, { target: { value: '' } });
      fireEvent.focusOut(fullNameInput);
      const error = screen.queryByText('Please enter a full name.');
      expect(error).toBeInTheDocument();
    });

    test('does not render full name error if full name is not empty', () => {
      const fullNameInput = screen.getByLabelText('fullName-input');
      fireEvent.change(fullNameInput, { target: { value: 'charlie' } });
      fireEvent.focusOut(fullNameInput);
      const error = screen.queryByText('Please enter a full name.');
      expect(error).not.toBeInTheDocument();
    });
  });
});