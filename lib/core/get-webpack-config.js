"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _webpackBundleAnalyzer = _interopRequireDefault(
  require("webpack-bundle-analyzer")
);

var _talentuiWebpackConfig = _interopRequireDefault(
  require("yuanian-webpack-config")
);

var _readPackage = _interopRequireDefault(require("./read-package"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _default = ({
  contextRoot,
  output,
  mode = "production",
  library,
  name,
  version,
  asset_path,
  componentCode
}) => {
  // props
  const { appId } = new _readPackage.default(contextRoot).toJSON(); // 判断开发者是否配置了props

  let configpath = `${__dirname}/thunder-entry`;
  let targetpath = `${__dirname}/thunder-entry/props-loader.js`;

  _fs.default.exists(`${contextRoot}/src/props/index.js`, exists => {
    if (exists) {
      _fs.default.copyFileSync(
        `${configpath}/props-loader-exists.js`,
        targetpath
      );
    } else {
      _fs.default.copyFileSync(
        `${configpath}/props-loader-none.js`,
        targetpath
      );
    }
  }); // webapck 配置

  const webpackConfig = (0, _talentuiWebpackConfig.default)({
    mode,
    entry: {
      main: `${configpath}/index.js`
    },
    port: 3001,
    language: "mixed",
    extractStyles: false,
    publicPath:
      mode === "production"
        ? `//stnew03.beisen.com/ux/upaas/${name}/release/dist/`
        : "http://localhost:3001/",
    alias: {
      "&": `${contextRoot}/src` // path.resolve(__dirname, 'src')
    },
    hostPage: _path.default.resolve(__dirname, "../../index.html"),
    define: {
      "process.env": {
        library: JSON.stringify(library),
        packageName: JSON.stringify(name),
        componentCode: JSON.stringify(componentCode || name),
        NODE_ENV: JSON.stringify(mode),
        appId: JSON.stringify(appId)
      }
    },
    projectType: "module",
    devServer: mode == "production" ? false : true
  });
  return (0, _webpackMerge.default)(webpackConfig, {
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
      "styled-components": "styled"
    },
    output: {
      jsonpFunction: library
    } // plugins:
    //     mode == "production"
    //         ? [
    //               new Analyzer.BundleAnalyzerPlugin({
    //                   analyzerMode: "static",
    //                   generateStatsFile: true,
    //                   reportFilename: `report-${version}.html`,
    //                   statsFilename: `stats-${version}.json`,
    //                   openAnalyzer: false
    //               })
    //           ]
    //         : []
  });
};

exports.default = _default;
module.exports = exports.default;
