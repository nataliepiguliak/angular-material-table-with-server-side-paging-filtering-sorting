import { Recipe } from './recipe';

export interface GetRecipesResponse {
  page: Recipe[];
  total: number;
}
