import './App.css'

import { motion } from "framer-motion"

function App() {

  return (
    <main>
      <section> 
          <h1>Ollama Chat</h1>
          <div>
            <p>System talk <input type='text' placeholder='Talk like an example'/></p>
            <p>Stream response <input type='checkbox' /></p>
            <p>Prompt: <input type='text' placeholder='Why the sky is blue?'></input></p>
          </div>

          <div>
            <h1>Response area</h1>
            <p>This is an example</p>
          </div>
      </section>
    </main>
  )
}

export default App
