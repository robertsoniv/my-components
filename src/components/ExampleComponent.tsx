import React from "react";

export interface ExampleComponentProps {
  change?: boolean;
}

const ExampleComponent: React.FunctionComponent<ExampleComponentProps> = props => (
  <div role="heading">Example {props.change ? "Change" : ""}</div>
);

export default ExampleComponent;
