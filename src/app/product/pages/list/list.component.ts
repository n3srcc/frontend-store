import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthTokenService } from './../../../auth.token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  products: any[] = [];
  file!: File;
  totalCount = 0;
  currentPage = 1;
  pageSize = 20;
  deleteProductId = 0;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private authTokenService: AuthTokenService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  onPageChange(number: number): void {
    this.currentPage = number;
    this.loadProducts();
  }

  loadProducts(): void {
    this.http
      .get<any>(
        `${environment.url}product?page=${this.currentPage}&pageSize=${this.pageSize}`,
        { headers: this.authTokenService.getTokenHeader() }
      )
      .subscribe(
        (response) => {
          this.products = response.products;
          this.totalCount = response.totalCount;
        },
        (error) => {
          console.error('Error al cargar productos:', error);
        }
      );
  }

  deleteProduct(): void {
    this.http
      .delete<any>(`${environment.url}product/${this.deleteProductId}`, {
        headers: this.authTokenService.getTokenHeader(),
      })
      .subscribe(
        (response) => {
          this.closeModal();
          this.loadProducts();
        },
        (error) => {
          console.error('Error al eliminar producto:', error);
        }
      );
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  submitImportForm(importForm: NgForm): void {
    if (importForm.value.file) {
      const formData: FormData = new FormData();
      formData.append('file', this.file);
      this.http
        .post<any>(`${environment.url}product/import`, formData, {
          headers: this.authTokenService.getTokenHeader(),
        })
        .subscribe(
          (response) => {
            this.errorMessage = null;
            this.successMessage =
              response?.message || 'Archivo de productos importado.';
            setTimeout(() => {
              this.successMessage = null;
            }, 6000);
            this.loadProducts();
            this.closeModal();
            importForm.reset();
          },
          (error) => {
            this.errorMessage =
              error.error?.error || 'Error al importar productos.';
            setTimeout(() => {
              this.errorMessage = null;
            }, 6000);
          }
        );
    }
  }

  editProduct(id: number): void {
    this.router.navigate([`admin/product/edit/${id}`]);
  }

  closeModal(): void {
    $('#confirmationModal').modal('hide');
    $('#importProductModal').modal('hide');
  }

  askConfirmDelete(id: number): void {
    this.deleteProductId = id;
    $('#confirmationModal').modal('show');
  }

  importProducts(): void {
    $('#importProductModal').modal('show');
  }
}
