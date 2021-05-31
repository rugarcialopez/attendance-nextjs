class SignUp {
  fullName: string;
  email: string;
  password: string;
  role: string;

  constructor(fullName: string, email: string, password: string, role: string) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

export default SignUp;