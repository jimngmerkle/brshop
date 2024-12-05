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

  corsMiddleware(req, res, () => {
 
    if (req.method === 'PUT') {
      const { catalogId } = req.query;  
      const payload = req.body;
      const BLOOMREACH_API_URL = `https://api-demoapp.exponea.com/data/v2/projects/${BLOOMREACH_PROJECT_ID}/${catalogId}/items`;
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

        apiRes.on('data', (chunk) => {
          apiData += chunk;
        });

        apiRes.on('end', () => {

          if (apiRes.statusCode === 200) {
            res.status(200).json({ success: true, data: apiData });
          } else {
            res.status(apiRes.statusCode).json({ success: false, error: apiData });
          }
        });
      });

      apiReq.on('error', (error) => {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      });

      apiReq.write(JSON.stringify(payload));
      apiReq.end();
    } else {
    res.status(405).json({ message: 'Method Not Allowed' });
    }
  });
}
