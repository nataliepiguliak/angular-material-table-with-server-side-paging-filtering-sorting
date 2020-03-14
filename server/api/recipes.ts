import { Request, Response } from 'express';
import { setTimeout } from 'timers';

import * as recipes from '../data/recipes.json';

// export function getRecipes(req: Request, res: Response) {
//   const filter = req.query.filter;
//   const sortOrder = req.query.sortOrder;
//   const pageNumber = parseInt(req.query.pageNumber);
//   const pageSize = parseInt(req.query.pageSize);

//   setTimeout(() => {
//     res.status(200).json(recipes);
//   }, 1000);
// }

export function getRecipes(req: Request, res: Response) {
  setTimeout(() => {
    res.status(200).json(recipes);
  }, 1000);
}
