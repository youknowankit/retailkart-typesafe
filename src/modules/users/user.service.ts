import CustomError from "#shared/utils/CustomError.js";
import generateToken from "#shared/utils/generateToken.js";
import User from "./user.model.js";
import type {
  LoginData,
  SignupData,
  UpdateProfileData,
} from "./user.schema.js";
import type { LoginResponse, UserResponse } from "./user.types.js";
import bcrypt from "bcrypt";
import { toUserResponse } from "./user.utils.js";

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
  });

  return { user: toUserResponse(user.toObject()), token };
};

export const getCurrentUser = async (userId: string): Promise<UserResponse> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  //needed only when we need to manipulate the user
  // const userObject = user.toObject(); //converts to plan JS object from Mongoose Document

  return toUserResponse(user.toObject());
};

export const updateProfile = async (
  userId: string,
  userData: UpdateProfileData,
): Promise<UserResponse> => {
  /*
  findByIdAndUpdate: updates only the required fields and does not replace the entire document.
  new: true => Give me the updated document instead of the old document
  runValidators: true =>Run the Mongoose schema's validators during this update.

  Zod-> HTTP input validation
  Mongoose -> database/model validation

  they are two different safety boundaries
  */
  const user = await User.findByIdAndUpdate(userId, userData, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  return toUserResponse(user.toObject());
};
