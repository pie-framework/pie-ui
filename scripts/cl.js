var conventionalChangelog = require('conventional-changelog');

conventionalChangelog({
  preset: 'angular'
}).pipe(process.stdout); // or any writable stream
