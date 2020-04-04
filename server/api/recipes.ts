import { Request, Response } from 'express';
import * as data from '../data/recipes.json';

export function getRecipes(req: Request, res: Response) {
  const filter = req.query.filter;
  const sortOrder = req.query.sortOrder;
  let sortColumn = req.query.sortColumn;
  const pageNumber = parseInt(req.query.pageNumber, 10);
  const pageSize = parseInt(req.query.pageSize, 10);

  let recipes = data;

  if (filter) {
    const filteredByName = data.filter(
      recipe =>
        recipe.name
          .trim()
          .toLowerCase()
          .search(filter.toLowerCase()) >= 0,
    );

    const filteredByIngredients = data.filter(recipe =>
      recipe.ingredients.some(ingredient => {
        return (
          ingredient.name
            .trim()
            .toLowerCase()
            .search(filter.toLowerCase()) >= 0
        );
      }),
    );

    const filteredBySteps = data.filter(recipe =>
      recipe.steps.some(step => {
        return (
          step
            .trim()
            .toLowerCase()
            .search(filter.toLowerCase()) >= 0
        );
      }),
    );

    const filteredRecipes = [
      ...filteredByName,
      ...filteredByIngredients,
      ...filteredBySteps,
    ];

    recipes = filteredRecipes.filter((v, i, a) => a.indexOf(v) === i);
  }

  if (!sortColumn) {
    sortColumn = 'name';
  }

  const nameComparator =
    sortOrder === 'desc'
      ? (a, b) => (a.name === b.name ? 0 : a.name > b.name ? -1 : 1)
      : (a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1);

  switch (sortColumn) {
    case 'name':
      recipes = recipes.sort(nameComparator);
      break;

    default:
      throw new Error(
        `Sorting for column ${sortColumn} is not implemented on the backend.`,
      );
  }

  const initialPos = pageNumber * pageSize;
  const page = recipes.slice(initialPos, initialPos + pageSize);
  const total = recipes.length;

  res.status(200).json({ page, total });
}
