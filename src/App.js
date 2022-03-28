import './App.css'
import React, {useState} from 'react'
import {Configuration, OpenAIApi} from 'openai'

function defaultConversation(aiName, attributes) {
  return `\n
    The following is a conversation with an AI. The AI is ${attributes}.
    \n
    Human:Hello
    \n
    ${aiName}:Hi, I am an AI. Whats your question?
    \n`
}

function getEngineId() {
  return 'text-davinci-002'
}

function App() {

  const [aiName, setAiName] = useState('ai')
  const [attributes, setAttributes] = useState('clever and helpful')
  const [loading, setLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState(null)

  const [showConversationDebug, setShowConversationDebug] = useState(false)

  const [conversation, setConversation] = useState(defaultConversation(aiName, attributes))

  const [question, setQuestion] = useState('')
  const [apiKey, setApiKey] = useState('')

  const [conversationHistory, setConversationHistory] = useState([])


  function getPrompt(question) {
    return `${conversation}Human:${question}
    \n
    ${aiName}:`
  }

  const askQuestion = (question) => {

    const configuration = new Configuration({apiKey})
    const openai = new OpenAIApi(configuration)

    return new Promise((resolve, reject) => {
      openai.createCompletion(getEngineId(), {
        prompt: getPrompt(question),
        temperature: 0,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.2,
        presence_penalty: 0.0,
        stop: ['\n']
      }).then((response) => {
        let text = response.data.choices[0].text
        if (text && text.length > 0) {
          setConversation(`${getPrompt(question)}${text}\n`)
          resolve(text)
        } else {
          reject('No response')
        }
      }).catch((e) => {
        reject(e)
      })
    })
  }


  function resetConversation() {
    setConversation(defaultConversation(aiName, attributes))
    setConversationHistory([])
  }

  function poseQuestion(e) {
    e.preventDefault()

    if (question === '') {
      setErrorMessage('Please enter a question!')
      return
    } else {
      setErrorMessage(null)
    }

    setLoading(true)

    askQuestion(question).then((response) => {
      setLoading(false)
      // add message from human and message from AI
      setConversationHistory([
        ...conversationHistory,
        {from: 'Human', text: question, color: 'secondary'},
        {from: aiName, text: response, color: 'primary'}
      ])
    }).catch((e) => {
      setLoading(false)
      setQuestion('')
      setConversationHistory([
        ...conversationHistory,
        {from: 'Human', text: question, color: 'secondary'},
        {from: aiName, text: 'No response', color: 'danger'}
      ])
      console.log(e)
    })
  }

  return (
    <div className="App">
      <center>
        <h1>{getEngineId()}</h1>
        <table>
          <tbody>
          <tr>
            <td>
              AI Name
            </td>
            <td width={'400px'}>
              <input type={'text'} value={aiName} onChange={(e) => setAiName(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td>
              Attributes
            </td>
            <td>
              <input type={'text'} value={attributes} onChange={(e) => setAttributes(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td>
              API Key
            </td>
            <td>
              <input type={'text'} value={apiKey} onChange={(e) => setApiKey(e.target.value)}/>
            </td>
          </tr>
          {apiKey === '' && <tr>
            <td colSpan={2} className={'color-danger'}>
                Get your API key from <a target={'_blank'} href={'https://beta.openai.com/'}>https://beta.openai.com</a>
            </td>
          </tr>}
          <tr>
            <td>
              <button  onClick={resetConversation}>Save</button>
            </td>
          </tr>
          </tbody>
        </table>
        {/*save the aiName and reset conversation and conversationHistory*/}

        <div className={'border-main'}>
          {conversationHistory.length > 0 ? <>
            {/*if message is from human show on the left else show msg on the right with danger:red primary: blue secondary: gray*/}

            {conversationHistory.map((msg, index) => {
              return (
                <div key={index} className={'message'}>
                  {msg.from === 'Human' ?
                    <div className={'message-left'}>
                      <div className={'message-text'}>Me: <span className={`color-${msg.color}`}>{msg.text}</span></div>
                    </div> :
                    <div className={'message-right'}>
                      <div className={'message-text'}>
                        {aiName}: <span className={`color-${msg.color}`}>{msg.text}</span>
                      </div>
                    </div>
                  }
                </div>
              )
            })}
          </> : <>{loading ? <div>Loading...</div> : <p>Type a question and the bot will respond</p>}</>}
        </div>
        <form onSubmit={poseQuestion}>
          <table>
            <tbody>
            <tr>
              <td width={'400px'}>
                <input type={'text'} value={question} placeholder={'Ask a question...'}
                       onChange={(e) => setQuestion(e.target.value)}/>
              </td>
              <td style={{paddingLeft: '1rem'}}>
                <button type={'submit'}>{
                  loading ? 'Loading...' : 'Ask'
                }</button>
              </td>
            </tr>
            <tr>
              <td>
                {errorMessage && <p className={'color-danger'}>{errorMessage}</p>}
              </td>
            </tr>
            </tbody>
          </table>
        </form>

        <br/>
        {/*  button to show the conversation */}
        <button onClick={() => {
          setShowConversationDebug(!showConversationDebug)
        }}>
          {showConversationDebug ? 'Hide conversation' : 'Show conversation'}
        </button>
        <br/>

        {/*  show the conversation */}
        {showConversationDebug && <div className={'border-secondary'}>
          <pre className={'conversation-debug message'}>
            {conversation}
          </pre>
        </div>}

      </center>
    </div>
  )
}

export default App
