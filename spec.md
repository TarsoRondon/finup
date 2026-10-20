# FinUp — Especificação Técnica de Software (Anexo A)
*Sistema de Gestão Financeira Pessoal, Open Finance, Operações Bancárias e Investimentos*

> **Repositório Oficial no GitHub:** [https://github.com/TarsoRondon/finup](https://github.com/TarsoRondon/finup)  
> **Instituição:** Instituto Federal de Rondônia (IFRO) — Campus Porto Velho Calama  
> **Componente Curricular:** Desenvolvimento de Sistemas (Ensino Médio Técnico em Informática)  
> **Aluno / Desenvolvedor:** Tarso Rondon  
> **Orientador:** Prof. Rafael Pitwak  
> **Metodologia:** Spec-Driven Development (Apostila *Programar com IA de Forma Responsável*)

---

## 1. Objetivo

O **FinUp** é uma plataforma web desenvolvida para pessoas físicas e investidores que necessitam centralizar a gestão do orçamento pessoal, o acompanhamento patrimonial e operações financeiras cotidianas em um único ambiente seguro. O sistema unifica dados de contas bancárias via Open Finance oficial, permite emissão e recebimento de Pix com comprovante autenticado, controle de cartões e faturas, quitação de boletos com simulação de código de barras, cotações de mercado ao vivo (B3, criptomoedas e moedas) e diagnósticos com Inteligência Artificial contextual, eliminando planilhas manuais dispersas e o uso simultâneo de múltiplos aplicativos bancários.

---

## 2. Usuários

| Tipo de Usuário | Permissões e Ações Associadas no Sistema |
| :--- | :--- |
| **Usuário Titular (Cliente / Pessoa Física)** | Cadastra-se na plataforma, efetua login com e-mail/senha ou Google Auth, recupera senha via e-mail e acessa o painel financeiro. Pode realizar e simular operações Pix (com validação de saldo e emissão de comprovante oficial Bacen), simular transferências bancárias TED/DOC para diversas instituições, gerenciar boletos a pagar com baixa automática no saldo, controlar cartões físicos e virtuais (com bloqueio temporário em 1 clique e pagamento de fatura), cadastrar receitas e despesas manuais, estipular metas de economia com aportes rápidos, consultar cotações da B3 e criptoativos, interagir com o assistente FinUp IA e exportar relatórios em formato CSV e PDF. |
| **Usuário Convidado (Modo Demonstração / Auditor)** | Acessa instantaneamente o sistema com um clique ("Acesso Demo"), sem necessidade de preencher formulário de cadastro ou autenticar credenciais no Firebase. Possui permissão de visualização e teste interativo completo de todas as telas, transações pré-carregadas, simulação de Pix, liquidação de faturas de teste e restauração dos dados padrão a qualquer momento. |
| **Sistema / Rotinas de Backend (Cloud Functions & BFF)** | Serviço automatizado responsável por intermediar requisições para APIs parceiras externas (Pluggy, BRAPI, CoinGecko, AwesomeAPI), garantindo que chaves secretas de API nunca trafeguem no cliente. Executa normalização de extratos bancários, aplica validações de segurança e garante o isolamento multi-tenant dos dados nas regras de acesso do banco. |

---

## 3. Casos de Uso Principais

A tabela abaixo mapeia as ações centrais do sistema, correlacionando-as diretamente com os Requisitos Funcionais (Seção 4):

| ID | Nome do Caso de Uso | Ator Principal | Descrição Sucinta | Requisitos Relacionados |
| :--- | :--- | :--- | :--- | :--- |
| **UC01** | **Autenticar e Gerenciar Acesso** | Usuário Titular / Convidado | Cadastrar nova conta, autenticar-se via E-mail/Senha ou Google, recuperar acesso por e-mail ou ingressar via Modo Demonstração 1-Clique. | RF01, RF02, RF03, RF04 |
| **UC02** | **Operar Área Pix 24/7** | Usuário Titular | Enviar transferências Pix com validação de saldo, simular recebimento de valores em conta e emitir comprovante autenticado com ID único. | RF05, RF06 |
| **UC03** | **Realizar Transferências TED/DOC** | Usuário Titular | Preencher assistente em etapas (Banco, Favorecido, Agência, Conta e Valor), validar saldo disponível e gerar recibo de transferência. | RF07 |
| **UC04** | **Gerenciar e Pagar Boletos** | Usuário Titular | Consultar títulos a vencer com avisos de urgência, validar código de barras (44/48 dígitos), efetuar pagamento e registrar baixa automática. | RF08, RF09 |
| **UC05** | **Controlar Cartões e Faturas** | Usuário Titular | Visualizar dados com máscara segura, copiar número de cartão virtual, alternar bloqueio temporário e quitar fatura restaurando o limite. | RF10, RF11 |
| **UC06** | **Gerenciar Extrato e Transações** | Usuário Titular | Listar movimentações, filtrar por categoria, cadastrar lançamentos manuais e exportar dados em planilha CSV (UTF-8 BOM). | RF12, RF13 |
| **UC07** | **Acompanhar Carteira e Cotações** | Usuário Titular | Visualizar cotações em tempo real de ativos da B3, criptoativos e moedas, calculando preço médio de compra e rentabilidade. | RF14, RF15 |
| **UC08** | **Gerenciar Metas e Orçamento** | Usuário Titular | Criar metas com valor alvo e prazo, realizar aportes financeiros rápidos com débito em conta e acompanhar tetos orçamentários por categoria. | RF16, RF17 |
| **UC09** | **Consultar Assistente FinUp IA** | Usuário Titular | Interagir via chat com a inteligência contextual que analisa saldo disponível, boletos pendentes e limites para sugerir economia. | RF18 |
| **UC10** | **Emitir Relatórios Analíticos** | Usuário Titular | Visualizar gráficos de fluxo de caixa, calcular taxa de poupança mensal e imprimir relatórios formatados em folha A4 limpa sem menus. | RF19, RF20 |

---

## 4. Requisitos Funcionais (RF)

- **[RF01] Cadastro de Usuário:** O sistema deve permitir o cadastro de novos usuários informando nome completo, e-mail válido e senha com no mínimo 6 caracteres e ao menos um número.
- **[RF02] Autenticação e Login:** O sistema deve permitir login seguro por e-mail e senha cadastrados ou autenticação federada com Google OAuth 2.0.
- **[RF03] Recuperação de Senha:** O sistema deve fornecer opção de recuperação de conta, enviando link de redefinição de senha para o e-mail informado.
- **[RF04] Modo Demonstração (Convidado):** O sistema deve oferecer acesso instantâneo em 1 clique ("Acesso Demo") pré-carregando dados fictícios completos para auditoria sem login prévio.
- **[RF05] Envio de Pix com Débito Imediato:** O sistema deve validar se o saldo em conta é suficiente antes de enviar um Pix, debitar o montante em tempo real e registrar a movimentação no extrato.
- **[RF06] Comprovante Autenticado de Pix:** O sistema deve gerar um comprovante detalhado para cada Pix concluído contendo código de autenticação Bacen, data/hora, chave/favorecido e botão para impressão ou cópia de texto.
- **[RF07] Transferências TED/DOC:** O sistema deve permitir transferências interbancárias em etapas com seleção de banco de destino (BB, Bradesco, Itaú, Nubank, Inter, Caixa, etc.), agência, conta e favorecido.
- **[RF08] Consulta e Alertas de Boletos:** O sistema deve listar contas a pagar separando pendentes e quitadas, sinalizando alertas visuais em boletos com vencimento próximo.
- **[RF09] Liquidação de Boletos:** O sistema deve validar código de barras de 44 ou 48 dígitos, debitar o valor do saldo em conta e alterar o status do título para "pago".
- **[RF10] Gestão de Cartões de Crédito:** O sistema deve exibir cartões físicos e virtuais do cliente com limite total, limite utilizado e número com máscara de segurança com botão de cópia.
- **[RF11] Bloqueio e Pagamento de Fatura de Cartão:** O sistema deve permitir bloquear/desbloquear o cartão em 1 clique e pagar o valor da fatura utilizada, restabelecendo o limite original.
- **[RF12] Extrato Financeiro Filtrável:** O sistema deve exibir todas as entradas e saídas com busca textual e filtros rápidos por tipo (receitas, despesas, Pix, boletos) e por categoria.
- **[RF13] Lançamento Manual de Transações:** O usuário deve conseguir cadastrar movimentações financeiras avulsas informando descrição, valor, data, tipo e categoria (Alimentação, Moradia, Salário, etc.).
- **[RF14] Exportação de Extrato em CSV:** O sistema deve gerar e baixar arquivo `.csv` codificado em UTF-8 BOM com todas as transações filtradas para compatibilidade nativa com Microsoft Excel.
- **[RF15] Cotações de Mercado em Tempo Real:** O sistema deve exibir ticker no topo com preços e variações 24h atualizados de Bitcoin (BTC), Ethereum (ETH), Dólar Comercial (USD), Euro (EUR) e ações da B3 (PETR4, VALE3, ITUB4).
- **[RF16] Carteira de Investimentos e Rentabilidade:** O sistema deve listar ativos em custódia calculando posição total, preço médio de compra, rentabilidade nominal em reais e percentual acumulado.
- **[RF17] Metas Financeiras e Aportes:** O sistema deve permitir o acompanhamento de metas com barras de progresso percentuais e botões de aporte rápido (+R$ 100, +R$ 500) debitados do saldo.
- **[RF18] Assistente FinUp IA Contextual:** O sistema deve disponibilizar interface de chat inteligente capaz de ler o saldo atual, total de boletos e histórico de gastos para fornecer diagnósticos financeiros em linguagem natural.
- **[RF19] Relatórios Analíticos e Taxa de Poupança:** O sistema deve calcular automaticamente a taxa de poupança mensal `((Receitas - Despesas) / Receitas) * 100` e apresentar gráficos de pizza por categoria.
- **[RF20] Impressão de Relatórios Contábeis:** O sistema deve disponibilizar formatação de impressão (`@media print`) que oculta menus laterais e botões, gerando uma folha A4 limpa para emissão em PDF.

---

## 5. Requisitos Não Funcionais (RNF)

- **[RNF01] Proteção Criptográfica de Senhas (Hash Seguro):** As senhas dos usuários jamais devem ser armazenadas em texto puro (plain text). A gestão de credenciais é delegada ao Firebase Authentication, que utiliza algoritmos de hash modernos com salt (Scrypt/PBKDF2).
- **[RNF02] Validação no Servidor e BFF:** Todos os formulários e transações financeiras críticas devem ser validados pelo servidor/Cloud Functions e regras do Firestore, impedindo submissão de valores negativos, caracteres maliciosos ou payloads adulterados.
- **[RNF03] Isolamento Multi-Tenancy (Segurança no Banco):** O acesso aos dados no Firestore é estritamente controlado por regras de segurança (`firestore.rules`), garantindo que um usuário autenticado só possa ler e gravar em coleções onde `request.auth.uid == userId`.
- **[RNF04] Ocultação de Segredos de API:** Nenhuma chave secreta com privilégios de gravação ou tokens de parceiros (ex.: `PLUGGY_CLIENT_SECRET`) pode ser embutida no frontend. Todas as requisições a serviços externos trafegam via Cloud Functions atuando como BFF.
- **[RNF05] Comunicação Segura:** Todas as trocas de informação entre navegador, serviços de backend e APIs de mercado devem trafegar obrigatoriamente sob protocolo HTTPS com criptografia TLS 1.3 / SSL 256-bit.
- **[RNF06] Desempenho e Responsividade:** A aplicação deve apresentar First Contentful Paint (FCP) inferior a 1,5 segundos em conexões 4G padrão e ser totalmente utilizável em telas móveis a partir de 320px de largura e desktops de alta resolução.
- **[RNF07] Persistência Local e Resiliência:** Os estados de sessão, transações e preferências visuais devem contar com persistência em armazenamento local do cliente (Zustand com LocalStorage), permitindo navegação offline e recarga rápida da página.

---

## 6. Modelo de Dados (DER Simplificado)

O modelo relacional lógico do banco de dados (implementado no Cloud Firestore em coleções subordinadas ao identificador único do usuário `users/{userId}`) garante integridade referencial por chaves primárias e estrangeiras:

```
┌────────────────────────────────────────────────────────┐
│                        USUARIOS                        │
├─────────────────────────┬──────────────────────────────┤
│ PK  id_usuario          │ VARCHAR(64) [Firebase UID]   │
│     nome_completo       │ VARCHAR(120)                 │
│     email               │ VARCHAR(150) [UNIQUE]        │
│     tema_preferido      │ VARCHAR(10) ['dark'|'light'] │
│     data_cadastro       │ TIMESTAMP                    │
└─────────────────────────┴──────────────┬───────────────┘
                                         │ 1
                                         │
                   ┌─────────────────────┼─────────────────────┐
                   │ 1..N                │ 1..N                │ 1..N
                   ▼                     ▼                     ▼
┌────────────────────────────┐ ┌────────────────────┐ ┌────────────────────┐
│         TRANSACOES         │ │      BOLETOS       │ │      CARTOES       │
├────────────────────────────┤ ├────────────────────┤ ├────────────────────┤
│ PK id_transacao VARCHAR(64)│ │ PK id_boleto (64)  │ │ PK id_cartao (64)  │
│ FK id_usuario   VARCHAR(64)│ │ FK id_usuario (64) │ │ FK id_usuario (64) │
│    descricao    VARCHAR(120│ │    titulo    (120) │ │    tipo_cartao     │
│    valor        DECIMAL    │ │    valor     DEC   │ │    ultimos_digitos │
│    tipo         VARCHAR(20)│ │    vencimento DATE │ │    limite_total DEC│
│    categoria    VARCHAR(50)│ │    codigo_barras   │ │    limite_usado DEC│
│    status       VARCHAR(20)│ │    status_pagamento│ │    bloqueado BOOL  │
│    data_registro TIMESTAMP │ │    data_baixa TIME │ └────────────────────┘
└────────────────────────────┘ └────────────────────┘
                   │ 1..N                │ 1..N
                   ▼                     ▼
┌────────────────────────────┐ ┌────────────────────────────┐
│           METAS            │ │        INVESTIMENTOS       │
├────────────────────────────┤ ├────────────────────────────┤
│ PK id_meta      VARCHAR(64)│ │ PK id_investimento  (64)   │
│ FK id_usuario   VARCHAR(64)│ │ FK id_usuario       (64)   │
│    titulo       VARCHAR(100│ │    ticker_ativo     VARCHAR│
│    valor_alvo   DECIMAL    │ │    tipo_ativo       VARCHAR│
│    valor_atual  DECIMAL    │ │    quantidade       DECIMAL│
│    data_prazo   DATE       │ │    preco_medio      DECIMAL│
│    icone_badge  VARCHAR(30)│ │    preco_mercado    DECIMAL│
└────────────────────────────┘ └────────────────────────────┘
```

### Relacionamentos por Chave Estrangeira (FK):
- `USUARIOS (1) ── (N) TRANSACOES`: Uma conta de usuário possui histórico de receitas, despesas, Pix e transferências vinculadas por `id_usuario`.
- `USUARIOS (1) ── (N) BOLETOS`: Um usuário gerencia múltiplos títulos e faturas associadas ao seu cadastro através de `id_usuario`.
- `USUARIOS (1) ── (N) CARTOES`: Um usuário pode possuir múltiplos cartões (físicos ou virtuais) vinculados por `id_usuario`.
- `USUARIOS (1) ── (N) METAS`: Os objetivos de economia e reserva pertencem exclusivamente ao usuário identificado por `id_usuario`.
- `USUARIOS (1) ── (N) INVESTIMENTOS`: Os ativos custodiados na carteira (ações, FIIs e criptomoedas) são associados pelo campo `id_usuario`.

---

## 7. Critérios de Aceite (Gherkin BDD)

### CA01 — Cadastro de Usuário e Criação de Conta (RF01)
- **Dado que** o visitante está no modal de autenticação e seleciona "Criar Conta";
- **Quando** preenche um nome, e-mail válido e uma senha com menos de 6 caracteres;
- **Então** o sistema desabilita o avanço e exibe o indicador visual de que a senha requer no mínimo 6 dígitos e números.

### CA02 — Autenticação de Usuário e Modo Demonstração (RF02, RF04)
- **Dado que** o avaliador ou usuário clica no botão "Acesso Demo (Modo Demonstração)";
- **Quando** a ação é disparada;
- **Então** o sistema inicializa uma sessão autenticada VIP sem exigir credenciais, redireciona para o Dashboard e exibe a badge "● Modo Demonstração" ativa.

### CA03 — Validação e Envio de Pix com Saldo Suficiente (RF05, RF06)
- **Dado que** o usuário possui saldo disponível de R$ 5.000,00 e informa uma chave Pix com valor de R$ 350,00;
- **Quando** clica no botão "Confirmar Envio Pix";
- **Então** o saldo é atualizado imediatamente para R$ 4.650,00, um toast verde de sucesso surge na tela e o comprovante com código de autenticação único é exibido com opção de impressão.

### CA04 — Bloqueio de Operação por Saldo Insuficiente (RF05, RF07)
- **Dado que** o usuário possui saldo disponível de R$ 100,00 e tenta enviar um Pix ou TED de R$ 300,00;
- **Quando** submete o formulário;
- **Então** a operação é bloqueada, o saldo permanece inalterado em R$ 100,00 e um alerta vermelho de "Saldo Insuficiente" é exibido.

### CA05 — Baixa e Liquidação de Boleto Bancário (RF08, RF09)
- **Dado que** existe um boleto com status "Pendente" no valor de R$ 99,90 e o usuário possui saldo suficiente;
- **Quando** clica no botão "Pagar Agora" do boleto;
- **Então** o sistema debita R$ 99,90 do saldo, altera o status do boleto para "Pago" e insere a movimentação no histórico de transações.

### CA06 — Bloqueio e Pagamento de Fatura de Cartão (RF10, RF11)
- **Dado que** o usuário visualiza um cartão de crédito com limite utilizado de R$ 350,00 e possui saldo em conta;
- **Quando** clica em "Pagar Fatura";
- **Então** o sistema debita os R$ 350,00 do saldo corrente, zera o limite utilizado e exibe toast de confirmação de limite restabelecido.

### CA07 — Lançamento Manual e Exportação de Extrato em CSV (RF12, RF13, RF14)
- **Dado que** o usuário preenche a inclusão de uma receita manual de "Consultoria" no valor de R$ 800,00 e clica em "Salvar";
- **Quando** a transação é inserida e o usuário clica em "Exportar CSV";
- **Então** a transação surge no topo do extrato e o navegador inicia o download do arquivo `.csv` codificado em UTF-8 BOM com todas as colunas formatadas.

### CA08 — Cálculo Percentual e Aporte em Metas (RF17)
- **Dado que** o usuário possui uma meta de R$ 10.000,00 com R$ 7.000,00 acumulados (70%);
- **Quando** clica no botão de aporte rápido "+ R$ 500";
- **Então** o sistema debita R$ 500,00 do saldo disponível, atualiza o saldo da meta para R$ 7.500,00 e a barra de progresso avança visualmente para 75%.

---

## 8. Decisão de Stack Tecnológico e Deploy

| Camada | Tecnologia Selecionada | Justificativa Técnica e Compatibilidade com Deploy |
| :--- | :--- | :--- |
| **Frontend Core** | **React 19 + TypeScript + Vite 8** | Renderização SPA com Virtual DOM eficiente, modularização por componentes reutilizáveis, tipagem estática que previne erros em tempo de compilação e bundler Vite com compilação instantânea. Totalmente estático e 100% compatível com Vercel Edge Network e Firebase Hosting. |
| **Estilização & UI** | **TailwindCSS v4 + Vanilla CSS** | Estilização utilitária de alto desempenho sem overhead de runtime, suporte nativo a temas escuros, flexbox/grid responsivo e regras específicas para impressão limpa de documentos fiscais (`@media print`). |
| **Gerenciamento de Estado** | **Zustand (com Persist Middleware)** | Biblioteca de gerenciamento de estado minimalista e performática. Elimina a complexidade e boilerplate do Redux, viabilizando o Modo Demonstração e a sincronização reativa imediata de saldo entre todas as páginas. |
| **Autenticação & Banco de Dados** | **Firebase Auth & Cloud Firestore** | Serviço Serverless em nuvem do Google. O Auth elimina riscos de armazenamento incorreto de credenciais ao gerenciar hashes de senha seguros; o Firestore fornece banco NoSQL em tempo real com regras de segurança ativas no servidor. |
| **Backend & Camada BFF** | **Firebase Cloud Functions (TypeScript / Node.js 20)** | Funções Serverless que atuam como Backend-for-Frontend. Garantem que requisições às APIs da Pluggy, Brapi e CoinGecko sejam intermediadas em ambiente seguro sem expor credenciais privadas no código do cliente. |
| **APIs Externas Integradas** | **AwesomeAPI, CoinGecko & Brapi.dev** | Fornecem cotações de alta disponibilidade em tempo real para Bitcoin, Ethereum, moedas de câmbio internacional (USD/EUR) e ações negociadas na B3. |
| **Destino de Deploy & CI/CD** | **Vercel / Firebase Hosting + GitHub Actions** | O repositório está versionado e conectado à branch `main` no GitHub ([https://github.com/TarsoRondon/finup](https://github.com/TarsoRondon/finup)). O deploy na Vercel compila o frontend estático via `npm run build` gerando distribuição global por CDN com certificado SSL/HTTPS automático gratuito. |

---

## 9. Instalação e Execução

Esta seção fornece o guia completo e determinístico para clonar, configurar, importar o banco de dados e executar o FinUp localmente do zero em qualquer computador de avaliação, sem necessidade de suporte externo.

### 9.1 Ambiente
- **Linguagem e Runtime:** Node.js v20.x ou superior (LTS recomendado: Node 20 / 22) e npm v10.x.
- **Servidor / Ambiente Local:** Servidor de desenvolvimento rápido do Vite (`npm run dev`) baseado em ES Modules.
- **Bibliotecas e Dependências:** Instaladas via `npm install` (inclui React 19, Lucide React, Zustand, TailwindCSS v4, Firebase SDK v11).
- **Sistema Operacional Homologado:** Testado e validado em Windows 11 (PowerShell / Windows Terminal) e distribuições Linux baseadas em Debian/Ubuntu.

### 9.2 Banco de Dados
- **SGBD Compatível:** MySQL 8.0+, MariaDB 10.5+ ou PostgreSQL 14+ (para o modelo relacional de entrega da disciplina) e Google Cloud Firestore (para a instância cloud serverless em tempo real).
- **Nome do Banco de Dados a Criar:** `finup_db`
- **Caminho do Script SQL no Repositório:** `database/schema.sql`
- **Como Executar o Script SQL:**
  - *Via Terminal MySQL:*
    ```bash
    mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS finup_db;"
    mysql -u root -p finup_db < database/schema.sql
    ```
  - *Via Ferramenta Gráfica (phpMyAdmin / MySQL Workbench / DBeaver):*
    1. Abra o gerenciador de banco de dados;
    2. Crie o schema `finup_db` com charset `utf8mb4`;
    3. Abra a aba de execução SQL, carregue o arquivo `database/schema.sql` e clique em **Executar / Run**.

#### Tabela Descritiva das Entidades do Banco de Dados:

| Tabela | Campos Principais | Chave Primária (PK) | Relacionamentos (FK) |
| :--- | :--- | :--- | :--- |
| **usuarios** | id, nome_completo, email, senha_hash, perfil, tema_preferido, data_cadastro | `id` | — |
| **categorias** | id, id_usuario, nome, tipo, icone, cor | `id` | `id_usuario` → `usuarios.id` |
| **transacoes** | id, id_usuario, id_categoria, descricao, valor, tipo, status, metodo_pagamento, autenticacao_bacen, data_registro | `id` | `id_usuario` → `usuarios.id`<br/>`id_categoria` → `categorias.id` |
| **boletos** | id, id_usuario, titulo, valor, vencimento, codigo_barras, status_pagamento, data_baixa | `id` | `id_usuario` → `usuarios.id` |
| **cartoes** | id, id_usuario, tipo_cartao, titular_nome, ultimos_digitos, limite_total, limite_usado, bloqueado, dia_fechamento, dia_vencimento | `id` | `id_usuario` → `usuarios.id` |
| **metas** | id, id_usuario, titulo, valor_alvo, valor_atual, data_prazo, icone_badge | `id` | `id_usuario` → `usuarios.id` |
| **investimentos** | id, id_usuario, ticker_ativo, tipo_ativo, quantidade, preco_medio, preco_mercado, data_aquisicao | `id` | `id_usuario` → `usuarios.id` |

- **Dados Iniciais (Seed):** O arquivo `database/schema.sql` **já insere automaticamente** o usuário de testes do avaliador (`avaliador.ifro@finup.com`), 7 categorias financeiras padrão, 6 transações com comprovantes Bacen, 3 boletos com código de barras, 2 cartões de crédito, 3 metas de economia e 4 ativos de investimento custodiados.

---

### 9.3 Variáveis de Ambiente

O repositório contém o arquivo modelo `.env.example`. Para rodar localmente, copie-o para `.env` ou `.env.local`:

```ini
# Configurações do Firebase (Opcional para Modo Demo; Obrigatório para Login Firebase Nuvem)
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456

# APIs de Mercado Financeiro (Opcionais - o sistema possui fallback automático integrado)
VITE_BRAPI_TOKEN=seu_token_brapi
VITE_COINGECKO_API_KEY=sua_chave_coingecko
```

* **Nota de Resiliência:** Nenhuma chave real é necessária para a avaliação do professor. Caso as variáveis de nuvem não estejam preenchidas, o FinUp ativa automaticamente a camada de Mock Inteligente e o Modo Demonstração, permitindo testar 100% dos recursos sem falhas de rede.

---

### 9.4 Passo a Passo de Instalação e Execução

Siga os comandos abaixo no terminal (PowerShell, Bash ou Zsh):

1. **Clonar o Repositório do GitHub:**
   ```bash
   git clone https://github.com/TarsoRondon/finup.git
   ```

2. **Entrar no Diretório do Projeto:**
   ```bash
   cd finup
   ```

3. **Instalar as Dependências do Node:**
   ```bash
   npm install
   ```

4. **(Opcional) Importar o Banco de Dados Relacional:**
   ```bash
   mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS finup_db;"
   mysql -u root -p finup_db < database/schema.sql
   ```

5. **Criar o Arquivo de Variáveis de Ambiente:**
   ```bash
   # No Windows PowerShell:
   Copy-Item .env.example .env
   # No Linux / macOS:
   cp .env.example .env
   ```

6. **Iniciar o Servidor Local de Desenvolvimento:**
   ```bash
   npm run dev
   ```

7. **Acessar a Aplicação no Navegador:**
   Abra a URL exibida no terminal:
   ```
   http://localhost:5173
   ```

---

### 9.5 Como Testar o Sistema

#### A. Acesso Instantâneo e Usuário de Teste:
1. Ao carregar a tela inicial (`http://localhost:5173`), clique no botão destacado **"Acesso Demo (Modo Demonstração)"**.
2. O sistema inicializa a sessão autenticada VIP pré-carregada do avaliador (`avaliador.ifro@finup.com`) com saldo inicial de R$ 12.450,00, sem exigir senhas de digitação.
3. Se desejar testar a autenticação real por formulário, selecione a aba "Entrar" e informe:
   - **E-mail:** `avaliador.ifro@finup.com`
   - **Senha:** `Ifro@2026`

#### B. Roteiro do Fluxo Principal de Testes:
1. **Dashboard & Cotações:** Visualize no topo as cotações em tempo real de Petrobras, Vale, Dólar e Bitcoin. Alterne entre os filtros de período e oculte o saldo com o ícone do "olho".
2. **Fluxo Pix com Comprovante (RF05/RF06):**
   - Acesse a aba **"Pix"** no menu lateral.
   - Digite uma chave Pix qualquer (ex.: CPF ou e-mail fictício) e um valor (ex.: `R$ 250,00`).
   - Clique em **"Confirmar Envio Pix"**. O saldo do dashboard é debitado imediatamente e um **Comprovante Bacen com ID único de autenticação** é exibido na tela, com botão de impressão.
3. **Liquidação de Boletos (RF08/RF09):**
   - Acesse a aba **"Boletos"**.
   - Localize o boleto pendente da *Energisa RO* e clique em **"Pagar Agora"**.
   - O sistema valida o código de barras, debita o valor do saldo em conta e altera o status para **"Pago"**, criando um lançamento correspondente no extrato.
4. **Cartões de Crédito (RF10/RF11):**
   - Acesse **"Cartões"**, clique em **"Bloquear Cartão"** e veja o status alternar em tempo real.
   - Clique em **"Pagar Fatura"** para liquidar o limite utilizado e restaurar o crédito total disponível.
5. **Metas Financeiras (RF17):**
   - Acesse **"Metas"** e clique no botão de aporte rápido `+ R$ 500`. A barra de progresso da meta avança instantaneamente e o saldo corrente é debitado.
6. **Exportação de Extrato (RF14):**
   - Acesse a aba **"Transações"** e clique no botão **"Exportar CSV"**. O navegador baixa imediatamente a planilha com cabeçalhos em UTF-8 BOM compatível com Excel.

#### C. Problemas Conhecidos e Limitações:
- As conexões com APIs de bancos reais (Pluggy Open Finance) requerem credenciais ativas do sandbox da Pluggy no arquivo `.env`. Em ambiente local sem chaves ativas, o sistema opera em modo de contingência inteligente garantindo que nenhuma tela trave ou exiba erros 500 para o usuário.

---
*Documento elaborado e atualizado em total conformidade com a atividade avaliativa da disciplina de Desenvolvimento de Sistemas — IFRO Calama.*

