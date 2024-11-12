// api/check-email.js 
import https from 'https'; 
const BLOOMREACH_API_URL = 'https://api-demoapp.exponea.com/data/v2/projects/6dce00a6-25ba-11eb-9cc7-7e4f7e40a7d0/customers/attributes'; 
const BLOOMREACH_API_KEY = 'Y3JuNzAwZ2Y2c2RoMmVjOXVlbWJsOWg2eWdxZmg2OWIxbmtzN2d6dWJ1MDdjZWo1dmZ4aXVmMTVwb2NoOTdsdzo3aHAxZ3VqM2xxNjVvZGFnejFhNXRxNTRudndyNG9vOXk4Zjdwcjh1cGRoOW1zbGluNjNydW85M3FldzBrcHN0'; // Use your actual API key here 
export default function handler(req, res) { 
    if (req.method === 'POST') { 
        const payload = req.body; 
        const options = { 
            method: 'POST', 
            headers: { 'Authorization': `Basic ${BLOOMREACH_API_KEY}`, 
            'Content-Type': 'application/json', 
            'Content-Length': Buffer.byteLength(JSON.stringify(payload)) 
        } 
    }; 
    
const apiReq = 
https.request(BLOOMREACH_API_URL, 
    options, (apiRes) => { 
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
}