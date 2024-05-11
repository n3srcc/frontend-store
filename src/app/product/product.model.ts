import { SafeHtml } from "@angular/platform-browser";

export interface Product {
  id: number;
  handle: string;
  title: string;
  description: any;
  sku: string;
  grams: number;
  stock: number;
  price: number;
  compare_price: number;
  barcode: string;
  createdAt: string;
  updatedAt: string;
}
