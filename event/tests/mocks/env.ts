export const mockEnvironmentVariables = () => {
  process.env.CTP_CLIENT_ID = 'xxxxxxxxxxxxxxxxxxxxxxxx';
  process.env.CTP_CLIENT_SECRET = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  process.env.CTP_PROJECT_KEY = 'xxxxxxxxxxx';
  process.env.CTP_SCOPE = 'xxxxxxxxxxx';
  process.env.CTP_REGION = 'us-central1.gcp';
  process.env.NEW_STORE_BASE_URL = 'https://test.newstore.net';
  process.env.NEW_STORE_USERNAME = 'xxxxxxxxxxx';
  process.env.NEW_STORE_PASSWORD = 'xxxxxxxxxxx';
  process.env.NEW_STORE_SHOP = 'xxxxxxxxxxx';
};
