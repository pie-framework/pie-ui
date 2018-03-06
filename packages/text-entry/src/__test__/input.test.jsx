import React from 'react';

import renderer from 'react-test-renderer';
import Input from '../input';
import Adapter from 'enzyme-adapter-react-15';

describe('input', () => {


  describe('snapshot', () => {


    it('renders', () => {
      const tree = renderer.create(<Input dark={true} value="hi" />);
      expect(tree).toMatchSnapshot();
    });

    it('renders correct feedback', () => {
      const tree = renderer.create(<Input dark={true} value="hi" feedback="fb" correctness={'correct'} />);
      expect(tree).toMatchSnapshot();
    });

    it('renders disabled', () => {
      const tree = renderer.create(<Input disabled={true} value="hi" />);
      expect(tree).toMatchSnapshot();
    });

    it('renders alignment', () => {
      const tree = renderer.create(<Input alignment={'right'} size={4} value="hi" />);
      expect(tree).toMatchSnapshot();
    });
  });
})