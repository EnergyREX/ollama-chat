// app.tsx

import './App.css';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import ollama from './services/ollama';

function App() {
  const [model, setModel] = useState<string>('');
  const [system, setSystem] = useState<string>('');
  const [stream, setStream] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>(''); // Estado para la respuesta
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga

  const handleSystemChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSystem(event.target.value);
    console.log(system);
  };

  const handleStreamChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStream(event.target.checked);
    console.log(stream);
  };

  const handlePromptChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
    console.log(prompt);
  };

  const handleModelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setModel(event.target.value);
    console.log(model);
  };

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    setResponse(''); // Limpiar la respuesta previa
    console.log('Submitting with:', { model, system, prompt, stream });
    
    try {
      const data = await ollama.generate(model, prompt, system, stream);
      setResponse(data); // Actualizar el estado con la respuesta de la API
    } catch (error) {
      setResponse('Error generating response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section>
        <h1>Ollama Chat</h1>
        <div>
          <select id="models" name="models" onChange={handleModelChange}>
            <option value=""> </option>
            <option value="llama3">Llama3</option>
            <option value="codellama">CodeLlama</option>
          </select>

          <p>
            System talk 
            <input 
              type='text' 
              placeholder='Talk like an example' 
              value={system}
              onChange={handleSystemChange}
            />
          </p>
          <p>
            Stream response 
            <input 
              type='checkbox'
              checked={stream}
              onChange={handleStreamChange}
            />
          </p>
          <p>
            Prompt: 
            <input 
              type='text' 
              placeholder='Why the sky is blue?'
              value={prompt}
              onChange={handlePromptChange}
            />
          </p>
          <button onClick={handleSubmit} disabled={loading}>Generate!</button>
        </div>

        <div>
          <h1>Response area</h1>
          {loading ? <p>Loading...</p> : <p>{response}</p>}
        </div>
      </section>
    </main>
  );
}

export default App;
