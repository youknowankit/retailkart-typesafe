//User
export interface IUser {
  firstName: string;
  lastName: string;

  profilePic?: string;
  profilePicPublicId?: string;

  email: string;
  password: string;

  role: "user" | "admin";

  isVerified: boolean;
  isLoggedIn: boolean;

  otp?: string | null;
  otpExpiry?: Date | null;

  address?: string;
  city?: string;
  zipCode?: string;
  phoneNo?: string;

  createdAt: Date;
  updatedAt: Date;
}

// //Create User: Removed as Zod handles the type inference
// export type CreateUserData = Pick<
//   IUser,
//   "firstName" | "lastName" | "email" | "password"
// >;
export type UserResponse = Omit<IUser, "password" | "otp" | "otpExpiry">;

// //Login User: zod handles now
// export interface LoginUserData {
//   email: string;
//   password: string;
// }
export interface LoginResponse {
  user: UserResponse;
  token: string;
}
