import * as React from "react";
import MyComponent from "./MyComponent";

export default { title: "MyComponent" };

export const basic = () => <MyComponent />;
export const change = () => <MyComponent change={true} />;
