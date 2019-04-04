import { shallow } from 'enzyme';

import React from 'react';
import compact from 'lodash/compact';
import { PlacementOrdering, Choice } from '../placement-ordering';
import toJson from 'enzyme-to-json';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';

describe('PlacementOrdering', () => {
  let wrapper, model, session;

  const mkWrapper = (model, session) => {
    session = { value: [], ...session };
    model = { config: {}, ...model };

    return shallow(
      <PlacementOrdering
        model={model}
        session={session}
        classes={{
          placementOrdering: 'placementOrdering'
        }}
        onSessionChange={jest.fn()}
      />,
      {}
    );
  };

  beforeEach(() => {
    model = {
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
      config: {}
    };

    wrapper = mkWrapper(model);
    wrapper.setProps({
      onSessionChange: jest.fn(newSession => {
        wrapper.setState({ session: newSession })
      })
    });
  });

  describe('render', () => {
    it('snapshot', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('interaction', () => {
    it('dropping choices updates the order', () => {
      wrapper.instance().onDropChoice({ id: 'c4', type: 'choice'}, { id: 'c1', type: 'choice' });

      expect(wrapper.state('session').value).toEqual(['c4', 'c2', 'c3', 'c1']);
    });

    it('removing choices updates state', () => {
      session = { value: ['c1', 'c2', 'c3', 'c4'] };
      const valuesLength = session.value.length;
      wrapper = mkWrapper({ ...model, config: { ...model.config, removeTile: true, includeTargets: true } }, session);
      wrapper.setProps({
        onSessionChange: jest.fn(newSession => {
          wrapper.setState({ session: newSession })
        })
      });

      wrapper.instance().onRemoveChoice({ id: 'c4', type: 'target', index: 3});

      expect(compact(wrapper.state('session').value).length).toEqual(valuesLength - 1);
    });
  });

  describe('session', () => {
    it('order get restored from session if present', () => {
      let ordering = wrapper.instance().createOrdering();

      expect(ordering.tiles.map(t => t.id)).toEqual(['c1', 'c2', 'c3', 'c4']);

      session = { value: ['c4', 'c2', 'c3', 'c1'] };

      wrapper.setProps({ session });

      ordering = wrapper.instance().createOrdering();

      expect(ordering.tiles.map(t => t.id)).toEqual(['c4', 'c2', 'c3', 'c1']);
    });
  });

  describe('show correct response', () => {
    it('toggle is not visible if correct response is not present', () => {
      session = { value: ['c4', 'c2', 'c3', 'c1'] };
      wrapper = mkWrapper(model, session);

      const toggle = wrapper.find(CorrectAnswerToggle);

      expect(toggle.prop('show')).not.toEqual(true);
      expect(toggle.prop('toggled')).toEqual(false);
    });

    it('toggle is visible if correct response is present', () => {
      session = { value: ['c4', 'c2', 'c3', 'c1'] };
      model.correctResponse = ['c1', 'c4', 'c3', 'c2'];
      wrapper = mkWrapper(model, session);

      const toggle = wrapper.find(CorrectAnswerToggle);

      expect(toggle.prop('show')).toEqual(true);
      expect(toggle.prop('toggled')).toEqual(false);
    });
  });
});
