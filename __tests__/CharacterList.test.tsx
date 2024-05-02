import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CharacterList from "@/components/shared/CharacterList/CharacterList";
import { GlobalProvider } from "@/context/GlobalContext";

describe("CharacterList", () => {
  test("render Character list sin romper app", async () => {
    render(
      <GlobalProvider>
        <CharacterList />
      </GlobalProvider>
    );

    await waitFor(() => {
      const characterListElement = screen.getByTestId("character-list");
      expect(characterListElement).toBeInTheDocument();
    });
  });
});
