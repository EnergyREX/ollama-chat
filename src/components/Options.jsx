import React from 'react'

const Options = () => {
  return (
    <div>
        <p>
          Select a model <br />
          <select name="models" onChange={handleModelChange}>
            <option value="llama3">Llama 3</option>
            <option value="llama2">Llama 2</option>
            <option value="llama2">Llama 2</option>
            <option value="codellama">Codellama</option>
          </select>
        </p>
        <p>
          System prompt <br />
          <input type='text' placeholder='Act like a cat' onChange={handleSystemPromptChange} />
        </p>
        <p>
          Use stream? 
          <input type='checkbox' onChange={handleStreamChange} />
        </p>
    </div>
  )
}

export default Options