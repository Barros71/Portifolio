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
      {/* Seção Sobre Mim */}
      <div className="text-center text-orange-400 text-4xl font-semibold border border-orange-400 p-4 rounded-lg">
        SOBRE MIM
      </div>

      {/* Seção Habilidades */}
      <div className="flex flex-col items-center">
        <h1 className="text-center w-80 text-orange-400 border border-orange-400 text-5xl font-semibold rounded bg-[#454545] p-2">
          Habilidades
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {[
            { name: "HTML", desc: "Define a estrutura de sites." },
            { name: "CSS", desc: "Adiciona estilo e design aos sites." },
            { name: "JavaScript", desc: "Dá funcionalidade e interatividade." },
            { name: "Banco de Dados", desc: "Gerencia e armazena dados." },
            { name: "Python", desc: "Linguagem poderosa para diversas aplicações." },
            { name: "Tailwind CSS", desc: "Framework para estilização rápida." },
          ].map((skill, index) => (
            <div key={index} className="bg-[#222] p-4 w-64 text-center rounded-lg border border-orange-400">
              <h1 className="text-lg font-semibold text-orange-400">{skill.name}</h1>
              <p className="text-gray-300 text-sm mt-2">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seção Projetos */}
      <div className="flex flex-col items-center">
        <h1 className="text-center w-80 text-orange-400 border border-orange-400 text-5xl font-semibold rounded bg-[#454545] p-2">
          Projetos
        </h1>

        {[ 
          { img: "/Calculadora.PNG", title: "Projeto Calculadora", desc: "Calculadora feita para reforçar meus conhecimentos em JavaScript e manipulação do DOM." },
          { img: "/cell.PNG", title: "Projeto Tempo", desc: "Site modelo para estudo de ícones e estilização. Não há backend de previsão do tempo." }
        ].map((project, index) => (
          <div key={index} className="flex items-center justify-center bg-[#222] p-6 rounded-lg mt-6 gap-6">
            <Image src={project.img} width={320} height={320} alt={project.title} className="rounded-lg w-80 h-80 object-cover" />
            <div className="max-w-md">
              <h1 className="text-3xl font-bold text-white">{project.title}</h1>
              <p className="text-gray-400 mt-2">{project.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário de Contato */}
      <div className="w-full sm:w-2/3 mx-auto mt-10">
        {status && (
          <div className={`text-white p-2 rounded border-2 border-white font-semibold text-center shadow-md max-w-md mx-auto ${statusClass}`}>
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-[#111] p-6 rounded-lg space-y-4 mt-6 mx-auto">
          <input type="text" name="name" placeholder="Seu nome" className="input-field" required />
          <input type="email" name="email" placeholder="Seu e-mail" className="input-field" required />
          <input type="text" name="assunto" placeholder="Assunto" className="input-field" required />
          <input type="text" name="cell" placeholder="Número de Celular" className="input-field" required />
          <textarea name="mensagem" placeholder="Sua mensagem" rows="4" className="input-field" required></textarea>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="whatsapp" name="whatsapp" className="w-5 h-5 accent-orange-400" />
            <label htmlFor="whatsapp" className="text-white cursor-pointer">Seu celular é WhatsApp</label>
          </div>

          <button type="submit" className="btn-submit" disabled={isSending}>
            {isSending ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>

      {/* Estilos extras */}
      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 12px;
          background: #222;
          color: white;
          border-radius: 8px;
          outline: none;
          border: 1px solid gray;
          transition: border 0.3s ease-in-out;
        }
        .input-field:focus {
          border-color: orange;
        }
        .btn-submit {
          width: 100%;
          background: black;
          color: white;
          font-weight: bold;
          padding: 12px;
          border-radius: 8px;
          transition: background 0.3s ease-in-out;
        }
        .btn-submit:hover {
          background: #333;
        }
      `}</style>
    </div>
  );
}
