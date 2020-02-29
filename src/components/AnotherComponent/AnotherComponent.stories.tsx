import * as React from "react";
import AnotherComponent from "./AnotherComponent";

export default { title: "Another Component" };

export const basic = () => <AnotherComponent />;
export const change = () => <AnotherComponent change={true} />;
