class Class {
  id?: string;
  subject: string;
  startDate: string;
  endDate: string;
  attendanceState?: string;

  constructor(id: string, subject: string, startDate: string, endDate: string, attendanceState: string) {
    this.id = id;
    this.subject = subject;
    this.startDate =  startDate;
    this.endDate = endDate;
    this.attendanceState =  attendanceState;
  }
}

export default Class;