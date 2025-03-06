"use server";
import nodemailer from "nodemailer";

export async function sendEmail(formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const cell = formData.get("cell");
    const assunto = formData.get("assunto");
    const mensagem = formData.get("mensagem");
    
    const isWhatsapp = formData.get("whatsapp") === "on";

    const whatsappInfo = isWhatsapp ? "O número informado é WhatsApp." : "O número informado não é WhatsApp.";

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_PARTICULAR,
            subject: assunto,
            text: `Nome: ${name}\nE-mail: ${email}\nNúmero: ${cell}\n\n${whatsappInfo}\n\nMensagem:\n${mensagem}`
        });

        console.log("Email Enviado com Sucesso");

        return { success: true, message: "Obrigado, a equipe recebeu seu e-mail" };

    } catch (error) {
        console.log("Erro ao enviar e-mail:", error);
        return { success: false, message: "Falha ao enviar e-mail", error_msg: error.message };
    }
}
