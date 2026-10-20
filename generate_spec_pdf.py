# -*- coding: utf-8 -*-
import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable, Preformatted
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

PDF_PATH = r"c:\Users\Aluno\Documents\Desenvolvimento\finup\spec.pdf"

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#00A878"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 755, "FINUP — ESPECIFICAÇÃO TÉCNICA DE SOFTWARE (ANEXO A)")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#7A7A75"))
            self.drawRightString(558, 755, "IFRO Calama · Prof. Rafael Pitwak")
            self.setStrokeColor(colors.HexColor("#E2E2DE"))
            self.setLineWidth(0.5)
            self.line(54, 747, 558, 747)

        # Footer
        self.setStrokeColor(colors.HexColor("#E2E2DE"))
        self.setLineWidth(0.5)
        self.line(54, 45, 558, 45)
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#7A7A75"))
        self.drawString(54, 32, "FinUp · GitHub: https://github.com/TarsoRondon/finup")
        self.drawRightString(558, 32, f"Página {self._pageNumber} de {page_count}")
        self.restoreState()

def build_pdf():
    doc = SimpleDocTemplate(
        PDF_PATH,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor("#121826"),
        alignment=0,
        spaceAfter=4
    )
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#00A878"),
        alignment=0,
        spaceAfter=14
    )
    h1_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor("#0D1F2D"),
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )
    h2_style = ParagraphStyle(
        'SubSectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor("#00A878"),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )
    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=colors.HexColor("#2B2D42"),
        spaceAfter=6
    )
    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=colors.HexColor("#2B2D42"),
        spaceAfter=4
    )
    callout_style = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=13,
        textColor=colors.HexColor("#1A202C")
    )
    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7,
        leading=9.5,
        textColor=colors.HexColor("#1A202C")
    )
    table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=colors.HexColor("#1A202C")
    )
    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11.5,
        textColor=colors.HexColor("#1A202C")
    )
    table_cell_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=colors.white
    )

    story = []

    # Title & Subtitle
    story.append(Paragraph("FinUp — Especificação Técnica de Software", title_style))
    story.append(Paragraph("Modelo Oficial de Avaliação (Anexo A) · Metodologia Spec-Driven Development", subtitle_style))

    # Metadata Banner
    meta_data = [
        [
            Paragraph("<b>Repositório Oficial no GitHub:</b> <font color='#0066cc'><u>https://github.com/TarsoRondon/finup</u></font><br/>"
                      "<b>Instituição:</b> Instituto Federal de Rondônia (IFRO) — Campus Porto Velho Calama<br/>"
                      "<b>Componente Curricular:</b> Desenvolvimento de Sistemas | <b>Docente:</b> Prof. Rafael Pitwak<br/>"
                      "<b>Aluno / Desenvolvedor:</b> Tarso Rondon | <b>Data de Atualização:</b> Outubro / 2026", callout_style)
        ]
    ]
    t_meta = Table(meta_data, colWidths=[504])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F0FDF4")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#00A878")),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 12))

    # 1. Objetivo
    story.append(Paragraph("1. Objetivo", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#00A878"), spaceAfter=8))
    p1 = (
        "O <b>FinUp</b> é uma plataforma web desenvolvida para pessoas físicas e investidores que necessitam centralizar "
        "a gestão do orçamento pessoal, o acompanhamento patrimonial e operações financeiras cotidianas em um único ambiente seguro. "
        "O sistema unifica dados de contas bancárias via Open Finance oficial, permite emissão e recebimento de Pix com comprovante autenticado, "
        "controle de cartões e faturas, quitação de boletos com simulação de código de barras, cotações de mercado ao vivo (B3, criptomoedas e câmbio) "
        "e diagnósticos com Inteligência Artificial contextual, eliminando planilhas manuais dispersas e o uso simultâneo de múltiplos aplicativos bancários."
    )
    story.append(Paragraph(p1, body_style))
    story.append(Spacer(1, 8))

    # 2. Usuários
    story.append(Paragraph("2. Usuários", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#00A878"), spaceAfter=8))
    users_data = [
        [Paragraph("Tipo de Usuário", table_cell_header), Paragraph("Permissões e Ações Associadas no Sistema", table_cell_header)],
        [
            Paragraph("<b>Usuário Titular</b><br/>(Pessoa Física / Cliente)", table_cell_bold),
            Paragraph("Cadastra-se na plataforma, efetua login com e-mail/senha ou Google Auth, recupera senha via e-mail e acessa o painel financeiro. Pode realizar e simular operações Pix (com validação de saldo e emissão de comprovante oficial Bacen), simular transferências TED/DOC, gerenciar boletos com baixa automática, controlar cartões físicos e virtuais (bloqueio temporário e quitação de fatura), cadastrar transações manuais, criar metas financeiras com aportes rápidos, acompanhar cotações e consultar o assistente FinUp IA.", table_cell)
        ],
        [
            Paragraph("<b>Usuário Convidado</b><br/>(Modo Demonstração / Avaliador)", table_cell_bold),
            Paragraph("Acessa instantaneamente o sistema com um único clique ('Acesso Demo'), sem necessidade de preencher formulário de cadastro ou autenticar credenciais no Firebase. Possui permissão de visualização e teste interativo completo de todas as 15 telas, transações pré-carregadas, simulação de Pix, liquidação de faturas de teste e restauração dos dados padrão.", table_cell)
        ],
        [
            Paragraph("<b>Sistema / Backend</b><br/>(Cloud Functions & BFF)", table_cell_bold),
            Paragraph("Rotinas automatizadas de backend responsáveis por intermediar requisições para APIs parceiras externas (Pluggy, BRAPI, CoinGecko, AwesomeAPI), garantindo sigilo de chaves secretas. Executa normalização de extratos bancários, aplica validações de segurança e garante o isolamento multi-tenant dos dados nas regras de acesso do banco.", table_cell)
        ]
    ]
    t_users = Table(users_data, colWidths=[130, 374])
    t_users.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#00A878")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_users)
    story.append(Spacer(1, 10))

    # 3. Casos de Uso Principais
    story.append(Paragraph("3. Casos de Uso Principais", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#00A878"), spaceAfter=8))
    uc_data = [
        [Paragraph("ID", table_cell_header), Paragraph("Caso de Uso", table_cell_header), Paragraph("Ator", table_cell_header), Paragraph("Descrição Sucinta", table_cell_header), Paragraph("Requisitos", table_cell_header)],
        [Paragraph("<b>UC01</b>", table_cell), Paragraph("Autenticar e Gerenciar Acesso", table_cell), Paragraph("Titular / Convidado", table_cell), Paragraph("Criar conta, autenticar via E-mail/Senha ou Google, recuperar senha ou acessar Modo Demo 1-clique.", table_cell), Paragraph("RF01, RF02, RF03, RF04", table_cell)],
        [Paragraph("<b>UC02</b>", table_cell), Paragraph("Operar Área Pix 24/7", table_cell), Paragraph("Titular", table_cell), Paragraph("Enviar transferências Pix com débito em conta, simular recebimento e emitir comprovante autenticado.", table_cell), Paragraph("RF05, RF06", table_cell)],
        [Paragraph("<b>UC03</b>", table_cell), Paragraph("Realizar Transferências TED/DOC", table_cell), Paragraph("Titular", table_cell), Paragraph("Preencher dados do destinatário em etapas, validar saldo disponível e emitir recibo.", table_cell), Paragraph("RF07", table_cell)],
        [Paragraph("<b>UC04</b>", table_cell), Paragraph("Gerenciar e Pagar Boletos", table_cell), Paragraph("Titular", table_cell), Paragraph("Listar títulos a vencer, validar código de barras (44/48 dígitos), pagar e registrar baixa automática.", table_cell), Paragraph("RF08, RF09", table_cell)],
        [Paragraph("<b>UC05</b>", table_cell), Paragraph("Controlar Cartões e Faturas", table_cell), Paragraph("Titular", table_cell), Paragraph("Visualizar dados com máscara segura, copiar cartão virtual, bloquear/desbloquear e quitar fatura.", table_cell), Paragraph("RF10, RF11", table_cell)],
        [Paragraph("<b>UC06</b>", table_cell), Paragraph("Gerenciar Extrato e Transações", table_cell), Paragraph("Titular", table_cell), Paragraph("Listar histórico com filtros de tipo/categoria, cadastrar lançamentos manuais e exportar CSV.", table_cell), Paragraph("RF12, RF13, RF14", table_cell)],
        [Paragraph("<b>UC07</b>", table_cell), Paragraph("Acompanhar Carteira e Cotações", table_cell), Paragraph("Titular", table_cell), Paragraph("Consultar cotações ao vivo de B3, criptoativos e moedas, calculando preço médio e rentabilidade.", table_cell), Paragraph("RF15, RF16", table_cell)],
        [Paragraph("<b>UC08</b>", table_cell), Paragraph("Gerenciar Metas e Orçamento", table_cell), Paragraph("Titular", table_cell), Paragraph("Criar metas com prazo e valor alvo, realizar aportes rápidos e acompanhar limites por categoria.", table_cell), Paragraph("RF17", table_cell)],
        [Paragraph("<b>UC09</b>", table_cell), Paragraph("Consultar Assistente FinUp IA", table_cell), Paragraph("Titular", table_cell), Paragraph("Receber diagnósticos inteligentes sobre saldo, boletos pendentes e dicas de contenção de gastos.", table_cell), Paragraph("RF18", table_cell)],
        [Paragraph("<b>UC10</b>", table_cell), Paragraph("Emitir Relatórios Analíticos", table_cell), Paragraph("Titular", table_cell), Paragraph("Visualizar gráficos analíticos, taxa de poupança mensal e imprimir relatórios A4 limpos sem menus.", table_cell), Paragraph("RF19, RF20", table_cell)]
    ]
    t_uc = Table(uc_data, colWidths=[36, 110, 78, 206, 74])
    t_uc.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#00A878")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_uc)
    story.append(Spacer(1, 10))

    # Page Break for clean sectioning
    story.append(PageBreak())

    # 4. Requisitos Funcionais
    story.append(Paragraph("4. Requisitos Funcionais (RF)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#00A878"), spaceAfter=8))
    rfs = [
        ("RF01", "Cadastro de Usuário", "O sistema deve permitir o cadastro de novos usuários informando nome completo, e-mail válido e senha com no mínimo 6 caracteres e ao menos um número."),
        ("RF02", "Autenticação e Login", "O sistema deve permitir login seguro por e-mail e senha cadastrados ou autenticação federada com Google OAuth 2.0."),
        ("RF03", "Recuperação de Senha", "O sistema deve fornecer opção de recuperação de conta, enviando link de redefinição de senha para o e-mail informado."),
        ("RF04", "Modo Demonstração (Convidado)", "O sistema deve oferecer acesso instantâneo em 1 clique ('Acesso Demo') pré-carregando dados fictícios completos para auditoria sem login prévio."),
        ("RF05", "Envio de Pix com Débito Imediato", "O sistema deve validar se o saldo em conta é suficiente antes de enviar um Pix, debitar o montante em tempo real e registrar a movimentação no extrato."),
        ("RF06", "Comprovante Autenticado de Pix", "O sistema deve gerar um comprovante detalhado para cada Pix concluído contendo código de autenticação Bacen, data/hora, chave/favorecido e botão para impressão ou cópia."),
        ("RF07", "Transferências TED/DOC", "O sistema deve permitir transferências interbancárias em etapas com seleção de banco de destino (BB, Bradesco, Itaú, Nubank, Inter, Caixa), agência, conta e favorecido."),
        ("RF08", "Consulta e Alertas de Boletos", "O sistema deve listar contas a pagar separando pendentes e quitadas, sinalizando alertas visuais em boletos com vencimento próximo."),
        ("RF09", "Liquidação de Boletos", "O sistema deve validar código de barras de 44 ou 48 dígitos, debitar o valor do saldo em conta e alterar o status do título para 'pago'."),
        ("RF10", "Gestão de Cartões de Crédito", "O sistema deve exibir cartões físicos e virtuais do cliente com limite total, limite utilizado e número com máscara de segurança com botão de cópia."),
        ("RF11", "Bloqueio e Pagamento de Fatura", "O sistema deve permitir bloquear/desbloquear o cartão em 1 clique e pagar o valor da fatura utilizada, restabelecendo o limite original."),
        ("RF12", "Extrato Financeiro Filtrável", "O sistema deve exibir todas as entradas e saídas com busca textual e filtros rápidos por tipo (receitas, despesas, Pix, boletos) e por categoria."),
        ("RF13", "Lançamento Manual de Transações", "O usuário deve conseguir cadastrar movimentações financeiras avulsas informando descrição, valor, data, tipo e categoria (Alimentação, Moradia, Salário, etc.)."),
        ("RF14", "Exportação de Extrato em CSV", "O sistema deve gerar e baixar arquivo .csv codificado em UTF-8 BOM com todas as transações filtradas para compatibilidade nativa com Microsoft Excel."),
        ("RF15", "Cotações de Mercado em Tempo Real", "O sistema deve exibir ticker no topo com preços e variações 24h atualizados de Bitcoin, Ethereum, Dólar, Euro e ações da B3 (PETR4, VALE3, ITUB4)."),
        ("RF16", "Carteira de Investimentos", "O sistema deve listar ativos em custódia calculando posição total, preço médio de compra, rentabilidade nominal em reais e percentual acumulado."),
        ("RF17", "Metas Financeiras e Aportes", "O sistema deve permitir o acompanhamento de metas com barras de progresso percentuais e botões de aporte rápido (+R$ 100, +R$ 500) debitados do saldo."),
        ("RF18", "Assistente FinUp IA Contextual", "O sistema deve disponibilizar interface de chat inteligente capaz de ler o saldo atual, total de boletos e histórico de gastos para fornecer diagnósticos financeiros."),
        ("RF19", "Relatórios Analíticos e Poupança", "O sistema deve calcular automaticamente a taxa de poupança mensal ((Receitas - Despesas) / Receitas) * 100 e apresentar gráficos de pizza por categoria."),
        ("RF20", "Impressão de Relatórios Contábeis", "O sistema deve disponibilizar formatação de impressão (@media print) que oculta menus laterais e botões, gerando uma folha A4 limpa para emissão em PDF.")
    ]
    for rfid, name, desc in rfs:
        story.append(Paragraph(f"<b>[{rfid}] {name}:</b> {desc}", bullet_style))
    story.append(Spacer(1, 10))

    # 5. Requisitos Não Funcionais
    story.append(Paragraph("5. Requisitos Não Funcionais (RNF)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#00A878"), spaceAfter=8))
    rnfs = [
        ("RNF01", "Proteção Criptográfica de Senhas (Hash Seguro)", "As senhas dos usuários jamais devem ser armazenadas em texto puro (plain text). A gestão de credenciais é delegada ao Firebase Authentication, que utiliza algoritmos de hash modernos com salt (Scrypt/PBKDF2)."),
        ("RNF02", "Validação no Servidor e BFF", "Todos os formulários e transações financeiras críticas devem ser validados pelo servidor/Cloud Functions e regras do Firestore, impedindo submissão de valores negativos, caracteres maliciosos ou payloads adulterados."),
        ("RNF03", "Isolamento Multi-Tenancy (Segurança no Banco)", "O acesso aos dados no Firestore é estritamente controlado por regras de segurança (firestore.rules), garantindo que um usuário autenticado só possa ler e gravar em coleções onde request.auth.uid == userId."),
        ("RNF04", "Ocultação de Segredos de API", "Nenhuma chave secreta com privilégios de gravação ou tokens de parceiros (ex.: PLUGGY_CLIENT_SECRET) pode ser embutida no frontend. Todas as requisições a serviços externos trafegam via Cloud Functions atuando como BFF."),
        ("RNF05", "Comunicação Segura (TLS/HTTPS)", "Todas as trocas de informação entre navegador, serviços de backend e APIs de mercado devem trafegar obrigatoriamente sob protocolo HTTPS com criptografia TLS 1.3 / SSL 256-bit."),
        ("RNF06", "Desempenho e Responsividade", "A aplicação deve apresentar First Contentful Paint (FCP) inferior a 1,5 segundos em conexões 4G padrão e ser totalmente utilizável em telas móveis a partir de 320px de largura e desktops de alta resolução."),
        ("RNF07", "Persistência Local e Resiliência", "Os estados de sessão, transações e preferências visuais contam com persistência em armazenamento local do cliente (Zustand com LocalStorage), permitindo navegação fluida e recarga rápida da página.")
    ]
    for rnfid, name, desc in rnfs:
        story.append(Paragraph(f"<b>[{rnfid}] {name}:</b> {desc}", bullet_style))
    story.append(Spacer(1, 10))

    # Page Break for Data Model & Criteria
    story.append(PageBreak())

    # 6. Modelo de Dados (DER Simplificado)
    story.append(Paragraph("6. Modelo de Dados (DER Simplificado)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#00A878"), spaceAfter=8))
    story.append(Paragraph("O modelo relacional lógico do banco de dados (implementado no Cloud Firestore em coleções subordinadas ao identificador do usuário <code>users/{userId}</code>) garante integridade referencial por chaves primárias e estrangeiras:", body_style))
    
    der_ascii = (
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
    t_der = Table([[Preformatted(der_ascii, code_style)]], colWidths=[504])
    t_der.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_der)
    story.append(Spacer(1, 6))

    der_desc = (
        "<b>Relacionamentos e Chaves Estrangeiras (FK):</b><br/>"
        "• <b>USUARIOS (1) ── (N) TRANSACOES:</b> Vinculadas por <code>id_usuario</code>.<br/>"
        "• <b>USUARIOS (1) ── (N) BOLETOS:</b> Contas a pagar associadas via <code>id_usuario</code>.<br/>"
        "• <b>USUARIOS (1) ── (N) CARTOES:</b> Cartões físicos/virtuais vinculados por <code>id_usuario</code>.<br/>"
        "• <b>USUARIOS (1) ── (N) METAS:</b> Objetivos de economia pertencentes a <code>id_usuario</code>.<br/>"
        "• <b>USUARIOS (1) ── (N) INVESTIMENTOS:</b> Ativos custodiados associados por <code>id_usuario</code>."
    )
    story.append(Paragraph(der_desc, bullet_style))
    story.append(Spacer(1, 10))

    # 7. Critérios de Aceite
    story.append(Paragraph("7. Critérios de Aceite (Gherkin BDD)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#00A878"), spaceAfter=8))
    cas = [
        ("CA01 — Cadastro de Usuário e Validação de Senha (RF01)",
         "<b>Dado que</b> o visitante está no modal de autenticação e seleciona 'Criar Conta';<br/>"
         "<b>Quando</b> preenche um nome, e-mail válido e uma senha com menos de 6 caracteres;<br/>"
         "<b>Então</b> o sistema desabilita o avanço e exibe o indicador visual de que a senha requer no mínimo 6 dígitos e números."),
        ("CA02 — Autenticação de Usuário e Modo Demonstração (RF02, RF04)",
         "<b>Dado que</b> o avaliador ou usuário clica no botão 'Acesso Demo (Modo Demonstração)';<br/>"
         "<b>Quando</b> a ação é disparada;<br/>"
         "<b>Então</b> o sistema inicializa uma sessão autenticada VIP sem exigir credenciais, redireciona para o Dashboard e exibe a badge '● Modo Demonstração' ativa."),
        ("CA03 — Envio de Pix com Saldo Suficiente e Emissão de Comprovante (RF05, RF06)",
         "<b>Dado que</b> o usuário possui saldo disponível de R$ 5.000,00 e informa uma chave Pix com valor de R$ 350,00;<br/>"
         "<b>Quando</b> clica no botão 'Confirmar Envio Pix';<br/>"
         "<b>Então</b> o saldo é atualizado imediatamente para R$ 4.650,00, um toast verde de sucesso surge na tela e o comprovante com código de autenticação único é exibido com opção de impressão."),
        ("CA04 — Bloqueio de Operação por Saldo Insuficiente (RF05, RF07)",
         "<b>Dado que</b> o usuário possui saldo de R$ 100,00 e tenta enviar um Pix ou TED de R$ 300,00;<br/>"
         "<b>Quando</b> submete o formulário;<br/>"
         "<b>Então</b> a operação é bloqueada, o saldo permanece inalterado em R$ 100,00 e um alerta vermelho de 'Saldo Insuficiente' é exibido."),
        ("CA05 — Baixa e Liquidação de Boleto Bancário (RF08, RF09)",
         "<b>Dado que</b> existe um boleto com status 'Pendente' no valor de R$ 99,90 e o usuário possui saldo suficiente;<br/>"
         "<b>Quando</b> clica no botão 'Pagar Agora' do boleto;<br/>"
         "<b>Então</b> o sistema debita R$ 99,90 do saldo, altera o status do boleto para 'Pago' e insere a movimentação no histórico de transações."),
        ("CA06 — Bloqueio e Pagamento de Fatura de Cartão (RF10, RF11)",
         "<b>Dado que</b> o usuário visualiza um cartão de crédito com limite utilizado de R$ 350,00 e possui saldo em conta;<br/>"
         "<b>Quando</b> clica em 'Pagar Fatura';<br/>"
         "<b>Então</b> o sistema debita os R$ 350,00 do saldo corrente, zera o limite utilizado e exibe toast de confirmação de limite restabelecido."),
        ("CA07 — Lançamento Manual e Exportação de Extrato em CSV (RF12, RF13, RF14)",
         "<b>Dado que</b> o usuário preenche a inclusão de uma receita manual de 'Consultoria' de R$ 800,00 e clica em 'Salvar';<br/>"
         "<b>Quando</b> a transação é inserida e o usuário clica em 'Exportar CSV';<br/>"
         "<b>Então</b> a transação surge no topo do extrato e o navegador inicia o download do arquivo .csv codificado em UTF-8 BOM."),
        ("CA08 — Cálculo Percentual e Aporte em Metas (RF17)",
         "<b>Dado que</b> o usuário possui uma meta de R$ 10.000,00 com R$ 7.000,00 acumulados (70%);<br/>"
         "<b>Quando</b> clica no botão de aporte rápido '+ R$ 500';<br/>"
         "<b>Então</b> o sistema debita R$ 500,00 do saldo disponível, atualiza o saldo da meta para R$ 7.500,00 e a barra de progresso avança para 75%.")
    ]
    for catitle, cadesc in cas:
        story.append(Paragraph(f"<b>{catitle}</b>", h2_style))
        story.append(Paragraph(cadesc, bullet_style))
    story.append(Spacer(1, 10))

    # Page Break for Stack & Deploy
    story.append(PageBreak())

    # 8. Decisão de Stack e Deploy
    story.append(Paragraph("8. Decisão de Stack Tecnológico e Deploy", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#00A878"), spaceAfter=8))
    stack_data = [
        [Paragraph("Camada", table_cell_header), Paragraph("Tecnologia Selecionada", table_cell_header), Paragraph("Justificativa Técnica e Compatibilidade de Deploy", table_cell_header)],
        [
            Paragraph("<b>Frontend Core</b>", table_cell_bold),
            Paragraph("React 19 + TypeScript + Vite 8", table_cell),
            Paragraph("Renderização SPA com Virtual DOM eficiente, modularização por componentes reutilizáveis, tipagem estática que previne erros em tempo de compilação e bundler Vite com compilação instantânea. Totalmente estático e 100% compatível com Vercel Edge Network e Firebase Hosting.", table_cell)
        ],
        [
            Paragraph("<b>Estilização & UI</b>", table_cell_bold),
            Paragraph("TailwindCSS v4 + Vanilla CSS", table_cell),
            Paragraph("Estilização utilitária de alto desempenho sem overhead de runtime, suporte nativo a temas escuros, flexbox/grid responsivo e regras específicas para impressão limpa de documentos fiscais (@media print).", table_cell)
        ],
        [
            Paragraph("<b>Gerenciamento de Estado</b>", table_cell_bold),
            Paragraph("Zustand (com Persist)", table_cell),
            Paragraph("Biblioteca minimalista e performática. Elimina a complexidade do Redux, viabilizando o Modo Demonstração e a sincronização reativa imediata de saldo entre todas as páginas.", table_cell)
        ],
        [
            Paragraph("<b>Autenticação & Banco</b>", table_cell_bold),
            Paragraph("Firebase Auth & Cloud Firestore", table_cell),
            Paragraph("Serviço Serverless em nuvem do Google. O Auth elimina riscos de armazenamento incorreto de credenciais ao gerenciar hashes de senha seguros; o Firestore fornece banco NoSQL em tempo real com regras de segurança ativas no servidor.", table_cell)
        ],
        [
            Paragraph("<b>Backend & BFF</b>", table_cell_bold),
            Paragraph("Firebase Cloud Functions (Node 20 / TS)", table_cell),
            Paragraph("Funções Serverless que atuam como Backend-for-Frontend. Garantem que requisições às APIs da Pluggy, Brapi e CoinGecko sejam intermediadas em ambiente seguro sem expor credenciais privadas no código do cliente.", table_cell)
        ],
        [
            Paragraph("<b>APIs de Mercado</b>", table_cell_bold),
            Paragraph("AwesomeAPI, CoinGecko & Brapi", table_cell),
            Paragraph("Fornecem cotações de alta disponibilidade em tempo real para Bitcoin, Ethereum, moedas de câmbio internacional (USD/EUR) e ações negociadas na B3.", table_cell)
        ],
        [
            Paragraph("<b>Deploy & CI/CD</b>", table_cell_bold),
            Paragraph("Vercel / Firebase Hosting + GitHub Actions", table_cell),
            Paragraph("Repositório versionado e conectado à branch main no GitHub (<font color='#0066cc'><u>https://github.com/TarsoRondon/finup</u></font>). O deploy compila o frontend estático via 'npm run build' gerando distribuição global por CDN com certificado SSL/HTTPS automático gratuito.", table_cell)
        ]
    ]
    t_stack = Table(stack_data, colWidths=[110, 120, 274])
    t_stack.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#00A878")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_stack)
    story.append(Spacer(1, 14))

    # Page Break for Section 9: Instalação e Execução
    story.append(PageBreak())

    # 9. Instalação e Execução
    story.append(Paragraph("9. Instalação e Execução", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#00A878"), spaceAfter=8))
    story.append(Paragraph("Guia determinístico para clonar, configurar o banco de dados e executar o FinUp localmente do zero:", body_style))

    # 9.1 Ambiente
    story.append(Paragraph("9.1 Ambiente de Desenvolvimento", h2_style))
    env_items = [
        "<b>Linguagem e Runtime:</b> Node.js v20.x ou superior (LTS recomendado: Node 20 / 22) e npm v10.x.",
        "<b>Servidor / Ambiente Local:</b> Servidor de desenvolvimento rápido do Vite (<code>npm run dev</code>).",
        "<b>Bibliotecas e Dependências:</b> Instaladas via <code>npm install</code> (React 19, Zustand, Tailwind v4, Firebase SDK).",
        "<b>Sistema Operacional Homologado:</b> Windows 11 (PowerShell) e distribuições Linux (Debian / Ubuntu / macOS)."
    ]
    for it in env_items:
        story.append(Paragraph(f"• {it}", bullet_style))
    story.append(Spacer(1, 6))

    # 9.2 Banco de Dados
    story.append(Paragraph("9.2 Banco de Dados e Script SQL", h2_style))
    db_items = [
        "<b>SGBD Compatível:</b> MySQL 8.0+, MariaDB 10.5+ ou PostgreSQL 14+ (relacional) e Google Cloud Firestore (nuvem).",
        "<b>Nome do Banco de Dados:</b> <code>finup_db</code>",
        "<b>Caminho do Script SQL no Repositório:</b> <code>database/schema.sql</code>",
        "<b>Comando de Importação (Terminal):</b> <code>mysql -u root -p finup_db &lt; database/schema.sql</code> (ou via phpMyAdmin / DBeaver).",
        "<b>Dados Iniciais (Seed):</b> O script SQL <b>já insere automaticamente</b> o usuário avaliador (<code>avaliador.ifro@finup.com</code>), categorias, transações, boletos com código de barras, cartões e investimentos."
    ]
    for it in db_items:
        story.append(Paragraph(f"• {it}", bullet_style))
    story.append(Spacer(1, 6))

    # Tabela descritiva de entidades
    db_table_data = [
        [Paragraph("Tabela", table_cell_header), Paragraph("Campos Principais", table_cell_header), Paragraph("Chave Primária", table_cell_header), Paragraph("Relacionamentos (FK)", table_cell_header)],
        [Paragraph("<b>usuarios</b>", table_cell_bold), Paragraph("id, nome_completo, email, senha_hash, perfil, tema_preferido", table_cell), Paragraph("id", table_cell), Paragraph("—", table_cell)],
        [Paragraph("<b>categorias</b>", table_cell_bold), Paragraph("id, id_usuario, nome, tipo, icone, cor", table_cell), Paragraph("id", table_cell), Paragraph("id_usuario → usuarios.id", table_cell)],
        [Paragraph("<b>transacoes</b>", table_cell_bold), Paragraph("id, id_usuario, id_categoria, descricao, valor, tipo, status", table_cell), Paragraph("id", table_cell), Paragraph("id_usuario → usuarios.id<br/>id_categoria → categorias.id", table_cell)],
        [Paragraph("<b>boletos</b>", table_cell_bold), Paragraph("id, id_usuario, titulo, valor, vencimento, codigo_barras, status", table_cell), Paragraph("id", table_cell), Paragraph("id_usuario → usuarios.id", table_cell)],
        [Paragraph("<b>cartoes</b>", table_cell_bold), Paragraph("id, id_usuario, tipo_cartao, ultimos_digitos, limite_total, limite_usado", table_cell), Paragraph("id", table_cell), Paragraph("id_usuario → usuarios.id", table_cell)],
        [Paragraph("<b>metas</b>", table_cell_bold), Paragraph("id, id_usuario, titulo, valor_alvo, valor_atual, data_prazo", table_cell), Paragraph("id", table_cell), Paragraph("id_usuario → usuarios.id", table_cell)],
        [Paragraph("<b>investimentos</b>", table_cell_bold), Paragraph("id, id_usuario, ticker_ativo, tipo_ativo, quantidade, preco_medio", table_cell), Paragraph("id", table_cell), Paragraph("id_usuario → usuarios.id", table_cell)]
    ]
    t_dbtable = Table(db_table_data, colWidths=[70, 204, 80, 150])
    t_dbtable.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#00A878")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('PADDING', (0,0), (-1,-1), 3.5),
    ]))
    story.append(t_dbtable)
    story.append(Spacer(1, 8))

    # 9.3 Variáveis de Ambiente
    story.append(Paragraph("9.3 Variáveis de Ambiente (.env.example)", h2_style))
    story.append(Paragraph("O repositório contém o arquivo modelo <code>.env.example</code>. O sistema possui contingência automática: caso o avaliador execute sem preencher credenciais externas, o FinUp ativa a camada inteligente de mock e o Modo Demonstração sem gerar falhas.", body_style))

    # 9.4 Passo a Passo
    story.append(Paragraph("9.4 Passo a Passo de Instalação", h2_style))
    steps = [
        "<b>1. Clonar repositório:</b> <code>git clone https://github.com/TarsoRondon/finup.git</code>",
        "<b>2. Entrar na pasta:</b> <code>cd finup</code>",
        "<b>3. Instalar dependências:</b> <code>npm install</code>",
        "<b>4. Importar banco de dados:</b> <code>mysql -u root -p finup_db &lt; database/schema.sql</code>",
        "<b>5. Copiar variáveis de ambiente:</b> <code>cp .env.example .env</code> (ou Copy-Item no PowerShell)",
        "<b>6. Iniciar servidor:</b> <code>npm run dev</code>",
        "<b>7. Acessar no navegador:</b> <code>http://localhost:5173</code>"
    ]
    for st in steps:
        story.append(Paragraph(st, bullet_style))
    story.append(Spacer(1, 6))

    # 9.5 Como Testar
    story.append(Paragraph("9.5 Como Testar o Sistema", h2_style))
    test_info = (
        "• <b>Usuário de Teste / Avaliador:</b> Clique no botão <b>'Acesso Demo (Modo Demonstração)'</b> para login VIP instantâneo com dados pré-carregados, ou informe <code>avaliador.ifro@finup.com</code> / senha <code>Ifro@2026</code>.<br/>"
        "• <b>Roteiro de Validação do Fluxo Principal:</b><br/>"
        "&nbsp;&nbsp;1. <b>Dashboard:</b> Verifique o ticker de cotações ao vivo (PETR4, VALE3, BTC, USD).<br/>"
        "&nbsp;&nbsp;2. <b>Pix 24/7:</b> Envie um Pix de R$ 250 e confirme o débito e a emissão do Comprovante Bacen com ID único.<br/>"
        "&nbsp;&nbsp;3. <b>Boletos:</b> Pague o boleto da <i>Energisa RO</i> e veja a quitação em tempo real.<br/>"
        "&nbsp;&nbsp;4. <b>Cartões:</b> Bloqueie o cartão virtual em 1 clique e quite a fatura restabelecendo o limite.<br/>"
        "&nbsp;&nbsp;5. <b>Metas:</b> Realize um aporte rápido de +R$ 500 e veja a barra percentual avançar.<br/>"
        "&nbsp;&nbsp;6. <b>Extrato:</b> Clique em 'Exportar CSV' para baixar a planilha UTF-8 formatada para Excel.<br/>"
        "• <b>Limitações Conhecidas:</b> O Open Finance bancário direto utiliza dados sandbox; sem chaves no .env, o sistema opera em contingência transparente."
    )
    story.append(Paragraph(test_info, bullet_style))
    story.append(Spacer(1, 10))

    # Concluding Note
    concl_data = [
        [
            Paragraph("<b>Declaração de Conformidade Acadêmica:</b><br/>"
                      "Documento elaborado e atualizado em total conformidade com a atividade avaliativa da disciplina "
                      "de Desenvolvimento de Sistemas do IFRO Campus Porto Velho Calama, orientado pelo Prof. Rafael Pitwak, "
                      "seguindo estritamente as diretrizes da apostila <i>Programar com IA de Forma Responsável</i>.", callout_style)
        ]
    ]
    t_concl = Table(concl_data, colWidths=[504])
    t_concl.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_concl)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated at: {PDF_PATH}")

if __name__ == '__main__':
    build_pdf()
