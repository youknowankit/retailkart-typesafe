import type { IUser, UserResponse } from "./user.types.js";

export const toUserResponse = (user: IUser): UserResponse => {
  const {
    password: _password,
    otp: _otp,
    otpExpiry: _otpExpiry,
    ...userResponse
  } = user;

  return userResponse;
};
