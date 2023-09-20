import 'dotenv/config';
import app from './app';
import { readConfiguration } from './utils/config.utils';
import { logger } from './utils/logger.utils';

// Read env variables
readConfiguration();

const PORT = 8080;

// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️ Job application listening on port ${PORT}`);
});

export default server;
