import { shallow } from 'enzyme';

import React from 'react';
import { PlacementOrdering, Choice } from '../placement-ordering';
import toJson from 'enzyme-to-json';

/* TODO: These tests need an update */

xdescribe('PlacementOrdering', () => {
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
      ]
    };

    wrapper = mkWrapper(model);
  });

  describe('render', () => {
    it('snapshot', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('interaction', () => {
    it('dropping choices updates state', () => {
      wrapper.instance().onDropChoice('c4', 0);
      wrapper.instance().onDropChoice('c3', 1);
      wrapper.instance().onDropChoice('c1', 2);
      wrapper.instance().onDropChoice('c2', 3);
      expect(wrapper.state('order')).toEqual(['c4', 'c3', 'c1', 'c2']);
    });

    it('removing choices updates state', () => {
      session = { value: ['c4', 'c2', 'c3', 'c1'] };
      wrapper = mkWrapper(model, session);
      wrapper.instance().onDragInvalid('c4', 0);
      expect(wrapper.state('order')).toEqual([null, 'c2', 'c3', 'c1']);
    });
  });

  xdescribe('session', () => {
    it('order get restored from session if present', () => {
      session = { value: ['c4', 'c2', 'c3', 'c1'] };
      wrapper = mkWrapper(model, session);
      const choices = wrapper.find('DragSource(DraggableChoice)');
      expect(
        choices.map(c => {
          return c.props().choiceId;
        })
      ).toEqual(['c4', 'c2', 'c3', 'c1']);
    });
  });

  xdescribe('show correct response', () => {
    it('toggle is visible only if correct response is present', () => {
      session = { value: ['c4', 'c2', 'c3', 'c1'] };
      wrapper = mkWrapper(model, session);
      const toggler = () => wrapper.find('mockToggle');
      expect(toggler().prop('show')).not.to.be.true;
      expect(toggler().prop('toggled')).to.be.false;
      model.correctResponse = ['c1', 'c4', 'c3', 'c2'];
      wrapper.setProps({ model: model });
      expect(toggler().prop('show')).to.be.true;
      expect(toggler().prop('toggled')).to.be.false;
    });
  });

  describe('outcomes', () => {
    it('choices are styled according to their outcome', () => {
      session = { value: ['c4', 'c2', 'c3', 'c1'] };
      model.correctResponse = ['c1', 'c2', 'c3', 'c4'];
      model.outcomes = [
        {
          id: 'c1',
          outcome: 'incorrect'
        },
        {
          id: 'c2',
          outcome: 'correct'
        },
        {
          id: 'c3',
          outcome: 'correct'
        },
        {
          id: 'c4',
          outcome: 'incorrect'
        }
      ];
      wrapper = mkWrapper(model, session);
      const droppedChoices = wrapper.find('DragSource(DraggableChoice)');
      expect(
        droppedChoices.map(c => {
          return c.props().outcome;
        })
      ).toEqual(['incorrect', 'correct', 'correct', 'incorrect']);
    });
  });
});
