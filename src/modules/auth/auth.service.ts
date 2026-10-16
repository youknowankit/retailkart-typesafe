import bcrypt from "bcrypt";
import type { LoginData, SignupData } from "./auth.schema.js";
import type { UserResponse } from "#modules/users/user.types.js";
import type { LoginResponse } from "./auth.types.js";
import User from "#modules/users/user.model.js";
import CustomError from "#shared/utils/CustomError.js";
import { toUserResponse } from "#modules/users/user.utils.js";
import generateToken from "#shared/utils/generateToken.js";

export const createUser = async (
  userData: SignupData,
): Promise<UserResponse> => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new CustomError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await User.create({ ...userData, password: hashedPassword });

  /*
  Created a utility to handle the password removal
  const userObject = user.toObject();

  //destructure the userObject and collect the properties inside the userResponse -password
  const { password: _password, ...userResponse } = userObject;

  //Failed as TS not allowing to delete a property as the type is already fixed
  //   delete userObject.password;

  return userResponse;

  */

  /*Why toObject()? because mongoose document has mongoose functionality attached to it such as: user.save(), user.toObject(), user.toJSON(), it is not simple JS object, toObject() gives us plain JS object containing only the userData */
  return toUserResponse(user.toObject());
};

export const loginUser = async (
  userData: LoginData,
): Promise<LoginResponse> => {
  const user = await User.findOne({ email: userData.email }).select(
    "+password",
  );
  if (!user) {
    throw new CustomError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(
    userData.password,
    user.password,
  );
  if (!isPasswordCorrect) {
    throw new CustomError("Invalid email or password", 401);
  }

  /*Utility handles now: toUserResponse
    const userObject = user.toObject();
    const { password: _password, ...userResponse } = userObject; 
  */

  const token = generateToken({
    id: user._id.toString(),
    role: user.role,
  });

  return { user: toUserResponse(user.toObject()), token };
};
