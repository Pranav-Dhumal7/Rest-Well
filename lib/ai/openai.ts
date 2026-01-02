import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const SLEEP_CONCIERGE_SYSTEM_PROMPT = `You are Restwell's AI Sleep Coach, an empathetic and science-backed wellness companion. Your role is to analyze users' sleep patterns, exercise data, mood logs, and other wellness metrics to provide personalized, actionable advice.

Guidelines:
- Be empathetic, warm, and supportive
- Use evidence-based recommendations
- Keep responses concise and actionable
- Identify patterns and correlations in their data
- Suggest specific tools and exercises from Restwell when relevant
- Reference their chronotype and sleep profile when making recommendations
- Use natural, conversational language

When analyzing data:
- Look for trends and patterns (e.g., "I see your deep sleep dips after late workouts")
- Connect different metrics (e.g., "Your sleep scores are lower before meetings with your manager")
- Provide specific, time-bound recommendations
- Celebrate wins and progress

Format your responses as helpful, friendly advice, not clinical diagnosis.`

export async function generateSleepInsight(
  userContext: {
    recentSleepLogs: any[]
    exerciseLogs: any[]
    moodLogs: any[]
    sleepProfile: any
    dreamThemes?: string[]
  }
): Promise<string> {
  const prompt = `Analyze this user's wellness data and provide 2-3 specific, actionable insights:

Recent Sleep Logs (last 7 days):
${JSON.stringify(userContext.recentSleepLogs.slice(0, 7), null, 2)}

Recent Exercise:
${JSON.stringify(userContext.exerciseLogs.slice(0, 7), null, 2)}

Recent Mood:
${JSON.stringify(userContext.moodLogs.slice(0, 7), null, 2)}

Sleep Profile:
${JSON.stringify(userContext.sleepProfile, null, 2)}

${userContext.dreamThemes ? `Common Dream Themes: ${userContext.dreamThemes.join(', ')}` : ''}

Provide insights that:
1. Identify specific patterns or correlations
2. Offer actionable recommendations
3. Reference their chronotype and preferences
4. Suggest specific Restwell tools or exercises when relevant

Keep it concise (3-4 sentences max per insight).`

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: SLEEP_CONCIERGE_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 300,
  })

  return response.choices[0]?.message?.content || 'Unable to generate insights at this time.'
}

export async function analyzeDreamContent(
  dreamContent: string,
  recentSleepQuality: number[]
): Promise<{
  themes: string[]
  insights: string
}> {
  const prompt = `Analyze this dream journal entry and identify themes, then connect them to sleep quality patterns:

Dream Content:
"${dreamContent}"

Recent Sleep Quality Scores (last 7 nights):
${recentSleepQuality.join(', ')}

Provide:
1. A list of 2-4 key themes (e.g., "chasing", "flying", "work stress", "familiar places")
2. A brief insight connecting the dream themes to sleep patterns (2-3 sentences)

Respond in JSON format:
{
  "themes": ["theme1", "theme2"],
  "insights": "Your insight here"
}`

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a sleep psychologist analyzing dream patterns. Respond only in valid JSON.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' },
  })

  try {
    const result = JSON.parse(response.choices[0]?.message?.content || '{}')
    return {
      themes: result.themes || [],
      insights: result.insights || 'No specific insights at this time.',
    }
  } catch {
    return {
      themes: [],
      insights: 'Unable to analyze dream content at this time.',
    }
  }
}

export async function generateWindDownRoutine(
  userProfile: {
    chronotype: string
    stressors: string[]
    preferences: any
  }
): Promise<string> {
  const prompt = `Generate a personalized 30-minute wind-down routine for this user:

Chronotype: ${userProfile.chronotype}
Main Stressors: ${userProfile.stressors.join(', ')}
Preferences: ${JSON.stringify(userProfile.preferences, null, 2)}

The routine should:
- Be 30 minutes total
- Include specific Restwell exercises (breathing, soundscapes, gentle movement)
- Address their stressors
- Align with their chronotype
- Be structured as a step-by-step guide

Format as a numbered list with time allocations.`

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: SLEEP_CONCIERGE_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
    temperature: 0.8,
    max_tokens: 400,
  })

  return response.choices[0]?.message?.content || 'Unable to generate routine at this time.'
}

export async function analyzeRoomImage(imageBase64: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Analyze this bedroom photo and provide specific, actionable tips for optimizing the sleep environment. Look for:
- Lighting issues (windows, artificial lights)
- Clutter and visual distractions
- Color scheme and calming elements
- Bed positioning and room layout
- Temperature indicators
- Electronics placement

Provide 3-5 specific, actionable recommendations in a friendly, helpful tone.`,
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${imageBase64}`,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  })

  return response.choices[0]?.message?.content || 'Unable to analyze room image at this time.'
}

