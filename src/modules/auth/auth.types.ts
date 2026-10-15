import type { UserResponse } from "#modules/users/user.types.js";

// //Login User: zod handles now
// export interface LoginUserData {
//   email: string;
//   password: string;
// }
export interface LoginResponse {
  user: UserResponse;
  token: string;
}
