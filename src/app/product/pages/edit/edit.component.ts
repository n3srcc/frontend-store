import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthTokenService } from '../../../auth.token.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  errorMessage: string | null = null;
  successMessage: string | null = null;
  product!: Product;
  productForm: FormGroup;
  @Input('id') productId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authTokenService: AuthTokenService,
    private router: Router
  ) {
    /*
    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
    });*/
    this.productForm = this.fb.group({
      title: [this.product?.title, Validators.required],
      description: [this.product?.description, Validators.required],
      sku: [this.product?.sku, Validators.required],
      grams: [this.product?.grams, Validators.required],
      stock: [this.product?.stock, Validators.required],
      price: [this.product?.price, Validators.required],
      compare_price: [this.product?.compare_price],
      barcode: [this.product?.barcode],
    });
  }

  ngOnInit(): void {
    if (this.productId === undefined) {
      this.productId = 0;
    }

    if (this.productId != 0) {
      this.http
        .get<any>(`${environment.url}product/${this.productId}`, {
          headers: this.authTokenService.getTokenHeader(),
        })
        .subscribe(
          (data) => {
            this.productForm.patchValue({
              title: data.title,
              description: data.description,
              sku: data.sku,
              grams: data.grams,
              stock: data.stock,
              price: data.price,
              compare_price: data.compare_price,
              barcode: data.barcode,
            });
          },
          (error) => {
            this.errorMessage =
              error.error?.error || 'Error al cargar productos';
            setTimeout(() => {
              this.errorMessage = null;
            }, 6000);
          }
        );
    }
  }

  goBack(): void {
    this.router.navigate(['admin/product/list']);
  }

  onSubmit(): void {
    const product: Product = {
      title: this.productForm.value.title,
      description: this.productForm.value.description,
      sku: this.productForm.value.sku,
      grams: this.productForm.value.grams,
      stock: this.productForm.value.stock,
      price: this.productForm.value.price,
      compare_price: this.productForm.value.compare_price,
      barcode: this.productForm.value.barcode,
    };

    if (this.productForm.valid) {
      if (this.productId != 0) {
        this.http
          .put<any>(`${environment.url}product/${this.productId}`, product, {
            headers: this.authTokenService.getTokenHeader(),
          })
          .subscribe(
            (response) => {
              this.errorMessage = null;
              this.successMessage = `Producto ${response.title} actualizado.`;
              setTimeout(() => {
                this.router.navigate(['admin/product/list']);
              }, 6000);
            },
            (error) => {
              this.errorMessage =
                error.error?.error || 'Error al cargar productos.';
              setTimeout(() => {
                this.errorMessage = null;
              }, 6000);
            }
          );
      } else {
        this.http
          .post<any>(`${environment.url}product`, product, {
            headers: this.authTokenService.getTokenHeader(),
          })
          .subscribe(
            (response) => {
              this.router.navigate(['admin/product/list']);
            },
            (error) => {
              this.errorMessage =
                error.error?.error || 'Error al crear producto.';
              setTimeout(() => {
                this.errorMessage = null;
              }, 6000);
            }
          );

      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
