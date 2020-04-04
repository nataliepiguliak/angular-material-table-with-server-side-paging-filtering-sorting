import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetRecipesResponse } from '../models/get-recipes-response';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(public httpClient: HttpClient) {}

  getRecipes(
    filter: string,
    sortColumn: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number,
  ): Observable<GetRecipesResponse> {
    return this.httpClient.get<GetRecipesResponse>('/api/recipes', {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortColumn', sortColumn)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString()),
    });
  }
}
