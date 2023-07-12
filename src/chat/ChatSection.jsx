import React from 'react'

export function MainContent({
                                showConversationDebug,
                                loading,
                                conversationHistory,
                                aiName,
                                apiKey,
                            }) {

    if (!showConversationDebug) {
        if (apiKey === '' && !loading) {
            return <center>
                <span className={'fuschia'}>Please Add your Api Key</span>
                <br/>
                <a href={'https://beta.openai.com/account/api-keys'} target={'_blank'} className={'blue hover'}>
                    Click here to get your API Key
                </a>
                <br/>
                <br/>
            </center>
        }
        return <center className={'green'}>
            You are talking to <b>{aiName}</b>
            <br/>
            <br/>
        </center>

    } else {
        return <>
            <div>
          <pre>
              <hr/>
              {JSON.stringify(conversationHistory, null, 2)}
          </pre>
            </div>
        </>
    }
}
