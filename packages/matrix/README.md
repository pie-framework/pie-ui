# matrix

A [pie][pie] matrix custom element.

## Usage

To use this pie, you need to configure it within an Assessment Item. This means that you'll need to add it to the `index.html` and `config.json` files.

```html
<matrix-el pie-id="1"></matrix-el>
```

```javascript
{
  elements: {
    'multiple': '0.0.1'
  },
  models: [
    {
      id : "1",
      element: 'matrix',
      id: '1',
      mode: 'gather',
      disabled: false,
      rowsSize: 3,
      labelType: 'agreement',
      rowLabels: ['I\'m interested in politics.', 'I\'m interested in economics.'],
      columnLabels: ['Disagree', 'Unsure', 'Agree'],
      matrixValues: {},
      prompt: 'How interested are you in the following domains?'
    }
  ]
```

### Pie Demo

There is a demo in `docs/demo` that you can run to see an example of it's usage.

To preview it in that context you'll need the [pie][pie] tool.

```shell
npm install -g pie
cd matrix/docs/demo
pie serve #will build and serve the pie... then go to http://localhost:4000
```

## Test

```shell
npm test # run client and controller tests
npm run client-test # run client tests
npm run controller-test # run controller tests
```

## Release

```shell
gulp release
git checkout master
npm publish
```

[pie]: http://npmjs.org/package/pie
