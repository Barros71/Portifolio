"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { sendEmail } from "../actions/actions";

export default function Projetos() {
  const [status, setStatus] = useState("Entre em Contato");
  const [statusClass, setStatusClass] = useState("bg-black");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (status !== "Entre em Contato" && status !== "Aguarde, enviando e-mail...") {
      const timer = setTimeout(() => {
        setStatus("Entre em Contato");
        setStatusClass("bg-black");
        setIsSending(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSending(true);
    setStatus("Aguarde, enviando e-mail...");
    setStatusClass("bg-yellow-500");

    const form = new FormData(event.target);
    form.set("whatsapp", form.has("whatsapp") ? "Sim" : "Não");

    const response = await sendEmail(form);

    setStatus(response.message);
    setIsSending(false);

    if (response.success) {
      setStatusClass("bg-green-500");
      event.target.reset();
    } else {
      setStatusClass("bg-red-500");
    }
  }

  return (
    <div className="h-auto w-full bg-black text-white p-8 space-y-12">
      <div className="text-center text-orange-400 text-4xl font-semibold border border-orange-400 p-4 rounded-lg">
        SOBRE MIM
      </div>

      <div className="items-center w-full mx-auto flex justify-center">
        <h1 className="text-center w-80 text-orange-400 border border-orange-400 text-5xl font-semibold rounded bg-[#454545]">
          Habilidades
        </h1>
      </div>

      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        {[
          { name: "HTML", desc: "Linguagem responsável por definir o esqueleto de sites." },
          { name: "CSS", desc: "Linguagem responsável por definir o estilo dos sites." },
          { name: "JavaScript", desc: "Linguagem responsável por adicionar lógica aos sites." },
          { name: "Banco de Dados", desc: "Armazena e gerencia dados organizadamente." },
          { name: "Python", desc: "Linguagem versátil para desenvolvimento de software." },
          { name: "Tailwind CSS", desc: "Framework para estilização eficiente de interfaces." },
        ].map((skill, index) => (
          <div key={index} className="flex flex-col bg-[#454545] rounded border border-orange-400 p-4 w-60 text-center">
            <h1 className="text-lg font-semibold text-orange-400">{skill.name}</h1>
            <p className="text-gray-300 text-sm mt-2">{skill.desc}</p>
          </div>
        ))}
      </div>

      <div className="items-center w-full mx-auto flex justify-center">
        <h1 className="text-center w-80 text-orange-400 border border-orange-400 text-5xl font-semibold rounded bg-[#454545]">
          Projetos
        </h1>
      </div>

      <div className="flex items-center justify-center space-x-12 bg-[#222] p-8 rounded-lg">
        <div className="rounded-lg overflow-hidden">
          <Image
            src="/Calculadora.PNG"
            width={320}
            height={320}
            alt="Projeto Calculadora"
            className="rounded-lg w-80 h-80 object-cover"
          />
        </div>
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-white">Projeto Calculadora</h1>
          <p className="text-gray-400 mt-2">
            Um dos meus primeiros projetos práticos. Essa calculadora foi desenvolvida para reforçar meus conhecimentos em JavaScript, manipulação do DOM e estilização com CSS.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-12 bg-[#222] p-8 rounded-lg">
        <div className="rounded-lg overflow-hidden">
          <Image
            src="/cell.PNG"
            width={320}
            height={320}
            alt="Projeto Tempo"
            className="rounded-lg w-80 h-80 object-cover"
          />
        </div>
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-white">Projeto Tempo</h1>
          <p className="text-gray-400 mt-2">
            Um projeto de um site de tempo, é apenas um estilo criado de teste para aprender sobre ícones e estilização de sites. Não há nenhum backend para prever o tempo. (Modelo Mobile)
          </p>
        </div>
      </div>

      <div className="w-full sm:w-2/3 mx-auto mt-10">

        {status && (
          <div
            className={`text-white p-2 rounded border-2 border-white font-semibold text-center shadow-md max-w-md mx-auto ${statusClass}`}
          >
            {status}
          </div>
        )}

        <div className="items-center w-full mx-auto flex justify-center">
          <h1 className="text-center w-[500px] text-orange-400 border border-orange-400 text-5xl font-semibold rounded bg-[#454545]">
            Entre em Contato
          </h1>
        </div>

        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-[#111] p-6 rounded-lg space-y-4">
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full p-3 bg-[#222] text-white rounded-lg outline-none border border-gray-700 focus:border-orange-400"
              id="name"
              name="name"
              required
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              className="w-full p-3 bg-[#222] text-white rounded-lg outline-none border border-gray-700 focus:border-orange-400"
              id="email"
              name="email"
              required
            />
            <input
              type="text"
              placeholder="Assunto"
              className="w-full p-3 bg-[#222] text-white rounded-lg outline-none border border-gray-700 focus:border-orange-400"
              id="assunto"
              name="assunto"
              required
            />
            <input
              type="text"
              placeholder="Número de Celular"
              className="w-full p-3 bg-[#222] text-white rounded-lg outline-none border border-gray-700 focus:border-orange-400"
              id="cell"
              name="cell"
              required
            />
            <textarea
              placeholder="Sua mensagem"
              rows="4"
              className="w-full p-3 bg-[#222] text-white rounded-lg outline-none border border-gray-700 focus:border-orange-400"
              id="mensagem"
              name="mensagem"
              required
            ></textarea>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="whatsapp" name="whatsapp" className="w-5 h-5 accent-orange-400" />
              <label htmlFor="whatsapp" className="text-white cursor-pointer">
                Seu celular é WhatsApp
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-bold p-3 rounded-lg hover:bg-gray-900 transition"
              disabled={isSending}
            >
              {isSending ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
