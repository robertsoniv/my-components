import React from "react";

interface Props {
  change?: boolean;
}

const MyComponent: React.FunctionComponent<Props> = props => (
  <div role="heading">My First Component {props.change ? "Change" : ""}</div>
);

export default MyComponent;
