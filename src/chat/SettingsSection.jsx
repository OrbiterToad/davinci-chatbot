import React from 'react'
import {SenderList} from "../components/useAi";
import {EngineList} from "../__helper__/engine-helper";

export function SettingsSection(props) {

    const {
        aiPersonality,
        setPersonality,
        apiKey,
        setApiKey,
        resetConversation,
        engineId,
        setEngineId
    } = props;

    return <section id="aside" className="full md:half lg:quarter lg:screen-v-scroll flex row wrap">
        <div className="pt px">
            <div className={'orange'}>Personality</div>
            <select
                value={aiPersonality}
                onChange={(e) => {
                    setPersonality(e.target.value);
                }}>
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
                   onChange={(e) => {
                       localStorage.setItem('apiKey', e.target.value);
                       setApiKey(e.target.value);
                   }}/>
            <br/>
            <br/>
            <div className={'orange'}>Chat Engine</div>
            <select
                value={engineId}
                onChange={(e) => {
                    setEngineId(e.target.value);
                }}>
                {
                    EngineList.map((item, index) => (
                        <option key={index} value={item.engineId} disabled={!item.enabled}>{item.engineId}</option>
                    ))
                }
            </select>

            <br/>
            <br/>

            <a href={'#'} onClick={resetConversation} className={'fuschia hover'}>Reset</a>
        </div>
    </section>
}
