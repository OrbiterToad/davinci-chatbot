import React from 'react'

export function SettingsSection({
                           tempAiName,
                           aiName,
                           tempAttributes,
                           attributes,
                           onChangeAiName,
                           onChangeAttributes,
                           tmpApiKey,
                           apiKey,
                           onChangeApiKey,
                           saveSettings,
                           resetConversation
                         }) {
  function toHidden(tmpApiKey) {
    if (tmpApiKey.length > 6 && tmpApiKey === apiKey) {
      // get first 5 characters of api key the rest is hidden with •
      return tmpApiKey.substring(0, 6) + '•'.repeat(tmpApiKey.length - 6)
    }
  }

  return <section id="aside" className="full md:half lg:quarter lg:screen-v-scroll flex row wrap">
    <div className="pt px">
      <form onSubmit={saveSettings}>
        <span className={tempAiName !== aiName ? 'fuschia' : 'orange'}>AI Name</span>
        <input type="text"
               spellCheck={false}
               value={tempAiName}
               placeholder={'AI Name'}
               onChange={onChangeAiName}/>
        <br/>
        <br/>
        <span className={tempAttributes !== attributes ? 'fuschia' : 'orange'}>Attributes</span>
        <input type="text"
               spellCheck={false}
               value={tempAttributes}
               placeholder={'Attributes'}
               onChange={onChangeAttributes}/>
        <br/>
        <br/>
        <span className={tmpApiKey !== apiKey || tmpApiKey === '' ? 'fuschia' : 'orange'}>API Key</span>
        <input type="text"
               spellCheck={false}
               value={toHidden(tmpApiKey)}
               placeholder={'API Key'}
               onChange={onChangeApiKey}/>
        <button type="submit" style={{visibility: 'hidden'}}>Save</button>
      </form>
      <a href={'#'} onClick={saveSettings} className={'green hover'}>Save</a>
      <a href={'#'} onClick={resetConversation} className={'fuschia hover'}>Reset</a>
    </div>
  </section>
}
