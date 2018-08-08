import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

// mock HTML - jsdom doesnt support it.
global.HTMLElement = class HTMLElement {
  dispatchEvent = jest.fn();
  addEventListener = jest.fn();
};

global.CustomEvent = class CustomEvent {};
