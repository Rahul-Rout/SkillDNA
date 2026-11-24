
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const story = body.story;

    if (typeof story !== "string" || story.trim().length < 20) {
      return NextResponse.json(
        { error: "Please provide a story of at least 20 characters." },
        { status: 400 }
      );
    }

    if (story.length > 4000) {
      return NextResponse.json(
        { error: "Your story must be 4000 characters or fewer." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You are SkillDNA, an AI assistant that helps students discover
skills demonstrated through real-life experiences.

Analyse this student's story:

"${story.trim()}"

Return valid JSON with this exact structure:
{
  "summary": "A short summary of the experience",
  "skills": [
    {
      "name": "Skill name",
      "type": "Behavioral or Technical",
      "confidence": 75,
      "evidence": "Specific evidence from the student's story",
      "reason": "Why this experience suggests this skill",
      "starBullet": "A concise resume bullet based on the story"
    }
  ],
  "encouragement": "A short encouraging message"
}

Rules:
- Identify 3 to 5 relevant skills.
- Only identify skills supported by the story.
- Do not invent achievements, numbers, or responsibilities.
- Confidence must be a number between 0 and 100.
- Clearly distinguish demonstrated evidence from possible strengths.
- Use simple, supportive language.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text ?? "{}");

    if (!Array.isArray(result.skills)) {
      throw new Error("Gemini returned an unexpected response.");
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("SkillDNA analysis error:", error);

    return NextResponse.json(
      { error: "Unable to analyse your story. Please try again." },
      { status: 500 }
    );
  }
}
