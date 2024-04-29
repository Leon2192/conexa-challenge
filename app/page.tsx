"use client";
import CharacterList from "@/components/shared/CharacterList/CharacterList";
import EpissodesContainer from "@/components/shared/EpissodesContainer/EpisodesContainer";
import { GlobalProvider } from "@/context/GlobalContext";
import { SnackbarProvider } from "notistack";

export default function Home() {
  return (
    <GlobalProvider>
      <SnackbarProvider>
        <div className="grid grid-cols-12 gap-4 h-screen">
          <div className="col-span-12 sm:col-span-5">
            <EpissodesContainer />
          </div>
          <div className="col-span-12 sm:col-span-7">
            <CharacterList />
          </div>
        </div>
      </SnackbarProvider>
    </GlobalProvider>
  );
}
