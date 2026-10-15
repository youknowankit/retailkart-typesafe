import type { Types } from "mongoose";

export interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export type OrderStatus = "pending" | "shipped" | "delivered";

export interface IOrder {
  user: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  address: string;
  paymentId?: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
