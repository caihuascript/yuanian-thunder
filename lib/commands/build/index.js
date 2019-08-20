"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _yeomanGenerator = _interopRequireDefault(require("yeoman-generator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class _default extends _yeomanGenerator.default {
  constructor(args, opts) {
    super(args, opts);
    this.argument('cmd', {
      'type': String,
      'required': true
    });
  }

  composing() {
    this._private_resolve(`./${this.options.cmd}/index.js`);
  }

  _private_resolve(compoesePath) {
    let contextRoot = this.contextRoot;

    let packinfo = require(`${contextRoot}/package.json`);

    this.composeWith(require.resolve(compoesePath), Object.assign({}, this.options, {
      'package': packinfo,
      contextRoot
    }));
  }

}

exports.default = _default;
module.exports = exports.default;