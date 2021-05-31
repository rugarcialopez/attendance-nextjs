
import { render, screen } from '@testing-library/react';
import Home  from '../../pages/index';

describe('Home page', () => {
  test('renders Welcome to attendance app! as a text', () => {
    render(<Home />);
    const welcomeElement = screen.getByText('Welcome to attendance app!');
    expect(welcomeElement).toBeInTheDocument();
  });
});