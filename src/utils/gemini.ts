import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
)

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
})

export async function analyzeResume(resumeText: string) {
  const prompt = `
You are an ATS resume analyzer.

Return ONLY valid JSON.

{
  "atsScore": number,
  "strengths": ["item"],
  "weaknesses": ["item"],
  "missingSkills": ["item"],
  "recommendedRoles": ["item"],
  "suggestions": ["item"]
}

Resume:
${resumeText}
`

  const result = await model.generateContent(prompt)

  const rawText = result.response.text()

  const cleanedText = rawText
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim()

  return JSON.parse(cleanedText)
}