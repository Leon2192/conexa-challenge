import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CharacterList from "@/components/shared/CharacterList/CharacterList";
import { GlobalProvider } from "@/context/GlobalContext";

describe("CharacterList", () => {
  test("renders without crashing", async () => {
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

  test("each character is displayed as a card with status and species", async () => {
    render(
      <GlobalProvider>
        <CharacterList />
      </GlobalProvider>
    );

    await waitFor(() => {
      const characterCards = screen.getAllByTestId("character-card");
      expect(characterCards.length).toBeGreaterThan(0);

      characterCards.forEach((card) => {
        expect(card).toHaveTextContent(/Status:/i);
        expect(card).toHaveTextContent(/Species:/i);
      });
    });
  });
});
