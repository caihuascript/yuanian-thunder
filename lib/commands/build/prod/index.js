"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _yeomanGenerator = _interopRequireDefault(require("yeoman-generator"));

var _logger = _interopRequireDefault(require("../../../helpers/logger"));

var _readPackage = _interopRequireDefault(require("../../../core/read-package"));

var _getWebpackConfig = _interopRequireDefault(require("../../../core/get-webpack-config"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class _default extends _yeomanGenerator.default {
  writing() {
    const {
      contextRoot,
      output,
      mode
    } = this.options;
    const {
      name,
      version,
      componentCode
    } = new _readPackage.default(contextRoot).toJSON();
    const library = name.replace(/@|\-|\//g, "_");
    const webpackConfig = (0, _getWebpackConfig.default)({
      contextRoot,
      output,
      mode,
      library,
      name,
      version,
      componentCode
    });
    (0, _webpack.default)(webpackConfig).run((err, stats) => {
      if (err || stats.hasErrors() || stats.compilation && stats.compilation.errors.length > 0) {
        console.log(err || stats.compilation.errors);
        throw new Error(err || stats || stats.compilation.errors);
      } else {// ok
      }
    });
  }

}

exports.default = _default;
module.exports = exports.default;