import createClient from "../src/index"
import dotenv from "dotenv"

dotenv.config({ path: ".env.test" })

const client = createClient({
    baseUrl: process.env.BASE_URL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
})

const main = async () => {
    const res = await client.get("/orders/v0/orders", {})
    console.log(res)
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})


// Export authToken for testing purposes
export let authToken: string | undefined = undefined;

// Export createClient function for testing purposes
export const createApiClient = createClient as jest.MockedFunction<typeof createClient>;

export default createClient<paths>({
  baseUrl: 'https://myapi.dev/v1/',
  headers: {
    get Authorization() {
      return authToken ? `Bearer ${authToken}` : undefined;
    },
  },
});

// Mock the someAuthMethod function
jest.mock('./path-to-someAuthMethod');

describe('API Client', () => {
  it('should set the Authorization header when authToken is defined', () => {
    authToken = 'mockedAuthToken';

    // Make sure the createClient function is called with the expected headers
    const apiClient = require('./index').default;
    expect(createApiClient).toHaveBeenCalledWith<paths>({
      baseUrl: 'https://myapi.dev/v1/',
      headers: {
        Authorization: 'Bearer mockedAuthToken',
      },
    });

    // Reset the authToken after the test
    authToken = undefined;
  });

  it('should not set the Authorization header when authToken is undefined', () => {
    authToken = undefined;

    // Make sure the createClient function is called without the Authorization header
    const apiClient = require('./index').default;
    expect(createApiClient).toHaveBeenCalledWith<paths>({
      baseUrl: 'https://myapi.dev/v1/',
      headers: {},
    });
  });
});

