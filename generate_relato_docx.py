# -*- coding: utf-8 -*-
"""
Script para compilar o Relato de Experiência em formato Word (.docx) elegante,
padronizado nas normas ABNT e no design institucional do IFRO Calama.
"""
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

DOCX_PATH = r"c:\Users\Aluno\Documents\Desenvolvimento\finup\RELATO_DE_EXPERIENCIA.docx"

def set_cell_background(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=140, bottom=140, left=180, right=180):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def build_docx():
    doc = docx.Document()

    # Margens padrão acadêmico ABNT: Superior/Esquerda 3cm (~1.18in), Inferior/Direita 2cm (~0.79in)
    for section in doc.sections:
        section.top_margin = Inches(1.18)
        section.left_margin = Inches(1.18)
        section.bottom_margin = Inches(0.79)
        section.right_margin = Inches(0.79)

        # Rodapé
        footer = section.footer
        p_foot = footer.paragraphs[0]
        p_foot.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        f_run = p_foot.add_run("IFRO Calama · Desenvolvimento de Sistemas · Tarso Rondon · 2026")
        f_run.font.name = "Arial"
        f_run.font.size = Pt(8.5)
        f_run.font.color.rgb = RGBColor(120, 120, 120)

        # Cabeçalho
        header = section.header
        p_head = header.paragraphs[0]
        p_head.alignment = WD_ALIGN_PARAGRAPH.LEFT
        h_run = p_head.add_run("RELATO DE EXPERIÊNCIA — DESENVOLVIMENTO COM APOIO DE IA")
        h_run.font.name = "Arial"
        h_run.font.size = Pt(8.5)
        h_run.font.bold = True
        h_run.font.color.rgb = RGBColor(0, 168, 120)

    COLOR_PRIMARY = RGBColor(13, 31, 45)       # #0D1F2D
    COLOR_ACCENT = RGBColor(0, 168, 120)       # #00A878 Mint
    COLOR_DARK = RGBColor(30, 41, 59)          # #1E293B

    # Título Principal
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(4)
    r_title = p_title.add_run("Desenvolvendo o FinUp com Apoio de Inteligência Artificial: Um Relato de Experiência sobre Programação Responsável e Spec-Driven Development")
    r_title.font.name = "Arial"
    r_title.font.size = Pt(17)
    r_title.font.bold = True
    r_title.font.color.rgb = COLOR_PRIMARY

    # Subtítulo Institucional
    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(14)
    r_sub = p_sub.add_run("Instituto Federal de Educação, Ciência e Tecnologia de Rondônia (IFRO) — Campus Porto Velho Calama\nCurso Técnico em Informática Integrado ao Ensino Médio · Desenvolvimento de Sistemas")
    r_sub.font.name = "Arial"
    r_sub.font.size = Pt(10)
    r_sub.font.italic = True
    r_sub.font.color.rgb = COLOR_ACCENT

    # Box de Identificação do Trabalho
    t_id = doc.add_table(rows=1, cols=1)
    t_id.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_id.columns[0].width = Inches(6.3)
    c_id = t_id.cell(0, 0)
    set_cell_background(c_id, "F0FDF4")
    set_cell_margins(c_id, top=140, bottom=140, left=180, right=180)

    tcPr = c_id._tc.get_or_add_tcPr()
    tcBorders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'  <w:left w:val="single" w:sz="24" w:space="0" w:color="00A878"/>'
        f'  <w:top w:val="none"/><w:bottom w:val="none"/><w:right w:val="none"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(tcBorders)

    p_id = c_id.paragraphs[0]
    p_id.paragraph_format.space_after = Pt(0)
    p_id.paragraph_format.line_spacing = 1.25

    def add_meta_field(label, val, is_link=False):
        r1 = p_id.add_run(f"{label}: ")
        r1.font.name = "Arial"
        r1.font.size = Pt(9.5)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_DARK
        r2 = p_id.add_run(f"{val}\n")
        r2.font.name = "Arial"
        r2.font.size = Pt(9.5)
        if is_link:
            r2.font.color.rgb = RGBColor(0, 102, 204)
            r2.font.underline = True
        else:
            r2.font.color.rgb = COLOR_DARK

    add_meta_field("Autor / Desenvolvedor", "Tarso Rondon")
    add_meta_field("Docente Orientador", "Prof. Rafael Pitwak")
    add_meta_field("Período de Desenvolvimento", "17 de junho de 2026 até novembro de 2026 (Fase Final: Sistema em Produção)")
    add_meta_field("Repositório no GitHub", "https://github.com/TarsoRondon/finup", is_link=True)
    add_meta_field("Sistema Publicado no Ar (Vercel)", "https://finup-chi.vercel.app", is_link=True)
    r_pitch = p_id.add_run("Formato de Apresentação Complementar: Pitch do Projeto gravado em formato de vídeo demonstrativo.")
    r_pitch.font.name = "Arial"
    r_pitch.font.size = Pt(9.5)
    r_pitch.font.color.rgb = COLOR_DARK

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # Box de Resumo (Padrão Acadêmico)
    p_res_title = doc.add_paragraph()
    p_res_title.paragraph_format.space_before = Pt(8)
    p_res_title.paragraph_format.space_after = Pt(2)
    p_res_title.paragraph_format.keep_with_next = True
    r = p_res_title.add_run("Resumo")
    r.font.name = "Arial"
    r.font.size = Pt(11)
    r.font.bold = True
    r.font.color.rgb = COLOR_PRIMARY

    p_res = doc.add_paragraph()
    p_res.paragraph_format.space_before = Pt(0)
    p_res.paragraph_format.space_after = Pt(4)
    p_res.paragraph_format.line_spacing = 1.15
    p_res.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    r_res = p_res.add_run(
        "Neste relato de experiência, apresento em primeira pessoa a trajetória de concepção, engenharia e publicação do FinUp, "
        "uma plataforma web de finanças pessoais, Open Finance, simulações bancárias (Pix com comprovante autenticado Bacen e boletos) "
        "e acompanhamento de investimentos com dados de mercado ao vivo. O desenvolvimento iniciou-se em 17 de junho de 2026 e estendeu-se até novembro de 2026, "
        "sendo conduzido sob as diretrizes da apostila Programar com IA de forma responsável, fundamentando-se na metodologia Spec-Driven Development "
        "com o auxílio do Google Antigravity. Ao longo do ciclo, vivenciei a transição do papel de mero digitador de sintaxe para o de arquiteto e auditor crítico de código. "
        "As principais dificuldades envolveram a tentativa da IA de expor credenciais privadas no cliente (contornada com a estruturação de uma camada BFF em Cloud Functions), "
        "o bloqueio em chamadas assíncronas do terminal e a adequação das regras multi-tenant no banco de dados. Atualmente, o projeto encontra-se na fase final de entrega e sustentação em produção: "
        "o sistema está 100% publicado na Vercel, o banco e a spec foram normalizados, e elaborei um pitch em formato de vídeo sintetizando o produto. "
        "A experiência demonstrou que a IA expande drasticamente o alcance técnico de um estudante, desde que balizada por planejamento rigoroso e supervisão humana inflexível."
    )
    r_res.font.name = "Arial"
    r_res.font.size = Pt(10)
    r_res.font.color.rgb = COLOR_DARK

    p_kw = doc.add_paragraph()
    p_kw.paragraph_format.space_before = Pt(2)
    p_kw.paragraph_format.space_after = Pt(12)
    r_kw_lbl = p_kw.add_run("Palavras-chave: ")
    r_kw_lbl.font.name = "Arial"
    r_kw_lbl.font.size = Pt(10)
    r_kw_lbl.font.bold = True
    r_kw_lbl.font.color.rgb = COLOR_PRIMARY
    r_kw = p_kw.add_run("Desenvolvimento Assistido por IA; Spec-Driven Development; FinUp; Engenharia de Software; Educação Profissional.")
    r_kw.font.name = "Arial"
    r_kw.font.size = Pt(10)
    r_kw.font.color.rgb = COLOR_DARK

    # Funções de seções
    def add_section(num_str, title_str):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(16)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.keep_with_next = True
        r = p.add_run(f"{num_str}. {title_str}")
        r.font.name = "Arial"
        r.font.size = Pt(13)
        r.font.bold = True
        r.font.color.rgb = COLOR_PRIMARY

        # Linha verde
        p_line = doc.add_paragraph()
        p_line.paragraph_format.space_before = Pt(0)
        p_line.paragraph_format.space_after = Pt(6)
        p_line.paragraph_format.keep_with_next = True
        pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="10" w:space="1" w:color="00A878"/></w:pBdr>')
        p_line._p.get_or_add_pPr().append(pBdr)

    def add_body_p(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.line_spacing = 1.2
        p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.size = Pt(10.5)
        r.font.color.rgb = COLOR_DARK
        return p

    def add_quote(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(4)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.left_indent = Inches(0.4)
        p.paragraph_format.line_spacing = 1.15
        r = p.add_run(text)
        r.font.name = "Consolas"
        r.font.size = Pt(9)
        r.font.color.rgb = COLOR_DARK

    # 1. INTRODUÇÃO
    add_section("1", "Introdução")
    add_body_p(
        "Como estudante do curso Técnico em Informática Integrado ao Ensino Médio no IFRO Campus Porto Velho Calama, sempre observei que uma das maiores dificuldades das famílias e jovens investidores é a dispersão financeira. É corriqueiro possuir contas em múltiplos bancos digitais (Nubank, Inter, Caixa, Itaú), boletos esquecidos na caixa de e-mails e investimentos em plataformas separadas, sem qualquer visão consolidada do orçamento. Essa desorganização gera atrasos, juros desnecessários e falta de perspectiva orçamentária."
    )
    add_body_p(
        "Foi com base nesse diagnóstico que, exatamente em 17 de junho de 2026, iniciei o desenvolvimento do FinUp no componente curricular de Desenvolvimento de Sistemas, orientado pelo professor Rafael Pitwak. A proposta do FinUp é entregar uma aplicação financeira moderna e unificada no navegador, permitindo controle orçamentário, simulações de Pix com comprovante Bacen, liquidação de boletos com validação de código de barras, cartões de crédito físicos e virtuais, carteira de investimentos com cotações ao vivo da B3 e criptomoedas, além de diagnósticos com Inteligência Artificial contextual."
    )
    add_body_p(
        "O objetivo central deste documento não é somente catalogar o software que produzi, mas realizar uma reflexão em primeira pessoa sobre a experiência prática de desenvolver um sistema de alta densidade técnica utilizando um agente de inteligência artificial autônomo (Google Antigravity), sob a metodologia do desenvolvimento orientado por especificações (Spec-Driven Development). Registrar essa vivência justifica-se pelo fato de que a programação com IA é uma fronteira pedagógica recente, na qual ainda há carência de relatos acadêmicos que documentem com rigor os desafios, as decisões e os aprendizados dos próprios estudantes."
    )

    # 2. REFERENCIAL TEÓRICO
    add_section("2", "Referencial Teórico")
    add_body_p(
        "O desenvolvimento de software com apoio de agentes inteligentes estabelece um divisor de águas na formação técnica. Conforme formulado na apostila 'Programar com IA de forma responsável' (PITWAK, 2026), a engenharia de software contemporânea desloca o centro de gravidade da digitação mecânica de sintaxe para a modelagem arquitetural e a formulação precisa de especificações técnicas."
    )
    add_body_p(
        "Na abordagem Spec-Driven, a especificação técnica formal (spec.md) deixa de ser um mero artefato burocrático descartado após o planejamento inicial e passa a atuar como a única fonte de verdade (Single Source of Truth) de todo o ciclo de vida do software. É a spec que define os limites funcionais, o modelo relacional de entidades e os critérios de aceite que orientam o agente de IA."
    )
    add_body_p(
        "Ao programar com apoio de agentes autônomos, o desenvolvedor é desafiado a exercer postura de líder técnico e auditor. A IA, por ser orientada a padrões probabilísticos de linguagem, não possui responsabilidade legal, ética ou contextual. Sem a vigilância ativa do programador humano, o modelo tende a sugerir atalhos que violam regras de segurança — como expor chaves privadas de API no frontend ou dispensar validações no servidor. Portanto, programar com IA com responsabilidade exige saber exatamente o que exigir, como verificar o código gerado e quando recusar sumariamente as soluções propostas pelo agente."
    )

    # 3. METODOLOGIA / PERCURSO DA EXPERIÊNCIA
    add_section("3", "Metodologia / Percurso da Experiência")
    add_body_p(
        "A condução do trabalho ocorreu de forma contínua ao longo de cinco meses, entre 17 de junho e 17 de novembro de 2026, percorrendo as fases metodológicas ensinadas na disciplina:"
    )
    add_body_p(
        "1. Fase de Planejamento e Especificação (Junho/Julho): Redação formal da spec.md inicial contendo objetivos, perfis de usuários, casos de uso (UC01 a UC10), 20 requisitos funcionais (RF01 a RF20), requisitos não funcionais e o modelo relacional de dados (DER);\n"
        "2. Configuração e Arquitetura de Ambiente (Agosto): Estruturação do repositório no GitHub, setup da stack moderna com React 19, TypeScript, Vite 8 e TailwindCSS v4, além da integração inicial do Firebase Auth e Firestore;\n"
        "3. Desenvolvimento Iterativo e Construção dos Módulos (Setembro/Outubro): Uso do Google Antigravity para desenvolvimento das interfaces, sistema de transações, cotações ao vivo de B3 e cripto, gerenciamento de estado reativo com Zustand e regras de segurança firestore.rules;\n"
        "4. Testes, Homologação e Fase Final (Novembro): Publicação definitiva na Vercel (https://finup-chi.vercel.app), escrita do script de banco de dados relacional database/schema.sql, elaboração do pitch em vídeo, atualização das especificações (spec.pdf e spec.docx) e documentação do changelog de supervisão humana."
    )
    add_body_p(
        "Em relação ao nível de autonomia do agente no Google Antigravity, adotei deliberadamente o modelo de Autonomia Mediada com Supervisão Contínua. Estabeleci como regra pessoal nunca autorizar execuções em lote sem inspecionar os arquivos afetados no diff do Git. Essa postura garantiu controle integral sobre a base de código e impediu a introdução descontrolada de dependências desnecessárias."
    )

    # 4. RELATO DA EXPERIÊNCIA
    add_section("4", "Relato da Experiência")
    add_body_p(
        "Durante os cinco meses de trabalho, a interação com o agente de IA proporcionou momentos de grande aprendizado prático. Um dos casos mais emblemáticos ocorreu quando solicitei ao agente a implementação do conector para o Open Finance da Pluggy. O agente prontamente gerou um hook no React que realizava requisições fetch direto do navegador, injetando a credencial secreta por meio da variável VITE_PLUGGY_SECRET."
    )
    add_body_p(
        "Ao auditar o código proposto, percebi de imediato que qualquer usuário poderia abrir as ferramentas de desenvolvedor do navegador (F12) e capturar a chave de acesso privada nos arquivos compilados. Rejeitei a proposta da IA e instruí o agente a implementar o padrão BFF (Backend-for-Frontend) usando Firebase Cloud Functions em Node.js. Toda a autenticação pesada passou a ocorrer isolada no servidor, fornecendo apenas tokens temporários para o frontend."
    )
    add_body_p(
        "Outro exemplo de intervenção crítica humana ocorreu no módulo de relatórios analíticos. A IA havia programado a taxa de poupança mensal com a fórmula matemática direta ((receitas - despesas) / receitas) * 100. Contudo, ao testar uma conta recém-criada onde havia uma despesa cadastrada mas nenhuma receita lançada ainda no mês, a expressão gerava divisão por zero, resultando em NaN e -Infinity que deformavam a interface gráfica. Eu mesmo intervim para implementar uma condicional defensiva matemática, limitando a variação entre -100% e +100%."
    )
    add_body_p(
        "Para consolidar a apresentação do projeto, elaborei também um pitch em formato de vídeo. Nele, sintetizei em linguagem direta o problema da fragmentação orçamentária, realizei um tour pelas principais telas do FinUp (Pix com comprovante autenticado, cartões de crédito e carteira de investimentos) e destaquei a segurança arquitetural da solução. Gravar o pitch foi uma experiência valorosa, pois exigiu sair do jargão técnico e comunicar com clareza a proposta de valor do software para o público usuário."
    )

    # 5. DIFICULDADES E DESAFIOS ENFRENTADOS
    add_section("5", "Dificuldades e Desafios Enfrentados")
    add_body_p(
        "O percurso apresentou obstáculos significativos, divididos em três dimensões principais:"
    )
    add_body_p(
        "1. Desafio de Segurança e Tentação do Atalho Fácil: A IA frequentemente propunha resolver problemas complexos da forma mais simples e insegura possível — como relaxar as regras do banco de dados (firestore.rules) permitindo leitura pública para 'fazer funcionar logo'. Resistir a essa tentação e exigir o cumprimento estrito do isolamento multi-tenant (onde cada usuário só enxerga seus próprios dados com request.auth.uid == userId) exigiu paciência, testes iterativos e recusa firme a códigos complacentes da IA."
    )
    add_body_p(
        "2. Travamentos em Comandos Assíncronos no Terminal: Em vários momentos durante o desenvolvimento no ambiente do Antigravity, comandos que exigiam download ou confirmação interativa no PowerShell (como a instalação do pacote da Vercel ou locks no índice do Git) travaram o terminal em segundo plano. Precisei aprender a diagnosticar o estado das tarefas ativas (manage_task), forçar encerramentos seguros e gerenciar arquivos de trava (index.lock), evitando a corrupção do repositório."
    )
    add_body_p(
        "3. Persistência de Estado no Modo Demonstração: O agente inicialmente modelou a sessão de demonstração com variáveis locais em memória (useState). Isso significava que, se o avaliador pressionasse F5 para recarregar a página, todo o saldo e as simulações desapareciam, exigindo novo login. Corrigi isso integrando o Zustand ao middleware de persistência no LocalStorage, garantindo uma auditoria fluida e sem atritos para o professor."
    )

    # 6. RESULTADOS E REFLEXÕES
    add_section("6", "Resultados e Reflexões")
    add_body_p(
        "Atualmente, o projeto atingiu sua Fase Final com pleno êxito: o sistema está completamente publicado, operacional e acessível pela internet no link oficial da Vercel: https://finup-chi.vercel.app. Qualquer pessoa com o link consegue explorar o sistema no computador ou no celular, navegar pelas cotações da B3 e criptomoedas, simular um Pix de R$ 250, pagar boletos e emitir comprovantes oficiais sem instalar dependência alguma."
    )
    add_body_p(
        "Ao contrastar esse método com os bimestres anteriores — em que desenvolvíamos códigos manuscritos linha a linha —, posso destacar transformações profundas:"
    )
    add_body_p(
        "• Velocidade e Amplitude: O que demandaria semanas de trabalho artesanal de digitação (estruturação de design systems modernos, formulários complexos, componentes responsivos em Tailwind v4 e integração de APIs REST) foi concebido em questão de horas. Isso permitiu focar no modelo de negócios, na experiência do usuário e na segurança;\n"
        "• Nova Habilidade Cognitiva: A programação com IA exige muito mais leitura e análise crítica de código do que escrita bruta. O programador precisa agir como um auditor experiente, farejando inconsistências lógicas e vulnerabilidades que o modelo gera disfarçadas sob uma sintaxe elegante."
    )

    # 7. CONSIDERAÇÕES FINAIS
    add_section("7", "Considerações Finais")
    add_body_p(
        "A experiência de desenvolver o FinUp de 17 de junho até o momento atual consolidou em mim a certeza de que a Inteligência Artificial é um multiplicador extraordinário de capacidade técnica, mas que não substitui o raciocínio analítico, a ética e o discernimento humano. Pelo contrário: sem fundamentos sólidos de computação, o desenvolvedor é incapaz de julgar o que o agente produz."
    )
    add_body_p(
        "Para as turmas futuras do IFRO que venham a cursar a disciplina de Desenvolvimento de Sistemas sob essa metodologia, recomendo: dediquem o máximo de cuidado à redação da sua spec.md inicial; nunca aprovem códigos que não consigam explicar em detalhes na lousa; e encarem o deploy público desde o primeiro momento como o verdadeiro teste de fogo do seu projeto."
    )

    # REFERÊNCIAS
    add_section("8", "Referências")
    refs = [
        "GOOGLE DEEPMIND. Antigravity: Spec-Driven Autonomous Agent Documentation. Mountain View: Google, 2026.",
        "PITWAK, Rafael. Programar com IA de forma responsável: guia prático e metodológico para desenvolvimento de sistemas. Porto Velho: Instituto Federal de Educação, Ciência e Tecnologia de Rondônia (IFRO), 2026.",
        "SOMMERVILLE, Ian. Engenharia de Software. 10. ed. São Paulo: Pearson, 2019.",
        "VERCEL. Vercel Platform Documentation: CI/CD, Edge Network and Automated Deployments. Disponível em: <https://vercel.com/docs>. Acesso em: 17 nov. 2026.",
        "W3C. Web Content Accessibility Guidelines (WCAG) 2.1. W3C Recommendation, 2023. Disponível em: <https://www.w3.org/TR/WCAG21/>. Acesso em: 17 nov. 2026."
    ]
    for r in refs:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.left_indent = Inches(0.4)
        p.paragraph_format.first_line_indent = Inches(-0.4)
        r_run = p.add_run(r)
        r_run.font.name = "Arial"
        r_run.font.size = Pt(9.5)
        r_run.font.color.rgb = COLOR_DARK

    doc.save(DOCX_PATH)
    print(f"Relato de Experiência em Word gerado com sucesso em: {DOCX_PATH}")

if __name__ == '__main__':
    build_docx()
