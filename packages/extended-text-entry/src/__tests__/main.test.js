import React from 'react';
import Main from '../main';
import { shallow } from 'enzyme';
import { isComplete } from '../index';

describe('Render Main Component', () => {
  let wrapper;

  let model = { width: 100, height: 50 };
  beforeEach(() => {
    wrapper = shallow(
      <Main model={model} session={{ value: 'hi' }} onChange={() => {}} />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Completeness Checker', () => {
  it('should return false for empty model', () => {
    expect(isComplete('')).toEqual(false);
  });
  it('should return false for a pseudo-empty model', () => {
    expect(isComplete('<div></div>')).toEqual(false);
  });
  it('should return true for a non-empty model', () => {
    expect(isComplete('<div>test</div>')).toEqual(true);
  });
  it('should return true for a non-empty text model', () => {
    expect(isComplete('test')).toEqual(true);
  });
  it('should return true for a non-empty html failed model', () => {
    expect(isComplete('<div><a>hello<div></div><someTag></someTag>')).toEqual(
      true
    );
  });
});
