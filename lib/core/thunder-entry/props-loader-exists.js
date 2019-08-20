import "core-js/modules/es6.promise";
import "core-js/modules/es6.object.to-string";
//按需挂载属性设置，这样运行态就不用加载属性组件
export default function (Target) {
  if (Target.hasOwnProperty('getEditProps')) {
    return Target;
  }

  Target.getEditProps = function () {
    return new Promise(function (resolve) {
      import('&/props/index').then(function (props) {
        resolve(props.default);
      });
    });
  };

  return Target;
}
;