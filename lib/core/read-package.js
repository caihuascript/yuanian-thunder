"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReadPackage {
  constructor(contextRoot) {
    this.contextRoot = contextRoot || process.cwd();
    this.packInfo = this.getPackageInfo();
  }

  get(key) {
    return this.packInfo[key];
  }

  toJSON() {
    return this.packInfo;
  }

  toString() {
    return JSON.stringify(this.packInfo);
  }

  getSafeName() {
    return (this.packInfo.name || '').replace(/@/ig, '').replace(/\//ig, '-');
  }

  getPackageInfo() {
    return _fs.default.existsSync(`${this.contextRoot}/package.json`) && require(`${this.contextRoot}/package.json`) || {};
  }

}

exports.default = ReadPackage;
module.exports = exports.default;