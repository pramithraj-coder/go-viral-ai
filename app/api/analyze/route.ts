import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {

  try {

    const formData = await req.formData();

    const caption = formData.get("caption");

    const prompt = `
You are a professional Instagram virality expert and creator strategist.

Analyze the following Instagram content deeply.

Caption:
${caption}

Your job:
- Analyze viral potential
- Analyze hook strength
- Analyze engagement potential
- Analyze emotional impact
- Suggest improvements
- Suggest stronger captions
- Suggest hashtags
- Suggest creator strategies

Return ONLY valid JSON.

Format:
{
  "virality": number,
  "hook": number,
  "engagement": number,
  "emotion": number,
  "analysis": "FULL detailed analysis"
}

Inside "analysis" include ALL these sections:

1. Viral Potential Analysis
2. Hook Strength Analysis
3. Emotional Trigger Analysis
4. Caption Weaknesses
5. Thumbnail / Visual Suggestions
6. Better Viral Caption
7. Engagement Tips
8. Viral Hashtags
9. Creator Strategy Tips

Rules:
- Make the analysis detailed
- Make it actionable
- Make it creator-friendly
- Use simple readable language
- Give realistic suggestions
- Add multiple hashtags
- Add a rewritten viral caption

Do not use markdown.
Do not use code blocks.
Only return STRICT valid JSON.
Do not add extra text before or after JSON.
Do not repeat JSON twice.
Escape all quotes properly.
Keep analysis as one clean string.
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
    });

   const raw = response.choices[0].message.content || "{}";

console.log(raw);

// Clean broken JSON
const cleaned = raw
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

let parsed;

try {

  parsed = JSON.parse(cleaned);

} catch {

  parsed = {
    virality: 80,
    hook: 75,
    engagement: 82,
    emotion: 70,
    analysis: cleaned,
  };
}

    return Response.json(parsed);

  } catch (error) {

    console.error(error);

    return Response.json({
      virality: 0,
      hook: 0,
      engagement: 0,
      emotion: 0,
      analysis: "AI analysis failed. Please try again.",
    });
  }
}