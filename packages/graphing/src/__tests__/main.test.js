import * as React from 'react';
import { Main } from '../main';
import { shallow } from 'enzyme/build';

jest.mock('lodash/uniq', () => {
  return () => ([]);
});

jest.mock('@pie-lib/render-ui', () => ({
  parseHtmlHasText: jest.fn().mockReturnValue('true')
}));

describe('Main', () => {
  const defaultProps = {
    model: {
      backgroundMarks: [],
      correctMarks: [],
    },
    onSessionChange: jest.fn(),
    onAnswersChange: jest.fn(),
    session: {}
  };

  describe('render', () => {
    let w;

    beforeEach(() => {
      w = props => shallow(<Main { ...props } />);
    });

    it('snapshot', () => {
      expect(w(defaultProps)).toMatchSnapshot();
    });
  });
});
