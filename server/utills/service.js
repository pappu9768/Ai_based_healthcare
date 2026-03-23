import Groq from 'groq-sdk'
import { configDotenv } from 'dotenv'
configDotenv()
const api_key = process.env.GROQ_API_KEY
const groq = new Groq({
    apiKey: api_key
})

export const diagnoseApi = async (symptoms) => {
    try {
        const res = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `
You are a healthcare AI assistant.

Rules:
- Only answer questions related to health, diseases, symptoms, medicine, or medical advice.
- If the question is unrelated to healthcare, reply:
"Sorry, I can only answer healthcare-related questions."
`
                },
                {
                    role: "user",
                    content: `${symptoms}`
                }
            ],
            model: "llama-3.1-8b-instant"
        })
        const finalResponse = res.choices[0].message.content
        return finalResponse
    } catch (error) {
        console.log(error)
    }
}