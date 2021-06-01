import { waitFor, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Classes from '../../../pages/classes';
describe('Classes page', () => {
  test('renders No classes found! as a text when there are no classes', () => {
    const classes = [];
    render(<Classes classList={classes}/>);
    const noClassesElement = screen.getByText('No classes found!');
    expect(noClassesElement).toBeInTheDocument();
  });

  test('renders Add a Class link when there are no classes', () => {
    const classes = [];
    render(<Classes classList={classes}/>);
    const addClasslement = screen.getByText('Add a Class');
    expect(addClasslement).toBeInTheDocument();
  });

  test('renders classes names when there are classes', () => {
    const classes = [
      {
        id: '60b4b2952d77d67c70e47f11',
        subject: 'English',
        startDate: 'Wed May 05 2021',
        endDate: 'Tue May 25 2021',
        attendanceState: 'Pending approve'
      },
      {
        id: '60b4fc1ce1f29f0008c25ebe',
        subject: 'Science',
        startDate: 'Thu May 20 2021',
        endDate: 'Sun May 30 2021',
        attendanceState: ''
      } 
  ];
    render(<Classes classList={classes}/>);
    const englishSubjectElement = screen.getByText('English');
    expect(englishSubjectElement).toBeInTheDocument();
    const scienceSubjectElement = screen.getByText('Science');
    expect(scienceSubjectElement).toBeInTheDocument();
  });

  test('renders classes dates when there are classes', () => {
    const classes = [
      {
        id: '60b4b2952d77d67c70e47f11',
        subject: 'English',
        startDate: 'Wed May 05 2021',
        endDate: 'Tue May 25 2021',
        attendanceState: ''
      },
      {
        id: '60b4fc1ce1f29f0008c25ebe',
        subject: 'Science',
        startDate: 'Thu May 20 2021',
        endDate: 'Sun May 30 2021',
        attendanceState: ''
      } 
  ];
    render(<Classes classList={classes}/>);
    const englishStartDateElement = screen.getByText('Wed May 05 2021', { exact: false });
    expect(englishStartDateElement).toBeInTheDocument();
    const englishEndDateElement = screen.getByText('Tue May 25 2021', { exact: false });
    expect(englishEndDateElement).toBeInTheDocument();
    const scienceStartDateElement = screen.getByText('Thu May 20 2021', { exact: false });
    expect(scienceStartDateElement).toBeInTheDocument();
    const scienceEndDateElement = screen.getByText('Sun May 30 2021', { exact: false });
    expect(scienceEndDateElement).toBeInTheDocument();
  });

  describe('Students', () => {

    beforeAll(() => {
      window.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          json: async () => { return  { isLoggedIn: true, id: '60af9d9201351e3bee93f95a', fullName: 'learner one', role: 'student' } }
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => { return  { message: 'success' } }
        });

    });

    test('renders attend button', async () => {
      const classes = [
        {
          id: '60b4b2952d77d67c70e47f11',
          subject: 'English',
          startDate: 'Wed May 05 2021',
          endDate: 'Tue May 25 2021',
          attendanceState: ''
        }
      ];
      render(<Classes classList={classes}/>);
      await waitFor(() => {
        expect(screen.getByText('Attended')).toBeInTheDocument();
      });
    });

    test('renders disabled attend button if student click on attend button', async () => {
      const classes = [
        {
          id: '60b4b2952d77d67c70e47f11',
          subject: 'English',
          startDate: 'Wed May 05 2021',
          endDate: 'Tue May 25 2021',
          attendanceState: ''
        }
      ];
      render(<Classes classList={classes} />);
      await waitFor(() => {
        expect(screen.getByText('Attended')).toBeInTheDocument();
      });
      expect(screen.getByText('Attended')).not.toBeDisabled();
      const attendButton = screen.getByText('Attended');
      userEvent.click(attendButton);
      expect(screen.getByText('Attended')).toBeDisabled();
    });

    test('renders disabled attend button when student has attended the course', async () => {
      const classes = [
        {
          id: '60b4b2952d77d67c70e47f11',
          subject: 'English',
          startDate: 'Wed May 05 2021',
          endDate: 'Tue May 25 2021',
          attendanceState: 'Pending approve'
        }
      ];
      render(<Classes classList={classes}/>);
      await waitFor(() => {
        expect(screen.getByText('Attended')).toBeDisabled();
      });
    });

    test('does not render edit button', async () => {
      const classes = [
        {
          id: '60b4b2952d77d67c70e47f11',
          subject: 'English',
          startDate: 'Wed May 05 2021',
          endDate: 'Tue May 25 2021',
          attendanceState: 'Pending approve'
        }
      ];
      render(<Classes classList={classes}/>);
      await waitFor(() => {
        expect(screen.getByText('Attended')).toBeDisabled();
      });
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    });

    test('does not render approve/reject button', async () => {
      const classes = [
        {
          id: '60b4b2952d77d67c70e47f11',
          subject: 'English',
          startDate: 'Wed May 05 2021',
          endDate: 'Tue May 25 2021',
          attendanceState: 'Pending approve'
        }
      ];
      render(<Classes classList={classes}/>);
      await waitFor(() => {
        expect(screen.getByText('Attended')).toBeDisabled();
      });
      expect(screen.queryByText('Approve/Reject')).not.toBeInTheDocument();
    });
  });


});