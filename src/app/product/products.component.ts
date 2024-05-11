import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  pagination = { totalCount: 0 };
  currentPage = 1;
  pageSize = 20;

  constructor(private productService: ProductService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.products = response.products;
        this.pagination.totalCount = response.totalCount;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  editProduct(id: number): void {
    this.productService.updateProduct(id).subscribe(
      (response) => {
        this.products = response.products;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.loadProducts();
      },
      (error) => {
        console.error('Error al eliminar producto:', error);
      }
    );
  }
}
