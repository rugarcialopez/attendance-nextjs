
import { render, screen } from '@testing-library/react';
import ClassDetails from '../../../pages/[classId]';

describe('Edit class page', () => {
  test('renders edit class form', () => {
    const data = {
      id: '60b4b2952d77d67c70e47f11',
      subject: 'English',
      startDate: 'Wed May 05 2021',
      endDate: 'Tue May 25 2021',
      attendanceState: ''
    };
    render(<ClassDetails classData={data}/>);
    const signUpElement = screen.getByText('Edit class');
    expect(signUpElement).toBeInTheDocument();
  });
});