import { optional, standardString, standardKey, region } from './helpers.validators';

/**
 * Create here your own validators
 */
const envValidators = [
  standardString(
    ['clientId'],
    {
      code: 'InValidClientId',
      message: 'Client id should be 24 characters.',
      referencedBy: 'environmentVariables',
    },
    { min: 24, max: 24 }
  ),

  standardString(
    ['clientSecret'],
    {
      code: 'InvalidClientSecret',
      message: 'Client secret should be 32 characters.',
      referencedBy: 'environmentVariables',
    },
    { min: 32, max: 32 }
  ),

  standardKey(['projectKey'], {
    code: 'InvalidProjectKey',
    message: 'Project key should be a valid string.',
    referencedBy: 'environmentVariables',
  }),

  optional(standardString)(
    ['scope'],
    {
      code: 'InvalidScope',
      message: 'Scope should be at least 2 characters long.',
      referencedBy: 'environmentVariables',
    },
    { min: 2, max: undefined }
  ),

  region(['region'], {
    code: 'InvalidRegion',
    message: 'Not a valid region.',
    referencedBy: 'environmentVariables',
  }),

  standardString(
    ['newStoreBaseUrl'],
    {
      code: 'InValidNewStoreBaseUrl',
      message: 'NEW_STORE_BASE_URL should be a string.',
      referencedBy: 'environmentVariables',
    },
    { max: undefined }
  ),
  standardString(
    ['newStoreUsername'],
    {
      code: 'InValidNewStoreUsername',
      message: 'NEW_STORE_USERNAME should be a string.',
      referencedBy: 'environmentVariables',
    },
    { max: undefined }
  ),
  standardString(
    ['newStorePassword'],
    {
      code: 'InValidNewStorePassword',
      message: 'NEW_STORE_PASSWORD should be a string.',
      referencedBy: 'environmentVariables',
    },
    { max: undefined }
  ),
  standardString(
    ['newStoreShop'],
    {
      code: 'InValidNewStoreShop',
      message: 'NEW_STORE_SHOP should be a string.',
      referencedBy: 'environmentVariables',
    },
    { max: undefined }
  ),
];

export default envValidators;
