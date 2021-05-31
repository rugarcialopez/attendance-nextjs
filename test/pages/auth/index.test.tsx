
import { render, screen } from '@testing-library/react';
import Auth from '../../../pages/auth/index';

describe('Login page', () => {
  test('renders login form', () => {
    render(<Auth />);
    const signUpElement = screen.getByText('Sign In');
    expect(signUpElement).toBeInTheDocument();
  });
});