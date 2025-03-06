import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



export const metadata = {
  title: "Meu Portifolio - bombonieriacucar@gmail.com",
  description: "bombonieriacucar@gmail.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" autoComplete="off">
      <body

      >
        {children}
      </body>
    </html>
  );
}
