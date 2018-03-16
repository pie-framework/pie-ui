# pie-elements

The pie custom elements only.

Elements are in `packages`.

# install

```shell
npm install -g lerna # don't use for now
npm install
```

# develop

* the packages use `independent` versioning, meaning that a change in 1 package won't bump another package's version.
* use [conventional commits syntax][ccs] when commiting, lerna will detect the appropriate version bump.

# running

### info
```shell
cd packages/multiple-choice/demo
pie serve
 
```

# release/publish

```bash
lerna publish --conventional-commits # will add conventional commits to each packages CHANGELOG.md
# you can add --skip-npm and/or --skip-git if you want to bypass publishing to either.
```

> TODO: we need to set up a flow where we merge `develop` -> `master` then run the publish cmd.

### dependencies
* [lerna js][lerna] for handling multiple packages in a mono repo
* [pie][pie] to test/build the pies


### package development

* use [jest][jest] for testing
* file names - use kebab-case for filenames



[lerna]: https://lernajs.io/
[pie]: http://pie-framework.org
[ccs]: https://conventionalcommits.org/
[jest]: https://github.com/facebook/jest