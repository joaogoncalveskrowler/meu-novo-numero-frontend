import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}


const backendUrl = import.meta.env.VITE_BACKEND_URL;

async function testarEmail() {
  console.log("🔗 URL do backend:", backendUrl);

  try {
    const response = await fetch(`${backendUrl}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: "seu-email@exemplo.com", // troque por um e-mail válido seu
        subject: "Teste de envio",
        html: "<p>Olá, isso é um teste de e-mail do Meu Novo Número!</p>"
      })
    });

    const data = await response.json();
    console.log("📩 Resultado da API:", data);
  } catch (error) {
    console.error("❌ Erro ao chamar a API:", error);
  }
}

testarEmail();
