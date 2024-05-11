import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListComponent } from './pages/list/list.component';
import { EditComponent } from './pages/edit/edit.component';
import { CreateComponent } from './pages/create/create.component';
import { ProductsRoutingModule } from './product.routing.module';

@NgModule({
  declarations: [ListComponent, EditComponent, CreateComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, NgxPaginationModule, ProductsRoutingModule],
})
export class ProductModule {}
