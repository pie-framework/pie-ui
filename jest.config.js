module.exports = {
  verbose: true,
  setupFiles: ['./jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testRegex: 'src/.*/?__tests__/.*.test\\.jsx?$',
  testURL: 'http://localhost/'
};
