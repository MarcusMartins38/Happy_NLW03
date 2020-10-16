import React from "react";
import OrphanagesMap from "../../pages/OrphanagesMap";

import { render } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import api from "../../services/api";

const apiMock = new MockAdapter(api);

jest.mock("react-router-dom", () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe("Landing Page", () => {
  it("fetches successfully data from an API", async () => {
    const { debug } = render(<OrphanagesMap />);

    const apiResponse = {
      id: 7,
      name: "Lar dos Anjos",
      latitude: -8.7451647,
      longitude: -63.8730578,
    };

    apiMock.onGet("/orphanages").reply(200, apiResponse);

    debug();
  });
});
