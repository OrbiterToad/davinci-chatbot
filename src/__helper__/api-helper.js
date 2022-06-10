import {Configuration, OpenAIApi} from 'openai'

export let apiKey = localStorage.getItem('apiKey')

let openAiConfig = new Configuration({apiKey})
let openai = new OpenAIApi(openAiConfig)

export const setApiKey = (key) => {
  apiKey = key
  localStorage.setItem('apiKey', key)
  openAiConfig = new Configuration({key})
  openai = new OpenAIApi(openAiConfig)
}

export const askQuestion = (question, aiEngine, stop=['\n']) => {
  return new Promise((resolve, reject) => {
    openai.createCompletion(aiEngine, {
      prompt: question,
      temperature: 0,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.2,
      presence_penalty: 0.0,
      stop: stop
    }).then((response) => {
      let text = response.data.choices[0].text
      if (text && text.length > 0) {
        resolve(text)
      } else {
        reject('No response')
      }
    })
  })
}
