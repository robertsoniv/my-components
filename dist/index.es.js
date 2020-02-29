import React from 'react';

var MyComponent = function (props) { return (React.createElement("div", { role: "heading" },
    "My First Component ",
    props.change ? "Change" : "")); };

var AnotherComponent = function (props) { return (React.createElement("div", { role: "heading" },
    "Another Component ",
    props.change ? "Change" : "")); };

export { AnotherComponent, MyComponent };
//# sourceMappingURL=index.es.js.map
