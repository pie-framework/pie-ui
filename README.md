# pie-ui


# Maintenance Mode

pie-ui is no longer actively developed.
No prs will be accepted.

See http://github.com/pie-framework/pie-elements instead.




[![CircleCI](https://circleci.com/gh/pie-framework/pie-ui.svg?style=svg)](https://circleci.com/gh/pie-framework/pie-ui)

The pie custom elements only.

## install

```shell
yarn global add lerna
yarn install # install root package and child packages
```

## develop

- the packages use `independent` versioning, meaning that a change in 1 package won't bump another package's version.
- use [conventional commits syntax][ccs] when commiting, lerna will detect the appropriate version bump.

### Commands

| Action          | Cmd                                   | Notes                                                                                                           |
| --------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| test            | `npm test`                            |                                                                                                                 |
| lint            | `npm run lint`                        |                                                                                                                 |
| build           | `npm run build`                       |                                                                                                                 |
| release         | `npm run release`                     |                                                                                                                 |
| release next    | `npm run release:next`                | Will release a new version tagged as `next`                                                                     |
| watch           | `scripts/watch --scope $package-name` | This can be useful when you have a package linked elsewhere <br/>and what your changes in `src` to be picked up |
| demo            | `scripts/demo --scope $package-name`  | Will start the `demo` webapp targeting the scoped package                                                       |
| build demo      | `npm run build:demo`                  | Builds a static version of the demo site                                                                        |
| deploy demo     | `npm run deploy:demo`                 | Deploys static site to `pie-ui.now.sh`                                                                          |
| deploy demo dev | `npm run deploy:demo:next`            | Deploys static site to `pie-ui-next.now.sh`                                                                     |

### test single packages

To test an individual package you can do:

```shell
./node_modules/.bin/jest packages/calculator
````

### running in a browser

`scripts/demo $package-name`

### release

Merging to `master` will create a new release and build the demo site.

### release @next

Merging to `develop` will release `@next` versions and build the next demo site.

### dependencies

- [lerna js][lerna] for handling multiple packages in a mono repo
- [pie][pie] to test/build the pies

### package development

- use [jest][jest] for testing - it is set up at the root of this repo.
- file names - use kebab-case for filenames

[lerna]: https://lernajs.io/
[pie]: http://pie-framework.org
[ccs]: https://conventionalcommits.org/
[jest]: https://github.com/facebook/jest
