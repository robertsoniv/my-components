import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ExampleComponent } from "../index";

test("Renders", async () => {
  const { getByRole } = render(<ExampleComponent />);
  expect(getByRole("heading")).toHaveTextContent("Example");
});

test("Renders with Change", async () => {
  const { getByRole } = render(<ExampleComponent change={true} />);
  expect(getByRole("heading")).toHaveTextContent("Example Change");
});
