import { useEffect } from 'react';

export default function Faq() {
  useEffect(() => {
    document.title = "Perguntas Frequentes | Delícias da Tia";
  }, []);

  const perguntas = [
    {
      pergunta: "Quais formas de pagamento são aceitas?",
      resposta: "Aceitamos Pix, dinheiro e cartões de crédito e débito."
    },
    {
      pergunta: "Com quanto tempo de antecedência devo fazer meu pedido?",
      resposta: "Para garantir a disponibilidade, recomendamos fazer o pedido com pelo menos 2 dias de antecedência."
    },
    {
      pergunta: "Vocês entregam em domicílio?",
      resposta: "Sim! Entregamos em bairros próximos. Consulte a taxa de entrega pelo WhatsApp."
    },
    {
      pergunta: "Vocês fazem doces para festas?",
      resposta: "Sim, trabalhamos com kits personalizados para festas e eventos!"
    },
    {
      pergunta: "Onde posso ver o cardápio completo?",
      resposta: "Você pode visualizar o cardápio no nosso site ou solicitar pelo WhatsApp."
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Perguntas Frequentes (FAQ)</h2>

      <div className="accordion" id="faqAccordion">
        {perguntas.map((item, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading-${index}`}>
              <button
                className="accordion-button collapsed btn-secondary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${index}`}
                aria-expanded="false"
                aria-controls={`collapse-${index}`}
              >
                {item.pergunta}
              </button>
            </h2>
            <div
              id={`collapse-${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading-${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body bg-pink">
                {item.resposta}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
