import debug from 'debug';

const log = debug('@pie-ui:fill-in-the-blank:builder');

export const removeChoice = (choiceId, blankId, answers) => {
  log('[removeChoice] choiceId: ', choiceId, ' blankId:', blankId);
  const index = answers.findIndex(a => {
    return a.blank === blankId && a.choice === choiceId;
  });

  if (index !== -1) {
    answers.splice(index, 1);
  }
  return answers;
};

export const addChoice = (choiceId, blankId, answers, choices, fromBlankId) => {
  log(
    '[addChoice] choiceId:',
    choiceId,
    'blankId: ',
    blankId,
    'choices: ',
    choices,
    'fromBlankId: ',
    fromBlankId
  );

  const blankCount = getBlankCount(choices, choiceId) || 0;

  if (
    fromBlankId ||
    (blankCount !== undefined &&
      blankCount > 0 &&
      countInAnswers(answers, choiceId) >= blankCount)
  ) {
    const index = answers.findIndex(
      a => a.blank === fromBlankId && a.choice === choiceId
    );
    if (index !== -1) {
      answers.splice(index, 1);
    }
  }

  const index = answers.findIndex(
    a => a.blank === blankId && a.choice === choiceId
  );

  if (index === -1) {
    answers.push({ choice: choiceId, blank: blankId });
  } else {
    log('it already exists - skip');
  }

  log('out: ', answers);
  return answers;
};

export const countInAnswers = (answers, choiceId) => {
  return (answers || []).reduce((sum, a) => {
    sum += a.choice === choiceId ? 1 : 0;
    return sum;
  }, 0);
};

export const getBlankCount = (choices, choiceId) => {
  const choice = (choices || []).find(h => h.id === choiceId);
  return choice ? choice.blankCount : 0;
};

const isChoosable = answers => choice => {
  if (choice.blankCount === undefined || choice.blankCount <= 0) {
    return true;
  } else {
    const count = countInAnswers(answers, choice.id);
    return count < choice.blankCount;
  }
};

export const findChoice = (blankId, answers, choices) => {
  const answer = (answers || []).find(a => a.blank === blankId);

  if (answer) {
    return choices.find(c => answer.choice === c.id);
  }
};

export const isCorrect = (blankId, answers, correctResponse) => {
  if (correctResponse === undefined || correctResponse === null) {
    return undefined;
  }

  const answer = answers.find(a => a.blank === blankId);
  const blankCorrect = correctResponse.find(cr => cr.blank === blankId);

  log(
    'correct for blankId: ',
    blankId,
    ' is: ',
    blankCorrect,
    'answer is: ',
    answer
  );
  if (blankCorrect && !answer) {
    return false;
  }

  if (!blankCorrect && answer) {
    return false;
  }

  return (
    blankCorrect.blank === answer.blank && blankCorrect.choice === answer.choice
  );
};

export const buildContent = (model, answers) => {
  answers = answers || [];

  const populated = model.content.map(i => {
    if (typeof i === 'string') {
      return i;
    } else {
      const blank = i;
      const correct = isCorrect(blank.id, answers, model.correctResponse);
      const choice = findChoice(blank.id, answers, model.choices);
      if (choice) {
        return { ...blank, choice, correct };
      } else {
        return { ...i, correct };
      }
    }
  });
  const filteredChoices = model.choices.filter(isChoosable(answers));
  return { content: populated, choices: filteredChoices };
};
