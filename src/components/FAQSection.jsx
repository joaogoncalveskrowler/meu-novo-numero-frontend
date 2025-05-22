import React, { useState } from "react";

const faqList = [
  {
    question: "O que é um número virtual temporário?",
    answer:
      "É um número de telefone que você pode usar por tempo limitado para receber SMS de validação em sites e apps. Ideal para manter sua privacidade e proteger seu número real.",
  },
  {
    question: "Quais serviços aceitam os números?",
    answer:
      "Você pode usar em redes sociais, cadastros, apps de delivery, bancos digitais e outros. Confira sempre se o serviço não bloqueia números virtuais.",
  },
  {
    question: "Como faço o pagamento?",
    answer:
      "Aceitamos pagamentos via Pix. Após a confirmação, seu saldo é liberado na hora.",
  },
  {
    question: "Posso usar para WhatsApp?",
    answer:
      "Alguns números funcionam para WhatsApp, mas não garantimos para todos os tipos de ativação. Consulte a disponibilidade antes.",
  },
  {
    question: "Quanto tempo o número fica ativo?",
    answer:
      "Os números temporários ficam ativos por 20 minutos. Os planos fixos ou vitalícios têm duração maior, conforme seu plano.",
  },
  {
    question: "E se não receber o SMS?",
    answer:
      "Se você não receber o SMS em até 3 minutos, poderá reembolsar seu pedido de forma automática pelo próprio site (função em breve). Além disso, você terá acesso ao seu histórico de números para recuperar ou consultar sempre que quiser.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-slate-900/70 rounded-xl max-w-3xl mx-auto my-10 px-4 py-8 shadow-2xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
        Perguntas Frequentes
      </h2>
      <div className="space-y-4">
        {faqList.map((item, idx) => (
          <div
            key={idx}
            className={`border-b border-slate-700 transition-all`}
          >
            <button
              className="flex justify-between items-center w-full py-4 text-left text-lg font-semibold text-slate-200 focus:outline-none transition-colors hover:text-pink-400"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              {item.question}
              <span
                className={`ml-2 transform transition-transform ${
                  openIndex === idx ? "rotate-180 text-yellow-400" : ""
                }`}
              >
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === idx ? "max-h-32 py-2 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-slate-400">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
