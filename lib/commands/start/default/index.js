"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _yeomanGenerator = _interopRequireDefault(require("yeoman-generator"));

var _logger = _interopRequireDefault(require("../../../helpers/logger"));

var _talentuiWebpackConfig = _interopRequireDefault(
  require("yuanian-webpack-config")
);

var _readPackage = _interopRequireDefault(
  require("../../../core/read-package")
);

var _getWebpackConfig = _interopRequireDefault(
  require("../../../core/get-webpack-config")
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

class _default extends _yeomanGenerator.default {
  writing() {
    const {
      contextRoot,
      output,
      mode = "development",
      asset_path
    } = this.options;
    const packInfo = new _readPackage.default(contextRoot).toJSON();
    const { name, version, componentCode } = packInfo;
    const library = name.replace(/@|\-|\//g, "_");
    let webpackConfig = (0, _getWebpackConfig.default)({
      contextRoot,
      output,
      mode,
      library,
      name,
      version,
      asset_path,
      componentCode
    });
    const serverInstance = new _webpackDevServer.default(
      (0, _webpack.default)(webpackConfig),
      {
        // webpack-dev-server options
        // 'contentBase': `${contextRoot}/`,
        // // Can also be an array, or: contentBase: "http://localhost/",
        // 'hot': true,
        // // It's a required option.
        // 'publicPath': '/'
      }
    ); //开启本地端口

    serverInstance.listen("3001", "0.0.0.0", function(err) {
      console.error(err);
    });
  }
}

exports.default = _default;
module.exports = exports.default;
