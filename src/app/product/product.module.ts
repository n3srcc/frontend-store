import { ProductsComponent } from './products.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { AuthorizationService } from '../service/authorization/authorization.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, NgxPaginationModule],
  declarations: [ProductsComponent],
  providers: [ProductService, AuthorizationService],
  exports: [ProductsComponent],
})
export class ProductModule {}
