"use strict";

var _path = _interopRequireDefault(require("path"));

var _commander = _interopRequireDefault(require("commander"));

var _yeomanEnvironment = _interopRequireDefault(require("yeoman-environment"));

var _package = _interopRequireDefault(require("../package.json"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv.default.config({
  'path': _path.default.join(__dirname, '..', '.env')
});

const env = _yeomanEnvironment.default.createEnv().register(require.resolve('../lib/commands/start'), 'start').register(require.resolve('../lib/commands/build'), 'build');

_commander.default.version(_package.default.version, '-v, --version');

_commander.default.command('build [cmd]').option('-o, --output [output]', '构建运形态资源，资源输出路径').option('-s, --source [source]', '组件构建路径').option('-m, --mode [mode]', 'webpack构建资源的模式').description('代码构建命令').action(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (cmd, opts) {
    let {
      output,
      mode,
      source
    } = opts;
    env.run(`build ${cmd}`, {
      output,
      mode,
      source
    });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

_commander.default.command('start').option('-p, --asset_path [asset_path]', 'webpack构建资源的本机路径').option('-s, --source [source]', '组件构建路径').description('调试模块').action(opts => {
  let {
    asset_path,
    source
  } = opts;
  env.run(`start default`, {
    asset_path,
    source
  });
});

_commander.default.parse(process.argv);