import "core-js/modules/es6.object.assign";
import React from 'react';
import ReactDOM from 'react-dom';
import propsLoader from './props-loader';
import rawComponent from '&/index';
var component = propsLoader(rawComponent);
/** 
 * 本地调试组件挂载，运行态打包时，以下代码会直接被删掉，不影响性能
*/

if (process.env.NODE_ENV === 'development') {
  var root = document.getElementById('italent-local-debug');

  if (root) {
    var Com = component;
    ReactDOM.render(React.createElement(Com, null), root);
  }
}
/**
 * 组件注册
 */


var componentCode = process.env.componentCode; // 组件编码

var appId = process.env.appId || 100; // 组件的应用ID,package.json内没有的话，默认是100 就是通用组件

window._talentui_registry.update("_externalComp", function (externalComp) {
  if (externalComp === undefined) {
    var newValue = {};
    newValue[appId] = {};
    newValue[appId][componentCode] = component;
    return newValue;
  } else {
    var curValue = externalComp[appId] || {};
    var newObj = {};
    newObj[componentCode] = component;
    externalComp[appId] = Object.assign({}, curValue, newObj);
    return externalComp;
  }
});