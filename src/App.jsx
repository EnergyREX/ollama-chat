import { useState } from 'react';
import ollama from './services/ollama';
import { marked } from 'marked';

import Options from './components/Options';

import './layout.css';
import './styles.css'
import { FaPaperPlane } from 'react-icons/fa6';

function App() {
  const [model, setModel] = useState('llama3');
  const [prompt, setPrompt] = useState('');
  const [system, setSystem] = useState('');
  const [stream, setStream] = useState(false);
  const [data, setData] = useState('');

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleSystemPromptChange = (event) => {
    setSystem(event.target.value);
  };

  const handleStreamChange = (event) => {
    setStream(event.target.checked);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    console.log('Submitted.');
    try {
      const response = await ollama.generate(model, prompt, system, stream);
      const formattedResponse = response.replace(/\n/g, '\n\n'); // Añadir saltos de línea dobles para Markdown
      const markdownResponse = marked(formattedResponse);
      setData(markdownResponse);
    } catch (error) {
      console.error('Error handling a message', error);
      setData('Error. Press f12 to see what may happen');
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
            <option value="llama2">Llama 2</option>
            <option value="codellama">Codellama</option>
          </select>
        </p>
        <p>
          System prompt <br />
          <input className='config__sysinput' type='text' placeholder='Act like a cat' onChange={handleSystemPromptChange} />
        </p>
        <p>
          Use stream? 
          <input className='config__streamCheckbox' type='checkbox' onChange={handleStreamChange} />
        </p>
      </section>
      <section className='chat__section'>
        <h1>Ollama Chat App</h1>
        <div dangerouslySetInnerHTML={{ __html: data }} />
      
        <input className='chat__input' type='text' placeholder='Why the sky is blue?' onChange={handlePromptChange} />
        <button className='input__send' type='submit' onClick={handleSubmit}><FaPaperPlane /></button>
      </section>
    </main>
  );
}

export default App;
