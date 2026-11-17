# -*- coding: utf-8 -*-
"""
Script para compilar o spec.md no formato Word (.docx) elegante, profissional e diagramado.
Compatível com Microsoft Word 2016+, Office 365, LibreOffice e Google Docs.
"""
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

DOCX_PATH = r"c:\Users\Aluno\Documents\Desenvolvimento\finup\spec.docx"

def set_cell_background(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_table_borders(table, color="D1D5DB", sz="4", val="single"):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'  <w:top w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:bottom w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:insideH w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:insideV w:val="none"/>'
        f'  <w:left w:val="none"/>'
        f'  <w:right w:val="none"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def build_docx():
    doc = docx.Document()

    # Configuração de Margens (2.0 cm = ~0.79 in)
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)
        section.different_first_page_header_footer = False

        # Rodapé
        footer = section.footer
        p_foot = footer.paragraphs[0]
        p_foot.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        f_run = p_foot.add_run("FinUp · GitHub: github.com/TarsoRondon/finup · Online: finup-chi.vercel.app")
        f_run.font.name = "Arial"
        f_run.font.size = Pt(8.5)
        f_run.font.color.rgb = RGBColor(120, 120, 120)

        # Cabeçalho
        header = section.header
        p_head = header.paragraphs[0]
        p_head.alignment = WD_ALIGN_PARAGRAPH.LEFT
        h_run = p_head.add_run("FINUP — ESPECIFICAÇÃO TÉCNICA DE SOFTWARE (ANEXO A)")
        h_run.font.name = "Arial"
        h_run.font.size = Pt(8.5)
        h_run.font.bold = True
        h_run.font.color.rgb = RGBColor(0, 168, 120)

    # Estilos
    COLOR_PRIMARY = RGBColor(13, 31, 45)       # #0D1F2D
    COLOR_ACCENT = RGBColor(0, 168, 120)       # #00A878 Mint
    COLOR_DARK = RGBColor(30, 41, 59)          # #1E293B
    COLOR_MUTED = RGBColor(100, 116, 139)      # #64748B

    # 1. TÍTULO PRINCIPAL
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(2)
    r_title = p_title.add_run("FinUp — Especificação Técnica de Software")
    r_title.font.name = "Arial"
    r_title.font.size = Pt(22)
    r_title.font.bold = True
    r_title.font.color.rgb = COLOR_PRIMARY

    # Subtítulo
    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(12)
    r_sub = p_sub.add_run("Sistema de Gestão Financeira Pessoal, Open Finance, Operações Bancárias e Investimentos")
    r_sub.font.name = "Arial"
    r_sub.font.size = Pt(11)
    r_sub.font.italic = True
    r_sub.font.color.rgb = COLOR_ACCENT

    # Box de Metadados / Informações Institucionais
    table_meta = doc.add_table(rows=1, cols=1)
    table_meta.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_meta.autofit = False
    table_meta.columns[0].width = Inches(6.9)
    cell_meta = table_meta.cell(0, 0)
    set_cell_background(cell_meta, "F0FDF4") # Verde bem claro
    set_cell_margins(cell_meta, top=140, bottom=140, left=180, right=180)
    
    # Borda verde no box de metadados
    tcPr = cell_meta._tc.get_or_add_tcPr()
    tcBorders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'  <w:left w:val="single" w:sz="24" w:space="0" w:color="00A878"/>'
        f'  <w:top w:val="none"/>'
        f'  <w:bottom w:val="none"/>'
        f'  <w:right w:val="none"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(tcBorders)

    p_meta = cell_meta.paragraphs[0]
    p_meta.paragraph_format.space_after = Pt(0)
    p_meta.paragraph_format.line_spacing = 1.25

    def add_meta_line(label, value, is_link=False):
        r1 = p_meta.add_run(f"{label}: ")
        r1.font.name = "Arial"
        r1.font.size = Pt(9.5)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_DARK
        r2 = p_meta.add_run(f"{value}\n")
        r2.font.name = "Arial"
        r2.font.size = Pt(9.5)
        if is_link:
            r2.font.color.rgb = RGBColor(0, 102, 204)
            r2.font.underline = True
        else:
            r2.font.color.rgb = COLOR_DARK

    add_meta_line("Repositório Oficial no GitHub", "https://github.com/TarsoRondon/finup", is_link=True)
    add_meta_line("Sistema Publicado no Ar (Vercel)", "https://finup-chi.vercel.app", is_link=True)
    add_meta_line("Instituição", "Instituto Federal de Rondônia (IFRO) — Campus Porto Velho Calama")
    add_meta_line("Componente Curricular", "Desenvolvimento de Sistemas (Ensino Médio Técnico em Informática)")
    add_meta_line("Aluno / Desenvolvedor", "Tarso Rondon")
    add_meta_line("Professor Orientador", "Prof. Rafael Pitwak")
    r_end = p_meta.add_run("Metodologia: Spec-Driven Development (Apostila Programar com IA de Forma Responsável)")
    r_end.font.name = "Arial"
    r_end.font.size = Pt(9.5)
    r_end.font.color.rgb = COLOR_DARK

    doc.add_paragraph().paragraph_format.space_after = Pt(10)

    # Função auxiliar para cabeçalhos de seção
    def add_section_heading(num_str, title_str):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(16)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        r = p.add_run(f"{num_str}. {title_str}")
        r.font.name = "Arial"
        r.font.size = Pt(14)
        r.font.bold = True
        r.font.color.rgb = COLOR_PRIMARY

        # Linha divisória verde suave abaixo do título
        p_line = doc.add_paragraph()
        p_line.paragraph_format.space_before = Pt(0)
        p_line.paragraph_format.space_after = Pt(8)
        p_line.paragraph_format.keep_with_next = True
        pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="12" w:space="1" w:color="00A878"/></w:pBdr>')
        p_line._p.get_or_add_pPr().append(pBdr)

    def add_subheading(subtitle):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        r = p.add_run(subtitle)
        r.font.name = "Arial"
        r.font.size = Pt(11)
        r.font.bold = True
        r.font.color.rgb = COLOR_ACCENT

    def add_body(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.line_spacing = 1.15
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.size = Pt(10)
        r.font.color.rgb = COLOR_DARK
        return p

    def format_table(table, col_widths, headers, data, alt_rows=True):
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        table.autofit = False
        set_table_borders(table)

        # Header Row
        hdr_cells = table.rows[0].cells
        for i, header_text in enumerate(headers):
            hdr_cells[i].width = col_widths[i]
            set_cell_background(hdr_cells[i], "00A878") # Verde FinUp
            set_cell_margins(hdr_cells[i], top=120, bottom=120, left=140, right=140)
            p = hdr_cells[i].paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            r = p.add_run(header_text)
            r.font.name = "Arial"
            r.font.size = Pt(9.5)
            r.font.bold = True
            r.font.color.rgb = RGBColor(255, 255, 255)

        # Data Rows
        for row_idx, row_data in enumerate(data):
            row_cells = table.add_row().cells
            bg_color = "F8FAFC" if (alt_rows and row_idx % 2 == 1) else "FFFFFF"
            for col_idx, cell_value in enumerate(row_data):
                row_cells[col_idx].width = col_widths[col_idx]
                set_cell_background(row_cells[col_idx], bg_color)
                set_cell_margins(row_cells[col_idx], top=100, bottom=100, left=140, right=140)
                p = row_cells[col_idx].paragraphs[0]
                p.paragraph_format.space_after = Pt(0)
                p.paragraph_format.line_spacing = 1.15
                
                # Check for bold prefix (ex: "**ID:**")
                parts = cell_value.split("**")
                if len(parts) >= 3:
                    for p_i, part in enumerate(parts):
                        r = p.add_run(part)
                        r.font.name = "Arial"
                        r.font.size = Pt(9)
                        r.font.color.rgb = COLOR_DARK
                        if p_i % 2 == 1:
                            r.font.bold = True
                else:
                    r = p.add_run(cell_value)
                    r.font.name = "Arial"
                    r.font.size = Pt(9)
                    r.font.color.rgb = COLOR_DARK

    # ==========================================
    # 1. OBJETIVO
    # ==========================================
    add_section_heading("1", "Objetivo")
    add_body(
        "O FinUp é uma plataforma web desenvolvida para pessoas físicas e investidores que necessitam centralizar "
        "a gestão do orçamento pessoal, o acompanhamento patrimonial e operações financeiras cotidianas em um único ambiente seguro. "
        "O sistema unifica dados de contas bancárias via Open Finance oficial, permite emissão e recebimento de Pix com comprovante autenticado, "
        "controle de cartões e faturas, quitação de boletos com simulação de código de barras, cotações de mercado ao vivo (B3, criptomoedas e moedas) "
        "e diagnósticos com Inteligência Artificial contextual, eliminando planilhas manuais dispersas e o uso simultâneo de múltiplos aplicativos bancários."
    )

    # ==========================================
    # 2. USUÁRIOS
    # ==========================================
    add_section_heading("2", "Usuários")
    users_data = [
        [
            "**Usuário Titular**\n(Cliente / Pessoa Física)",
            "Cadastra-se na plataforma, efetua login com e-mail/senha ou Google Auth, recupera senha via e-mail e acessa o painel financeiro. "
            "Pode realizar e simular operações Pix (com validação de saldo e emissão de comprovante oficial Bacen), simular transferências bancárias TED/DOC "
            "para diversas instituições, gerenciar boletos a pagar com baixa automática no saldo, controlar cartões físicos e virtuais (com bloqueio "
            "temporário em 1 clique e pagamento de fatura), cadastrar receitas e despesas manuais, estipular metas de economia com aportes rápidos, "
            "consultar cotações da B3 e criptoativos, interagir com o assistente FinUp IA e exportar relatórios em formato CSV e PDF."
        ],
        [
            "**Usuário Convidado**\n(Modo Demonstração / Auditor)",
            "Acessa instantaneamente o sistema com um clique ('Acesso Demo'), sem necessidade de preencher formulário de cadastro ou autenticar "
            "credenciais no Firebase. Possui permissão de visualização e teste interativo completo de todas as telas, transações pré-carregadas, "
            "simulação de Pix, liquidação de faturas de teste e restauração dos dados padrão a qualquer momento."
        ],
        [
            "**Sistema / Backend**\n(Cloud Functions & Camada BFF)",
            "Serviço automatizado responsável por intermediar requisições para APIs parceiras externas (Pluggy, BRAPI, CoinGecko, AwesomeAPI), "
            "garantindo que chaves secretas de API nunca trafeguem no cliente. Executa normalização de extratos bancários, aplica validações de segurança "
            "e garante o isolamento multi-tenant dos dados nas regras de acesso do banco."
        ]
    ]
    t_users = doc.add_table(rows=1, cols=2)
    format_table(t_users, [Inches(1.8), Inches(5.1)], ["Tipo de Usuário", "Permissões e Ações Associadas no Sistema"], users_data)

    # ==========================================
    # 3. CASOS DE USO PRINCIPAIS
    # ==========================================
    add_section_heading("3", "Casos de Uso Principais")
    add_body("A tabela abaixo mapeia as ações centrais do sistema, correlacionando-as diretamente com os Requisitos Funcionais (Seção 4):")
    
    uc_headers = ["ID", "Caso de Uso", "Ator", "Descrição Sucinta", "Requisitos"]
    uc_data = [
        ["**UC01**", "Autenticar e Gerenciar Acesso", "Titular / Convidado", "Cadastrar nova conta, autenticar-se via E-mail/Senha ou Google, recuperar acesso por e-mail ou ingressar via Modo Demonstração 1-Clique.", "RF01, RF02, RF03, RF04"],
        ["**UC02**", "Operar Área Pix 24/7", "Titular", "Enviar transferências Pix com validação de saldo, simular recebimento de valores em conta e emitir comprovante autenticado com ID único.", "RF05, RF06"],
        ["**UC03**", "Realizar Transferências TED/DOC", "Titular", "Preencher assistente em etapas (Banco, Favorecido, Agência, Conta e Valor), validar saldo disponível e gerar recibo de transferência.", "RF07"],
        ["**UC04**", "Gerenciar e Pagar Boletos", "Titular", "Consultar títulos a vencer com avisos de urgência, validar código de barras (44/48 dígitos), efetuar pagamento e registrar baixa automática.", "RF08, RF09"],
        ["**UC05**", "Controlar Cartões e Faturas", "Titular", "Visualizar dados com máscara segura, copiar número de cartão virtual, alternar bloqueio temporário e quitar fatura restaurando o limite.", "RF10, RF11"],
        ["**UC06**", "Gerenciar Extrato e Transações", "Titular", "Listar movimentações, filtrar por categoria, cadastrar lançamentos manuais e exportar dados em planilha CSV (UTF-8 BOM).", "RF12, RF13"],
        ["**UC07**", "Acompanhar Carteira e Cotações", "Titular", "Visualizar cotações em tempo real de ativos da B3, criptoativos e moedas, calculando preço médio de compra e rentabilidade.", "RF14, RF15"],
        ["**UC08**", "Gerenciar Metas e Orçamento", "Titular", "Criar metas com valor alvo e prazo, realizar aportes financeiros rápidos com débito em conta e acompanhar tetos orçamentários por categoria.", "RF16, RF17"],
        ["**UC09**", "Consultar Assistente FinUp IA", "Titular", "Interagir via chat com a inteligência contextual que analisa saldo disponível, boletos pendentes e limites para sugerir economia.", "RF18"],
        ["**UC10**", "Emitir Relatórios Analíticos", "Titular", "Visualizar gráficos de fluxo de caixa, calcular taxa de poupança mensal e imprimir relatórios formatados em folha A4 limpa sem menus.", "RF19, RF20"]
    ]
    t_uc = doc.add_table(rows=1, cols=5)
    format_table(t_uc, [Inches(0.6), Inches(1.5), Inches(1.1), Inches(2.6), Inches(1.1)], uc_headers, uc_data)

    # ==========================================
    # 4. REQUISITOS FUNCIONAIS
    # ==========================================
    add_section_heading("4", "Requisitos Funcionais (RF)")
    rfs = [
        ("RF01", "Cadastro de Usuário", "O sistema deve permitir o cadastro de novos usuários informando nome completo, e-mail válido e senha com no mínimo 6 caracteres e ao menos um número."),
        ("RF02", "Autenticação e Login", "O sistema deve permitir login seguro por e-mail e senha cadastrados ou autenticação federada com Google OAuth 2.0."),
        ("RF03", "Recuperação de Senha", "O sistema deve fornecer opção de recuperação de conta, enviando link de redefinição de senha para o e-mail informado."),
        ("RF04", "Modo Demonstração (Convidado)", "O sistema deve oferecer acesso instantâneo em 1 clique ('Acesso Demo') pré-carregando dados fictícios completos para auditoria sem login prévio."),
        ("RF05", "Envio de Pix com Débito Imediato", "O sistema deve validar se o saldo em conta é suficiente antes de enviar um Pix, debitar o montante em tempo real e registrar a movimentação no extrato."),
        ("RF06", "Comprovante Autenticado de Pix", "O sistema deve gerar um comprovante detalhado para cada Pix concluído contendo código de autenticação Bacen, data/hora, chave/favorecido e botão para impressão ou cópia de texto."),
        ("RF07", "Transferências TED/DOC", "O sistema deve permitir transferências interbancárias em etapas com seleção de banco de destino (BB, Bradesco, Itaú, Nubank, Inter, Caixa, etc.), agência, conta e favorecido."),
        ("RF08", "Consulta e Alertas de Boletos", "O sistema deve listar contas a pagar separando pendentes e quitadas, sinalizando alertas visuais em boletos com vencimento próximo."),
        ("RF09", "Liquidação de Boletos", "O sistema deve validar código de barras de 44 ou 48 dígitos, debitar o valor do saldo em conta e alterar o status do título para 'pago'."),
        ("RF10", "Gestão de Cartões de Crédito", "O sistema deve exibir cartões físicos e virtuais do cliente com limite total, limite utilizado e número com máscara de segurança com botão de cópia."),
        ("RF11", "Bloqueio e Pagamento de Fatura de Cartão", "O sistema deve permitir bloquear/desbloquear o cartão em 1 clique e pagar o valor da fatura utilizada, restabelecendo o limite original."),
        ("RF12", "Extrato Financeiro Filtrável", "O sistema deve exibir todas as entradas e saídas com busca textual e filtros rápidos por tipo (receitas, despesas, Pix, boletos) e por categoria."),
        ("RF13", "Lançamento Manual de Transações", "O usuário deve conseguir cadastrar movimentações financeiras avulsas informando descrição, valor, data, tipo e categoria (Alimentação, Moradia, Salário, etc.)."),
        ("RF14", "Exportação de Extrato em CSV", "O sistema deve gerar e baixar arquivo .csv codificado em UTF-8 BOM com todas as transações filtradas para compatibilidade nativa com Microsoft Excel."),
        ("RF15", "Cotações de Mercado em Tempo Real", "O sistema deve exibir ticker no topo com preços e variações 24h atualizados de Bitcoin (BTC), Ethereum (ETH), Dólar Comercial (USD), Euro (EUR) e ações da B3 (PETR4, VALE3, ITUB4)."),
        ("RF16", "Carteira de Investimentos e Rentabilidade", "O sistema deve listar ativos em custódia calculando posição total, preço médio de compra, rentabilidade nominal em reais e percentual acumulado."),
        ("RF17", "Metas Financeiras e Aportes", "O sistema deve permitir o acompanhamento de metas com barras de progresso percentuais e botões de aporte rápido (+R$ 100, +R$ 500) debitados do saldo."),
        ("RF18", "Assistente FinUp IA Contextual", "O sistema deve disponibilizar interface de chat inteligente capaz de ler o saldo atual, total de boletos e histórico de gastos para fornecer diagnósticos financeiros em linguagem natural."),
        ("RF19", "Relatórios Analíticos e Taxa de Poupança", "O sistema deve calcular automaticamente a taxa de poupança mensal ((Receitas - Despesas) / Receitas) * 100 e apresentar gráficos de pizza por categoria."),
        ("RF20", "Impressão de Relatórios Contábeis", "O sistema deve disponibilizar formatação de impressão (@media print) que oculta menus laterais e botões, gerando uma folha A4 limpa para emissão em PDF.")
    ]
    for rfid, name, desc in rfs:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.line_spacing = 1.15
        r1 = p.add_run(f"• [{rfid}] {name}: ")
        r1.font.name = "Arial"
        r1.font.size = Pt(9.5)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_PRIMARY
        r2 = p.add_run(desc)
        r2.font.name = "Arial"
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = COLOR_DARK

    # ==========================================
    # 5. REQUISITOS NÃO FUNCIONAIS
    # ==========================================
    add_section_heading("5", "Requisitos Não Funcionais (RNF)")
    rnfs = [
        ("RNF01", "Proteção Criptográfica de Senhas (Hash Seguro)", "As senhas dos usuários jamais devem ser armazenadas em texto puro (plain text). A gestão de credenciais é delegada ao Firebase Authentication, que utiliza algoritmos de hash modernos com salt (Scrypt/PBKDF2)."),
        ("RNF02", "Validação no Servidor e BFF", "Todos os formulários e transações financeiras críticas devem ser validados pelo servidor/Cloud Functions e regras do Firestore, impedindo submissão de valores negativos, caracteres maliciosos ou payloads adulterados."),
        ("RNF03", "Isolamento Multi-Tenancy (Segurança no Banco)", "O acesso aos dados no Firestore é estritamente controlado por regras de segurança (firestore.rules), garantindo que um usuário autenticado só possa ler e gravar em coleções onde request.auth.uid == userId."),
        ("RNF04", "Ocultação de Segredos de API", "Nenhuma chave secreta com privilégios de gravação ou tokens de parceiros (ex.: PLUGGY_CLIENT_SECRET) pode ser embutida no frontend. Todas as requisições a serviços externos trafegam via Cloud Functions atuando como BFF."),
        ("RNF05", "Comunicação Segura", "Todas as trocas de informação entre navegador, serviços de backend e APIs de mercado devem trafegar obrigatoriamente sob protocolo HTTPS com criptografia TLS 1.3 / SSL 256-bit."),
        ("RNF06", "Desempenho e Responsividade", "A aplicação deve apresentar First Contentful Paint (FCP) inferior a 1,5 segundos em conexões 4G padrão e ser totalmente utilizável em telas móveis a partir de 320px de largura e desktops de alta resolução."),
        ("RNF07", "Persistência Local e Resiliência", "Os estados de sessão, transações e preferências visuais devem contar com persistência em armazenamento local do cliente (Zustand com LocalStorage), permitindo navegação offline e recarga rápida da página.")
    ]
    for rnfid, name, desc in rnfs:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.line_spacing = 1.15
        r1 = p.add_run(f"• [{rnfid}] {name}: ")
        r1.font.name = "Arial"
        r1.font.size = Pt(9.5)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_PRIMARY
        r2 = p.add_run(desc)
        r2.font.name = "Arial"
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = COLOR_DARK

    # ==========================================
    # 6. MODELO DE DADOS
    # ==========================================
    add_section_heading("6", "Modelo de Dados (DER Simplificado)")
    add_body("O modelo relacional lógico do banco de dados (implementado no Cloud Firestore em coleções subordinadas ao identificador único do usuário users/{userId}) garante integridade referencial por chaves primárias e estrangeiras:")

    # Caixa Monospaçada com o DER ASCII
    p_der = doc.add_paragraph()
    p_der.paragraph_format.space_before = Pt(6)
    p_der.paragraph_format.space_after = Pt(8)
    p_der.paragraph_format.line_spacing = 1.0
    r_der = p_der.add_run(
"+--------------------------------------------------------+\n"
"|                        USUARIOS                        |\n"
"+-------------------------+------------------------------+\n"
"| PK  id_usuario          | VARCHAR(64) [Firebase UID]   |\n"
"|     nome_completo       | VARCHAR(120)                 |\n"
"|     email               | VARCHAR(150) [UNIQUE]        |\n"
"|     tema_preferido      | VARCHAR(10) ['dark'|'light'] |\n"
"|     data_cadastro       | TIMESTAMP                    |\n"
"+-------------------------+--------------+---------------+\n"
"                                         | 1\n"
"                   +---------------------+---------------------+\n"
"                   | 1..N                | 1..N                | 1..N\n"
"                   V                     V                     V\n"
"+----------------------------+ +--------------------+ +--------------------+\n"
"|         TRANSACOES         | |      BOLETOS       | |      CARTOES       |\n"
"+----------------------------+ +--------------------+ +--------------------+\n"
"| PK id_transacao VARCHAR(64)| | PK id_boleto (64)  | | PK id_cartao (64)  |\n"
"| FK id_usuario   VARCHAR(64)| | FK id_usuario (64) | | FK id_usuario (64) |\n"
"|    descricao    VARCHAR(120| |    titulo    (120) | |    tipo_cartao     |\n"
"|    valor        DECIMAL    | |    valor     DEC   | |    ultimos_digitos |\n"
"|    tipo         VARCHAR(20)| |    vencimento DATE | |    limite_total DEC|\n"
"|    categoria    VARCHAR(50)| |    codigo_barras   | |    limite_usado DEC|\n"
"|    status       VARCHAR(20)| |    status_pagamento| |    bloqueado BOOL  |\n"
"|    data_registro TIMESTAMP | |    data_baixa TIME | +--------------------+\n"
"+----------------------------+ +--------------------+\n"
"                   | 1..N                | 1..N\n"
"                   V                     V\n"
"+----------------------------+ +----------------------------+\n"
"|           METAS            | |        INVESTIMENTOS       |\n"
"+----------------------------+ +----------------------------+\n"
"| PK id_meta      VARCHAR(64)| | PK id_investimento  (64)   |\n"
"| FK id_usuario   VARCHAR(64)| | FK id_usuario       (64)   |\n"
"|    titulo       VARCHAR(100| |    ticker_ativo     VARCHAR|\n"
"|    valor_alvo   DECIMAL    | |    tipo_ativo       VARCHAR|\n"
"|    valor_atual  DECIMAL    | |    quantidade       DECIMAL|\n"
"|    data_prazo   DATE       | |    preco_medio      DECIMAL|\n"
"|    icone_badge  VARCHAR(30)| |    preco_mercado    DECIMAL|\n"
"+----------------------------+ +----------------------------+"
    )
    r_der.font.name = "Consolas"
    r_der.font.size = Pt(7.5)
    r_der.font.color.rgb = COLOR_DARK

    add_subheading("Relacionamentos por Chave Estrangeira (FK):")
    fks = [
        ("USUARIOS (1) ── (N) TRANSACOES", "Uma conta de usuário possui histórico de receitas, despesas, Pix e transferências vinculadas por id_usuario."),
        ("USUARIOS (1) ── (N) BOLETOS", "Um usuário gerencia múltiplos títulos e faturas associadas ao seu cadastro através de id_usuario."),
        ("USUARIOS (1) ── (N) CARTOES", "Um usuário pode possuir múltiplos cartões (físicos ou virtuais) vinculados por id_usuario."),
        ("USUARIOS (1) ── (N) METAS", "Os objetivos de economia e reserva pertencem exclusivamente ao usuário identificado por id_usuario."),
        ("USUARIOS (1) ── (N) INVESTIMENTOS", "Os ativos custodiados na carteira (ações, FIIs e criptomoedas) são associados pelo campo id_usuario.")
    ]
    for rel, exp in fks:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(1)
        p.paragraph_format.space_after = Pt(3)
        r1 = p.add_run(f"• {rel}: ")
        r1.font.name = "Arial"
        r1.font.size = Pt(9.5)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_PRIMARY
        r2 = p.add_run(exp)
        r2.font.name = "Arial"
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = COLOR_DARK

    # ==========================================
    # 7. CRITÉRIOS DE ACEITE
    # ==========================================
    add_section_heading("7", "Critérios de Aceite (Gherkin BDD)")
    cas = [
        ("CA01 — Cadastro de Usuário e Criação de Conta (RF01)",
         [("Dado que", "o visitante está no modal de autenticação e seleciona 'Criar Conta';"),
          ("Quando", "preenche um nome, e-mail válido e uma senha com menos de 6 caracteres;"),
          ("Então", "o sistema desabilita o avanço e exibe o indicador visual de que a senha requer no mínimo 6 dígitos e números.")]),
        ("CA02 — Autenticação de Usuário e Modo Demonstração (RF02, RF04)",
         [("Dado que", "o avaliador ou usuário clica no botão 'Acesso Demo (Modo Demonstração)';"),
          ("Quando", "a ação é disparada;"),
          ("Então", "o sistema inicializa uma sessão autenticada VIP sem exigir credenciais, redireciona para o Dashboard e exibe a badge '● Modo Demonstração' ativa.")]),
        ("CA03 — Validação e Envio de Pix com Saldo Suficiente (RF05, RF06)",
         [("Dado que", "o usuário possui saldo disponível de R$ 5.000,00 e informa uma chave Pix com valor de R$ 350,00;"),
          ("Quando", "clica no botão 'Confirmar Envio Pix';"),
          ("Então", "o saldo é atualizado imediatamente para R$ 4.650,00, um toast verde de sucesso surge na tela e o comprovante com código de autenticação único é exibido com opção de impressão.")]),
        ("CA04 — Bloqueio de Operação por Saldo Insuficiente (RF05, RF07)",
         [("Dado que", "o usuário possui saldo disponível de R$ 100,00 e tenta enviar um Pix ou TED de R$ 300,00;"),
          ("Quando", "submete o formulário;"),
          ("Então", "a operação é bloqueada, o saldo permanece inalterado em R$ 100,00 e um alerta vermelho de 'Saldo Insuficiente' é exibido.")]),
        ("CA05 — Baixa e Liquidação de Boleto Bancário (RF08, RF09)",
         [("Dado que", "existe um boleto com status 'Pendente' no valor de R$ 99,90 e o usuário possui saldo suficiente;"),
          ("Quando", "clica no botão 'Pagar Agora' do boleto;"),
          ("Então", "o sistema debita R$ 99,90 do saldo, altera o status do boleto para 'Pago' e insere a movimentação no histórico de transações.")]),
        ("CA06 — Bloqueio e Pagamento de Fatura de Cartão (RF10, RF11)",
         [("Dado que", "o usuário visualiza um cartão de crédito com limite utilizado de R$ 350,00 e possui saldo em conta;"),
          ("Quando", "clica em 'Pagar Fatura';"),
          ("Então", "o sistema debita os R$ 350,00 do saldo corrente, zera o limite utilizado e exibe toast de confirmação de limite restabelecido.")]),
        ("CA07 — Lançamento Manual e Exportação de Extrato em CSV (RF12, RF13, RF14)",
         [("Dado que", "o usuário preenche a inclusão de uma receita manual de 'Consultoria' no valor de R$ 800,00 e clica em 'Salvar';"),
          ("Quando", "a transação é inserida e o usuário clica em 'Exportar CSV';"),
          ("Então", "a transação surge no topo do extrato e o navegador inicia o download do arquivo .csv codificado em UTF-8 BOM com todas as colunas formatadas.")]),
        ("CA08 — Cálculo Percentual e Aporte em Metas (RF17)",
         [("Dado que", "o usuário possui uma meta de R$ 10.000,00 com R$ 7.000,00 acumulados (70%);"),
          ("Quando", "clica no botão de aporte rápido '+ R$ 500';"),
          ("Então", "o sistema debita R$ 500,00 do saldo disponível, atualiza o saldo da meta para R$ 7.500,00 e a barra de progresso avança visualmente para 75%.")])
    ]
    for ca_title, lines in cas:
        add_subheading(ca_title)
        for g_word, g_text in lines:
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(1)
            p.paragraph_format.space_after = Pt(2)
            r1 = p.add_run(f"• {g_word} ")
            r1.font.name = "Arial"
            r1.font.size = Pt(9.5)
            r1.font.bold = True
            r1.font.color.rgb = COLOR_PRIMARY
            r2 = p.add_run(g_text)
            r2.font.name = "Arial"
            r2.font.size = Pt(9.5)
            r2.font.color.rgb = COLOR_DARK

    # ==========================================
    # 8. DECISÃO DE STACK E DEPLOY
    # ==========================================
    add_section_heading("8", "Decisão de Stack Tecnológico e Deploy")
    stack_headers = ["Camada", "Tecnologia Selecionada", "Justificativa Técnica e Compatibilidade com Deploy"]
    stack_data = [
        ["**Frontend Core**", "React 19 + TypeScript + Vite 8", "Renderização SPA com Virtual DOM eficiente, modularização por componentes reutilizáveis, tipagem estática que previne erros em tempo de compilação e bundler Vite com compilação instantânea. Totalmente estático e 100% compatível com Vercel Edge Network e Firebase Hosting."],
        ["**Estilização & UI**", "TailwindCSS v4 + Vanilla CSS", "Estilização utilitária de alto desempenho sem overhead de runtime, suporte nativo a temas escuros, flexbox/grid responsivo e regras específicas para impressão limpa de documentos fiscais (@media print)."],
        ["**Gerenciamento de Estado**", "Zustand (com Persist Middleware)", "Biblioteca de gerenciamento de estado minimalista e performática. Elimina a complexidade e boilerplate do Redux, viabilizando o Modo Demonstração e a sincronização reativa imediata de saldo entre todas as páginas."],
        ["**Autenticação & Banco**", "Firebase Auth & Cloud Firestore", "Serviço Serverless em nuvem do Google. O Auth elimina riscos de armazenamento incorreto de credenciais ao gerenciar hashes de senha seguros; o Firestore fornece banco NoSQL em tempo real com regras de segurança ativas no servidor."],
        ["**Backend & Camada BFF**", "Firebase Cloud Functions (Node 20 / TS)", "Funções Serverless que atuam como Backend-for-Frontend. Garantem que requisições às APIs da Pluggy, Brapi e CoinGecko sejam intermediadas em ambiente seguro sem expor credenciais privadas no código do cliente."],
        ["**APIs Externas Integradas**", "AwesomeAPI, CoinGecko & Brapi.dev", "Fornecem cotações de alta disponibilidade em tempo real para Bitcoin, Ethereum, moedas de câmbio internacional (USD/EUR) e ações negociadas na B3."],
        ["**Destino de Deploy & CI/CD**", "Vercel / Firebase Hosting + GitHub Actions", "O repositório está versionado e conectado à branch main no GitHub (https://github.com/TarsoRondon/finup). A aplicação está publicada e em produção na Vercel no endereço oficial: https://finup-chi.vercel.app, com distribuição global por CDN e certificado SSL/HTTPS automático gratuito."]
    ]
    t_stack = doc.add_table(rows=1, cols=3)
    format_table(t_stack, [Inches(1.5), Inches(1.8), Inches(3.6)], stack_headers, stack_data)

    # ==========================================
    # 9. INSTALAÇÃO E EXECUÇÃO
    # ==========================================
    add_section_heading("9", "Instalação e Execução")
    add_body("Esta seção fornece o guia completo e determinístico para clonar, configurar, importar o banco de dados e executar o FinUp localmente do zero em qualquer computador de avaliação, sem necessidade de suporte externo.")

    add_subheading("9.1 Ambiente")
    env_points = [
        ("Linguagem e Runtime", "Node.js v20.x ou superior (LTS recomendado: Node 20 / 22) e npm v10.x."),
        ("Servidor / Ambiente Local", "Servidor de desenvolvimento rápido do Vite (npm run dev) baseado em ES Modules."),
        ("Bibliotecas e Dependências", "Instaladas via npm install (inclui React 19, Lucide React, Zustand, TailwindCSS v4, Firebase SDK v11)."),
        ("Sistema Operacional Homologado", "Testado e validado em Windows 11 (PowerShell / Windows Terminal) e distribuições Linux baseadas em Debian/Ubuntu.")
    ]
    for l, d in env_points:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(1)
        p.paragraph_format.space_after = Pt(2)
        r1 = p.add_run(f"• {l}: ")
        r1.font.name = "Arial"
        r1.font.size = Pt(9.5)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_PRIMARY
        r2 = p.add_run(d)
        r2.font.name = "Arial"
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = COLOR_DARK

    add_subheading("9.2 Banco de Dados")
    db_points = [
        ("SGBD Compatível", "MySQL 8.0+, MariaDB 10.5+ ou PostgreSQL 14+ (para o modelo relacional de entrega da disciplina) e Google Cloud Firestore (para a instância cloud serverless em tempo real)."),
        ("Nome do Banco de Dados a Criar", "finup_db"),
        ("Caminho do Script SQL no Repositório", "database/schema.sql"),
        ("Como Executar o Script SQL (Terminal)", "mysql -u root -p -e 'CREATE DATABASE IF NOT EXISTS finup_db;' e em seguida mysql -u root -p finup_db < database/schema.sql"),
        ("Como Executar via Ferramenta Gráfica", "Abra o phpMyAdmin ou DBeaver, crie o banco finup_db e importe o arquivo database/schema.sql."),
        ("Dados Iniciais (Seed)", "O arquivo database/schema.sql já insere automaticamente o usuário de testes do avaliador (avaliador.ifro@finup.com), categorias financeiras padrão, transações com comprovantes Bacen, boletos com código de barras, cartões de crédito, metas e investimentos.")
    ]
    for l, d in db_points:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(1)
        p.paragraph_format.space_after = Pt(2)
        r1 = p.add_run(f"• {l}: ")
        r1.font.name = "Arial"
        r1.font.size = Pt(9.5)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_PRIMARY
        r2 = p.add_run(d)
        r2.font.name = "Arial"
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = COLOR_DARK

    add_subheading("Tabela Descritiva das Entidades do Banco de Dados:")
    db_table_headers = ["Tabela", "Campos Principais", "Chave Primária (PK)", "Relacionamentos (FK)"]
    db_table_data = [
        ["**usuarios**", "id, nome_completo, email, senha_hash, perfil, tema_preferido, data_cadastro", "id", "—"],
        ["**categorias**", "id, id_usuario, nome, tipo, icone, cor", "id", "id_usuario → usuarios.id"],
        ["**transacoes**", "id, id_usuario, id_categoria, descricao, valor, tipo, status, metodo_pagamento, autenticacao_bacen, data_registro", "id", "id_usuario → usuarios.id\nid_categoria → categorias.id"],
        ["**boletos**", "id, id_usuario, titulo, valor, vencimento, codigo_barras, status_pagamento, data_baixa", "id", "id_usuario → usuarios.id"],
        ["**cartoes**", "id, id_usuario, tipo_cartao, titular_nome, ultimos_digitos, limite_total, limite_usado, bloqueado, dia_fechamento, dia_vencimento", "id", "id_usuario → usuarios.id"],
        ["**metas**", "id, id_usuario, titulo, valor_alvo, valor_atual, data_prazo, icone_badge", "id", "id_usuario → usuarios.id"],
        ["**investimentos**", "id, id_usuario, ticker_ativo, tipo_ativo, quantidade, preco_medio, preco_mercado, data_aquisicao", "id", "id_usuario → usuarios.id"]
    ]
    t_dbtable = doc.add_table(rows=1, cols=4)
    format_table(t_dbtable, [Inches(1.2), Inches(2.7), Inches(1.2), Inches(1.8)], db_table_headers, db_table_data)

    add_subheading("9.3 Variáveis de Ambiente")
    add_body("O repositório contém o arquivo modelo .env.example. Para rodar localmente, copie-o para .env ou .env.local:")
    p_env = doc.add_paragraph()
    p_env.paragraph_format.space_before = Pt(4)
    p_env.paragraph_format.space_after = Pt(6)
    r_env = p_env.add_run(
"# Configurações do Firebase (Opcional para Modo Demo; Obrigatório para Login Firebase Nuvem)\n"
"VITE_FIREBASE_API_KEY=sua_api_key_aqui\n"
"VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com\n"
"VITE_FIREBASE_PROJECT_ID=seu-projeto\n"
"VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com\n"
"VITE_FIREBASE_MESSAGING_SENDER_ID=123456789\n"
"VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456\n\n"
"# APIs de Mercado Financeiro (Opcionais - o sistema possui fallback automático integrado)\n"
"VITE_BRAPI_TOKEN=seu_token_brapi\n"
"VITE_COINGECKO_API_KEY=sua_chave_coingecko"
    )
    r_env.font.name = "Consolas"
    r_env.font.size = Pt(8.5)
    r_env.font.color.rgb = COLOR_DARK

    add_body("Nota de Resiliência: Nenhuma chave real é necessária para a avaliação do professor. Caso as variáveis de nuvem não estejam preenchidas, o FinUp ativa automaticamente a camada de Mock Inteligente e o Modo Demonstração, permitindo testar 100% dos recursos sem falhas de rede.")

    add_subheading("9.4 Passo a Passo de Instalação e Execução")
    steps = [
        ("1. Clonar o Repositório do GitHub", "git clone https://github.com/TarsoRondon/finup.git"),
        ("2. Entrar no Diretório do Projeto", "cd finup"),
        ("3. Instalar as Dependências do Node", "npm install"),
        ("4. (Opcional) Importar o Banco de Dados Relacional", "mysql -u root -p -e 'CREATE DATABASE IF NOT EXISTS finup_db;' && mysql -u root -p finup_db < database/schema.sql"),
        ("5. Criar o Arquivo de Variáveis de Ambiente", "Copy-Item .env.example .env (PowerShell) ou cp .env.example .env (Linux/macOS)"),
        ("6. Iniciar o Servidor Local de Desenvolvimento", "npm run dev"),
        ("7. Acessar a Aplicação no Navegador", "Abra a URL exibida no terminal: http://localhost:5173")
    ]
    for st_title, st_cmd in steps:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(2)
        r1 = p.add_run(f"{st_title}: ")
        r1.font.name = "Arial"
        r1.font.size = Pt(9.5)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_PRIMARY
        r2 = p.add_run(st_cmd)
        r2.font.name = "Consolas"
        r2.font.size = Pt(9)
        r2.font.color.rgb = COLOR_ACCENT

    add_subheading("9.5 Como Testar o Sistema")
    add_body("A. Acesso Online (Sem Instalação) ou Local:")
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(3)
    p.add_run("• Link do Sistema Publicado: https://finup-chi.vercel.app (pode ser aberto diretamente em aba anônima no celular ou computador, sem instalar nada).\n"
              "• Ambiente Local: Caso execute localmente após o passo a passo, acesse http://localhost:5173.").font.size = Pt(9.5)

    add_body("B. Usuário de Teste / Avaliador:")
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(3)
    p.add_run("1. Ao carregar a tela inicial (online em https://finup-chi.vercel.app ou local em http://localhost:5173), clique no botão destacado 'Acesso Demo (Modo Demonstração)'.\n"
              "2. O sistema inicializa a sessão autenticada VIP pré-carregada do avaliador (avaliador.ifro@finup.com) com saldo inicial de R$ 12.450,00, sem exigir senhas de digitação.\n"
              "3. Se desejar testar a autenticação real por formulário, selecione a aba 'Entrar' e informe:\n"
              "   - E-mail: avaliador.ifro@finup.com\n"
              "   - Senha: Ifro@2026").font.size = Pt(9.5)

    add_body("C. Roteiro do Fluxo Principal de Testes:")
    tests_flow = [
        "1. Dashboard & Cotações: Visualize no topo as cotações em tempo real de Petrobras, Vale, Dólar e Bitcoin. Alterne entre os filtros de período e oculte o saldo com o ícone do 'olho'.",
        "2. Fluxo Pix com Comprovante (RF05/RF06): Acesse a aba 'Pix' no menu lateral. Digite uma chave Pix qualquer (ex.: CPF ou e-mail fictício) e um valor (ex.: R$ 250,00). Clique em 'Confirmar Envio Pix'. O saldo do dashboard é debitado imediatamente e um Comprovante Bacen com ID único de autenticação é exibido na tela, com botão de impressão.",
        "3. Liquidação de Boletos (RF08/RF09): Acesse a aba 'Boletos'. Localize o boleto pendente da Energisa RO e clique em 'Pagar Agora'. O sistema valida o código de barras, debita o valor do saldo em conta e altera o status para 'Pago', criando um lançamento correspondente no extrato.",
        "4. Cartões de Crédito (RF10/RF11): Acesse 'Cartões', clique em 'Bloquear Cartão' e veja o status alternar em tempo real. Clique em 'Pagar Fatura' para liquidar o limite utilizado e restaurar o crédito total disponível.",
        "5. Metas Financeiras (RF17): Acesse 'Metas' e clique no botão de aporte rápido + R$ 500. A barra de progresso da meta avança instantaneamente e o saldo corrente é debitado.",
        "6. Exportação de Extrato (RF14): Acesse a aba 'Transações' e clique no botão 'Exportar CSV'. O navegador baixa imediatamente a planilha com cabeçalhos em UTF-8 BOM compatível com Excel."
    ]
    for tf in tests_flow:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(1)
        p.paragraph_format.space_after = Pt(2)
        r = p.add_run(tf)
        r.font.name = "Arial"
        r.font.size = Pt(9.5)
        r.font.color.rgb = COLOR_DARK

    add_body("D. Problemas Conhecidos e Limitações:")
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(8)
    p.add_run("As conexões com APIs de bancos reais (Pluggy Open Finance) requerem credenciais ativas do sandbox da Pluggy no arquivo .env. Em ambiente local sem chaves ativas, o sistema opera em modo de contingência inteligente garantindo que nenhuma tela trave ou exiba erros 500 para o usuário.").font.size = Pt(9.5)

    # Box de Declaração de Conformidade Acadêmica
    t_decl = doc.add_table(rows=1, cols=1)
    t_decl.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_decl.columns[0].width = Inches(6.9)
    c_decl = t_decl.cell(0, 0)
    set_cell_background(c_decl, "F8FAFC")
    set_cell_margins(c_decl, top=140, bottom=140, left=180, right=180)
    tcPr = c_decl._tc.get_or_add_tcPr()
    tcBorders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'  <w:left w:val="single" w:sz="18" w:space="0" w:color="00A878"/>'
        f'  <w:top w:val="none"/><w:bottom w:val="none"/><w:right w:val="none"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(tcBorders)
    p_decl = c_decl.paragraphs[0]
    r_decl = p_decl.add_run(
        "Declaração de Conformidade Acadêmica:\n"
        "Documento elaborado e atualizado em total conformidade com a atividade avaliativa da disciplina de "
        "Desenvolvimento de Sistemas do IFRO Campus Porto Velho Calama, orientado pelo Prof. Rafael Pitwak, "
        "seguindo estritamente as diretrizes da apostila Programar com IA de Forma Responsável."
    )
    r_decl.font.name = "Arial"
    r_decl.font.size = Pt(9)
    r_decl.font.italic = True
    r_decl.font.color.rgb = COLOR_DARK

    doc.save(DOCX_PATH)
    print(f"Documento Word gerado com sucesso em: {DOCX_PATH}")

if __name__ == '__main__':
    build_docx()
