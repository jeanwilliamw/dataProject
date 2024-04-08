export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface CompleteUser extends Omit<User, 'id'> {
  password: string;
}
