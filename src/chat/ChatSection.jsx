import React from 'react'

export function MainContent(props) {

    const {
        showConversationDebug, setShowConversationDebug, loading, conversationHistory, aiName, apiKey,
    } = props;

    if (showConversationDebug) {
        return <>
            <div className={'debug-header'}>
                <b>Debug</b>
            </div>
            <pre className={'debug-content'}>
                {JSON.stringify(conversationHistory, null, 2)}
            </pre>
            <hr/>
        </>
    }

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
}
