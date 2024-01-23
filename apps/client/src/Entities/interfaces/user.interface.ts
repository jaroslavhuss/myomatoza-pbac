export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  authLevel: string;
  refresh_token: string;
  createdAt: Date;
  updatedAt: Date;
  isUserApproved: boolean;
} //
