import { render, screen } from '@testing-library/react';
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

  test('renders the classes names when there are classes', () => {
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
    const englishSubjectElement = screen.getByText('English');
    expect(englishSubjectElement).toBeInTheDocument();
    const scienceSubjectElement = screen.getByText('Science');
    expect(scienceSubjectElement).toBeInTheDocument();
  });

  test('renders the classes dates when there are classes', () => {
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


});