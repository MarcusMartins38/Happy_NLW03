import React from "react";
import OrphanagesMap from "../../pages/OrphanagesMap";
import App from "../../App";

import { render } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import api from "../../services/api";

const apiMock = new MockAdapter(api);
const mockedHistoryPush = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe("OrphanageMap Page", () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store, wrapper;

  it("fetches successfully data from an API", async () => {
    // const { debug } = render(<OrphanagesMap />);

    store = mockStore(initialState);
    const { debug } = render(
      <Provider store={store}>
        <OrphanagesMap />
      </Provider>
    );

    // expect(getByText("Hello Worldd!")).not.toBeNull();

    const apiResponse = [
      {
        id: 7,
        name: "Lar dos Anjos",
        latitude: -8.7451647,
        longitude: -63.8730578,
        about: "teste",
        instructions: "teste",
        opening_hours: "teste",
        open_on_weekends: true,
        images: [
          {
            id: 1,
            url:
              "http://192.168.100.7:3333/uploads/1603237314319-d218b49e4.jpeg",
          },
        ],
      },
    ];

    expect(apiMock.onGet("/orphanages").reply(200, apiResponse));

    debug();
  });
});
