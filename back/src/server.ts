import 'express-async-errors';
import { appConfig } from './config/app';

import app from './app';
import { AppDataSource } from './config/data-source';
import { appWorkLogger } from './utils/logger';

AppDataSource.initialize()
  .then(async () => {
    app.listen(appConfig.port, () => {
      appWorkLogger.info(`app running on port ${appConfig.port}...`);
    });
  })
  .catch((error) => appWorkLogger.error('Error: ', error));
