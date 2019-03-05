const minimist = require('minimist');
const {
  getUnreleasedChangelog,
  getPackages
} = require('@pie-framework/build-helper');
var args = minimist(process.argv.slice(2));
const { resolve } = require('path');

if (args.pkg) {
  const packages = getPackages(resolve(__dirname, '..', 'packages'));

  const pk = packages.find(pk => pk.dir.endsWith(args.pkg));
  getUnreleasedChangelog(pk)
    .then(cl => {
      console.log('cl:');
      console.log(cl);
    })
    .catch(e => {
      console.error(e);
    });
}
