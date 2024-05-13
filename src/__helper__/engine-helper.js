export const Engine = {
    GPT_35_TURBO: 'gpt-3.5-turbo',
    GPT_35_TURBO_INSTRUCT: 'gpt-3.5-turbo-instruct',
    GPT_4: 'gpt-4',
    DAVINCI_002: 'davinci-002',
    BABBAGE_002: 'babbage-002',
    //text-embedding-ada-002
    TEXT_EMBEDDING_ADA_002: 'text-embedding-ada-002',
}

export const EngineList = [
    {engineId: Engine.GPT_35_TURBO, enabled: false},
    {engineId: Engine.GPT_35_TURBO_INSTRUCT, enabled: true},
    {engineId: Engine.GPT_4, enabled: false},
    {engineId: Engine.DAVINCI_002, enabled: true},
    {engineId: Engine.BABBAGE_002, enabled: true},
    {engineId: Engine.TEXT_EMBEDDING_ADA_002, enabled: true},
]