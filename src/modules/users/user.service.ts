import CustomError from "#shared/utils/CustomError.js";
import User from "./user.model.js";
import type { UpdateProfileData } from "./user.schema.js";
import type { UserResponse } from "./user.types.js";
import { toUserResponse } from "./user.utils.js";

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
