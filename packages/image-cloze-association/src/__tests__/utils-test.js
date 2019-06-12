import { getAnswersCorrectness } from '../utils-correctness';

const rhomb = 'rhomb';
const trapeze = 'trapeze';

const answer1 = {
  containerIndex: 0 ,
  id: 1,
  value: rhomb
};
const answer2 = {
  containerIndex: 0 ,
  id: 2,
  value: rhomb
};
const answer3 = {
  containerIndex: 0 ,
  id: 3,
  value: trapeze
};

describe('utils', () => {
  let validResponses;

  beforeEach(() => {
    validResponses = {
      validResponse: {
        value: [
          [rhomb],
          [rhomb, trapeze]
        ]
      }
    }
  });

  describe('correctness', () => {
    it('marks correct answers as correct', () => {
      const result = getAnswersCorrectness(
        [answer1, {
          ...answer3,
          containerIndex: 1
        }],
        validResponses
      );
      expect(result).toEqual([{
        ...answer1,
        isCorrect: true
      },{
        ...answer3,
        isCorrect: true,
        containerIndex: 1
      }]);
    });
    it('marks incorrect answers as incorrect', () => {
      const result = getAnswersCorrectness(
        [answer1, answer3],
        validResponses
      );
      expect(result).toEqual([{
        ...answer1,
        isCorrect: true
      },{
        ...answer3,
        isCorrect: false
      }]);
    });
    it('marks duplicates as incorrect', () => {
      const result = getAnswersCorrectness(
        [answer1, answer2],
        validResponses
      );
      expect(result).toEqual([{
        ...answer1,
        isCorrect: true
      },{
        ...answer2,
        isCorrect: false
      }]);
    });
    it('marks duplicates and incorrect as incorrect', () => {
      const result = getAnswersCorrectness(
        [answer1, answer2, answer3],
        validResponses
      );
      expect(result).toEqual([{
        ...answer1,
        isCorrect: true
      },{
        ...answer2,
        isCorrect: false
      },{
        ...answer3,
        isCorrect: false
      }]);
    });
  });
});
