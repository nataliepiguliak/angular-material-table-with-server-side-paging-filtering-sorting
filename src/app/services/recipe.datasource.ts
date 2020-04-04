import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Recipe } from '../models/recipe';
import { RecipeService } from './recipe.service';

export class RecipeDatasource implements DataSource<Recipe> {
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public total$ = this.totalSubject.asObservable();

  constructor(private recipesService: RecipeService) {}

  getRecipes(
    filter: string,
    sortColumn: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
  ) {
    this.loadingSubject.next(true);

    this.recipesService
      .getRecipes(filter, sortColumn, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of({ page: [], total: 0 })),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe(response => {
        this.recipesSubject.next(response.page);
        this.totalSubject.next(response.total);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Recipe[]> {
    return this.recipesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.recipesSubject.complete();
    this.loadingSubject.complete();
    this.totalSubject.complete();
  }
}
