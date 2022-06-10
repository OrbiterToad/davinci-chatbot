import React from 'react'
import {fillStringLength} from '../__helper__/text-helper'
import TypeAnimation from 'react-type-animation'

export function MainContent({
                          showConversationDebug,
                          conversation,
                          loading,
                          conversationHistory,
                          aiName,
                          apiKey,
                        }) {

  function getBotMessage(msg, index, length) {
    if (msg.text === 'No response') {
      return <span className={'fuschia'}>
        {fillStringLength(aiName, 'Human')}
        <i className={'grey'}>{'// No Response'}</i>
        </span>
    } else {
      return <span className={'green'}>
        {index === length - 1 ? <TypeAnimation cursor={false}
                                               sequence={[msg.text]}
                                               wrapper={'span'}
        /> : msg.text}
      </span>
    }
  }


  if (!showConversationDebug) {
    if (apiKey === '' && !loading) {
      return <center>
        <span className={'fuschia'}>Please Add your Api Key</span>
        <br/>
        <a href={'https://beta.openai.com/account/api-keys'} target={'_blank'} className={'blue hover'}>
          Click here to get your API Key
        </a>
        <br/>
      </center>
    }
    if (conversationHistory.length === 0 && !loading) {
      return <center className={'green'}>Ask a question and the AI will respond<br/></center>
    }
    return <>
      {conversationHistory.map((msg, index) => {
        return <div key={index}>
          {msg.from}: {msg.from === 'Human'
          ? <span className={'blue'}>{fillStringLength('Human', aiName)}{msg.text}</span>
          : getBotMessage(msg, index, conversationHistory.length)}
        </div>
      })}
    </>
  } else {
    return <>
      <div>
          <pre>
            {conversation}
            <hr/>
            {JSON.stringify(conversationHistory, null, 2)}
          </pre>
      </div>
    </>
  }
}
