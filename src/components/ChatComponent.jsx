import React, {useState} from 'react';
import {Sender, SenderList, useAI} from './useAi';
import {Loader} from "../Loader";
import '../index.css'

export const ChatComponent = () => {

    const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '');

    const {
        question,
        setQuestion,
        conversationHistory,
        askQuestion,
        aiPersonality,
        setPersonality,
        isLoading,
        resetConversation
    } = useAI(Sender.AI, 'text-davinci-002', apiKey);

    function saveApiKey(value) {
        localStorage.setItem('apiKey', value);
        setApiKey(value);
    }

    return (
        <div className={'main-content'}>
            <div>
                Personality:
                <select value={aiPersonality} onChange={(e) => setPersonality(e.target.value)}>
                    {
                        SenderList.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))
                    }
                </select>
                <br/>
                API Key:
                <input type={'text'} value={apiKey} onChange={(e) => saveApiKey(e.target.value)}/>
                {
                    !apiKey && <div className={'color-danger'}>
                        You need to enter an <a href={'https://platform.openai.com/account/api-keys'} target={'_blank'}>API
                        key</a>
                    </div>
                }
                <br/>
                <p><b>You are talking to {aiPersonality}</b></p>
                <br/>
                <div>
                    {conversationHistory.map((item, index) => (
                        <p key={index}>
                            <b>{item.sender}</b>: <span
                            className={item.sender === Sender.HUMAN ? 'fuschia' : 'blue'}>{item.text}</span>
                        </p>
                    ))}
                    {isLoading && <Loader/>}
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!isLoading) {
                            askQuestion(question);
                        }
                    }}
                >
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Type your question here"
                    />
                    <div>
                        <button type="submit">Ask</button>
                        <button className="fuschia hover" type="button" onClick={resetConversation}>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};