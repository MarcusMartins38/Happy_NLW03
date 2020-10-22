import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SignIn from "../../pages/SignIn";

const mockedHistoryPush = jest.fn();
// const mockedDispatch = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

// jest.mock("react-redux", () => {
//   return {
//     useDispatch: () => ({
//       dispatch: mockedDispatch,
//     }),
//   };
// });

describe("SignIn Page", () => {
  const initialState = { user: {}, token: "" };
  const mockStore = configureStore();
  let store, wrapper;

  it("should be able to sign in", async () => {
    // const { getByLabelText } = render(<SignIn />);

    store = mockStore(initialState);
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    const inputEmail = getByLabelText("E-mail");
    const inputPassword = getByLabelText("Senha");
    const buttonConfirm = getByText("Entrar");

    fireEvent.change(inputEmail, { target: { value: "Johndoe@gmail.com" } });
    fireEvent.change(inputPassword, { target: { value: "123123" } });

    fireEvent.click(buttonConfirm);

    waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith("/app");
    });
  });
});
