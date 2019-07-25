module.exports = {
  verbose: true,
  setupFiles: ['./jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testRegex: 'src/.*/?__tests__/.*.test\\.jsx?$',
  testURL: 'http://localhost/',
  moduleNameMapper: {
    '^dnd-core$': 'dnd-core/dist/cjs',
    '^react-dnd$': 'react-dnd/dist/cjs',
    '^react-dnd-html5-backend$': 'react-dnd-html5-backend/dist/cjs',
    '^react-dnd-touch-backend$': 'react-dnd-touch-backend/dist/cjs',
    '^react-dnd-test-backend$': 'react-dnd-test-backend/dist/cjs',
    '^react-dnd-test-utils$': 'react-dnd-test-utils/dist/cjs'
  }
};
