const React = require("react");
const ReactDOMServer = require("react-dom/server");
const App = require("../src/page/App.tsx").default;

const prerenderedHtml = ReactDOMServer.renderToString(React.createElement(App));

module.exports = prerenderedHtml;
