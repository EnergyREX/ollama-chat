import { useState, useEffect } from 'react';
import ollama from './services/ollama';
import { marked } from 'marked';

import Options from './components/Options';

import './layout.css';
import './styles.css';
import { FaPaperPlane } from 'react-icons/fa6';

function App() {
  const [model, setModel] = useState('llama3');
  const [models, setModels] = useState([]); // Cambiado a arreglo vacío
  const [prompt, setPrompt] = useState('');
  const [system, setSystem] = useState('');
  const [data, setData] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    ollama.getModels()
    .then(response => {
      setModels(response);
    })
    .catch(error => {
      console.error('Error fetching models: ', error);
    });
  }, []);

  useEffect(() => {
    console.log('Your models: ', models);
  }, [models]);

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleSystemPromptChange = (event) => {
    setSystem(event.target.value);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleGenerationSubmit = async () => {
    console.log('Submitted.');
    try {
      setData('');
      const response = await ollama.generate(model, prompt, system);
      const formattedResponse = response.replace(/\n/g, '\n\n');
      const markdownResponse = marked(formattedResponse);
      setData(markdownResponse);
    } catch (error) {
      console.error('Error handling a message', error);
      setData('Error. Press f12 to see what may happen');
    }
  };

  const handleChatSubmit = async () => {
    console.log("Message sent");

    let newChatHistory = [...chatHistory]; // Crea una copia del historial de chat
    newChatHistory.push({ role: "user", content: prompt });

    setChatHistory(newChatHistory);

    try {
      const response = await ollama.chat(model, prompt, system);
      newChatHistory.push({ role: "bot", content: response });
      setChatHistory(newChatHistory);
    } catch (error) {
      console.error('Error handling a message', error);
    }
    console.log("Chat history", chatHistory);
  }

  return (
    <main>
      <section className='config__section'>
        <h1 className='config__header'>Options</h1>
        <h4 className='config__subtitle'>Select the model options that you desire to use.</h4>

        <p>
          Select a model <br />
          <select className='config__select' name="models" onChange={handleModelChange}>
            {Array.isArray(models) && models.map((model) => (
              <option key={model.model} value={model.model}>{model.name}</option>
            ))}
          </select>
        </p>
        <p>
          System prompt <br />
          <input className='config__sysinput' type='text' placeholder='Act like a cat' onChange={handleSystemPromptChange} />
        </p>
      </section>
      <section className='chat__section'>
        <h1>Ollama Chat App</h1>
        <div className='chat__content'>
          <div className='markdown' dangerouslySetInnerHTML={{ __html: data }}>
          </div>
        </div>
        <div>
          <input className='chat__input' type='text' placeholder='Why the sky is blue?' onChange={handlePromptChange} />
          <button className='input__send' type='submit' onClick={handleChatSubmit}><FaPaperPlane /></button>
        </div>
      </section>
    </main>
  );
}

export default App;
