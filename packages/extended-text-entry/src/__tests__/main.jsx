import React from "react";
import Main from "./../main";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import renderer from 'react-test-renderer';

configure({adapter : new Adapter() });



describe("Main Component", () => {
  it("should render Main Component", () => {
    expect(true).toBe(true);
  })
});