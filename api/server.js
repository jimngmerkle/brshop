import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import the cors package

const app = express();
const PORT = process.env.PORT || 3000;

// Your Bloomreach API details
const BLOOMREACH_API_URL = 'https://api-demoapp.exponea.com/data/v2/projects/6dce00a6-25ba-11eb-9cc7-7e4f7e40a7d0/customers/attributes';
//const BLOOMREACH_API_KEY = 'xxx';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Configure CORS to allow requests from your frontend
// 'http://localhost:5173'
app.use(cors({
  origin: ['https://brshop-y4bl.vercel.app','https://main.d1bgqmcqrjyzl7.amplifyapp.com/','http://localhost:5173'], 
  methods: 'GET,POST', // Specify allowed methods
  credentials: true // Allow cookies to be sent with requests  
}));

// Endpoint to send the payload to the Bloomreach customer database
app.post('/check-email', (req, res) => {
  // Commenting out the dynamic payload
  const payload = req.body;
  console.log(`Received payload: ${JSON.stringify(payload)}`);

  const apiUrl = `${BLOOMREACH_API_URL}`;
  const payloadString = JSON.stringify(payload);
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${BLOOMREACH_API_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payloadString)
    }
  };

  console.log(`API URL: ${apiUrl}`);
  console.log(`Request Options: ${JSON.stringify(options)}`);

  const apiReq = https.request(apiUrl, options, (apiRes) => {
    let apiData = '';

    apiRes.on('data', chunk => {
      apiData += chunk.toString();
    });

    apiRes.on('end', () => {
      console.log(`Bloomreach API response: ${apiData}`);
      if (apiRes.statusCode === 200) {
        res.json({ success: true });
      } else {
        console.error('Bloomreach API error:', apiData);
        res.json({ success: false, response: apiData });
      }
    });
  });

  apiReq.on('error', (e) => {
    console.error('Error sending payload:', e);
    res.status(500).json({ error: 'Internal Server Error' });
  });

 console.log(`Sending payload to Bloomreach API: ${JSON.stringify(payload)}`);
  
  apiReq.write(JSON.stringify(payload));
  apiReq.end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
