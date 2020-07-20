# likert

A [pie][pie] likert custom element.

## Usage

To use this pie, you need to configure it within an Assessment Item. This means that you'll need to add it to the `index.html` and `config.json` files.

```html
<likert-el pie-id="1"></likert-el>
```

```javascript
{
  elements: {
    'multiple': '0.0.1'
  },
  models: [
    {
      id : "1",
      element: 'likert',
      mode: 'gather',
      disabled: false,
      likertScale: 'likert3',
      likertType: 'agreement',
      likertOrientation: 'horizontal',
      choices: [
        {
          label: 'Disagree',
          value: -1
        },
        {
          label: 'Unsure',
          value: 0
        },
        {
          label: 'Agree',
          value: 1
        }
      ],
      prompt: 'How likely are you to report a problem?'
    }
  ]
```

### Pie Demo

There is a demo in `docs/demo` that you can run to see an example of it's usage.

To preview it in that context you'll need the [pie][pie] tool.

```shell
npm install -g pie
cd likert/docs/demo
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
