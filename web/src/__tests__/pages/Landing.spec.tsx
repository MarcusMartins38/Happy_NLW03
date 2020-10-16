import React from "react";
import Landing from "../../pages/Landing";
import { render } from "@testing-library/react";

jest.mock("react-router-dom", () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe("Landing Page", () => {
  it("should be able to navigate to OrphanagesMap", () => {
    const { debug } = render(<Landing />);

    debug();
  });
});
