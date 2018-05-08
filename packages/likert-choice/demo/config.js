module.exports = {
    elements: {
        'likert-choice': '..'
    },
    models: [
        {
            element: 'likert-choice',
            id: '1',
            mode: 'evaluate',
            prompt: 'This instance is in gather mode and can be clicked',
            disabled: false,
            keyMode: 'letters',
            choiceMode: 'radio',
            activeLang: 'en-US',
            defaultLang: 'en-US',
            choices: [
                {
                    value: 'disagree',
                    label: [
                        {lang: 'en-US', value: 'Disagree'},
                        {lang: 'es-ES', value: 'Discrepar'}
                    ],
                },
                {
                    correct: true,
                    value: 'neutral',
                    label: [
                        {lang: 'en-US', value: 'Neutral'},
                        {lang: 'es-ES', value: 'Neutral'}
                    ],
                },
                {
                    value: 'agree',
                    label: [
                        {lang: 'en-US', value: 'Agree'},
                        {lang: 'es-ES', value: 'De Acuerdo'}
                    ],
                }
            ]
        }
    ]
};