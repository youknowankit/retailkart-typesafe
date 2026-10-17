import "dotenv/config";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!PORT) {
  throw new Error("PORT is not defined in environment variables");
}
if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
if (!NODE_ENV) {
  throw new Error("NODE_ENV is not defined in environment variables");
}
if (!RAZORPAY_KEY_ID) {
  throw new Error("RAZORPAY_KEY_ID is not defined in environment variables");
}
if (!RAZORPAY_KEY_SECRET) {
  throw new Error(
    "RAZORPAY_KEY_SECRET is not defined in environment variables",
  );
}

export const env = {
  PORT: Number(PORT),
  MONGO_URI,
  JWT_SECRET,
  NODE_ENV,
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
};
