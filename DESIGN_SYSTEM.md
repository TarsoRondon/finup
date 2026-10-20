# PIERRE FINANCE & FINUP — MEGA DESIGN SYSTEM & ANÁLISE DE UI/UX
*Direção Visual, Filosofia de Design, Design Tokens, Arquitetura de Telas e Especificação de Interface*

---

## 01. VISÃO GERAL DO ESTILO & FILOSOFIA

O design do **Pierre Finance** (e a direção adotada pelo **FinUp**) sintetiza uma estética de **Fintech Moderna + Inteligência Artificial + Produto SaaS Premium + Comunicação Humanizada e Casual**.

A proposta visual deliberadamente rejeita a aparência fria, pesada e burocrática dos bancos tradicionais e sistemas ERP legados:

| O que NÃO utilizar (Banco Tradicional / Legado) | O que UTILIZAR (Estética Pierre / FinUp) |
| :--- | :--- |
| Excesso de azul corporativo sem vida | Base clara com alto contraste (`#F8F8F6` e `#111111`) |
| Dashboards densos e saturados de gráficos | Tipografia marcante com escala editorial expressiva |
| Linguagem excessivamente formal e distante | Textos curtos, conversacionais e acolhedores |
| Tabelas intermináveis sem hierarquia | Cartões arredondados (*soft surfaces* com radius generoso) |
| Menus labirínticos com dezenas de opções | Elementos gráficos flutuantes e foco em 1 ideia por seção |
| Efeitos chamativos, neon e 3D exagerado | Microinterações suaves e CTAs evidentes |

> **Conceito Central:** *"Uma tecnologia sofisticada que parece simples, calma e intuitiva de usar."*

---

## 02. DNA & PERSONALIDADE VISUAL

```
PREMIUM + MINIMAL + FINTECH + AI-FIRST + EDITORIAL + SAAS + HUMAN
```

### Palavras-Chave de Posicionamento
- **Clean & Editorial:** Grandes áreas de respiro, headlines dominantes, foco tipográfico.
- **Inteligente & Conversacional:** A IA é apresentada como assistente e agente, não como circuitos de robôs ou neon.
- **Confiável & Transparente:** Segurança SSL 256-bit e Open Finance demonstrados através de clareza e solidez visual.
- **Ágil & Sem Ruído:** Zero decorações arbitrárias — cada elemento gráfico cumpre um papel funcional direto.

---

## 03. TOKENS DE DESIGN (DESIGN TOKENS MASTER)

```css
:root {
  /* ─── 1. CORE COLOR PALETTE ─── */
  --color-black: #111111;
  --color-white: #FFFFFF;
  --color-background: #F8F8F6;
  --color-surface: #FFFFFF;
  --color-surface-subtle: #F2F2EF;

  /* ─── 2. TYPOGRAPHY COLORS ─── */
  --color-text-primary: #111111;
  --color-text-secondary: #5F5F5F;
  --color-text-tertiary: #858585;

  /* ─── 3. BORDERS & DIVIDERS ─── */
  --color-border: #E4E4E0;
  --color-border-strong: #D5D5D0;

  /* ─── 4. BRAND ACCENTS ─── */
  --color-primary: #00A878;
  --color-primary-dark: #006B52;
  --color-primary-light: #E6F7F1;

  /* ─── 5. SEMANTIC & STATUS COLORS ─── */
  --color-success: #168A62;
  --color-success-bg: #EAF7F1;
  --color-warning: #B7791F;
  --color-warning-bg: #FFF6E5;
  --color-danger: #C74646;
  --color-danger-bg: #FDEDED;
  --color-info: #3978B8;
  --color-info-bg: #EAF2FA;

  /* ─── 6. DARK SECTIONS & DARK MODE ─── */
  --color-dark-bg: #111111;
  --color-dark-surface: #1A1A1A;
  --color-dark-border: #2A2A2A;
  --color-dark-text: #FFFFFF;
  --color-dark-text-secondary: #B5B5B5;

  /* ─── 7. FONT SCALE ─── */
  --font-family-base: "Plus Jakarta Sans", "Inter", -apple-system, sans-serif;
  --font-xs: 12px;
  --font-sm: 14px;
  --font-md: 16px;
  --font-lg: 18px;
  --font-xl: 20px;
  --font-2xl: 24px;
  --font-3xl: 32px;
  --font-4xl: 40px;
  --font-5xl: 48px;
  --font-6xl: 64px;
  --font-7xl: 80px;
  --font-8xl: 96px;

  /* ─── 8. SPACING SYSTEM (Base 4px) ─── */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 32px;
  --space-8: 40px;
  --space-9: 48px;
  --space-10: 64px;
  --space-11: 80px;
  --space-12: 96px;
  --space-13: 120px;
  --space-14: 160px;

  /* ─── 9. BORDER RADIUS ─── */
  --radius-xs: 6px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-3xl: 32px;
  --radius-4xl: 40px;
  --radius-pill: 999px;

  /* ─── 10. ELEVATION & SHADOWS ─── */
  --shadow-xs: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-sm: 0 4px 12px rgba(0,0,0,0.05);
  --shadow-md: 0 12px 32px rgba(0,0,0,0.08);
  --shadow-lg: 0 24px 64px rgba(0,0,0,0.10);

  /* ─── 11. MOTION & TIMINGS ─── */
  --duration-fast: 120ms;
  --duration-normal: 200ms;
  --duration-medium: 300ms;
  --duration-slow: 500ms;
  --ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);

  /* ─── 12. BREAKPOINTS ─── */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1440px;
}
```

---

## 04. REGRA DE PROPORÇÃO CROMÁTICA (60 / 30 / 10)

```
┌────────────────────────────────────────────────────────┐
│  60% — Superfície & Espaço Negativo (#F8F8F6 / #FFF)  │
├────────────────────────────┬───────────────────────────┤
│  30% — Conteúdo e Cards    │ 10% — Acentos & CTAs      │
│  (#111111 / #5F5F5F / Borda)│ (#00A878 / Badges / Ação) │
└────────────────────────────┴───────────────────────────┘
```

- **60% Espaço:** Fundos claros e limpos que garantem respiro e sensação de leveza.
- **30% Estrutura:** Cards brancos com bordas milimétricas e textos com tipografia pesada em preto.
- **10% Foco de Conversão:** O verde de destaque direciona o olhar para ações primárias, ganhos e status positivo.

---

## 05. COMPOSIÇÃO EDITORIAL & TIPOGRAFIA

A identidade visual se apoia fortemente no **design editorial**:

### 1. Display & Headlines
- **Display XL (Hero):** `clamp(3rem, 7vw, 6rem)` com line-height compacto (`0.95–1.05`) e tracking negativo (`-0.055em`).
- **Headlines Editoriais:** Frases curtas, impactantes e descontraídas (ex.: *"Surpresas na fatura? Não comigo."*).

### 2. Hierarquia de Texto
1. **Eyebrow / Badge:** Uppercase, tracking aberto (`0.08em`), tamanho `11–12px`.
2. **Headline:** Título dominante em preto (`#111111`), peso 800/900.
3. **Descrição:** Parágrafos curtos, máximo de 2 a 3 linhas, cor secundária (`#5F5F5F`).
4. **Primary CTA:** Botão formato pílula (`radius: 999px`) em verde ou preto contrastante.
5. **Elemento de Prova Visual:** Interface real ou card flutuante demonstrando a funcionalidade em ação.

---

## 06. SISTEMA DE COMPONENTES DE UI

### 1. Botões & CTAs
- **Primary Button:** Altura `48–56px`, `border-radius: 999px`, padding horizontal `24–32px`, font-weight `700`.
- **Microinteração:** `transform: translateY(-2px)` e leve elevação de sombra no hover em `180ms ease`.
- **Textos de Ação Diretos:** "Começar agora", "Abrir conta grátis", "Conectar banco" (evitar termos vagos como "Clique aqui").

### 2. Cards & Superfícies
- **Feature Cards:** `border-radius: 24–32px`, fundo branco, borda `1px solid var(--color-border)`, padding `32px`.
- **Metric Cards:** Valor financeiro em destaque (`font-weight: 900`, `28–36px`), rótulo discreto e indicador de variação percentual.
- **Transaction Cards:** Mini-cards simulando faturas reais com ícone de categoria, nome do estabelecimento, data e valor formatado em R$.

### 3. Modais & Gavetas
- `border-radius: 28–32px`, backdrop com `rgba(0,0,0, 0.45)` e efeito `backdrop-filter: blur(12px)`.

---

## 07. ARQUITETURA COMPLETA DO SISTEMA (3 NÍVEIS)

```
                            FINUP / PIERRE
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
      1. WEBSITE              2. AUTH /              3. APP &
    INSTITUCIONAL            ONBOARDING            FINANCIAL OS
          │                       │                       │
   ├── Hero Editorial      ├── Login (Demo/Real)   ├── Dashboard Central
   ├── Social Proof        ├── Cadastro 4 Etapas   ├── Banking (Pix/TED)
   ├── Recursos & IA       ├── Verificação Código  ├── Gestão de Boletos
   ├── Segurança & Trust   └── Setup de Perfil     ├── Cartões & Limites
   ├── Planos & Preços                             ├── Orçamento & Metas
   └── FAQ Accordion                               ├── Investimentos B3
                                                   ├── FinUp IA Contextual
                                                   └── Relatórios & PDF
```

---

## 08. DETALHAMENTO DE TODAS AS TELAS DO PRODUTO

### Experiência 1: Site Institucional & Landing Page
1. **Header Fixo:** Logo em alto contraste, links rápidos de navegação e botões "Entrar" e "Abrir conta".
2. **Hero Section:** Headline editorial imersiva, texto complementar de 2 linhas, CTA pílula e visual central com mockup do produto.
3. **Seção "Todos os Bancos":** Ilustração do conceito Open Finance (várias contas conectadas resultando em uma visão única).
4. **Seção FinUp IA:** Demonstração conversacional da IA respondendo perguntas sobre gastos e sugerindo economia real.
5. **Seção de Segurança (Dark Section):** Quebra de ritmo visual com fundo `#111111`, destacando criptografia e regulação.
6. **Tabela de Planos / Preços:** Toggle Mensal/Anual (estilo pill) e card do plano Pro destacado com badge "Mais Popular".
7. **FAQ com Accordion:** Perguntas frequentes com abertura expansível fluida em 200ms.
8. **Footer Minimalista:** Links institucionais, termos legais, política de privacidade e copyright.

---

### Experiência 2: Autenticação & Onboarding
1. **Login (`/login`):** Acesso por e-mail/senha, Google Auth e botão de **Acesso Rápido Demo** em 1 clique.
2. **Cadastro Progressivo (`/cadastro`):**
   - *Etapa 1 — Identificação:* Nome, e-mail e celular.
   - *Etapa 2 — Credenciais:* Senha com checklist visual de segurança (maiúscula, número, caractere especial).
   - *Etapa 3 — KYC / Dados Pessoais:* CPF, data de nascimento e endereço.
   - *Etapa 4 — Perfil Financeiro:* Seleção do objetivo principal (organizar, poupar, investir).
3. **Verificação de E-mail (`/verificar`):** Inputs individuais para código de 6 dígitos.
4. **Recuperação de Senha (`/recuperar-senha`):** Fluxo seguro de envio de link e redefinição.
5. **Onboarding Guiado (`/onboarding`):** Apresentação das primeiras ações recomendadas.

---

### Experiência 3: Core App & Financial OS
1. **Dashboard Central (`/dashboard`):**
   - *Card de Patrimônio Consolidado:* Saldo disponível + Investimentos + Variação mensal.
   - *KPIs do Mês:* Receitas (Verde), Despesas (Vermelho) e Saldo Líquido.
   - *Gráfico de Fluxo Financeiro:* Histórico dos últimos 6 meses.
   - *Widget FinUp IA:* Card com diagnóstico imediato de gastos.
   - *Atalhos Rápidos:* Enviar Pix, Pagar Boleto, Transferir, Investir.
2. **Área Pix (`/pix`):** Envio com validação de saldo, débito instantâneo, recibo com ID único e gestão de chaves.
3. **Transferências TED/DOC (`/transferencias`):** Fluxo guiado em 3 etapas com suporte a bancos brasileiros.
4. **Pagamentos & Boletos (`/pagamentos`):** Listagem com alertas de urgência (vencimento em até 3 dias) e baixa automática.
5. **Cartões de Crédito (`/cartoes`):** Gestão de cartões físicos/virtuais, fatura atual, melhor dia de compra e bloqueio instantâneo.
6. **Extrato de Transações (`/transacoes`):** Filtros dinâmicos, busca textual e exportação em CSV compatível com Excel.
7. **Orçamento por Categoria (`/orcamento`):** Barras de progresso com limites por categoria (Alimentação, Moradia, etc.).
8. **Metas Financeiras (`/metas`):** Acompanhamento de reserva de emergência e planos com percentual de atingimento.
9. **Portfólio de Investimentos (`/investimentos`):** Cotações ao vivo de Ações B3, FIIs e Criptoativos com cálculo de rendimento.
10. **FinUp IA Assistente (`/ia`):** Chat conversacional alimentado pelo contexto de saldos e faturas do usuário.
11. **Relatórios Financeiros (`/relatorios`):** Indicadores analíticos, taxa de poupança e botão de impressão em PDF.
12. **Contas Conectadas (`/contas-conectadas`):** Painel Open Finance para vínculo de bancos parceiros.
13. **Segurança & 2FA (`/seguranca`):** Controle de sessões ativas, dispositivos autorizados e troca de credenciais.
14. **Configurações Gerais (`/configuracoes`):** Seletor de tema Dark/Light Mode e preferências do sistema.
15. **Central de Ajuda (`/ajuda`) & Suporte (`/suporte`):** FAQ pesquisável e abertura de chamados.

---

## 09. REGRAS DE MOTION & MICROINTERAÇÕES

> **Regra de Ouro:** *"O movimento deve explicar a interface, nunca apenas entreter."*

- **Transições de Botões & Cards:** `180ms ease` em hover (`translateY(-1px)` ou `-2px`).
- **Carregamento de Listas:** Efeito stagger sutil (`opacity: 0 & translateY: 8px` &rarr; `opacity: 1 & translateY: 0`).
- **Feedback de Ações Financeiras:** Confirmação com badge verde animado e emissão imediata de recibo.
- **Acessibilidade:** Suporte mandatório a `@media (prefers-reduced-motion: reduce)`.

---

## 10. CHECKLIST DE QUALIDADE VISUAL (PREMIUM UI QA)

- [x] **Tipografia Forte:** Headlines dominantes com proporção equilibrada.
- [x] **Espaço Negativo Generoso:** Layout respira sem acúmulo excessivo de informações.
- [x] **Hierarquia Rigorosa:** Apenas 1 CTA primário e 1 mensagem principal por bloco.
- [x] **Consistência de Tokens:** Border-radius, espaçamentos e sombras seguindo a escala central.
- [x] **Responsividade Impecável:** Grid 12 colunas no desktop transformado em stack fluido no mobile.
- [x] **Acessibilidade (a11y):** Contraste WCAG AA garantido em todos os textos e botões.

---
*FinUp & Pierre Design System — Documento de Referência Oficial.*
