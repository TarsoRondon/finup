# FinUp — Especificação Técnica de Software (Anexo A)
*Sistema de Gestão Financeira Pessoal, Open Finance e Investimentos*

---

## 1. Objetivo
O **FinUp** é uma plataforma web desenvolvida para centralizar a organização orçamentária pessoal, a integração bancária em tempo real e o monitoramento inteligente de investimentos em um único ambiente digital seguro e intuitivo.

### 1.1 Problema que Resolve
- **Fragmentação Financeira:** Elimina a necessidade de acessar múltiplos aplicativos de bancos tradicionais e corretoras para checar saldos e faturas.
- **Descontrole Orçamentário e Falhas Manuais:** Substitui planilhas manuais propensas a erros por sincronização automática via Open Finance e inteligência analítica.
- **Dificuldade no Acompanhamento de Metas:** Oferece visão clara de evolução patrimonial e reserva de emergência com cálculo automático de taxa de poupança mensal.

### 1.2 Proposta de Valor
Unificação de conta digital virtual, transferências (Pix/TED), pagamento de boletos, portfólio de ativos (Ações B3, FIIs, Criptoativos e Renda Fixa) e um assistente conversacional com IA financeira contextual.

---

## 2. Usuários

### 2.1 Usuário Titular (Pessoa Física / Investidor)
- **Perfil:** Usuário final que busca controle de receitas, despesas e acompanhamento patrimonial.
- **Principais Ações:**
  - Realiza cadastro e login seguro (e-mail/senha ou Google Auth) com proteção por 2FA.
  - Conecta contas bancárias (Nubank, Itaú, Banco Inter, Bradesco, etc.) via Open Finance.
  - Executa e simula operações bancárias: envio e recebimento de Pix, transferências TED/DOC e pagamento de boletos.
  - Cadastra receitas e despesas avulsas manuais em dinheiro vivo.
  - Define e monitora metas financeiras (ex.: Reserva de Emergência, Aquisições, Viagens).
  - Consulta cotações em tempo real de ações da B3, criptomoedas (BTC, ETH) e câmbio (Dólar, Euro).
  - Interage com a FinUp IA para obter diagnósticos de gastos e recomendações de economia.
  - Exporta relatórios de movimentações em planilhas CSV e relatórios consolidados em PDF.

### 2.2 Sistema / Rotinas de Backend (Firebase Cloud Functions & Workers)
- **Perfil:** Serviços automatizados em nuvem responsáveis pela integração, segurança e processamento de dados.
- **Principais Ações:**
  - Autentica requisições e gerencia chaves secretas de APIs externas (Pluggy, BRAPI, CoinGecko).
  - Normaliza extratos bancários e aplica sanitização de dados.
  - Executa rotinas de cache para otimização de chamadas e redução de custos operacionais.
  - Assegura regras de isolamento multi-tenant via Firestore Security Rules.

---

## 3. Casos de Uso Principais

| ID | Nome do Caso de Uso | Ator Principal | Descrição Sucinta |
| :--- | :--- | :--- | :--- |
| **UC01** | **Autenticar e Gerenciar Sessão** | Usuário | Criar conta, realizar login com validação de credenciais ou modo demo e encerrar sessão com logout seguro. |
| **UC02** | **Conectar Conta Bancária (Open Finance)** | Usuário | Autorizar leitura de dados bancários via conector Pluggy seguro com token efêmero. |
| **UC03** | **Visualizar Dashboard Consolidado** | Usuário | Acessar saldo total, KPIs de receitas vs. despesas, fluxo mensal e cotações de mercado ao vivo. |
| **UC04** | **Operar Área Pix & Transferências** | Usuário | Enviar Pix com débito em conta, registrar comprovantes, gerenciar chaves e simular transferências TED/DOC. |
| **UC05** | **Pagar Contas & Boletos** | Usuário | Consultar contas pendentes com alertas de vencimento e efetuar baixa automática no saldo. |
| **UC06** | **Gerenciar Transações e Extrato** | Usuário | Listar, filtrar por categoria/data, adicionar movimentações manuais e exportar dados em formato CSV. |
| **UC07** | **Controlar Orçamento e Metas** | Usuário | Estabelecer tetos orçamentários por categoria e acompanhar barras percentuais de metas de economia. |
| **UC08** | **Monitorar Carteira de Investimentos** | Usuário | Visualizar rentabilidade de ativos de renda variável (B3), FIIs e cripto com cotações em tempo real. |
| **UC09** | **Consultar Assistente FinUp IA** | Usuário | Realizar perguntas ao assistente inteligente com leitura do contexto real de saldo, contas e faturas. |

---

## 4. Requisitos Funcionais (RF)

### 4.1 Autenticação e Conta
- **[RF01] Cadastro de Usuário:** O sistema deve permitir o cadastro de novos usuários mediante validação de nome, e-mail válido e senha com no mínimo 6 caracteres.
- **[RF02] Autenticação e Acesso Rápido:** O sistema deve suportar login por e-mail/senha, autenticação Google e modo de demonstração (*Demo Mode*) para visualização prévia.
- **[RF03] Encerramento Seguro:** O sistema deve invalidar a sessão no cliente e no backend no momento do logout.
- **[RF04] Perfil e Preferências:** O sistema deve possibilitar a alteração de dados cadastrais, alternância entre temas Claro/Escuro (*Dark Mode*) e personalização do objetivo financeiro.

### 4.2 Operações Bancárias & Transações
- **[RF05] Conexão Open Finance:** O sistema deve integrar-se ao conector seguro (Pluggy) para sincronizar saldos e transações de instituições financeiras parceiras.
- **[RF06] Operações Pix:** O sistema deve validar saldo antes do envio, debitar o valor em tempo real, gerar comprovante detalhado e permitir simulação de recebimentos.
- **[RF07] Transferências TED/DOC:** O sistema deve disponibilizar formulário em três etapas (Favorecido &rarr; Valor &rarr; Confirmação) com suporte aos principais bancos nacionais.
- **[RF08] Pagamento de Boletos:** O sistema deve listar boletos a vencer com alertas de prioridade por prazo, executar baixa do saldo e arquivar em histórico de pagamentos.
- **[RF09] Gestão Manual de Movimentações:** O usuário deve poder incluir, editar e excluir despesas e receitas manuais informando categoria, data, valor e descrição.
- **[RF10] Exportação de Dados:** O sistema deve gerar arquivos CSV com codificação UTF-8 BOM para compatibilidade com Microsoft Excel e relatórios impressos otimizados via CSS print.

### 4.3 Gestão Orçamentária, Investimentos e IA
- **[RF11] Apuração Orçamentária por Categoria:** O sistema deve calcular o consumo mensal por categorias (Alimentação, Moradia, Transporte, Lazer, etc.) e sinalizar estouros de orçamento.
- **[RF12] Gestão de Metas Financeiras:** O sistema deve permitir o cadastro de metas com valor alvo, prazo e cálculo percentual de atingimento a cada aporte.
- **[RF13] Acompanhamento de Investimentos:** O sistema deve exibir cotações em tempo real de ativos da B3 (ex.: PETR4, VALE3), FIIs e criptoativos (BTC, ETH) calculando rentabilidade média.
- **[RF14] Assistente Financeiro FinUp IA:** O sistema deve fornecer chat interativo que sintetiza saldo disponível, boletos pendentes e limites de orçamento para gerar diagnósticos financeiros precisos.

---

## 5. Requisitos Não Funcionais (RNF)

### 5.1 Segurança e Privacidade
- **[RNF01] Criptografia de Credenciais:** As senhas dos usuários nunca devem ser armazenadas em texto plano, utilizando funções criptográficas de hash seguras via Firebase Authentication.
- **[RNF02] Isolamento de Dados (Multi-Tenancy):** Cada usuário deve acessar estritamente seus próprios dados, com aplicação mandatória de Firestore Security Rules (`request.auth.uid == resource.data.userId`).
- **[RNF03] Proteção de Segredos de API:** Tokens de autenticação externos (`PLUGGY_CLIENT_SECRET`, chaves de API de terceiros) devem residir exclusivamente nas Cloud Functions / variáveis de ambiente do backend.
- **[RNF04] Comunicação Segura:** Todas as comunicações entre navegador e serviços devem trafegar compulsoriamente via protocolo HTTPS com criptografia TLS 1.3 / SSL 256-bit.

### 5.2 Desempenho e Eficiência
- **[RNF05] Tempo de Carregamento:** O First Contentful Paint (FCP) da página principal deve ocorrer em menos de 1,5 segundos em conexões padrão banda larga/4G.
- **[RNF06] Code-Splitting e Otimização:** As rotas internas devem ser carregadas sob demanda (*Lazy Loading* com `React.lazy` e `Suspense`), mantendo o bundle inicial abaixo de 50 kB gzip.
- **[RNF07] Política de Cache de Cotações:** Cotações externas devem ser armazenadas em cache por períodos de 3 a 5 minutos para respeitar limites de requisições de APIs parceiras.

### 5.3 Usabilidade e Compatibilidade
- **[RNF08] Responsividade Completa:** A interface deve adaptar-se perfeitamente a dispositivos móveis (larguras a partir de 320px), tablets e monitores desktop ultrawide.
- **[RNF09] Acessibilidade e Design System:** Utilização de contraste de cores WCAG AA, tipografia moderna (*Plus Jakarta Sans*) e feedback visual imediato em todas as ações interativas.

---

## 6. Modelo de Dados (NoSQL / Firestore)

O banco de dados do FinUp é estruturado em coleções no **Cloud Firestore**, garantindo escalabilidade horizontal e segregação por usuário:

```
users/ (Coleção Raiz)
 └── {userId} (Documento do Usuário - UID)
      ├── uid: string
      ├── email: string
      ├── displayName: string
      ├── avatarUrl: string?
      ├── financialGoal: string?
      ├── themePreference: "dark" | "light"
      ├── createdAt: timestamp
      │
      ├── accounts/ (Subcoleção de Contas Conectadas e Virtuais)
      │    └── {accountId}
      │         ├── bankName: string (ex: "FinUp Bank", "Nubank", "Itaú")
      │         ├── accountType: "checking" | "savings" | "investment"
      │         ├── balance: number
      │         ├── agency: string
      │         ├── accountNumber: string
      │         ├── isConnectedOpenFinance: boolean
      │         └── lastSyncAt: timestamp
      │
      ├── transactions/ (Subcoleção de Movimentações Financeiras)
      │    └── {transactionId}
      │         ├── description: string (ex: "Supermercado", "Salário Mensal")
      │         ├── amount: number (positivo = receita, negativo = despesa)
      │         ├── category: string ("Alimentação" | "Moradia" | "Transporte" | "Lazer" | "Outros")
      │         ├── type: "income" | "expense" | "pix" | "transfer" | "bill_payment"
      │         ├── date: timestamp
      │         ├── status: "completed" | "pending"
      │         ├── source: "manual" | "pluggy" | "pix_system"
      │         └── receiptData: object?
      │
      ├── bills/ (Subcoleção de Boletos e Contas a Pagar)
      │    └── {billId}
      │         ├── title: string (ex: "Internet Claro", "Aluguel")
      │         ├── amount: number
      │         ├── dueDate: timestamp
      │         ├── status: "pending" | "paid" | "overdue"
      │         ├── barcode: string?
      │         └── paidAt: timestamp?
      │
      ├── goals/ (Subcoleção de Metas Financeiras)
      │    └── {goalId}
      │         ├── title: string (ex: "Reserva de Emergência")
      │         ├── targetAmount: number
      │         ├── currentAmount: number
      │         ├── targetDate: timestamp
      │         ├── categoryIcon: string
      │         └── createdAt: timestamp
      │
      └── investments/ (Subcoleção de Carteira de Ativos)
           └── {assetId}
                ├── ticker: string (ex: "PETR4", "BTC", "KNRI11")
                ├── assetType: "stock" | "fii" | "crypto" | "fixed_income"
                ├── quantity: number
                ├── averageBuyPrice: number
                ├── currentPrice: number
                └── lastPriceUpdate: timestamp
```

---

## 7. Critérios de Aceite (Gherkin BDD)

### CA01 — Fluxo de Autenticação e Acesso
- **Dado que** o usuário acessa a tela `/login` e insere credenciais válidas;
- **Quando** clica no botão *"Entrar na conta"*;
- **Então** o sistema autentica a sessão, persiste o estado no store e redireciona para `/dashboard`.

### CA02 — Proteção de Rotas Privadas (Guarda de Rotas)
- **Dado que** um usuário anônimo não autenticado tenta acessar diretamente a URL `/pix` ou `/investimentos`;
- **Quando** a navegação é requisitada;
- **Então** o componente `PrivateRoute` intercepta a requisição e redireciona imediatamente para `/login` mantendo a integridade da aplicação.

### CA03 — Validação e Envio de Pix com Débito Real
- **Dado que** o usuário possui saldo de R$ 1.000,00 e preenche um Pix de R$ 250,00 com chave válida;
- **Quando** confirma o envio na etapa final;
- **Então** o saldo é atualizado imediatamente para R$ 750,00, uma transação de saída é inserida no extrato e o comprovante com ID único é renderizado.

### CA04 — Bloqueio de Transação por Saldo Insuficiente
- **Dado que** o usuário possui saldo de R$ 100,00 e tenta enviar um Pix ou TED de R$ 250,00;
- **Quando** clica para avançar no formulário;
- **Então** o sistema exibe alerta claro de *"Saldo insuficiente"* e impede a conclusão da operação.

### CA05 — Baixa Automática em Boletos a Pagar
- **Dado que** existe um boleto de "Internet" com status "Pendente" no valor de R$ 99,90;
- **Quando** o usuário clica em *"Pagar"* e confirma a operação com saldo disponível;
- **Então** o sistema debita R$ 99,90 do saldo em conta, altera o status do boleto para "Pago" e insere a movimentação no histórico de pagamentos.

### CA06 — Cálculo Visual de Metas Orçamentárias
- **Dado que** o usuário possui uma meta de R$ 10.000,00 com R$ 7.500,00 acumulados;
- **Quando** a página `/metas` é renderizada;
- **Então** a barra de progresso visual deve apresentar preenchimento exato de 75% com badge verde indicando a proximidade da conclusão.

---

## 8. Decisão de Stack Tecnológico e Deploy

| Camada | Tecnologia Selecionada | Justificativa Técnica |
| :--- | :--- | :--- |
| **Frontend Core** | **React 19 + TypeScript + Vite 8** | O React 19 garante renderização concorrente e modularidade; TypeScript fornece segurança de tipos estáticos em tempo de compilação; o Vite entrega compilação HMR quase instantânea e builds altamente otimizados. |
| **Estilização** | **Tailwind CSS v4 + Vanilla CSS** | Estilização utilitária de alta produtividade, suporte nativo a temas escuros dinâmicos, responsividade fluida e criação de folhas de estilo específicas para impressão (`@media print`). |
| **Gerenciamento de Estado** | **Zustand** | Store leve, sem boilerplate excessivo, com suporte a middlewares de persistência (`localStorage`), permitindo atualização reativa de saldos e transações em todos os componentes. |
| **Backend & Autenticação** | **Firebase Auth + Cloud Functions** | O Firebase Auth elimina a complexidade de gerenciamento manual de tokens e senhas; as Cloud Functions atuam como camada BFF (*Backend-for-Frontend*) para armazenar credenciais sensíveis de parceiros. |
| **Banco de Dados** | **Cloud Firestore (NoSQL)** | Banco de dados documental em tempo real, altamente escalável, com suporte nativo a sincronização offline e controle de acesso rigoroso por regras de segurança. |
| **APIs de Mercado Integradas** | **BRAPI, CoinGecko & AwesomeAPI** | Fornecem dados de cotações da B3 em tempo real, valores de criptomoedas atualizados globalmente e cotações cambiais de Dólar e Euro com alta disponibilidade. |
| **Estratégia de Deploy & CI/CD** | **Vercel / Firebase Hosting + GitHub Actions** | Integração contínua (CI/CD) com build automatizado em cada commit para a branch `main`, distribuição global via Edge CDN e certificado SSL automático gratuito. |

---
*Documento elaborado em conformidade com o Anexo A da Apostila de Engenharia de Software.*
