// services/ollama.ts

import axios from "axios";

const OllamaURL = "http://localhost:11434";

async function generate(model: string, prompt: string, system: string, stream: boolean) {
    const request = {
        model: model,
        prompt: prompt,
        system: system,
        stream: stream
    };
    
    try {
        const response = await axios.post(`${OllamaURL}/api/generate`, request);
        return response.data;
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
}

export default { generate };
