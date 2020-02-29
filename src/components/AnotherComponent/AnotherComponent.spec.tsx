import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { AnotherComponent } from "../../index";

test("Renders", async () => {
  const { getByRole } = render(<AnotherComponent />);
  expect(getByRole("heading")).toHaveTextContent("Another Component");
});

test("Renders with Change", async () => {
  const { getByRole } = render(<AnotherComponent change={true} />);
  expect(getByRole("heading")).toHaveTextContent("Another Component Change");
});
