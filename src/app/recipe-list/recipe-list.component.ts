import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { RecipeDatasource } from '../services/recipe.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, AfterViewInit {
  dataSource: RecipeDatasource;

  gridColumns = ['name', 'ingredients', 'steps'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  recipesFilter = '';

  constructor(public recipeService: RecipeService) {}

  ngOnInit() {
    this.dataSource = new RecipeDatasource(this.recipeService);
    this.dataSource.getRecipes('', '', 'asc', 0, 3);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadRecipes()))
      .subscribe();
  }

  recipesFilterChange() {
    this.paginator.pageIndex = 0;
    this.loadRecipes();
  }

  loadRecipes() {
    this.dataSource.getRecipes(
      this.recipesFilter,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
    );
  }
}
