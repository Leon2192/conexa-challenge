"use client";

import Image from "next/image";
import React from "react";
import { ICharacter } from "@/interfaces/interfaces";
import { FaCheckCircle } from "react-icons/fa";

export function Card({ name, status, species, image, isSelected }: ICharacter) {
  const borderClass = isSelected
    ? "border border-pink-500 border-solid border-2 bg-rose-400"
    : "border border-gray-200 dark:border-white border-solid";

  return (
    <div
      className={`flex flex-row shadow-md dark:shadow-emerald-500/[0.1] dark:bg-transparent overflow-hidden rounded-lg border ${borderClass} h-56 transition duration-300 ease-in-out transform hover:shadow-lg hover:bg-orange-600 hover:text-white hover:cursor-pointer`} 
    >
      <div className="w-2/5">
        <Image
          src={image}
          alt="thumbnail"
          width={200}
          height={200}
          className="object-cover rounded-l-lg h-full"
        />
      </div>
      <div className="flex-1 p-4">
        <h3 className="text-lg font-bold text-white dark:text-green-700 text-center underline">
          {name}
        </h3>
        <div className="flex mt-2">
          <p className="text-white text-sm mr-2 dark:text-neutral-300">
            <span className="text-md font-semibold text-white"> Status:</span>{" "}
            {status}
          </p>
          <p className="text-white text-sm dark:text-neutral-300">
            <span className="font-semibold text-white"> Species:</span>  
            {species}
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <button className="text-white bg-gradient-to-r from-purple-500 to-violet-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-full text-sm px-5 py-2.5 shadow-md">
            Seleccionar
          </button>
        </div>
        {isSelected && ( 
          <div className="flex justify-center mt-2">
            <p className="text-green-500 font-semibold">
              <FaCheckCircle size={'1.5em'} color="#a3e635" />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
