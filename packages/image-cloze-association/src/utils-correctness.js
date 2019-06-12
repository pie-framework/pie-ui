const getAllCorrectAnswers = (answers, validResponses) =>
  answers.map(answer => ({
    ...answer,
    isCorrect: validResponses[answer.containerIndex].includes(answer.value)
  }));

const getUniqueCorrectAnswers = (answers, validResponses) => {
  let finalAnswers = answers;

  answers.forEach((answer1) => {
    const valuesToParse = answers.filter(answer2 =>
      (answer2.value === answer1.value) && (answer2.containerIndex === answer1.containerIndex));

    if (valuesToParse.length > 1) {
      // point only to duplicates but first
      valuesToParse.shift();
      // mark duplicates as incorrect
      valuesToParse.forEach((value, index) => {
        finalAnswers = finalAnswers.map(finalAnswer => {
          if (finalAnswer.id === value.id) {
            const finalAnswerValues =
              validResponses[finalAnswer.containerIndex].filter(validResponse => validResponse === finalAnswer.value);
            return {
              ...finalAnswer,
              isCorrect: finalAnswerValues.length > index + 1
            }
          }
          return finalAnswer;
        })
      });
    }
  });
  return finalAnswers;
};

export const getAnswersCorrectness = (answers, validation) => {
  const { validResponse: { value } } = validation;
  const allCorrect = getAllCorrectAnswers(answers, value);

  return getUniqueCorrectAnswers(allCorrect, value);
};
