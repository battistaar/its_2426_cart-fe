import { Product } from "./product.entity";

export type CartItem = {
  quantity: number;
  product: Product;
  id: string;
}
