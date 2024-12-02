import https from 'https';
import cors from 'cors';

const BLOOMREACH_PROJECT_ID = process.env.BLOOMREACH_PROJECT_ID;
const BLOOMREACH_API_KEY = process.env.BLOOMREACH_API_KEY;
const BLOOMREACH_API_URL = `https://api-demoapp.exponea.com/data/v2/projects/${BLOOMREACH_PROJECT_ID}/consent/categories`;

const corsMiddleware = cors({
  origin: 'http://localhost:5173', 
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export default function handler(req, res) {
  corsMiddleware(req, res, () => {
    if (req.method === 'GET') {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${BLOOMREACH_API_KEY}`,
          'Content-Type': 'application/json',
        },
      };

      console.log('Making request to:', BLOOMREACH_API_URL);
      console.log('Request options:', options);

      const apiReq = https.request(BLOOMREACH_API_URL, options, (apiRes) => {
        let apiData = '';
        apiRes.on('data', (chunk) => {
          apiData += chunk;
        });
        apiRes.on('end', () => {
          if (apiRes.statusCode === 200) {
            console.log('Response data:', apiData);
            res.status(200).json({ success: true, data: apiData });
          } else {
            res.status(apiRes.statusCode).json({ success: false, error: apiData });
          }
        });
      });

      apiReq.on('error', (error) => {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      });

      apiReq.end();
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  });
}