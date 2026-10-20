import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const FAQS: FAQItem[] = [
  {
    question: 'O FinUp tem acesso para movimentar o meu dinheiro no banco?',
    answer: 'Não. O FinUp utiliza a tecnologia oficial de Open Finance regulamentada pelo Banco Central do Brasil. Essa integração opera exclusivamente em modo leitura. Nós nunca temos acesso a realizar transferências na sua conta externa sem sua autorização explícita via token e biometria.'
  },
  {
    question: 'Como funciona a FinUp IA? Ela realmente entende minhas finanças?',
    answer: 'Sim! Ao contrário de chatbots genéricos, a FinUp IA recebe o contexto estruturado e criptografado da sua conta (saldo em tempo real, contas a pagar, faturas e categorias de gastos). Com isso, ela responde exatamente quanto você gastou, alerta sobre vencimentos e calcula quanto você pode poupar sem complicar.'
  },
  {
    question: 'Posso usar o FinUp sem conectar contas bancárias reais?',
    answer: 'Com certeza! Você pode utilizar o FinUp como conta digital virtual autônoma, lançando receitas e despesas manuais, gerando Pix, controlando cartões e metas. Além disso, disponibilizamos o Modo Demonstração com 1 clique para você testar tudo com dados pré-carregados.'
  },
  {
    question: 'O Pix funciona 24 horas por dia, 7 dias por semana?',
    answer: 'Sim, a Área Pix do FinUp é 100% instantânea, permitindo envios com débito imediato no saldo, recebimento por chave ou QR Code e geração de comprovante detalhado com código de autenticação único.'
  },
  {
    question: 'Como funciona a exportação de dados para Excel e PDF?',
    answer: 'Na aba de Transações e Relatórios você tem um botão de "Exportar CSV" que gera uma planilha formatada com codificação UTF-8 BOM (perfeita para abrir no Excel em português), além do botão "Imprimir / Salvar PDF" que formata automaticamente a página em folha A4 limpa.'
  },
  {
    question: 'Posso cancelar minha assinatura a qualquer momento?',
    answer: 'Sim, sem fidelidade, multas ou pegadinhas. Você pode cancelar sua assinatura Pro a qualquer instante diretamente na aba de Configurações do seu painel.'
  }
]

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 bg-[#0E0E0C] border-t border-[#1C1C19]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181816] border border-[#262622] text-xs font-bold text-[#A3A39E] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#00A878]" /> Dúvidas Frequentes
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Respostas claras para suas perguntas.
          </h2>
          <p className="text-base text-[#9C9C98]">
            Tudo o que você precisa saber sobre o FinUp antes de dar o próximo passo.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="bg-[#141412] border border-[#22221F] rounded-2xl overflow-hidden transition-colors hover:border-[#2E2E2A]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-base text-white focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#00A878] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-[#9C9C98] leading-relaxed border-t border-[#1C1C19] pt-4 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
