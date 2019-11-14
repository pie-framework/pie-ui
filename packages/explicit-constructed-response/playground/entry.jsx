var HtmlToReactParser = require('html-to-react').Parser;
const React = require('react');
const ReactDOM = require('react-dom');
const raw = `<strong>The inverse of the function</strong> <div class="kds-nowrap"><strong><em>f</em>(<em>x</em>) =</strong> <table class="kds-fraction"><tbody><tr><td class="kds-numerator"><strong>1</strong></td></tr><tr><td class="kds-denominator"><strong>6</strong></td></tr></tbody></table><strong><em>x</em> – 12</strong></div> <strong>can be expressed as <span class="kds-nowrap"><em>f</em><sup>–1</sup> (<em>x</em>) = <em>ax</em> + <em>b</em>,</span> where <em>a</em> and <em>b</em> are real numbers.</strong><br> <br><strong>Complete the table with the correct values of <em>a</em> and <em>b</em>. </strong><br><br><table class="KdsTable01"><tbody><tr><th style="width:100px;"><strong>Quantity</strong></th><th style="width:100px;"><strong>Value</strong></th></tr><tr><td><em>a</em></td><td> {{0}} </td></tr><tr><td><em>b</em></td><td> {{1}} </td></tr></tbody></table>`;

const withSpace = `<strong>The inverse of the function</strong> <div class="kds-nowrap"><strong><em>f</em>(<em>x</em>) =</strong> <table class="kds-fraction"><tbody><tr> <td class="kds-numerator"><strong>1</strong></td></tr><tr><td class="kds-denominator"><strong>6</strong></td></tr></tbody></table><strong><em>x</em> – 12</strong></div> <strong>can be expressed as <span class="kds-nowrap"><em>f</em><sup>–1</sup> (<em>x</em>) = <em>ax</em> + <em>b</em>,</span> where <em>a</em> and <em>b</em> are real numbers.</strong><br> <br><strong>Complete the table with the correct values of <em>a</em> and <em>b</em>. </strong><br><br><table class="KdsTable01"><tbody><tr><th style="width:100px;"><strong>Quantity</strong></th><th style="width:100px;"><strong>Value</strong></th></tr><tr><td><em>a</em></td><td> {{0}} </td></tr><tr><td><em>b</em></td><td> {{1}} </td></tr></tbody></table>`;
var parser = new HtmlToReactParser();
// const table = parser.parse(`
// <table>
//   <tbody>
//     <tr>
//       <td>Lorem Ipsum</td>
//     </tr>
//   </tbody>
// </table>
// `);

const rawParsed = parser.parse(raw);
const withSpaceParsed = parser.parse(withSpace);

const EcrMarkup = () => <React.Fragment>{rawParsed}</React.Fragment>;
const WithSpace = () => <React.Fragment>{withSpaceParsed}</React.Fragment>;

const Both = () => (
  <div>
    <h4>This is the raw markup converted - no issues</h4>
    <EcrMarkup />
    <hr />
    <h4>A space has been added here to the markup and it creates the error</h4>
    <WithSpace />
  </div>
);
const el = React.createElement(Both);
ReactDOM.render(el, document.querySelector('#app'));

// console.log(ReactDOMServer.renderToStaticMarkup(table));
// // var htmlInput = '<div><h1>Title</h1><p>A paragraph</p></div>';
// var reactElement = parser.parse(h);
// var reactHtml = ReactDOMServer.renderToStaticMarkup(reactElement);

// console.log('reactHtml', reactHtml);
// //assert.equal(reactHtml, htmlInput); // true
