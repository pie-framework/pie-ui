import React from 'react';

import renderer from 'react-test-renderer';
import { TextEntry } from '../text-entry.jsx';
import { shallow } from 'enzyme';
import Input from '../input';

jest.useFakeTimers();

jest.mock('@pie-lib/render-ui', () => {
  const comp = props => (
    <div data-name="mock=comp">{JSON.stringify(props)}</div>
  );
  return {
    indicators: {
      Correct: comp,
      Incorrect: comp,
      PartiallyCorrect: comp,
      NothingSubmitted: comp
    }
  };
});

const classNames = ['textEntry'].reduce((acc, n) => {
  acc[n] = n;
  return acc;
}, {});

describe('text-entry:snapshot', () => {
  it('renders', () => {
    const model = {
      correctness: 'correct'
    };
    const session = {};

    const tree = renderer.create(
      <TextEntry model={model} session={session} classes={classNames} />
    );
    expect(tree).toMatchSnapshot();
  });
});

describe('text-entry', () => {
  let wrapper, onValueChanged;

  beforeEach(() => {
    onValueChanged = jest.fn();

    wrapper = shallow(
      <TextEntry
        model={{ allowIntegersOnly: true }}
        session={{}}
        classes={classNames}
        onValueChanged={onValueChanged}
      />
    );
  });

  it('calls onValueChange ', () => {
    wrapper.find(Input).prop('onChange')({
      target: {
        value: 'value'
      }
    });

    expect(onValueChanged.mock.calls.length).toEqual(1);
    expect(onValueChanged.mock.calls[0][0]).toEqual('value');
  });

  it('onBadInput sets warning', () => {
    const ip = wrapper.find(Input).prop('inputProps');
    console.log('ip: ', ip);
    ip.onBadInput({});
    expect(wrapper.state('warning')).toEqual('Please enter numbers only');
    jest.runAllTimers();
    expect(wrapper.state('warning')).toBe(null);
  });
});
