// Vercel Serverless Function
// This handles the API call to Anthropic securely

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { topic } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Create a professional, engaging LinkedIn post about "${topic}". 

Requirements:
- Start with a strong hook that grabs attention (make it bold using Unicode characters: 𝗕𝗼𝗹𝗱 𝗧𝗲𝘅𝘁)
- Keep it concise (150-200 words)
- Make it relatable and authentic
- Include a relevant, inspiring quote from a successful person (with their name) formatted in bold italic using Unicode (𝙗𝙤𝙡𝙙 𝙞𝙩𝙖𝙡𝙞𝙘)
- End with 5-7 relevant hashtags
- Format it to be easy to read on LinkedIn
- Make it viral-worthy and engaging

CRITICAL FORMATTING RULES:
1. The opening hook/title should use Unicode bold characters (Mathematical Bold)
2. The quote should be formatted in Unicode bold italic characters (Mathematical Bold Italic) WITHOUT the word "Quote:" before it
3. The quote should just appear naturally in the post flow with the person's name after a dash

Unicode character mapping for bold:
A-Z: 𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭
a-z: 𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇

Unicode character mapping for bold italic:
A-Z: 𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕
a-z: 𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯

Example format:
𝗬𝗼𝘂𝗿 𝗖𝗮𝗿𝗲𝗲𝗿 𝗜𝘀𝗻'𝘁 𝗔 𝗦𝗽𝗿𝗶𝗻𝘁, 𝗜𝘁'𝘀 𝗮 𝗠𝗮𝗿𝗮𝘁𝗵𝗼𝗻

[Body content here...]

𝙏𝙝𝙚 𝙤𝙣𝙡𝙮 𝙬𝙖𝙮 𝙩𝙤 𝙙𝙤 𝙜𝙧𝙚𝙖𝙩 𝙬𝙤𝙧𝙠 𝙞𝙨 𝙩𝙤 𝙡𝙤𝙫𝙚 𝙬𝙝𝙖𝙩 𝙮𝙤𝙪 𝙙𝙤 - 𝙎𝙩𝙚𝙫𝙚 𝙅𝙤𝙗𝙨

#Hashtag1 #Hashtag2 #Hashtag3`
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Anthropic API error:', response.status, errorData);
      
      if (response.status === 429) {
        return res.status(429).json({ error: 'RATE_LIMIT' });
      } else if (response.status === 401) {
        return res.status(401).json({ error: 'AUTH_ERROR' });
      } else if (response.status >= 500) {
        return res.status(500).json({ error: 'SERVER_ERROR' });
      }
      
      return res.status(response.status).json({ error: 'API_ERROR' });
    }

    const data = await response.json();
    
    if (!data.content || !Array.isArray(data.content) || data.content.length === 0) {
      return res.status(500).json({ error: 'EMPTY_CONTENT' });
    }
    
    const postContent = data.content
      .filter(item => item && item.type === 'text' && item.text)
      .map(item => item.text)
      .join('\n')
      .trim();
    
    if (!postContent) {
      return res.status(500).json({ error: 'NO_TEXT_CONTENT' });
    }
    
    return res.status(200).json({ content: postContent });
    
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'INTERNAL_ERROR', message: error.message });
  }
}
