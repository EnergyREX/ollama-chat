import axios from "axios"

const baseURL = 'http://localhost:11434'

async function generate (model, prompt, system) {
    const req = {
        "model": model,
        "prompt": prompt,
        "system": system,
        "stream": false
    }
    
    try {
        console.log('Loading...');
        const res = await axios.post(`${baseURL}/api/generate`, req)
        console.log('Request sent successfully');
        console.log(res.data.response);
        return(res.data.response);
    } 
     catch (error) {
        console.error('Error handling a request', error)
        console.log('Make sure that all fields are filled.')
        return('Error. Press F12 to see what is happening')
    }
}

async function chat (model, prompt, system) {
    const req = {
        "model": model,
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ]
      }

      try {
        console.log('Loading...')
        const res = await axios.post(`${baseURL}/api/chat`, req)
        console.log(res.data.response)
        console.log(res.data.response);
        return(res.data.response);
      }
      catch (error) {
        console.log('Error handling a request', error);
        console.log('Make sure that all fields are filled.');
        return('Error. Press F12 to see what is happening')
      }
}

export default { generate, chat }