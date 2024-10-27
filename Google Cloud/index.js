const { GoogleAuth } = require('google-auth-library');

/**
 * Generates an OAuth 2.0 access token for BigQuery access using Application Default Credentials.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
exports.generateOAuthToken = async (req, res) => {
  try {
    console.log('Initializing GoogleAuth client...');

    // Initialize GoogleAuth without hardcoded credentials
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/bigquery'],
    });
    console.log('GoogleAuth client initialized.');

    console.log('Acquiring client...');
    const client = await auth.getClient();
    console.log(`Client acquired: ${client.email}`);

    console.log('Fetching access token...');
    const accessTokenResponse = await client.getAccessToken();
    console.log('Access token fetched:', accessTokenResponse);

    if (!accessTokenResponse.token) {
      throw new Error('Failed to obtain access token.');
    }

    res.status(200).json({
      access_token: accessTokenResponse.token,
      expiry_date: accessTokenResponse.expiry_date || null,
    });
  } catch (err) {
    console.error('Error generating token:', err);
    res.status(500).json({
      error: 'Error generating token',
      details: err.message,
    });
  }
};
