class User {
  id: string;
  fullName: string;
  role: string;
  isLoggedIn?: boolean;

  constructor(id: string, fullName: string, role: string, isLoggedIn) {
    this.id = id;
    this.fullName = fullName;
    this.role = role;
    this.isLoggedIn = isLoggedIn;
  }
}

export default User;