import React from "react";

interface Props {
  change?: boolean;
}

const AnotherComponent: React.FunctionComponent<Props> = props => (
  <div role="heading">Another Component {props.change ? "Change" : ""}</div>
);

export default AnotherComponent;
