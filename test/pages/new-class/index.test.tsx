import { render, screen, fireEvent } from '@testing-library/react';
import NewClassForm from '../../../components/classes/NewClassForm';

describe('Create class page', () => {
  describe('New class form' , () => {

    beforeEach(() => {
      render(<NewClassForm onAddClass={() => {}} />);
    });

    test('renders new class form', () => {
      const createClassLabel = screen.getByText('Create class');
      expect(createClassLabel).toBeInTheDocument();
    });

    test('renders subject field', () => {
      const subjectLabel = screen.getByLabelText('Subject');
      expect(subjectLabel).toBeInTheDocument();
    });

    test('renders start date field', () => {
      const startDateLabel = screen.getByText('Start date');
      expect(startDateLabel).toBeInTheDocument();
    });

    test('renders end date field', () => {
      const endDateLabel = screen.getByText('End date');
      expect(endDateLabel).toBeInTheDocument();
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
});