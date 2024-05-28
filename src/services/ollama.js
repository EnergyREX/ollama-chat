import axios from "axios"

const baseURL = 'http://localhost:11434'

async function generate (model, prompt, system, stream) {
    const message = {
        "model": model,
        "prompt": prompt,
        "system": system,
        "stream": stream
    }
    
    try {
        console.log('Loading...');
        const res = await axios.post(`${baseURL}/api/generate`, message)
        console.log('Message sent successfully');
        console.log(res.data.response);
        return(res.data.response);
    } 
     catch (error) {
        console.error('Error handling a message', error)
        console.log('Make sure that all fields are filled.')
        return ('Error. Press f12 to see what may happen')
    }
}

export default { generate }