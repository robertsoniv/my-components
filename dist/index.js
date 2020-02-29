'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

var MyComponent = function (props) { return (React.createElement("div", { role: "heading" },
    "My First Component ",
    props.change ? "Change" : "")); };

var AnotherComponent = function (props) { return (React.createElement("div", { role: "heading" },
    "Another Component ",
    props.change ? "Change" : "")); };

exports.AnotherComponent = AnotherComponent;
exports.MyComponent = MyComponent;
//# sourceMappingURL=index.js.map
