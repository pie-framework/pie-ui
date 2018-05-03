const mockComponent = name => () => <div>{name}</div>;

const Correct = mockComponent('Correct');
const Incorrect = mockComponent('Incorrect');

export { Correct, Incorrect };
