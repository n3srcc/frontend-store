import { SafeHtml } from "@angular/platform-browser";

export interface Product {
  title: string;
  description: any;
  sku: string;
  grams: number;
  stock: number;
  price: number;
  compare_price: number;
  barcode: string;
}
