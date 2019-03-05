var conventionalChangelog = require('conventional-changelog');
const { resolve } = require('path');
conventionalChangelog({
  preset: 'angular',
  pkg: {
    path: resolve(__dirname, '../packages/calculator')
  },
  outputUnreleased: true,
  lernaPackage: '@pie-ui/calculator',
  releaseCount: 1
}).pipe(process.stdout); // or any writable stream
