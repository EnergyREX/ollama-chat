import ollama from 'ollama'

const response = await ollama.generate({
  model: 'llama3',
  messages: [{ role: 'user', content: 'Why is the sky blue?' }],
})
console.log(response.message.content)