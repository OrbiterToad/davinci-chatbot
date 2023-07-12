import React from 'react'
import {SenderList} from "../components/useAi";

export function SettingsSection({
                                    aiPersonality,
                                    setPersonality,
                                    apiKey,
                                    setApiKey,
                                    resetConversation
                                }) {
    return <section id="aside" className="full md:half lg:quarter lg:screen-v-scroll flex row wrap">
        <div className="pt px">
            <div className={'orange'}>Personality</div>
            <select
                value={aiPersonality}
                onChange={(e) => setPersonality(e.target.value)}>
                {
                    SenderList.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))
                }
            </select>

            <br/>
            <br/>
            <span className={'orange'}>API Key</span>
            <input type="text"
                   spellCheck={false}
                   value={apiKey}
                   placeholder={'API Key'}
                   onChange={(e) => setApiKey(e.target.value)}/>
            <br/>
            <br/>
            <a href={'#'} onClick={resetConversation} className={'fuschia hover'}>Reset</a>
        </div>
    </section>
}
