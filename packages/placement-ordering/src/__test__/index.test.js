import { mount, shallow } from 'enzyme';

import React from 'react';
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

xdescribe('PlacementOrdering', () => {

  let wrapper, model, session, mod, Choice, PlacementOrdering;

  let mkWrapper = (model, session) => {
    return shallow(<PlacementOrdering
      model={model}
      session={session}
      classes={{
        root: 'root'
      }}
      sessionChanged={() => { }} />, {});
  };

  beforeEach(() => {

    let mockToggle = (props) => {
      return <div>mocked-toggle</div>;
    };

    mockToggle['@noCallThru'] = true;

    mod = proxyquire('../src/placement-ordering', {
      'correct-answer-toggle': mockToggle
    });
    PlacementOrdering = mod.PlacementOrdering;
    Choice = mod.Choice;

    model = {
      choices: [
        {
          "id": "c1",
          "label": "C1"
        },
        {
          "id": "c2",
          "label": "C2"

        },
        {
          "id": "c3",
          "label": "C3"
        },
        {
          "id": "c4",
          "label": "C4"
        }
      ]
    };

    wrapper = mkWrapper(model);
  });

  describe('render', () => {
    it('has root class', () => {
      expect(wrapper.hasClass('root')).to.eql(true);
    });

    xit('choices are visible', () => {
      let choices = wrapper.find(Choice);
      expect(choices.length).to.eql(model.choices.length);
    });

    xit('targets are visible', () => {
      let targets = wrapper.find('DropTarget(DroppableTarget)');
      expect(targets.length).to.eql(model.choices.length);
    });
  });

  xdescribe('interaction', () => {
    it('dropping choices updates state', () => {
      wrapper.instance().onDropChoice('c4', 0);
      wrapper.instance().onDropChoice('c3', 1);
      wrapper.instance().onDropChoice('c1', 2);
      wrapper.instance().onDropChoice('c2', 3);
      expect(wrapper.state('order')).to.eql(['c4', 'c3', 'c1', 'c2']);
    });

    it('removing choices updates state', () => {
      session = { value: ['c4', 'c2', 'c3', 'c1'] };
      wrapper = mkWrapper(model, session);
      wrapper.instance().onDragInvalid('c4', 0);
      expect(wrapper.state('order')).to.eql([null, 'c2', 'c3', 'c1']);
    });
  });

  xdescribe('session', () => {
    it('order get restored from session if present', () => {
      session = { value: ['c4', 'c2', 'c3', 'c1'] };
      wrapper = mkWrapper(model, session);
      let choices = wrapper.find('DragSource(DraggableChoice)');
      expect(choices.map((c) => {
        return c.props().choiceId;
      })).to.eql(['c4', 'c2', 'c3', 'c1']);
    });
  });

  xdescribe('show correct response', () => {
    it('toggle is visible only if correct response is present', () => {
      session = { value: ['c4', 'c2', 'c3', 'c1'] };
      wrapper = mkWrapper(model, session);
      let toggler = () => wrapper.find('mockToggle');
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
      model.correctResponse = ["c1", "c2", "c3", "c4"];
      model.outcomes = [
        {
          "id": "c1",
          "outcome": "incorrect"
        },
        {
          "id": "c2",
          "outcome": "correct"

        },
        {
          "id": "c3",
          "outcome": "correct"
        },
        {
          "id": "c4",
          "outcome": "incorrect"
        }
      ];
      wrapper = mkWrapper(model, session);
      let droppedChoices = wrapper.find('DragSource(DraggableChoice)');
      expect(droppedChoices.map((c) => {
        return c.props().outcome;
      })).to.eql(['incorrect', 'correct', 'correct', 'incorrect']);

    });
  });


});
