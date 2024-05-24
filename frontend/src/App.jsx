import { useState } from 'react'

function App() {

  const [model, setModel] = useState('')
  const [prompt, setPrompt] = useState('')
  const [system, setSystem] = useState('')
  const [stream, setStream] = useState(false)

  const handleModelChange = (event) => {
    setModel(event.target.value)
  }

  const handleSystemPromptChange = (event) => {
    setSystem(event.target.value)
  }

  const handleStreamChange = (event) => {
    setStream(event.target.value)
  }

  const handlePromptChange = (event) => {
    setPrompt(event.target.value)
  }

  return (
    <main>
      <section>
        <h1>Options</h1>
        <p>Select the model options that you desire to use.</p>
      
        <p>Select a model <select name="models" onChange={handleModelChange}>
        <option value=""></option>
          <option value="llama3">Llama 3</option>
          <option value="codellama">Codellama</option>
        </select></p>
        <p>System prompt <input type='text' placeholder='Act like a cat' onChange={handleModelChange} /></p>
        <p>Use stream? <input type='checkbox' /></p>
      </section>
      <section>
        Ollama Chat App
        <p>Example message</p>
      </section>
      <section>
        <input type='text' placeholder='Why the sky is blue?' onChange={handlePromptChange} /><button type='submit'>Send message</button>
      </section>
      
    </main>
  )
}

export default App
