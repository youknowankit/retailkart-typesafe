import type { Types } from "mongoose";

export interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export type OrderStatus = "pending" | "shipped" | "delivered";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface IOrder {
  user: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  address: string;
  razorpayOrderId?: string;
  paymentId?: string;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
