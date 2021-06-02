
import { render, screen, fireEvent } from '@testing-library/react';
import ClassDetails from '../../../pages/[classId]';

describe('Edit class page', () => {

  beforeEach(() => {
    const data = {
      id: '60b4b2952d77d67c70e47f11',
      subject: 'English',
      startDate: '2021-05-05',
      endDate: '2021-05-25',
      attendanceState: ''
    };
    render(<ClassDetails classData={data}/>);
  })

  test('renders edit class form', () => {
    const editClassElement = screen.getByText('Edit class');
    expect(editClassElement).toBeInTheDocument();
  });

  test('renders the subject passes as props', () => {
    const subjectInput: any = screen.getByLabelText('subject-input');
    expect(subjectInput.value).toBe('English');
  });

  test('renders the start date passes as props', () => {
    const startDateInput: any = screen.getByLabelText('startDate-input');
    expect(startDateInput.value).toBe('2021-05-05');
  });

  test('renders the end date passes as props', () => {
    const endDateInput: any = screen.getByLabelText('startDate-input');
    expect(endDateInput.value).toBe('2021-05-05');
  });

  test('renders subject error if subject is empty', () => {
    const subjectInput = screen.getByLabelText('subject-input');
    fireEvent.change(subjectInput, { target: { value: '' } });
    fireEvent.focusOut(subjectInput);
    const error = screen.queryByText('Please enter a subject.');
    expect(error).toBeInTheDocument();
  });

  test('renders start date error if start date is empty', () => {
    const startDateInput = screen.getByLabelText('startDate-input');
    fireEvent.change(startDateInput, { target: { value: '' } });
    fireEvent.focusOut(startDateInput);
    const error = screen.queryByText('Please enter a valid start date.');
    expect(error).toBeInTheDocument();
  });

  test('renders end date error if end date is empty', () => {
    const endDateInput = screen.getByLabelText('endDate-input');
    fireEvent.change(endDateInput, { target: { value: '' } });
    fireEvent.focusOut(endDateInput);
    const error = screen.queryByText('Please enter a valid end date.');
    expect(error).toBeInTheDocument();
  });
});