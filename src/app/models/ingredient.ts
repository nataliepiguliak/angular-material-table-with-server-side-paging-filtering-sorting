import { IngredientType } from '../enums/ingredient-type';

export interface Ingredient {
  quantity: string;
  name: string;
  type: IngredientType;
}
