import * as express from 'express';
import { Application } from 'express';
import { getRecipes } from './api/recipes';

import * as config from './config.json';

const app: Application = express();

app.route('/api/recipes').get(getRecipes);

app.listen(config.server.port, () => {
  console.log(`Server running at http://localhost:${config.server.port}`);
});
