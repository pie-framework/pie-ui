import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// mock HTML - jsdom doesnt support it.
global.HTMLElement = class HTMLElement {
  dispatchEvent() {}
};

global.CustomEvent = class CustomEvent {};

Enzyme.configure({ adapter: new Adapter() });
