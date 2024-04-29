import React from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import { useGlobalContext } from "@/context/GlobalContext";
import useCharacterRenderer from "@/utils/hooks/useCharacterRender";

const CharacterList = () => {
  const {
    characters1,
    characters2,
    currentPage1,
    currentPage2,
    handleNextPage,
    handlePrevPage,
    handlePrevPage2,
    handleNextPage2,
  } = useGlobalContext();

  const { renderCharacters, renderCharacters2 } = useCharacterRenderer();

  return (
    <div className="flex flex-col" id="characterList">
      <div className="mb-8">
        <h2 className="text-center text-3xl text-white">Character #1 List</h2>
        <div className="mt-4 flex justify-around mb-4">
          <button onClick={handlePrevPage} disabled={currentPage1 === 1}>
            <MdKeyboardDoubleArrowLeft color="red" />
          </button>
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-600 text-white">
            {currentPage1}
          </span>
          <button onClick={handleNextPage}>
            <MdKeyboardDoubleArrowRight color="red" />
          </button>
        </div>
        <div className="flex justify-center gap-4">
          {renderCharacters(characters1)}
        </div>
      </div>

      <div>
        <h2 className="text-center text-3xl text-white">Character #2 List</h2>
        <div className="mt-4 flex justify-around mb-4">
          <button onClick={handlePrevPage2} disabled={currentPage2 === 1}>
            <MdKeyboardDoubleArrowLeft color="red" />
          </button>
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-600 text-white">
            {currentPage2}
          </span>
          <button onClick={handleNextPage2}>
            <MdKeyboardDoubleArrowRight color="red" />
          </button>
        </div>
        <div className="flex justify-center gap-4">
          {renderCharacters2(characters2)}
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
