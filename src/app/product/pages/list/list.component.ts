import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthTokenService } from './../../../auth.token.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit{
  products: any[] = [];
  pagination = { totalCount: 0 };
  currentPage = 1;
  pageSize = 20;

  constructor (private authTokenService: AuthTokenService, private http: HttpClient){ }
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.http.get<any>(`${environment.url}product?page=${this.currentPage}&pageSize=${this.pageSize}`, { headers: this.authTokenService.getTokenHeader() }).subscribe(
      (response) => {
        this.products = response.products;
        this.pagination.totalCount = response.totalCount;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }
}
