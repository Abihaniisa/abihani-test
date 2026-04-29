export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    var body = req.body;
    try {
        var response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer re_gwvYG6oG_7GbFqxZTBcSQ8gdjYUCFHjQi'
            },
            body: JSON.stringify({
                from: body.from || 'onboarding@resend.dev',
                to: [body.to],
                subject: body.subject,
                text: body.text || body.message || ''
            })
        });
        var data = await response.json();
        if (response.ok) {
            res.status(200).json(data);
        } else {
            res.status(response.status).json(data);
        }
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}
