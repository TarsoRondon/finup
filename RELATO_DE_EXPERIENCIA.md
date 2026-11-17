# INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DE RONDÔNIA
## Campus Porto Velho Calama — Curso Técnico em Informática Integrado ao Ensino Médio
### Componente Curricular: Desenvolvimento de Sistemas
### Docente Orientador: Prof. Rafael Pitwak

---

# Desenvolvendo o FinUp com Apoio de Inteligência Artificial: Um Relato de Experiência sobre Programação Responsável e Spec-Driven Development

**Autor:** Tarso Rondon  
**Instituição:** Instituto Federal de Rondônia (IFRO) — Campus Porto Velho Calama  
**Componente Curricular:** Desenvolvimento de Sistemas  
**Orientador:** Prof. Rafael Pitwak  
**Período de Execução:** 17 de junho de 2026 a 17 de novembro de 2026  
**Repositório Oficial:** [https://github.com/TarsoRondon/finup](https://github.com/TarsoRondon/finup)  
**Sistema em Produção:** [https://finup-chi.vercel.app](https://finup-chi.vercel.app)  
**Pitch do Projeto:** Apresentação em formato de vídeo demonstrando a arquitetura, o funcionamento prático e o impacto da solução.

---

## Resumo

Neste relato de experiência, apresento em primeira pessoa a trajetória de concepção, engenharia e publicação do **FinUp**, uma plataforma web de finanças pessoais, Open Finance, simulações bancárias (Pix com comprovante e boletos) e acompanhamento de investimentos com dados de mercado ao vivo. O desenvolvimento iniciou-se em 17 de junho de 2026 e estendeu-se até novembro de 2026, sendo conduzido sob as diretrizes da apostila *Programar com IA de forma responsável*, fundamentando-se na metodologia *Spec-Driven Development* com o auxílio do Google Antigravity. Ao longo do ciclo, vivenciei a transição do papel de mero digitador de sintaxe para o de arquiteto e auditor crítico de código. As principais dificuldades envolveram a tentativa da IA de expor credenciais privadas no cliente (contornada com a estruturação de uma camada BFF em Cloud Functions), o bloqueio em chamadas assíncronas do terminal e a adequação das regras multi-tenant no banco de dados. Atualmente, o projeto encontra-se na fase final de entrega e sustentação em produção: o sistema está 100% publicado na Vercel, o banco e a spec foram normalizados, e elaborei um pitch em formato de vídeo sintetizando o produto. A experiência demonstrou que a IA expande drasticamente o alcance técnico de um estudante, desde que balizada por planejamento rigoroso e supervisão humana inflexível.

**Palavras-chave:** Desenvolvimento Assistido por IA; Spec-Driven Development; FinUp; Engenharia de Software; Educação Profissional.

---

## 1. Introdução

Como estudante do curso Técnico em Informática do IFRO Campus Porto Velho Calama, sempre observei que uma das maiores dores das pessoas ao meu redor era a pulverização financeira: possuir contas em múltiplos bancos digitais, boletos espalhados no e-mail e investimentos descentralizados, sem uma visão holística de seu patrimônio. Foi dessa inquietação que, em 17 de junho de 2026, dei início ao projeto do **FinUp** na disciplina de Desenvolvimento de Sistemas, sob a orientação do professor Rafael Pitwak.

O objetivo do FinUp é entregar uma solução financeira completa, segura e funcional no navegador, integrando dados reais de cotações (B3, criptoativos e moedas), simulação de Pix com emissão de comprovante oficial do Banco Central, controle de cartões de crédito e diagnósticos orçamentários com inteligência contextual. 

No entanto, o propósito deste relato não é unicamente descrever as funcionalidades do software, mas registrar e refletir criticamente sobre o **processo metodológico** vivenciado entre junho e novembro de 2026. Desenvolver um sistema complexo utilizando um agente de inteligência artificial autônomo (Google Antigravity) exigiu romper com paradigmas tradicionais. Em um ambiente escolar, onde muitos supõem que a IA "faz tudo sozinha", documentar os erros, as rejeições a códigos propostos pelo agente e o rigor dos testes é fundamental para consolidar a computação responsável na formação técnica.

---

## 2. Referencial Teórico

O desenvolvimento de software assistido por Inteligência Artificial generativa marca uma transformação substancial na engenharia de computação. Conforme ensinado na apostila *Programar com IA de forma responsável* (PITWAK, 2026), o paradigma clássico centrado na memorização de sintaxe e digitação manual de algoritmos cede espaço ao *Spec-Driven Development* (desenvolvimento orientado por especificação). 

Nessa abordagem, a clareza da especificação formal (a *spec*) torna-se o verdadeiro núcleo do projeto. O programador humano deixa de ser apenas um codificador de ponta de linha e assume as funções de arquiteto de sistemas, avaliador de regras de negócio e auditor de segurança. 

Diferente do senso comum, a IA não possui discernimento ético, de segurança ou de contexto institucional. Ela é probabilística e tende a escolher o caminho de menor esforço imediato, o que frequentemente introduz vulnerabilidades silenciosas — como credenciais vazadas no frontend, consultas desprotegidas contra injeção ou lógicas de negócio inconsistentes. Assim, o referencial adotado reforça que a IA atua apenas como uma ferramenta amplificadora; a responsabilidade técnica e jurídica pelo produto final recai indelevelmente sobre o desenvolvedor humano.

---

## 3. Metodologia / Percurso da Experiência

A jornada prática foi dividida nas etapas estruturadas da apostila, estendendo-se por cinco meses:

```
[17/Junho] Planejamento e Redação da Spec (Anexo A)
   └── [Agosto/Setembro] Estruturação da Arquitetura e Ambiente (React 19 + TypeScript + Vite)
          └── [Outubro] Desenvolvimento Iterativo, Testes e Segurança com Google Antigravity
                 └── [Novembro] Homologação, Pitch em Vídeo e Publicação em Produção (Vercel)
```

As ferramentas centrais empregadas foram:
* **Google Antigravity:** Ambiente de desenvolvimento agentic utilizado para pesquisa, geração e refatoração de código;
* **Stack Tecnológico:** React 19, TypeScript, Vite 8, TailwindCSS v4, Zustand (gerenciamento de estado) e Firebase (Auth e Firestore);
* **Git e GitHub:** Controle estrito de versionamento, histórico auditável de commits e colaboração remota no repositório `TarsoRondon/finup`;
* **Vercel:** Plataforma de integração contínua (CI/CD) e deploy em produção;
* **Modelagem Relacional e Python/ReportLab/python-docx:** Ferramentas para gerar o script `database/schema.sql`, o `spec.pdf` e o `spec.docx`.

Quanto ao nível de autonomia do agente de IA, optei conscientemente por uma **autonomia mediada com supervisão contínua**. Jamais adotei o modo de aprovação cega. Todos os comandos críticos no terminal e alterações estruturais no código-fonte passaram por análise prévia antes de serem integrados à branch principal.

---

## 4. Relato da Experiência

A construção do FinUp começou pela escrita detalhada da `spec.md` (o documento de especificação técnica conforme o modelo oficial do IFRO). Em vez de pedir ao agente "faça um sistema de finanças", defini primeiro o objetivo, os três perfis de usuários (Titular, Convidado e Sistema/BFF), os vinte requisitos funcionais (`RF01` a `RF20`), os critérios de segurança e o diagrama de entidades e relacionamentos (DER).

Um momento marcante ocorreu durante o desenvolvimento do módulo de cotações e Open Finance. Enviei ao agente a tarefa de conectar a API bancária. O agente gerou um código no React consumindo diretamente o endpoint da Pluggy utilizando a variável `VITE_PLUGGY_SECRET`. Imediatamente percebi o perigo: no Vite, qualquer variável que comece com `VITE_` é embutida em texto plano no pacote JavaScript distribuído ao navegador. Qualquer pessoa que abrisse o *DevTools* na aba *Network* poderia copiar a chave privada do banco. 

Rejeitei prontamente a sugestão da IA e instruí o agente a redesenhar a arquitetura no modelo **BFF (Backend-for-Frontend)**, criando uma Cloud Function em Node.js:

```typescript
// Decisão tomada: Rejeitar fetch client-side com chave secreta exposta.
// Implementação segura via BFF (Cloud Functions):
export const getPluggyToken = onRequest({ cors: true }, async (req, res) => {
  // A chave secreta reside exclusivamente no ambiente do servidor
  const secret = process.env.PLUGGY_CLIENT_SECRET;
  const token = await authenticateWithPluggy(secret);
  res.json({ accessToken: token });
});
```

Outro episódio expressivo envolveu a métrica da **taxa de poupança mensal** nos relatórios contábeis. A IA havia gerado a expressão `((receitas - despesas) / receitas) * 100`. Ao testar a tela no início do mês — momento em que o usuário havia registrado o aluguel mas ainda não recebera o salário (`receitas === 0`) —, o dashboard quebrou exibindo `NaN` e `-Infinity`. Intervi no código para criar uma checagem defensiva de limites matemáticos.

Para além do código, gravei um **pitch em formato de vídeo**, explicando em linguagem clara a proposta de valor do FinUp, a interface responsiva e a segurança bancária implementada. Essa produção audiovisual consolidou minha habilidade de comunicar software para além da técnica pura, preparando o terreno para a apresentação presencial.

---

## 5. Dificuldades e Desafios Enfrentados

A experiência esteve longe de ser trivial, impondo desafios técnicos e processuais severos:

1. **Tentativa de Vazamento de Credenciais pelo Agente (Segurança):** Conforme relatado, o agente insistia em rotinas mais "rápidas" que deixavam chaves de API no código cliente. A tentação de aceitar a solução rápida para ver o recurso funcionando logo foi grande, mas o compromisso com o checklist de segurança do Anexo B me obrigou a parar, estudar o padrão BFF e forçar o agente a estruturar funções de backend protegidas.
2. **Falhas e Travamentos em Execuções Assíncronas (Técnica):** Ao rodar comandos interativos pelo terminal integrado do Antigravity (como instalações globais e inicialização de servidores sem flag desanexada), o processo frequentemente travava a sessão por aguardar inputs invisíveis. Aprendi a analisar os logs das tarefas em segundo plano (`manage_task`), eliminar travas do Git (`index.lock`) e parametrizar comandos não-bloqueantes.
3. **Persistência de Sessão no Modo Demonstração (Processual):** O agente propôs inicialmente um estado local que se perdia com um simples recarregamento de página (F5). Para quem avalia o sistema sem login prévio (como o professor), isso causava uma experiência frustrante. Resolvi o problema integrando o Zustand com o middleware `persist` acoplado ao *LocalStorage*, permitindo que o avaliador teste à vontade sem perder os dados simulados.

---

## 6. Resultados e Reflexões

Atualmente, o projeto encontra-se na sua **fase final: sistema homologado, documentado e em produção**. O FinUp está disponível publicamente pela internet através da Vercel no link oficial: **[https://finup-chi.vercel.app](https://finup-chi.vercel.app)**. 

Comparando esta experiência com os bimestres anteriores — nos quais programávamos individualmente cada linha de código à mão —, as diferenças são nítidas:

* **O que ficou mais rápido:** A velocidade de prototipação e a geração de código repetitivo (*boilerplate*, estilização visual em Tailwind v4 e montagem de componentes complexos) aceleraram-se exponencialmente. Tarefas que demandariam dias foram solucionadas em minutos.
* **O que ficou mais difícil e exigiu mais atenção:** A atividade mental mudou de natureza. Em vez de quebrar a cabeça procurando uma vírgula ou sintaxe esquecida, meu esforço concentrou-se na **leitura crítica de código alheio**. Era preciso antecipar brechas de segurança, validar se o modelo de banco respeitava a terceira forma normal e conferir se o agente não estava criando alucinações arquiteturais. 

Percebi que, com IA, você não programa menos: você programa em um nível mais alto de abstração e responsabilidade.

---

## 7. Considerações Finais

O desenvolvimento do FinUp, de junho a novembro de 2026, foi o projeto mais desafiador e enriquecedor da minha trajetória técnica até aqui. Ele comprovou que a inteligência artificial não substitui a competência do desenvolvedor; pelo contrário, expõe a necessidade de bases conceituais sólidas em lógica, banco de dados, redes e engenharia de software para auditar o que é gerado.

Para as próximas turmas que vivenciarem essa metodologia, deixo três recomendações fundamentais:
1. **Invista tempo na sua `spec.md`:** Um agente com uma boa especificação é um colaborador brilhante; com uma especificação vaga, torna-se uma fábrica de retrabalho.
2. **Nunca aceite código que você não saiba explicar:** Se você não compreende como a função opera, você não é o autor do sistema, é apenas o hospedeiro do código.
3. **Teste sempre em produção:** O sistema só existe de verdade quando qualquer usuário consegue operá-lo a partir de um link público em qualquer navegador.

---

## Referências

* PITWAK, Rafael. **Programar com IA de forma responsável: guia prático e metodológico para desenvolvimento de sistemas**. Porto Velho: IFRO Campus Porto Velho Calama, 2026.
* GOOGLE DEEPMIND. **Antigravity: Spec-Driven Autonomous Agent Documentation**. Google, 2026.
* VERCEL. **Vercel Documentation: Deploying Modern Web Applications**. Disponível em: <https://vercel.com/docs>. Acesso em: 17 nov. 2026.
* W3C. **Web Content Accessibility Guidelines (WCAG) 2.1**. W3C Recommendation, 2023.
