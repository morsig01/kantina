import { Image } from "sanity";

export interface Product {
  _id: string;
  title: string;
  price: number;
  image?: Image;
  category?: string;
  description?: string;
  _createdAt: string;
}
