import { Category } from "./category";
import  { ProductImage } from "./productImage";

export type Product = {
  id: number;
  category?: Category;
  name: string;
  description: string;
  images: ProductImage[];
  price: number;
}

export type Products = {
  current_page: number;
  pages: number;
  products: Product[];
  total: number;
}