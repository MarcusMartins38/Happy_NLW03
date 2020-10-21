import React from "react";
import MockAdapter from "axios-mock-adapter";
import api from "../../services/api";
import { fireEvent, render } from "@testing-library/react";
import CreateOrphanage from "../../pages/CreateOrphanage/CreateOrphanage";

const mockedHistoryPush = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
  };
});

const apiMock = new MockAdapter(api);

describe("CreateOrphanage Page", () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it("should be able to Register a Orphanage", () => {
    const { getByLabelText, getByText } = render(<CreateOrphanage />);

    const nameField = getByLabelText("Nome");
    const aboutField = getByLabelText("Sobre");
    const imagesField = getByLabelText("Fotos");
    const instructionsField = getByLabelText("Instruções");
    const opening_hoursField = getByLabelText("Horario de Abertura");
    const open_on_weekendsField = getByLabelText("Atende fim de semana");
    const buttonConfirm = getByText("Confirmar");

    fireEvent.change(nameField, { target: { value: "Lar dos Anjos" } });
    fireEvent.change(aboutField, { target: { value: "Sobre" } });
    fireEvent.change(imagesField, { target: { value: "Sobre" } });
    fireEvent.change(instructionsField, { target: { value: "Sobre" } });
    fireEvent.change(opening_hoursField, { target: { value: "8h as 16h" } });
    fireEvent.change(open_on_weekendsField, { target: { value: true } });
  });
});
