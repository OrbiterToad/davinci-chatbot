import React from 'react'

export function AsideSection({showConversationDebug, setShowConversationDebug}) {
  return <section className="full md:hidden lg:flex lg:quarter lg:screen-v-scroll flex row wrap">
    <div className="full md:py">
      <a className={`${showConversationDebug ? 'fuschia' : 'blue'} hover`}
         onClick={() => setShowConversationDebug(!showConversationDebug)}>
        Debug
      </a>
      <a className={'green hover'} href={'https://github.com/Wetwer/davinci-chatbot'} target={'_blank'}>
        Github
      </a>
    </div>
  </section>
}
