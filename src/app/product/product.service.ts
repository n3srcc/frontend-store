import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.url}user/auth`, { username, password });
  }

  getProducts(page: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get<any>(`${environment.url}product?page=${page}&pageSize=${pageSize}`, { headers });
  }
  updateProduct(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.put<any>(`${environment.url}product/${id}`, { headers });
  }

  deleteProduct(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.delete<any>(`${environment.url}product/${id}`, { headers });
  }
}


