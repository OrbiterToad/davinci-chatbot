import React, {useState} from 'react'
import {AsideSection} from './navigation/AsideSection'
import {Loader} from './Loader'
import {SettingsSection} from './chat/SettingsSection'
import {MainContent} from './chat/ChatSection'
import {Sender, useAI} from "./components/useAi";
import {Engine} from "./__helper__/engine-helper";

function App() {

    const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '')
    const [engineId, setEngineId] = useState(Engine.DAVINCI_002)

    const {
        question,
        setQuestion,
        conversationHistory,
        askQuestion,
        aiPersonality,
        setPersonality,
        isLoading,
        resetConversation,
    } = useAI(Sender.AI, engineId, apiKey);

    const [errorMessage, setErrorMessage] = useState(null)

    const [showConversationDebug, setShowConversationDebug] = useState(false)

    function poseQuestion(e) {
        e.preventDefault()
        if (isLoading) {
            return
        }

        if (apiKey === '') {
            setErrorMessage('Please enter an API key')
            return
        } else if (question === '') {
            setErrorMessage('Please enter a question!')
            return
        } else {
            setErrorMessage(null)
        }

        askQuestion(question)
    }

    return <div className="full h-min-screen">
        <div className="flex row wrap">
            <SettingsSection aiPersonality={aiPersonality}
                             setPersonality={setPersonality}
                             apiKey={apiKey}
                             setApiKey={setApiKey}
                             resetConversation={resetConversation}
                             engineId={engineId}
                                setEngineId={setEngineId}
            />
            <section id="content" className="full md:half lg:screen-v-scroll flex row wrap relative">
                <div className="full md:py px">
                    <center>
                        <span className="large title white">davinci-chatbot</span>
                    </center>
                    <br/>
                    <br/>

                    <MainContent showConversationDebug={showConversationDebug}
                                 conversationHistory={conversationHistory}
                                 setShowConversationDebug={setShowConversationDebug}
                                 loading={isLoading}
                                 apiKey={apiKey}
                                 aiName={aiPersonality}/>
                    {
                        conversationHistory.map((item, index) => {
                            // if sender ===                 {sender: Sender.HUMAN, text: question},
                            if (item.sender === Sender.HUMAN) {
                                return <span key={index} className={'message-text'}>
                                    <span>You:</span> <span className="blue">{item.text}</span>
                                </span>
                            } else {
                                return <span key={index} className={'message-text'}>
                                    <span>{aiPersonality}:</span> <span className="green">{item.text}</span>
                                </span>
                            }
                        })
                    }
                    {
                        isLoading ? <>
                            <span className={'message-text'}>
                                <span>You:</span> <span className="blue">{question}</span>
                            </span>
                            <div style={{textAlign: 'center'}}>
                                <Loader/>
                                <br/>
                            </div>
                        </>
                            : <span>
                            <br/>
                            <br/>
                            </span>
                    }

                    <form onSubmit={poseQuestion}>
                        <input type="text"
                               value={question}
                               placeholder={'Ask a question...'}
                               spellCheck={false}
                               onChange={(e) => setQuestion(e.target.value)}/>
                        {errorMessage && <span className={'fuschia'}>{errorMessage}</span>}
                        <button type="submit" className="button" disabled={isLoading}></button>
                    </form>
                </div>
            </section>
            <AsideSection showConversationDebug={showConversationDebug}
                          setShowConversationDebug={setShowConversationDebug}/>
        </div>
    </div>
}


export default App
