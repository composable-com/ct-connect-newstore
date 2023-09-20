import 'dotenv/config';
import CustomError from '../errors/custom.error';
import envValidators from '../validators/env.validators';
import { getValidateMessages } from '../validators/helpers.validators';

/**
 * Read the configuration env vars
 * (Add yours accordingly)
 *
 * @returns The configuration with the correct env vars
 */
export const readConfiguration = () => {
  const envVars = {
    clientId: process.env.CTP_CLIENT_ID as string,
    clientSecret: process.env.CTP_CLIENT_SECRET as string,
    projectKey: process.env.CTP_PROJECT_KEY as string,
    scope: process.env.CTP_SCOPE,
    region: process.env.CTP_REGION as string,
    newStoreBaseUrl: process.env.NEW_STORE_BASE_URL as string,
    newStoreUsername: process.env.NEW_STORE_USERNAME as string,
    newStorePassword: process.env.NEW_STORE_PASSWORD as string,
    newStoreShop: process.env.NEW_STORE_SHOP as string,
    fallbackLocale: (process.env.FALLBACK_LOCALE as string | undefined) || 'en-US',
  };

  const validationErrors = getValidateMessages(envValidators, envVars);

  if (validationErrors.length) {
    throw new CustomError(
      'InvalidEnvironmentVariablesError',
      'Invalid Environment Variables please check your .env file',
      validationErrors
    );
  }

  return envVars;
};