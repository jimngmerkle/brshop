import https from 'https';
import cors from 'cors';

const BLOOMREACH_PROJECT_ID = process.env.BLOOMREACH_PROJECT_ID;
const BLOOMREACH_API_KEY = process.env.BLOOMREACH_API_KEY;

const corsMiddleware = cors({
  origin: 'http://localhost:5173',
  methods: ['PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export default function handler(req, res) {
  console.log('Handler called'); // Log to check if handler is called

  corsMiddleware(req, res, () => {
    console.log('CORS middleware executed'); // Log to check if CORS middleware is executed

    if (req.method === 'PUT') {
      console.log('PUT method detected'); // Log to check if PUT method is detected

      const { catalogId } = req.query;
      console.log('Catalog ID:', catalogId); // Log the catalog ID

      const payload = req.body;
      console.log('Payload:', payload); // Log the payload

     // const BLOOMREACH_API_URL = `https://api-demoapp.exponea.com/data/v2/projects/${BLOOMREACH_PROJECT_ID}/catalogs/${catalogId}/items`;
      const BLOOMREACH_API_URL = `https://api-demoapp.exponea.com/data/v2/projects/${BLOOMREACH_PROJECT_ID}/catalogs/6756c3ad0fa3bc09159600ed/items`;
      console.log('Bloomreach API URL:', BLOOMREACH_API_URL); // Log the API URL

      const options = {
        method: 'PUT',
        headers: {
          'Authorization': `Basic ${BLOOMREACH_API_KEY}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSON.stringify(payload)),
        },
      };

      const apiReq = https.request(BLOOMREACH_API_URL, options, (apiRes) => {
        let apiData = '';
        console.log('API request made'); // Log to check if API request is made

        apiRes.on('data', (chunk) => {
          apiData += chunk;
        });

        apiRes.on('end', () => {
          console.log('API response received'); // Log to check if API response is received
          console.log('API response status code:', apiRes.statusCode); // Log the status code
          console.log('API response data:', apiData); // Log the response data

          if (apiRes.statusCode === 200) {
            res.status(200).json({ success: true, data: apiData });
          } else {
            res.status(apiRes.statusCode).json({ success: false, error: apiData });
          }
        });
      });

      apiReq.on('error', (error) => {
        console.error('API request error:', error); // Log any API request error
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      });

      apiReq.write(JSON.stringify(payload));
      apiReq.end();
    } else {
      console.log('Invalid method:', req.method); // Log invalid method
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  });
}