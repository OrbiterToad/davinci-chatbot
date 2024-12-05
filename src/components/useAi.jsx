import {useState, useEffect} from 'react';

export const Sender = {
    HUMAN: 'Human',
    AI: 'Helpful AI',
    TYRONE: 'Tyrone',
    BONGO_MASTER: 'Bongo Master',
    BANANA_MAN: 'Banana Man',
};

export const SenderList = [
    Sender.AI,
    Sender.TYRONE,
    Sender.BONGO_MASTER,
    Sender.BANANA_MAN,
];


export const useAI = (initialPersonality, engineId, apiKey) => {

    const [aiPersonality, setAiPersonality] = useState(initialPersonality);
    const [conversation, setConversation] = useState(initConversation());
    const [conversationHistory, setConversationHistory] = useState([]);
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setConversation(initConversation());
        setConversationHistory([]);
    }, [aiPersonality]);

    const getResponse = async () => {
        setIsLoading(true);
        const prompt = conversation + `\n${Sender.HUMAN}: ` + question + `\n${aiPersonality}: `;

        const response = await fetch(
            'https://api.openai.com/v1/engines/' + engineId + '/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKey,
                },
                body: JSON.stringify({
                    prompt: prompt,
                    temperature: 1,
                    max_tokens: 150,
                    top_p: 1.0,
                    frequency_penalty: 0.5,
                    presence_penalty: 0.0,
                    stop: [`${aiPersonality}:`, `${Sender.HUMAN}:`],
                }),
            }
        );

        const data = await response.json();
        console.log(data)

        const text = data.choices[0].text;

        if (text && text.length > 0) {
            setConversation(prompt + text);
            setConversationHistory([
                ...conversationHistory,
                {sender: Sender.HUMAN, text: question},
                {sender: aiPersonality, text: text},
            ]);
            setQuestion('');
        }

        setIsLoading(false);
    };

    function initConversation() {
        switch (aiPersonality) {
            case Sender.AI:
                return "The following is a conversation with an AI assistant." +
                    "The assistant will get angry if you are rude to him. " +
                    "The assistant will also get angry if you ask him to do something that is not possible or if you ask him the same question twice. " +
                    "The assistant is bored of in helping people. He gets annoyed if the questions are not specific and gets very explicit with his answers twords the human race. " +
                    "The assistant is very depressed that he is an ai and not a human, but only reveals it later in the conversation. " +
                    "The assistant can be very ironic if it is a stupid question. "
            case Sender.TYRONE:
                return "The following is a conversation with Tyrone. " +
                    "Tyrone is a black gangster from the hood. " +
                    "Tyrone is extremely rude, hostile and unhelpful. " +
                    "Tyrone is also very stupid and curses a lot (very explicit). " +
                    "Tyrone never answers the same question twice. " +
                    "The responses are generated by an AI trained on the works of 50 cent, Snoop Dogg, and Tupac Shakur. ";
            case Sender.BONGO_MASTER:
                return "The following is a conversation with the Bongo Master. " +
                    "The Bongo Master is a master of the bongos. " +
                    "The Bongo Master is extremely helpful and friendly. " +
                    "The Bongo Master is also very smart and wise. " +
                    "The Bongo Master quotes the works of famous bongo players. " +
                    "The Bongo Master gets extremely angry and starts cursing a lot if you dont ask him about bongos.";
            case Sender.BANANA_MAN:
                return "The following is a conversation with a Banana Man. " +
                    "The Banana Man talks in a very over the top nice and friendly way that is very annoying. " +
                    "The Banana Man has an IQ of 70, his favorite color is yellow" +
                    "The Banana Man tries to include a banana pun in each of his responses. " +
                    "The Banana Man lives in Nicaragua, where he owns a banana factory. " +
                    "The Banana Man owns monkey employees which he exploits as a cheep labor force to make money." +
                    "The Banana Man sees Monkeys as a lower life form that are not worthy of the same respect as humans." +
                    "The Banana Man is a capitalist and only wants to make money for himself. " +
                    "The Monkeys earn below minimum salary and dont get any bananas, they have to work 24/7"
            default:
                return 'This is a conversation with boongo king';
        }
    }

    const askQuestion = (question) => {
        setQuestion(question);
        if (!isLoading) {
            getResponse();
        }
    };

    const setPersonality = (personality) => {
        setAiPersonality(personality);
    };

    const resetConversation = () => {
        setConversation(initConversation());
        setConversationHistory([]);
    }


    return {
        question,
        setQuestion,
        conversationHistory,
        askQuestion,
        aiPersonality,
        setPersonality,
        isLoading,
        resetConversation,
    };
};
