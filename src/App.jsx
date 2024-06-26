import React, { useState } from 'react';
import ollama from './services/ollama';
import { marked } from 'marked';

import './layout.css';
import './styles.css';
import { FaPaperPlane } from 'react-icons/fa6';

function App() {
  const [model, setModel] = useState('llama3');
  const [prompt, setPrompt] = useState('');
  const [system, setSystem] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

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
      const response = await ollama.generate(model, prompt, system);
      const formattedResponse = response.replace(/\n/g, '\n\n');
      const markdownResponse = marked(formattedResponse);
      setChatHistory([{ role: 'system', content: markdownResponse }]);
    } catch (error) {
      console.error('Error handling a message', error);
      setChatHistory([{ role: 'system', content: 'Error. Press f12 to see what may happen' }]);
    }
  };

  const handleChatSubmit = async () => {
    console.log("Message sent");

    const newUserMessage = { "role": "user", "content": prompt };
    const updatedChatHistory = [...chatHistory, newUserMessage];

    try {
      const response = await ollama.chat(model, prompt);
      const newAssistantMessage = {
        "role": response.role,
        "content": response.content
      };

      setChatHistory([...updatedChatHistory, newAssistantMessage]);

    } catch (err) {
      console.error('Error handling a message', err);
    }
  };

  return (
    <main>
      <section className='config__section'>
        <h1 className='config__header'>Options</h1>
        <h4 className='config__subtitle'>Select the model options that you desire to use.</h4>

        <p>
          Select a model <br />
          <select className='config__select' name="models" onChange={handleModelChange}>
            <option value="llama3">Llama 3</option>
            <option value="llama2">Llama 2</option>
            <option value="codellama">Codellama</option>
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
          {chatHistory.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div dangerouslySetInnerHTML={{ __html: marked(msg.content) }}></div>
            </div>
          ))}
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
