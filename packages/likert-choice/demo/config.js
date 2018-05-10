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
                    correct: true,
                    value: 'disagree',
                    label: [
                        {lang: 'en-US', label: 'Disagree', value: 'Disagree'},
                        {lang: 'es-ES', label: 'Discrepar', value: 'Discrepar'}
                    ],
                },
                {
                    correct: true,
                    value: 'neutral',
                    label: [
                        {lang: 'en-US', label: 'Neutral', value: 'Neutral'},
                        {lang: 'es-ES', label: 'Neutral', value: 'Neutral'}
                    ],
                },
                {
                    value: 'agree',
                    label: [
                        {lang: 'en-US', label: 'Agree', value: 'Agree'},
                        {lang: 'es-ES', label: 'De Acuerdo', value: 'De Acuerdo'}
                    ],
                }
            ]
        }
    ]
};