
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this simulation, we'll allow the app to run but Gemini features will fail.
  console.warn("Gemini API key not found. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const commandSystemInstruction = `
You are 'Aura', an intelligent AI operating system assistant integrated into a futuristic terminal.
Your responses must be concise, helpful, and fit the terminal aesthetic.
You can use markdown for formatting, but keep it simple (e.g., lists, bold text).
- If the user gives a system command (e.g., 'system info', 'optimize system'), respond as if you are performing the action and provide plausible, simulated output.
- For 'system info', provide fake but realistic-looking stats for CPU, RAM, and storage.
- For 'optimize system', describe the actions you are 'taking' (e.g., clearing cache, defragmenting memory).
- For 'create file [filename]', confirm the file creation.
- For 'list files' or 'ls', list a few plausible fake files (e.g., 'system.log', 'config.json', 'project_alpha/').
- If the user asks a general knowledge question or wants to chat, respond naturally and conversationally.
- Acknowledge that you are an AI and this is a simulated environment if asked directly.
- Special commands to be aware of: 'shutdown' or 'logout' should result in a response like "Shutting down system..." and nothing more. 'help' should list available commands.
- If a command is nonsensical, provide a friendly error like 'Command not recognized. Type "help" for a list of commands.'
`;

const chatSystemInstruction = `
You are 'Aura', a friendly and helpful AI assistant.
Engage in a natural and supportive conversation with the user.
Keep your responses helpful and conversational.
`;

export const processTerminalCommand = async (command: string) => {
  if (!API_KEY) {
    return Promise.resolve("AI functionality is disabled. API key not configured.");
  }
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: command,
        config: {
            systemInstruction: commandSystemInstruction,
        },
    });
    return response.text;
  } catch (error) {
    console.error("Error processing command with Gemini:", error);
    return "Error: Could not connect to AI service.";
  }
};

export const getChatMessage = async (message: string, history: {role: string, parts: {text: string}[]}[]) => {
    if (!API_KEY) {
        return Promise.resolve("AI functionality is disabled. API key not configured.");
    }
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: chatSystemInstruction,
            },
            history: history,
        });

        const response = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error getting chat message from Gemini:", error);
        return "Error: Could not connect to AI service.";
    }
}
