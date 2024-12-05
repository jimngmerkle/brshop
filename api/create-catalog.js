import https from 'https';
import cors from 'cors';

const BLOOMREACH_PROJECT_ID = process.env.BLOOMREACH_PROJECT_ID;
const BLOOMREACH_API_KEY = process.env.BLOOMREACH_API_KEY;
const BLOOMREACH_API_URL = `https://api-demoapp.exponea.com/data/v2/projects/${BLOOMREACH_PROJECT_ID}/catalogs`;

const corsMiddleware = cors({
  origin: 'http://localhost:5173',
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export default function handler(req, res) {
  console.log('Handler invoked'); // Log when handler is invoked

  corsMiddleware(req, res, () => {
    console.log(`Received ${req.method} request at /api/create-catalog`); // Log request method and endpoint

    if (req.method === 'POST') {
      console.log('Handling POST request'); // Log when handling POST request

      const payload = req.body;
      console.log('Payload:', payload); // Log the payload

      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${BLOOMREACH_API_KEY}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSON.stringify(payload)),
        },
      };

      const apiReq = https.request(BLOOMREACH_API_URL, options, (apiRes) => {
        let apiData = '';
        console.log('Request sent to Bloomreach API'); // Log when request is sent to Bloomreach API

        apiRes.on('data', (chunk) => {
          apiData += chunk;
        });

        apiRes.on('end', () => {
          console.log('Response received from Bloomreach API'); // Log when response is received from Bloomreach API
          console.log('Bloomreach API response status:', apiRes.statusCode); // Log Bloomreach API response status
          console.log('Bloomreach API response data:', apiData); // Log Bloomreach API response data

          if (apiRes.statusCode === 200) {
            res.status(200).json({ success: true, data: apiData });
          } else {
            res.status(apiRes.statusCode).json({ success: false, error: apiData });
          }
        });
      });

      apiReq.on('error', (error) => {
        console.error('Error with Bloomreach API request:', error); // Log error with Bloomreach API request
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      });

      apiReq.write(JSON.stringify(payload));
      apiReq.end();
    } else {
      console.log(`Method ${req.method} not allowed`); // Log when method is not allowed
      console.log('Request Headers:', req.headers); // Log request headers
      console.log('Request URL:', req.url); // Log request URL
      console.log('Request Body:', req.body); // Log request body
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  });
}
