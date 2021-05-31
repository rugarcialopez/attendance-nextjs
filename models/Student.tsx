export enum AttendaceState {
  PENDING = 'Pending approve',
  APPROVED =  'Approved',
  REJECTED = 'Rejected'
}

class Student {
  id: string;
  fullName: string;
  state: string;

  constructor(id: string, fullName: string, state: string) {
    this.id = id;
    this.fullName = fullName;
    this.state = state;
  }
}

export default Student;