# 📋 Changelog e Registro de Supervisão Humana — FinUp

> **Projeto:** FinUp — Sistema de Gestão Financeira Pessoal, Open Finance e Investimentos  
> **Instituição:** Instituto Federal de Rondônia (IFRO) — Campus Porto Velho Calama  
> **Componente Curricular:** Desenvolvimento de Sistemas (Ensino Médio Técnico em Informática)  
> **Aluno / Desenvolvedor:** Tarso Rondon  
> **Orientador:** Prof. Rafael Pitwak  
> **Metodologia:** *Programar com IA de Forma Responsável* (Spec-Driven Development)  

Este documento registra a evolução cronológica do sistema, as decisões arquiteturais fundamentadas e, em cumprimento rigoroso às diretrizes pedagógicas da disciplina, o **registro explícito de supervisão humana** — detalhando onde as propostas do agente de inteligência artificial foram revisadas, corrigidas ou sumariamente rejeitadas pelo desenvolvedor.

---

## 🛡️ Registro de Decisões e Intervenções Humanas (Auditoria da IA)

Conforme ensinado na apostila, o agente de IA atua como um assistente de código de alta produtividade, mas a responsabilidade técnica e a validação crítica pertencem exclusivamente ao desenvolvedor humano. Abaixo estão as principais intervenções realizadas durante o ciclo de desenvolvimento:

### 1. Rejeição da Exposição de Chaves de API no Frontend (BFF Pattern)
* **O que a IA propôs:** O agente sugeriu inicialmente realizar chamadas diretas do React (`fetch` no client-side) para a API da Pluggy e provedores de mercado utilizando o `CLIENT_SECRET` injetado via variáveis de ambiente Vite (`VITE_PLUGGY_SECRET`).
* **Risco Identificado pelo Aluno:** Variáveis `VITE_*` são embutidas em texto claro no pacote JavaScript compilado (`dist/assets/*.js`), permitindo que qualquer visitante com o console do navegador roubasse as credenciais bancárias da aplicação.
* **Decisão e Correção Humana:** A sugestão foi **rejeitada**. Foi criada uma camada **BFF (Backend-for-Frontend)** com Firebase Cloud Functions (`functions/src/index.ts`). Todas as chaves secretas residem apenas em ambiente de servidor seguro, e o frontend consome endpoints restritos autenticados por token de sessão.

### 2. Correção de Falha Matemática: Divisão por Zero na Taxa de Poupança
* **O que a IA propôs:** A IA implementou o cálculo da taxa de poupança no módulo de relatórios analíticos utilizando a fórmula direta:
  ```javascript
  const taxaPoupanca = ((receitas - despesas) / receitas) * 100;
  ```
* **Falha Identificada pelo Aluno:** Caso o usuário cadastrasse despesas em um mês sem ainda ter recebido receitas (`receitas === 0`), a expressão resultava em `NaN` ou `-Infinity`, quebrando a renderização visual do dashboard.
* **Decisão e Correção Humana:** O aluno reescreveu a rotina introduzindo tratamento defensivo:
  ```typescript
  const taxaPoupanca = receitas > 0 
    ? Math.max(-100, Math.min(100, ((receitas - despesas) / receitas) * 100)) 
    : (despesas > 0 ? -100 : 0);
  ```

### 3. Validação Rigorosa de Código de Barras de Boletos
* **O que a IA propôs:** A rotina de pagamento de boletos gerada pelo modelo permitia submeter qualquer texto digitado no campo de código de barras desde que não estivesse vazio.
* **Falha Identificada pelo Aluno:** Inconsistência grave com o padrão bancário brasileiro (Febraban), aceitando números inválidos e gerando registros espúrios.
* **Decisão e Correção Humana:** O aluno implementou validação estrita por expressão regular e contagem de dígitos numéricos (44 dígitos para código de barras de arrecadação/bancário ou 47/48 dígitos para linha digitável formatada), além de impedir valores nulos ou negativos.

### 4. Substituição de Sessão Frágil por Zustand Persistente
* **O que a IA propôs:** Para simular o "Modo Demonstração", a IA sugeriu utilizar variáveis de memória local (`useState`) ou `sessionStorage`.
* **Falha Identificada pelo Aluno:** Ao recarregar a página (F5) ou alternar de aba para auditar o sistema, todo o progresso do avaliador era perdido, retornando à tela de login.
* **Decisão e Correção Humana:** Foi implementada uma store central com **Zustand** acoplada ao middleware `persist(..., { name: 'finup-storage' })`. Dessa forma, o estado demonstrativo é persistido localmente e sobrevive a recargas, permitindo testes completos e auditoria sem atritos.

### 5. Auditoria de Segurança segundo o Anexo B (Checklist Oficial)
* **Prevenção de XSS:** Revisão e sanitização de todos os inputs de descrição em transações e metas financeiras, utilizando React DOM nativo que escapa caracteres especiais (`<`, `>`, `&`).
* **Proteção de Multi-Tenancy:** Escrita de regras de segurança no `firestore.rules` assegurando que `request.auth.uid == userId`, impedindo que uma requisição forjada consulte dados de outros usuários.
* **Blindagem de Segredos:** Configuração do `.gitignore` bloqueando o envio de `.env`, `.env.local` e credenciais reais para o repositório público do GitHub.

---

## 📅 Histórico de Versões e Commits

### [v2.4.0] — 20/10/2026 (Versão Final de Entrega)
* **Docs & Avaliação:** Criação do script de banco de dados relacional oficial `database/schema.sql` com tabelas, PKs, FKs e sementes iniciais de teste (seed).
* **Spec Final:** Adição da **Seção 9: Instalação e Execução** detalhando ambiente, SGBD, variáveis de ambiente, passo a passo do `git clone` e roteiro de testes.
* **Changelog:** Publicação deste documento de registro de supervisão e decisões críticas.
* **Compilação de PDF:** Geração do `spec.pdf` atualizado com o modelo oficial de avaliação do IFRO.
* **Versionamento:** Sincronização e publicação no repositório GitHub `https://github.com/TarsoRondon/finup`.

### [v2.3.0] — 13/10/2026
* **Relatórios e Telas:** Emissão do Catálogo Visual com 15 telas capturadas em alta definição (`FINUP_CATALOGO_VISUAL_COM_PRINTS.pdf`).
* **Módulo Pix e Comprovantes:** Emissão de comprovante autenticado Bacen com identificador único e suporte a impressão formatada (`@media print`).
* **Mercado Financeiro:** Integração ao vivo com cotações de Petrobras (PETR4), Vale (VALE3), Bitcoin, Ethereum, Dólar e Euro.

### [v2.0.0] — 09/10/2026
* **Arquitetura Enterprise:** Migração do frontend para Vite 8 + React 19 + Tailwind v4.
* **Design System:** Definição completa do Guia de Estilo (`DESIGN_SYSTEM.md`) e paleta de cores corporativa baseada em Deep Forest (#0D1F2D) e Mint (#00A878).
* **Modo Demonstração:** Criação do botão "Acesso Demo" para avaliação sem necessidade de cadastro prévio.

### [v1.0.0] — 18/08/2026
* **Fase 1 (Spec-Driven):** Redação da primeira versão da especificação técnica baseada no Anexo A da apostila.
* **Planejamento de Banco:** Definição do modelo de entidades para Usuários, Transações, Boletos e Cartões.
