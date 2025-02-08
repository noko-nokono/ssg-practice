require("@babel/register")({
  extensions: [".js", ".jsx"],
})

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const App = require("../src/pages/App.js").default;

async function build() {
  const templatePath = path.resolve(__dirname, "../dist/index.html");
  const outputPath = path.resolve(__dirname, "../dist/index.html");

  // 事前にReactをHTMLにレンダリング
  const content = ReactDOMServer.renderToString(React.createElement(App));

  // index.htmlを読み込み
  let html = fs.readFileSync(templatePath, "utf8");

  // id="root"の部分にコンテンツを埋め込む
  html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);

  const formattedHtml = await prettier.format(html, { parser: "html" });

  // index.htmlを上書き
  fs.writeFileSync(outputPath, formattedHtml);

  console.log("✅ SSG 完了: index.html に React の内容を埋め込みました");
}

build().catch(console.error);
