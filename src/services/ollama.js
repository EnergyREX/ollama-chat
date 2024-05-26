import axios from "axios"

const baseURL = 'http://localhost:11434'

async function generate (model, prompt, system, stream) {
    const message = {
        "model": model,
        "prompt": prompt,
        "system": system,
        "stream": stream
    }
    console.log('Loading...');
    axios.post(`${baseURL}/api/generate`, message)
    
    .then(res => {
        console.log('Message sent successfully');
        console.log(res.data.response);
    })
}

export default { generate }