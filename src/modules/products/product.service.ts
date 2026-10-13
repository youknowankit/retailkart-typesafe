import CustomError from "#shared/utils/CustomError.js";
import { isValidObjectId } from "mongoose";
import Product from "./product.model.js";
import type { CreateProductData, UpdateProductData } from "./product.schema.js";
import type { IProduct } from "./product.types.js";

export const createProduct = async (
  productData: CreateProductData,
): Promise<IProduct> => {
  const product = await Product.create(productData);

  return product.toObject();
};

/*IProduct[]-> because we are returning an array of products
Promise<IProduct[]>
   ↓
an asynchronous operation that eventually
returns many products
*/
export const getProducts = async (): Promise<IProduct[]> => {
  const products = await Product.find();

  return products.map((product) => product.toObject());
};

export const getProductById = async (productId: string): Promise<IProduct> => {
  if (!isValidObjectId(productId)) {
    throw new CustomError("Invalid product ID", 400);
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  return product.toObject();
};

export const updateProduct = async (
  productId: string,
  productData: UpdateProductData,
): Promise<IProduct> => {
  if (!isValidObjectId(productId)) {
    throw new CustomError("Invalid product ID", 400);
  }

  const product = await Product.findByIdAndUpdate(productId, productData, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!product) {
    throw new CustomError("Product not found", 400);
  }

  return product.toObject();
};

export const deleteProduct = async (productId: string) => {
  if (!isValidObjectId(productId)) {
    throw new CustomError("Invalid Product ID", 400);
  }

  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  return product.toObject();
};
