import React from 'react';

export const Feedback = () => <div>Feedback</div>;

export const indicators = {
  Correct: () => <div>Correct</div>,
};

export const PreviewPrompt = () => <div>PreviewPrompt</div>;

export const color = {
  text: jest.fn(),
  correct: jest.fn(),
  incorrect: jest.fn(),
  disabled: jest.fn(),
  primary: jest.fn(),
  primaryLight: jest.fn(),
  primaryDark: jest.fn(),
  primaryText: jest.fn(),
  secondary: jest.fn(),
  secondaryLight: jest.fn(),
  secondaryDark: jest.fn(),
  secondaryText: jest.fn(),
  background: jest.fn(),
};
