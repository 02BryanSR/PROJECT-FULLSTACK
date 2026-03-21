import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryCreate, CategoryModel } from './category.api';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly baseUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  findAll(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.baseUrl);
  }

  create(dto: CategoryCreate): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(this.baseUrl, dto);
  }

  update(id: number, dto: CategoryCreate): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${this.baseUrl}/update/${id}`, dto);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
}
