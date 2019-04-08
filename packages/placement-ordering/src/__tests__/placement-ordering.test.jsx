import { shallow } from 'enzyme';

import React from 'react';
import compact from 'lodash/compact';
import { PlacementOrdering, Choice } from '../placement-ordering';
import toJson from 'enzyme-to-json';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import { buildState, reducer } from '../ordering';

jest.mock('../ordering', () => ({
  buildState: jest.fn().mockReturnValue({}),
  reducer: jest.fn().mockReturnValue({})
}));
describe('PlacementOrdering', () => {
  let wrapper, model, session;
  let onSessionChange;
  const mkWrapper = (model, session) => {
    onSessionChange = jest.fn();
    session = { value: [], ...session };
    model = {
      config: {},
      choices: [
        {
          id: 'c1',
          label: 'C1'
        },
        {
          id: 'c2',
          label: 'C2'
        },
        {
          id: 'c3',
          label: 'C3'
        },
        {
          id: 'c4',
          label: 'C4'
        }
      ],
      ...model
    };

    return shallow(
      <PlacementOrdering
        model={model}
        session={session}
        classes={{
          placementOrdering: 'placementOrdering'
        }}
        onSessionChange={onSessionChange}
      />,
      {}
    );
  };

  beforeEach(() => {
    wrapper = mkWrapper();
  });

  describe('render', () => {
    it('snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('shows toggle', () => {
      let w = mkWrapper({ correctResponse: ['c1', 'c2', 'c3', 'c4'] });
      expect(wrapper).toMatchSnapshot();
    });
  });

  const ordering = d => ({
    opts: {},
    ...d
  });

  describe('logic', () => {
    let response;
    describe('onDropChoice', () => {
      beforeEach(() => {
        response = ['c4', 'c2', 'c3', 'c1'];

        reducer.mockReturnValue({ response });
        wrapper
          .instance()
          .onDropChoice(
            { id: 'c4', type: 'choice' },
            { id: 'c1', type: 'choice' },
            ordering({ tiles: [{ id: 'c1', type: 'choice' }] })
          );
      });

      it('calls reducer', () =>
        expect(reducer).toHaveBeenCalledWith(
          {
            type: 'move',
            from: { id: 'c1', type: 'choice' },
            to: { id: 'c4', type: 'choice' }
          },
          expect.anything()
        ));

      it('dropping choices updates the order', () => {
        expect(onSessionChange).toHaveBeenCalledWith({ value: response });
      });
    });

    describe('onRemoveChoice', () => {
      let target;
      beforeEach(() => {
        reducer.mockReset();
        reducer.mockReturnValue({ response: ['c1', 'c2', 'c3'] });
        wrapper = mkWrapper();

        target = { id: 'c4', type: 'target', index: 3 };
        wrapper.instance().onRemoveChoice(target, {});
      });

      it('calls reducer', () => {
        expect(reducer).toHaveBeenCalledWith(
          { type: 'remove', target },
          expect.anything()
        );
      });

      it('calls onSessionChange', () => {
        expect(onSessionChange).toHaveBeenCalledWith({
          value: ['c1', 'c2', 'c3']
        });
      });
    });

    describe.skip('createOrdering', () => {
      it('todo', () => {});
    });
    describe.skip('initSessionIfNeeded', () => {
      it('todo', () => {});
    });
    describe.skip('UNSAFE_componentWillReceiveProps', () => {
      it('todo', () => {});
    });
  });
});
