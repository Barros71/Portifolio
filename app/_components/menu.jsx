import React from "react";

export default function Menu() {
  return (
    <div className="w-full h-12 bg-red-700  flex items-center justify-end text-md sm:text-xl">
      <div className="flex">
        <h1 className=" text-white opacity-100 p-2 hover:text-orange-300">
          Sobre
        </h1>
        <h1 className=" text-black opacity-80 p-2 hover:text-orange-300">
          Projetos
        </h1>
        <h1 className=" text-black opacity-80 p-2 hover:text-orange-300">
          Tecnologias
        </h1>
      </div>
    </div>
  );
}
