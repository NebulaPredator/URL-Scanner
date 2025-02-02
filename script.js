const express = require('express');
const app = express();
const port = 3000;


const suspiciousKeywords = ['phishing', 'malware', 'scam', 'hack', 'trojan', 'keylogger'];
const suspiciousDomains = ['badwebsite.com', 'malware-site.net', 'phishingattack.org'];


function isHarmful(url) {
    const lowerCaseUrl = url.toLowerCase();
    
 
    if (suspiciousKeywords.some(keyword => lowerCaseUrl.includes(keyword))) {
        return { status: 'harmful', reason: 'Contains suspicious keywords' };
    }

   
    if (suspiciousDomains.some(domain => lowerCaseUrl.includes(domain))) {
        return { status: 'harmful', reason: 'Listed in suspicious domains' };
    }
    
    return { status: 'safe', reason: 'No threats detected' };
}


app.get('/scan', (req, res) => {
    const url = req.query.url;
    
    if (!url) {
        return res.status(400).json({ error: 'No URL provided' });
    }
    
    const result = isHarmful(url);
    res.json({ url, result });
});

app.listen(port, () => {
    console.log(`URL Scanner API is running on http://localhost:${port}`);
});
