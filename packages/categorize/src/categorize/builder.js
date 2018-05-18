import compact from 'lodash/compact';
import debug from 'debug';
import clone from 'lodash/clone';
import every from 'lodash/every';
import isEqual from 'lodash/isEqual';

const log = debug('@pie-ui:categorize:builder');

export const countChosen = (choice, categories) => {
  if (!choice || !choice.id) {
    return 0;
  }

  if (!Array.isArray(categories)) {
    return 0;
  }

  return categories.reduce((acc, c) => {
    const count = (c.choices || []).filter(h => h.id === choice.id).length;
    return acc + count;
  }, 0);
};

export const removeChoiceFromCategory = (
  choiceId,
  categoryId,
  choiceIndex,
  answers
) => {
  log('[removeChoiceFromCategory] choiceIndex:', choiceIndex);

  return answers.map(a => {
    if (a.category === categoryId) {
      const cloned = clone(a.choices);
      const index = cloned.findIndex((v, index) => {
        return v === choiceId && index >= choiceIndex;
      });
      if (index !== -1) {
        cloned.splice(index, 1);
      }
      return { ...a, choices: cloned };
    } else {
      return a;
    }
  });
};

export const moveChoiceToCategory = (
  choiceId,
  from,
  to,
  choiceIndex,
  answers
) => {
  log(
    '[moveChoiceToCategory] choice: ',
    choiceId,
    'from: ',
    from,
    'to: ',
    to,
    'answers: ',
    answers
  );

  if (from === to) {
    return answers;
  }

  if (from) {
    answers = removeChoiceFromCategory(choiceId, from, choiceIndex, answers);
  }

  const index = answers.findIndex(a => a.category === to);
  if (index === -1) {
    answers.push({ category: to, choices: [choiceId] });
    return answers;
  } else {
    return answers.map(a => {
      if (a.category === to) {
        a.choices = a.choices || [];
        a.choices.push(choiceId);
        return a;
      }
      return a;
    });
  }
};

/**
 *
 * build the choice and category state
 * @param {Object[]} categories
 * @param {{id:string}[]} choices
 * @param {{category: string, choices:string[]}[]} answers
 *
 * @returns {categories: Category[], choices: Choice[]}
 */
export const buildState = (
  categories,
  choices,
  answers = [],
  correctResponse
) => {
  const addChoices = category => {
    const answer = answers.find(a => a.category === category.id);

    // const correction = corrections.find(t => t.category === category.id);
    /*
    {category: 1, choices: [ {id: x, correct: true}]}
    */
    const hasCorrectResponse =
      Array.isArray(correctResponse) && correctResponse.length > 0;

    const cr = hasCorrectResponse
      ? correctResponse.find(r => r.category === category.id)
      : undefined;
    const correctChoices = clone(cr ? cr.choices || [] : undefined);

    if (answer) {
      const mappedChoices = compact(
        (answer.choices || []).map(id => choices.find(c => c.id === id))
      );

      const out = mappedChoices.reduce(
        (acc, choice) => {
          if (!acc.correct) {
            acc.choices.push({ ...choice, correct: undefined });
          } else {
            const index = acc.correct.findIndex(id => id === choice.id);
            acc.choices.push({ ...choice, correct: index !== -1 });
            if (index !== -1) {
              acc.correct.splice(index, 1);
            }
          }
          return acc;
        },
        {
          choices: [],
          correct: hasCorrectResponse ? correctChoices || [] : undefined
        }
      );

      // const nonEmpty = out.choices.filter(c => !c.empty);

      const ids = out.choices.map(c => c.id).sort();
      const correctIds = clone(cr ? cr.choices : []).sort();

      log('ids: ', ids, 'correctIds: ', correctIds);
      const correct = hasCorrectResponse ? isEqual(ids, correctIds) : undefined;
      return {
        ...category,
        choices: out.choices,
        correct
      };
    } else {
      const correct =
        correctChoices === undefined ? true : correctChoices.length === 0;
      log('empty choices is that correct?', correctChoices);
      return {
        ...category,
        choices: [],
        correct
      };
    }
  };

  const withChoices = categories.map(addChoices);

  const correct = correctResponse
    ? every(withChoices, category => category.correct)
    : undefined;

  const stillSelectable = h => {
    if (h.categoryCount > 0) {
      const count = countChosen(h, withChoices);
      return count < h.categoryCount;
    } else {
      return true;
    }
  };

  const filteredChoices = choices.map(h => {
    if (stillSelectable(h)) {
      return h;
    } else {
      return { empty: true };
    }
  });

  return { choices: filteredChoices, categories: withChoices, correct };
};
