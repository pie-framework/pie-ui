# pie-elements

The pie custom elements only.

Elements are in `packages`.

## install

```shell
npm install -g lerna
npm install # install root package and child packages
```

## develop

* the packages use `independent` versioning, meaning that a change in 1 package won't bump another package's version.
* use [conventional commits syntax][ccs] when commiting, lerna will detect the appropriate version bump.

### Commands

| Action  | Cmd                                   |
| ------- | ------------------------------------- |
| test    | `npm test`                            |
| lint    | `npm run lint`                        |
| build   | `npm run build`                       |
| release | `npm run release`                     |
| watch   | `scripts/watch --scope $package-name` |
| demo    | `scripts/demo $package-name`          |

To test an individual package you can do:

```shell
./node_modules/.bin/jest packages/calculator
```

### running in a browser

`scripts/demo $package-name`

### info

```shell
cd packages/multiple-choice/demo
pie serve
```

### release

```shell
git checkout master
git merge develop
git push
npm run release
git checkout develop
git merge master
git push
```

### dependencies

* [lerna js][lerna] for handling multiple packages in a mono repo
* [pie][pie] to test/build the pies

### package development

* use [jest][jest] for testing - it is set up at the root of this repo.
* file names - use kebab-case for filenames

[lerna]: https://lernajs.io/
[pie]: http://pie-framework.org
[ccs]: https://conventionalcommits.org/
[jest]: https://github.com/facebook/jest
