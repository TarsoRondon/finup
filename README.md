# 💎 FinUp — O Livro Oficial do Sistema (Mega Hiper Documento)

> **Documento Mestre de Especificação, Arquitetura, Engenharia de Software, Código-Fonte e Metodologia Acadêmica**  
> **Sistema:** FinUp — Crescimento e Organização Financeira  
> **Instituição:** Instituto Federal de Educação, Ciência e Tecnologia de Rondônia (IFRO) — Campus Porto Velho Calama  
> **Componente Curricular:** Desenvolvimento de Sistemas (Ensino Médio Técnico em Informática)  
> **Aluno / Desenvolvedor:** Tarso Rondon ([github.com/TarsoRondon/finup](https://github.com/TarsoRondon))  
> **Professor Orientador:** Rafael Pitwak  
> **Metodologia:** *Spec-Driven Development* e Programação com IA de Forma Responsável  

---

## 📑 Índice Geral

1. [Visão Geral, Identidade Visual e Branding](#1-visão-geral-identidade-visual-e-branding)
2. [A Metodologia em 7 Fases do IFRO](#2-a-metodologia-em-7-fases-do-ifro)
3. [Especificação Completa do Sistema (spec.md — Anexo A)](#3-especificação-completa-do-sistema-specmd--anexo-a)
4. [Arquitetura de Dados, Redes e Segurança (BFF)](#4-arquitetura-de-dados-redes-e-segurança-bff)
5. [Guia de Configuração das Contas Externas (100% Reais)](#5-guia-de-configuração-das-contas-externas-100-reais)
6. [Estrutura Completa de Diretórios do Projeto](#6-estrutura-completa-de-diretórios-do-projeto)
7. [Variáveis de Ambiente e Arquivos de Configuração](#7-variáveis-de-ambiente-e-arquivos-de-configuração)
8. [Código-Fonte: Backend & Cloud Functions (TypeScript)](#8-código-fonte-backend--cloud-functions-typescript)
9. [Código-Fonte: Regras de Segurança (Firestore Rules)](#9-código-fonte-regras-de-segurança-firestore-rules)
10. [Código-Fonte: Frontend Core (Firebase, Zustand e Hooks)](#10-código-fonte-frontend-core-firebase-zustand-e-hooks)
11. [Código-Fonte: Telas, Componentes e Rotas](#11-código-fonte-telas-componentes-e-rotas)
12. [Registro de Decisões e Changelog Crítico (Fases 3 e 5)](#12-registro-de-decisões-e-changelog-crítico-fases-3-e-5)
13. [Checklists Oficiais de Verificação (Anexos B, C e D)](#13-checklists-oficiais-de-verificação-anexos-b-c-e-d)
14. [Roteiro de Apresentação Oral de 5 a 7 Minutos](#14-roteiro-de-apresentação-oral-de-5-a-7-minutos)

---

## 1. Visão Geral, Identidade Visual e Branding

### 1.1 Sobre o Projeto
O **FinUp** foi concebido para resolver o problema moderno da fragmentação financeira. Usuários costumam possuir contas em múltiplos bancos digitais (como Nubank, Inter, Itaú, Bradesco) e investimentos pulverizados entre corretoras de criptoativos e renda fixa, dificultando o controle de despesas e a tomada de decisões financeiras inteligentes.

Diferente de sistemas com dados simulados ou fictícios, o FinUp integra **dados 100% reais**:
- **Open Finance Oficial:** Conexão direta às instituições bancárias brasileiras via API Pluggy (homologada pelo Banco Central).
- **Criptoativos em Tempo Real:** Cotações do Bitcoin (BTC) e Ethereum (ETH) via API CoinGecko.
- **Mercado Acionário Nacional:** Cotações de ações da B3 (PETR4, VALE3, ITUB4) via API Brapi.dev.
- **Câmbio Internacional:** Cotações comerciais do Dólar Americano e Euro via AwesomeAPI.
- **Renda Fixa Dinâmica:** Projeções de rendimento calculadas sobre taxas Selic e CDI reais.

### 1.2 Identidade Visual (Design System)
A marca FinUp expressa solidez, modernidade tecnológica e evolução financeira contínua:

- **Nome Comercial:** `FinUp` (composta pela junção de *Finance* + *Upward Growth*).
- **Slogan Oficial:** *"Crescimento e Organização Financeira"*.
- **Conceito da Logo:**
  - **Ícone:** Gráfico de colunas ascendentes em 3D, com uma flecha diagonal integrada apontando para o topo direito, com gradiente do azul-petróleo ao verde vibrante, repousando sobre linhas geométricas que remetem à estabilidade global.
  - **Tipografia:** Tipografia sem serifa forte (*Inter / Plus Jakarta Sans*). O termo **"Fin"** recebe azul marinho escuro (#1A3C4A / #1B5E6C), simbolizando segurança bancária; e o termo **"Up"** recebe verde esmeralda (#2ECC71), com a haste da letra **U** estilizada como uma flecha em ascensão.

```
       ▲  [Gradiente: #1B5E6C -> #2ECC71]
     ▲ █
   ▲ █ █    FinUp
 ▲ █ █ █    CRESCIMENTO E ORGANIZAÇÃO FINANCEIRA
```

### 1.3 Paleta de Cores e Tokens CSS
```
Cores Primárias e Acentos:
  --color-brand-teal:       #1B5E6C   (Menu ativo, botões secundários, bordas nobres)
  --color-brand-teal-dark:  #0D3D4A   (Gradientes de fundo)
  --color-brand-green:      #2ECC71   (Botões primários, destaque positivo, o "Up")
  --color-brand-green-dark: #27AE60   (Hover states e transições)

Superfícies (Dark Theme Elegante):
  --color-surface-bg:       #0F1923   (Fundo global da página)
  --color-surface-card:     #1A2635   (Cards, containers e sidebar)
  --color-surface-hover:    #223040   (Elementos clicáveis em repouso)
  --color-surface-border:   #2D4055   (Bordas e divisores semitransparentes)

Tipografia e Contrastes:
  --color-text-primary:     #F0F4F8   (Títulos, valores monetários, ênfases)
  --color-text-secondary:   #8FA3B3   (Legendas, rótulos e metadados)
  --color-text-muted:       #5E7385   (Placeholders e descrições secundárias)

Status Semântico:
  --color-status-success:   #2ECC71   (Receitas, metas cumpridas, rentabilidade positiva)
  --color-status-danger:    #E74C3C   (Despesas, débitos, alertas de estouro)
  --color-status-warning:   #F39C12   (Metas próximas do prazo, alertas de sincronização)
  --color-status-info:      #3498DB   (Informativos, badges bancárias)
```

---

## 2. A Metodologia em 7 Fases do IFRO

Seguindo as diretrizes da apostila *"Programar com IA de Forma Responsável"* do Prof. Rafael Pitwak, o projeto foi desenvolvido obedecendo ao seguinte ciclo:

| Fase | Título | Papel do Agente de IA | Papel Exclusivo do Estudante |
|---|---|---|---|
| **Fase 1** | **Do Tema à Spec** | Sugerir refinamentos e levantar dúvidas. | Definir tema, regras de negócio e critérios de aceite. |
| **Fase 2** | **Configuração de Ambiente** | Sugerir comandos e scripts auxiliares. | Criar contas, autenticar Git/GitHub e inicializar repositório. |
| **Fase 3** | **Desenvolvimento com Agente** | Escrever código a partir de prompts com base na spec. | Revisar cada diff, bloquear códigos inseguros e commitar. |
| **Fase 4** | **Testes com Responsabilidade** | Auxiliar na escrita de rotinas de teste. | Testar manualmente contra cada critério de aceite (CA). |
| **Fase 5** | **Diagnóstico e Correção** | Propor correções quando acionado com erro detalhado. | Entender a causa raiz do bug antes de aceitar o conserto. |
| **Fase 6** | **Implantação (Deploy)** | Auxiliar nos arquivos de configuração do build. | Conectar GitHub à Vercel e cadastrar variáveis de ambiente. |
| **Fase 7** | **Entrega e Apresentação** | — | Defender as decisões de engenharia e demonstrar ao vivo. |

> **A Regra de Ouro do Versionamento:**  
> Comandos que modificam o repositório (`git commit`, `git push`, `git merge`) são digitados **manualmente pelo estudante**, nunca gerados ou executados às cegas pela IA.

---

## 3. Especificação Completa do Sistema (spec.md — Anexo A)

Consulte o arquivo [`spec.md`](./spec.md) para a especificação técnica integral.

### 3.1 Casos de Uso Principais
- **UC01 — Autenticar Usuário:** Criar conta e fazer login com e-mail/senha, autenticação Google ou Modo Demo.
- **UC02 — Conectar Conta Bancária:** Vincular instituição financeira através do conector seguro da Pluggy (Open Banking).
- **UC03 — Sincronizar e Visualizar Extrato:** Obter transações bancárias e exibir lista detalhada com receitas, despesas e saldo atualizado.
- **UC04 — Operar Área Pix & Transferências:** Validação de saldo em conta, chave e emissão de comprovante.
- **UC05 — Pagar Contas & Boletos:** Gestão de boletos a vencer com baixa automática e débitos.
- **UC06 — Cadastrar Transação Manual:** Lançar transações avulsas informando descrição, valor, categoria, data e tipo.
- **UC07 — Gerenciar Metas Financeiras:** Criar metas informando valor alvo e prazo, visualizando a barra de progresso em tempo real.
- **UC08 — Acompanhar Cotações de Mercado:** Visualizar preços atualizados de criptomoedas (Bitcoin, Ethereum), ações da B3 (PETR4, VALE3) e câmbio (Dólar, Euro).
- **UC09 — Assistente FinUp IA:** Insights financeiros inteligentes baseados no perfil do usuário.

---

## 4. Arquitetura de Dados, Redes e Segurança (BFF)

### 4.1 Diagrama de Arquitetura em Camadas
O sistema adota o padrão **BFF (Backend-for-Frontend)**. O navegador do cliente jamais se comunica diretamente com credenciais confidenciais de terceiros:

```
[ NAVEGADOR DO USUÁRIO (React + Vite SPA) ]
                    │
      ┌─────────────┴─────────────┐
      │ (1) JWT Token Autenticado │ (HTTPS)
      ▼                           ▼
[ Firebase Auth ]       [ Firebase Cloud Functions (BFF) ]
(Login/Sessão)          (Isolamento de Secrets / Validação)
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
  [ API Pluggy ]          [ API CoinGecko ]        [ API Brapi.dev ]
  (Open Finance BR)       (Bitcoin / Ethereum)     (PETR4 / VALE3)
         │
         ▼
[ Cloud Firestore ] <───────────────── Submissão de Transações
(users/{uid}/transactions)
```

---

## 5. Guia de Configuração das Contas Externas (100% Reais)

Para reproduzir ou auditar o sistema do zero:

1. **Firebase Console ([console.firebase.google.com](https://console.firebase.google.com)):**
   - Criar projeto: `finup-app`.
   - Em **Authentication**, ativar provedores: *E-mail/Senha* e *Google*.
   - Em **Firestore Database**, criar banco de dados na região `southamerica-east1` (São Paulo).
   - Obter as chaves do aplicativo Web em Configurações do Projeto (`firebaseConfig`).
2. **Pluggy — Open Finance ([pluggy.ai](https://pluggy.ai)):**
   - Acessar o portal do desenvolvedor no modo **Meu Pluggy** (Sandbox gratuito).
   - Gerar `CLIENT_ID` e `CLIENT_SECRET`.
3. **Brapi.dev — Ações da B3 ([brapi.dev](https://brapi.dev)):**
   - Criar conta gratuita para obter o token de consulta (15.000 requisições/mês gratuitas).
4. **CoinGecko API ([coingecko.com/api](https://coingecko.com/api)):**
   - Criar conta Demo e gerar a chave pública `x-cg-demo-api-key`.

---

## 6. Estrutura Completa de Diretórios do Projeto

```
finup/
├── .env.local                            # Variáveis do frontend (chaves públicas do Firebase)
├── .gitignore                            # Bloqueio de node_modules e arquivos de ambiente
├── firebase.json                         # Configurações do Firebase Hosting e Functions
├── firestore.rules                       # Regras de segurança e isolamento do Firestore
├── package.json                          # Dependências do frontend React
├── tsconfig.json                         # Configurações do TypeScript (Strict Mode)
├── vite.config.ts                        # Configuração do Vite + Plugin TailwindCSS
├── index.html                            # Ponto de entrada HTML com fontes e SDK Pluggy
│
├── functions/                            # Backend Serverless (Firebase Cloud Functions)
│   ├── .env                              # Variáveis confidenciais (PLUGGY, BRAPI, COINGECKO)
│   ├── package.json                      # Dependências do backend (Node.js 20)
│   ├── tsconfig.json                     # Compilação TypeScript das functions
│   └── src/
│       ├── index.ts                      # Exportação central de todas as rotas/funções
│       ├── pluggy/
│       │   ├── createToken.ts            # Geração segura do connectToken
│       │   └── syncTransactions.ts       # Busca e gravação em lote de transações
│       └── market/
│           ├── getCrypto.ts              # Proxy de cotação de criptomoedas
│           ├── getStocks.ts              # Proxy de cotação de ações da B3
│           └── getExchange.ts            # Proxy de cotações de câmbio USD/EUR
│
└── src/                                  # Código-Fonte do Frontend
    ├── main.tsx                          # Inicialização do React DOM
    ├── App.tsx                           # Provedores globais (React Query + Router)
    ├── router.tsx                        # Declaração das rotas e controle de acesso
    ├── index.css                         # Declaração de tokens e design system FinUp
    │
    ├── lib/
    │   ├── firebase.ts                   # Inicialização das SDKs Firebase Auth/DB/Functions
    │   └── firestore.ts                  # Métodos auxiliares de leitura e gravação
    │
    ├── store/
    │   ├── authStore.ts                  # Estado de autenticação com Zustand (inclui Demo)
    │   ├── transactionsStore.ts          # Estado das transações, Pix e contas a pagar
    │   └── goalsStore.ts                 # Estado das metas orçamentárias
    │
    ├── hooks/
    │   ├── useAuth.ts                    # Hook de ciclo de vida e comandos de login/logout/demo
    │   └── useMarket.ts                  # Hook de cotações em tempo real (React Query)
    │
    ├── components/
    │   └── layout/
    │       ├── AppLayout.tsx             # Estrutura com Sidebar fixa e Topbar
    │       ├── Sidebar.tsx               # Navegação lateral com logotipo e rotas
    │       ├── Header.tsx                # Cabeçalho com cotações e status do usuário
    │       └── PrivateRoute.tsx          # Componente de guarda para proteção de rotas
    │
    └── pages/
        ├── Login.tsx                     # Tela de autenticação unificada (Email, Google e Demo)
        ├── Dashboard.tsx                 # Painel consolidado com cards e cotações ao vivo
        ├── Transactions.tsx              # Extrato bancário, filtros e formulário manual
        ├── Investments.tsx               # Painel de ações B3, criptomoedas e simulador Selic/CDI
        ├── Goals.tsx                     # Metas com barras de progresso visuais e aportes
        ├── Reports.tsx                   # Gráficos, métricas históricas e impressão em PDF
        ├── Pix.tsx                       # Área Pix com validação de saldo e recibo único
        ├── Bills.tsx                     # Boletos a pagar com baixa automática
        └── ConnectBank.tsx               # Widget oficial Open Finance Pluggy
```

---

## 7. Como Executar Localmente

### Pré-requisitos
- Node.js 18+ (recomendado Node.js 20 ou superior)
- NPM ou Yarn

### Instalação e Execução
```bash
# 1. Clonar repositório
git clone https://github.com/TarsoRondon/finup.git
cd finup

# 2. Instalar dependências do Frontend
npm install

# 3. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no seu navegador. Você pode usar o **Modo Demonstração** com 1 clique diretamente na tela de login para explorar todas as funcionalidades imediatamente sem necessidade de configuração prévia do Firebase.

---

## 8. Registro de Decisões e Changelog Crítico (Fases 3 e 5)

Este registro documenta as intervenções humanas onde propostas do agente de IA foram revisadas ou rejeitadas:

### Decisão #1 — Arquitetura de Comunicação com APIs de Mercado
- **Proposta Inicial da IA:** Chamar a API da Pluggy e da Brapi.dev direto no componente React no navegador, inserindo as chaves no `.env` do Vite com prefixo `VITE_`.
- **Intervenção Humana (Tarso Rondon):** **REJEITADO.** Variáveis com prefixo `VITE_` são empacotadas no arquivo `.js` público distribuído ao navegador. Qualquer pessoa poderia abrir a aba *Network* e roubar as chaves do desenvolvedor.
- **Solução Implementada:** Construção de uma camada BFF utilizando **Firebase Cloud Functions**. As chaves secretas ficam em variáveis restritas ao servidor (`functions/.env`).

### Decisão #2 — Modo de Teste nas Regras do Firestore
- **Proposta Inicial da IA:** Utilizar `allow read, write: if true;` para agilizar o desenvolvimento dos componentes.
- **Intervenção Humana (Tarso Rondon):** **REJEITADO.** Viola os princípios da Fase 4 da disciplina (Segurança Básica). Qualquer invasor que descobrisse o `projectId` poderia apagar todo o banco de dados.
- **Solução Implementada:** Escrita de regras estritas exigindo token JWT válido e conferência da chave de usuário (`request.auth.uid == userId`).

### Decisão #3 — Tratamento de Erros e Exceções
- **Proposta Inicial da IA:** Exibir na tela do usuário o dump JSON completo do erro retornado pela chamada da Cloud Function.
- **Intervenção Humana (Tarso Rondon):** **REJEITADO.** Mensagens com stack traces expõem versões internas de bibliotecas e estrutura do backend (CWE-209).
- **Solução Implementada:** Mensagens amigáveis para o usuário na interface e logs detalhados direcionados unicamente ao console protegido do Firebase.

---

## 9. Checklists Oficiais de Verificação (Anexos B, C e D)

### 9.1 Checklist de Segurança Básica (Anexo B)
- [x] **Hash de Senha:** Autenticação gerenciada pelo Firebase Authentication (senhas protegidas com algoritmos de hash modernos).
- [x] **Prepared Statements / Sem Injeção:** Consultas Firestore estruturadas via SDK NoSQL orientada a objetos, eliminando SQL Injection.
- [x] **Validação no Servidor:** As Cloud Functions e as regras de segurança do Firestore garantem que apenas dados válidos sejam gravados.
- [x] **Sem Credenciais no Git:** Verificado com `git log` e busca por palavras-chave (`secret`, `password`, `api_key`); nada confidencial foi comitado.
- [x] **Acesso Restrito:** Tentativas de troca de ID nas rotas são barradas pelas Firestore Security Rules.
- [x] **HTTPS Nativo:** Provido automaticamente pela infraestrutura de borda da Vercel.

### 9.2 Checklist Pré-Deploy (Anexo C)
- [x] Todos os casos de teste dos critérios de aceite (CA01 a CA06) validados.
- [x] Nenhuma credencial privada presente no repositório.
- [x] Variáveis de ambiente cadastradas com sucesso no painel de configurações do projeto na Vercel.
- [x] Arquivo `.gitignore` devidamente configurado contendo `.env*`, `dist/` e `node_modules/`.
- [x] `README.md` claro instruindo a execução local.
- [x] Aplicação testada em navegador mobile e desktop.

### 9.3 Checklist de Conclusão do Projeto (Anexo D)
- [x] Spec do sistema elaborada segundo o template oficial do Anexo A.
- [x] Repositório público ativo no GitHub com histórico consistente de commits: [github.com/TarsoRondon/finup](https://github.com/TarsoRondon).
- [x] Testes de critérios de aceite executados e documentados.
- [x] Checklist de segurança do Anexo B 100% satisfeito.
- [x] Sistema publicado em link de produção funcional na Vercel.
- [x] Changelog e registro de supervisão humana devidamente documentados.
- [x] Roteiro de apresentação de 5 a 7 minutos pronto para apresentação em sala.

---

## 10. Roteiro de Apresentação Oral de 5 a 7 Minutos

Roteiro planejado para apresentação em sala de aula perante o Prof. **Rafael Pitwak**:

1. **Apresentação e Problema (1 minuto):**  
   *"Bom dia, professor Rafael e colegas. Meu nome é Tarso Rondon e apresento o FinUp. Hoje, as pessoas têm contas digitais espalhadas em vários bancos e não conseguem enxergar com clareza para onde o dinheiro está indo. O FinUp resolve isso unificando contas reais via Open Finance e trazendo cotações de mercado ao vivo para organizar o orçamento em um só lugar."*

2. **Decisão Crítica da Spec (1 minuto):**  
   *"Na Fase 1, a decisão mais importante foi não trabalhar com dados fictícios. Decidimos integrar dados reais do ecossistema bancário nacional usando o Open Finance oficial via Pluggy e cotando o Bitcoin e ações da B3 via APIs reais, o que conferiu utilidade prática imediata ao software."*

3. **Supervisão Humana sobre o Agente de IA (1,5 minutos):**  
   *"Na Fase 3, a IA sugeriu colocar as chaves secretas de API diretamente no frontend do React. Como isso exporia nossos segredos no código público, eu rejeitei a proposta e projetei uma camada BFF com Firebase Cloud Functions. O cliente agora consome apenas endpoints intermediários seguros autenticados por token JWT."*

4. **Testes e Segurança (1 minuto):**  
   *"Validamos todos os critérios de aceite da spec. Testamos o isolamento do Firestore: caso um usuário tente ler ou modificar transações de outro modificando o identificador na requisição, o banco rejeita sumariamente graças às nossas Firestore Security Rules."*

5. **Demonstração ao Vivo no Vercel (1,5 minutos):**  
   *Abre o navegador no link de produção:*
   - Mostra a tela de login seguro e acesso com 1 clique ao Modo Demonstração.
   - Demonstra o Dashboard consolidado e a barra de cotações em tempo real atualizando.
   - Demonstra a abertura do conector de Open Finance e o cadastro de metas financeiras com barra de progresso visual.
   - Encerra agradecendo e abrindo para perguntas da banca.

---

*FinUp — Sistema de Gestão Financeira Pessoal e Investimentos · IFRO Calama · 2026*
