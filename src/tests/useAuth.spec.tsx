import { renderHook, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import { useAuth } from "../index";

test("Should set loading to true on login", () => {
  const { result } = renderHook(() => useAuth("xxx", ["xxx"]));
  act(() => result.current.login("u", "p"));
  expect(result.current.loading).toBe(true);
});
