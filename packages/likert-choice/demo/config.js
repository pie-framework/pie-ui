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
            activeLanguage: 'en-US',
            choices: [
                {
                    correct: true,
                    value: 'like',
                    label: [
                        {lang: 'en-US', value: 'Like'},
                        {lang: 'es-ES', value: 'Me gusta'}
                    ],
                },
                {
                    value: 'dislike',
                    label: [
                        {lang: 'en-US', value: 'Dislike'},
                        {lang: 'es-ES', value: 'Disgusto'}
                    ],
                },
                {
                    value: 'notLikely',
                    label: [
                        {lang: 'en-US', value: 'Not Likely'},
                        {lang: 'es-ES', value: 'Disgusto'}
                    ],
                }
            ]
        }
    ]
};