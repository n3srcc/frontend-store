
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListComponent } from './pages/list/list.component';
import { EditComponent } from './pages/edit/edit.component';
import { ProductsRoutingModule } from './product.routing.module';

@NgModule({
  declarations: [ListComponent, EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ProductModule {}
