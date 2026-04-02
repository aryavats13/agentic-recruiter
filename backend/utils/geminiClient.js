require('dotenv').config();

const generateJSON = async (prompt) => {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'openrouter/auto',
      messages: [
        {
          role: 'system',
          content: 'You are an expert AI assistant. Always respond with valid JSON only. No markdown, no explanation, no code fences, just raw JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter error: ${response.status} - ${err}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content || '';

  if (!text) throw new Error('Empty response from AI');

  const cleaned = text.replace(/^```json\n?/i, '').replace(/\n?```$/i, '').trim();
  return JSON.parse(cleaned);
};

module.exports = { generateJSON };