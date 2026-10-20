# -*- coding: utf-8 -*-
import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

PDF_PATH = r"c:\Users\Aluno\Documents\Desenvolvimento\finup\FINUP_RELATORIO_TELAS_E_SISTEMA.pdf"

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
            self.drawString(54, 755, "FINUP — CATÁLOGO OFICIAL DE TELAS & SISTEMA COMPLETO")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#7A7A75"))
            self.drawRightString(558, 755, "IFRO Calama · 2026")
            self.setStrokeColor(colors.HexColor("#E2E2DE"))
            self.setLineWidth(0.5)
            self.line(54, 747, 558, 747)

        # Footer
        self.setStrokeColor(colors.HexColor("#E2E2DE"))
        self.setLineWidth(0.5)
        self.line(54, 45, 558, 45)
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#7A7A75"))
        self.drawString(54, 32, "FinUp: Gestão Financeira Inteligente, Open Finance & IA")
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
        fontSize=24,
        leading=28,
        textColor=colors.HexColor('#111111'),
        spaceAfter=6
    )
    
    subtitle_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#00A878'),
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=colors.HexColor('#111111'),
        spaceBefore=14,
        spaceAfter=6
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#006B52'),
        spaceBefore=10,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#222222'),
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#333333'),
        leftIndent=15,
        spaceAfter=3
    )

    badge_style = ParagraphStyle(
        'Badge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor('#006B52')
    )

    story = []

    # ==================== CAPA / CABEÇALHO ====================
    story.append(Paragraph("💎 FinUp — Documentação Oficial & Catálogo de Telas", title_style))
    story.append(Paragraph("<b>Relatório Executivo de Arquitetura, Engenharia de Software e Demonstração Completa</b>", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#00A878'), spaceAfter=14))

    meta_data = [
        [Paragraph("<b>Desenvolvedor:</b> Tarso Rondon", body_style), Paragraph("<b>Instituição:</b> IFRO — Campus Calama", body_style)],
        [Paragraph("<b>Orientador:</b> Prof. Rafael Pitwak", body_style), Paragraph("<b>Ano / Versão:</b> 2026 · Versão 2.4 Enterprise", body_style)],
        [Paragraph("<b>Stack:</b> React 19, TypeScript, Vite, TailwindCSS v4", body_style), Paragraph("<b>Backend & BD:</b> Firebase Auth, Firestore & Cloud Functions", body_style)]
    ]
    meta_table = Table(meta_data, colWidths=[250, 250])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F4FAF7')),
        ('PADDING', (0,0), (-1,-1), 6),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#C2E5D8')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E2DE')),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 14))

    # ==================== 1. RESUMO DO SISTEMA ====================
    story.append(Paragraph("1. Resumo Executivo do Sistema Construído", h1_style))
    story.append(Paragraph(
        "O <b>FinUp</b> é uma plataforma digital financeira de alta fidelidade desenvolvida para eliminar a fragmentação "
        "bancária e o descontrole orçamentário. O sistema unifica dados e fluxos de conta corrente, transferências instantâneas Pix, "
        "pagamento de boletos por código de barras, cartões virtuais, cotações de mercado financeiro em tempo real e um "
        "assistente conversacional com Inteligência Artificial contextual.", body_style
    ))
    story.append(Paragraph(
        "<b>Pilares Técnicos e Metodológicos Concretizados:</b>", body_style
    ))
    story.append(Paragraph("• <b>Metodologia Spec-Driven:</b> Construído rigorosamente com base no <code>spec.md</code> e nos critérios de aceite (CA01 a CA06).", bullet_style))
    story.append(Paragraph("• <b>Modo Demonstração (1-Clique):</b> Permite auditar e navegar por todas as funcionalidades sem atrito de cadastro, com dados reais pré-carregados.", bullet_style))
    story.append(Paragraph("• <b>Segurança Multi-Tenancy:</b> Regras estritas de isolamento de dados no Firestore (<code>request.auth.uid == userId</code>).", bullet_style))
    story.append(Paragraph("• <b>Arquitetura BFF:</b> Cloud Functions intermediando chamadas sensíveis de APIs externas (Pluggy, Brapi, CoinGecko).", bullet_style))
    story.append(Spacer(1, 12))

    # ==================== 2. CATÁLOGO COMPLETO DE TELAS ====================
    story.append(Paragraph("2. Catálogo Detalhado de Todas as Telas do Sistema", h1_style))
    story.append(Paragraph("Abaixo estão descritas todas as 12 telas e módulos implementados na plataforma:", body_style))
    story.append(Spacer(1, 6))

    telas = [
        {
            "num": "01",
            "nome": "Landing Page Institucional (Página Inicial)",
            "rota": "/",
            "componente": "Navbar.tsx, Hero.tsx, Features.tsx, Security.tsx, Pricing.tsx, FAQ.tsx, Footer.tsx",
            "resumo": "Portal público de apresentação com proposta de valor, design editorial moderno, badges de segurança Bacen/LGPD, simulador de planos e botão de entrada imediata no Modo Demonstração."
        },
        {
            "num": "02",
            "nome": "Tela de Autenticação Unificada (Login & Cadastro)",
            "rota": "/login ou Modal",
            "componente": "Login.tsx / AuthModal.tsx",
            "resumo": "Acesso seguro com E-mail/Senha (Firebase Auth), integração com Google Sign-In, alternância dinâmica para novo cadastro e botão 'Entrar como Convidado (Modo Demo VIP)' com feedback de validação."
        },
        {
            "num": "03",
            "nome": "Dashboard Principal (Painel Consolidado Open Finance)",
            "rota": "Tab: dashboard",
            "componente": "DashboardView.tsx / Dashboard.tsx",
            "resumo": "Visão consolidada do patrimônio líquido: Saldo disponível, total em investimentos, receitas do mês, despesas, widget de diagnóstico da FinUp IA, cards de boletos a vencer e extrato recente."
        },
        {
            "num": "04",
            "nome": "Barra de Cotações em Tempo Real (Market Ticker)",
            "rota": "Fixa no topo do painel",
            "componente": "MarketTickerBar.tsx & marketService.ts",
            "resumo": "Ticker com dados reais do Bitcoin (BTC), Ethereum (ETH), Dólar Comercial (USD), Euro (EUR) e ações da B3 (PETR4, VALE3, ITUB4) com variação percentual 24h e atualização ao vivo."
        },
        {
            "num": "05",
            "nome": "Área Pix 24/7 (Envio, Recebimento & Comprovantes)",
            "rota": "Tab: pix",
            "componente": "PixView.tsx",
            "resumo": "Transferências Pix com validação de saldo, máscara de valor, simulação de recebimentos em tempo real, geração de comprovante autenticado com ID único, botão de imprimir recibo e cópia para clipboard."
        },
        {
            "num": "06",
            "nome": "Transferências Bancárias TED / DOC",
            "rota": "Tab: transfer",
            "componente": "TransferView.tsx",
            "resumo": "Assistente em 4 etapas: Seleção dos principais bancos do país (BB, Bradesco, Itaú, Nubank, Inter, Caixa), inserção de agência/conta, validação de saldo e emissão de comprovante autenticado."
        },
        {
            "num": "07",
            "nome": "Pagamentos & Gestão de Boletos",
            "rota": "Tab: bills",
            "componente": "BillsView.tsx",
            "resumo": "Acompanhamento de contas a vencer com alertas de urgência, leitor/simulador de código de barras (44/48 dígitos), botão de baixa automática 'Pagar Agora' e histórico de liquidações."
        },
        {
            "num": "08",
            "nome": "Cartões de Crédito & Faturas",
            "rota": "Tab: cards",
            "componente": "CardsView.tsx",
            "resumo": "Visualização de cartões físicos e virtuais, revelação de dados com máscara segura, botão de cópia de número, bloqueio/desbloqueio em 1 clique e pagamento de fatura com restauração imediata do limite."
        },
        {
            "num": "09",
            "nome": "Extrato Completo & Lançamentos Manuais",
            "rota": "Tab: transactions",
            "componente": "TransactionsView.tsx / Transactions.tsx",
            "resumo": "Lista de todas as transações, busca por palavra-chave, filtro por categoria (Alimentação, Moradia, Salário, etc.), modal para inclusão manual e exportação em CSV com codificação UTF-8 BOM para Excel."
        },
        {
            "num": "10",
            "nome": "Carteira de Investimentos B3 & Criptoativos",
            "rota": "Tab: investments",
            "componente": "InvestmentsView.tsx / Investments.tsx",
            "resumo": "Consolidação de ativos sob custódia: Ações, Fundos Imobiliários (FIIs), Criptomoedas e Renda Fixa com cálculo automático de preço médio, cotação atual, ganho/perda nominal e rentabilidade percentual."
        },
        {
            "num": "11",
            "nome": "Metas Financeiras & Teto Orçamentário",
            "rota": "Tab: goals",
            "componente": "GoalsView.tsx / Goals.tsx",
            "resumo": "Metas com barras de progresso percentuais, cálculo de prazo, aportes rápidos com débito do saldo e monitoramento de teto orçamentário por categorias de gastos."
        },
        {
            "num": "12",
            "nome": "FinUp Intelligence (Assistente Conversacional IA)",
            "rota": "Tab: ai",
            "componente": "AIView.tsx",
            "resumo": "Chat inteligente conectado aos dados reais do usuário (saldo, faturas, contas pendentes e investimentos). Responde dúvidas sobre fluxo de caixa, sugere cortes de gastos e faz diagnósticos preditivos."
        },
        {
            "num": "13",
            "nome": "Relatórios, Métricas & Impressão PDF",
            "rota": "Tab: reports",
            "componente": "ReportsView.tsx / Reports.tsx",
            "resumo": "Gráficos de fluxo de caixa, taxa de poupança mensal, distribuição de despesas por categoria com Recharts, exportação analítica CSV e suporte a impressão limpa de relatório contábil (@media print)."
        },
        {
            "num": "14",
            "nome": "Open Finance Conector (Pluggy)",
            "rota": "Tab: connect",
            "componente": "ConnectBank.tsx",
            "resumo": "Interface oficial de sincronização com bancos parceiros via conector seguro Pluggy com geração de token efêmero de leitura."
        },
        {
            "num": "15",
            "nome": "Configurações & Governança",
            "rota": "Tab: settings",
            "componente": "SettingsView.tsx",
            "resumo": "Preferências de tema claro/escuro, dados do usuário autenticado, termos de conformidade LGPD e botão de restauração dos dados padrão de demonstração."
        }
    ]

    for t in telas:
        card_content = [
            [Paragraph(f"<b>Tela {t['num']}: {t['nome']}</b>", h2_style), Paragraph(f"<b>Rota:</b> {t['rota']}", badge_style)],
            [Paragraph(f"<b>Arquivo(s):</b> <font color='#555'>{t['componente']}</font>", body_style), ""],
            [Paragraph(f"<b>Descrição Funcional:</b> {t['resumo']}", body_style), ""]
        ]
        tbl = Table(card_content, colWidths=[380, 124])
        tbl.setStyle(TableStyle([
            ('SPAN', (0, 1), (1, 1)),
            ('SPAN', (0, 2), (1, 2)),
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#FFFFFF')),
            ('PADDING', (0, 0), (-1, -1), 6),
            ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#D5D5D0')),
            ('LINEBELOW', (0, 0), (-1, 0), 0.5, colors.HexColor('#E2E2DE')),
        ]))
        story.append(tbl)
        story.append(Spacer(1, 8))

    story.append(PageBreak())

    # ==================== 3. ARQUITETURA TÉCNICA E BANCO ====================
    story.append(Paragraph("3. Arquitetura de Dados, Redes e Segurança (BFF)", h1_style))
    story.append(Paragraph(
        "A segurança é prioridade central no FinUp. O sistema foi construído adotando o padrão <b>Backend-for-Frontend (BFF)</b>, "
        "garantindo que tokens e chaves privadas de APIs de terceiros jamais sejam expostos no bundle do cliente:", body_style
    ))
    
    arch_data = [
        [Paragraph("<b>Camada</b>", body_style), Paragraph("<b>Tecnologia</b>", body_style), Paragraph("<b>Função no Sistema</b>", body_style)],
        [Paragraph("Frontend Client", body_style), Paragraph("React 19 + TypeScript + Vite", body_style), Paragraph("Interface SPA reativa, responsiva e com feedback instantâneo.", body_style)],
        [Paragraph("Design System", body_style), Paragraph("TailwindCSS v4", body_style), Paragraph("Cores institucionais (#00A878, #0E0E0C), tipografia e modo escuro.", body_style)],
        [Paragraph("Estado Global", body_style), Paragraph("Zustand (com Persist)", body_style), Paragraph("Controle síncrono de saldo, Pix, boletos e transações em memória.", body_style)],
        [Paragraph("Autenticação", body_style), Paragraph("Firebase Auth", body_style), Paragraph("Login com senha criptografada em hash e Google OAuth 2.0.", body_style)],
        [Paragraph("Banco de Dados", body_style), Paragraph("Cloud Firestore (NoSQL)", body_style), Paragraph("Armazenamento documental com segregação por UID de usuário.", body_style)],
        [Paragraph("Segurança BD", body_style), Paragraph("Firestore Security Rules", body_style), Paragraph("Isolamento multi-tenant garantindo que um usuário acesse apenas seus dados.", body_style)],
        [Paragraph("Backend BFF", body_style), Paragraph("Firebase Cloud Functions", body_style), Paragraph("Proteção de segredos de API (Pluggy, Brapi, CoinGecko).", body_style)],
        [Paragraph("APIs Externas", body_style), Paragraph("AwesomeAPI, CoinGecko, Brapi", body_style), Paragraph("Cotações reais de câmbio, criptoativos e ações da B3.", body_style)]
    ]
    arch_table = Table(arch_data, colWidths=[90, 160, 254])
    arch_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#00A878')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('PADDING', (0,0), (-1,-1), 5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#FFFFFF'), colors.HexColor('#F8F8F6')]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E4E4E0')),
    ]))
    story.append(arch_table)
    story.append(Spacer(1, 14))

    # ==================== 4. STATUS DE CONFORMIDADE E ENTREGA ====================
    story.append(Paragraph("4. Status de Conformidade com o IFRO (Checklists)", h1_style))
    story.append(Paragraph("Verificação do cumprimento das normas da apostila de Engenharia de Software:", body_style))

    checklists = [
        ("Critérios de Aceite (CA01 a CA06)", "100% Concluído", "Login, rotas privadas, débito Pix, bloqueio de saldo, baixa de boletos e metas validados."),
        ("Segurança Básica (Anexo B)", "100% Concluído", "Senhas com hash, NoSQL sem SQL Injection, regras Firestore ativas e sem chaves no Git."),
        ("Checklist Pré-Deploy (Anexo C)", "100% Concluído", "Build sem erros (npm run build OK), variáveis cadastradas e .gitignore configurado."),
        ("Documentação Oficial (README & Spec)", "100% Concluído", "spec.md formal, FINUP_REBUILD_COMPLETO.md e README completo com metodologia.")
    ]
    
    chk_rows = [[Paragraph("<b>Requisito Oficial</b>", body_style), Paragraph("<b>Status</b>", body_style), Paragraph("<b>Evidência Técnica</b>", body_style)]]
    for req, st, ev in checklists:
        chk_rows.append([
            Paragraph(req, body_style),
            Paragraph(f"<font color='#00A878'><b>{st}</b></font>", body_style),
            Paragraph(ev, body_style)
        ])
    
    chk_table = Table(chk_rows, colWidths=[150, 95, 259])
    chk_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#141412')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('PADDING', (0,0), (-1,-1), 5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#FFFFFF'), colors.HexColor('#F8F8F6')]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E4E4E0')),
    ]))
    story.append(chk_table)
    story.append(Spacer(1, 14))

    # ==================== CONCLUSÃO ====================
    story.append(Paragraph("5. Conclusão e Próximos Passos", h1_style))
    story.append(Paragraph(
        "O FinUp encontra-se plenamente construído, funcional e testado em ambiente local. "
        "Todas as telas respondem com precisão aos eventos de clique, atualização de saldo e simulações financeiras. "
        "A compilação de produção (<code>npm run build</code>) está gerando o pacote otimizado pronto para deploy na Vercel ou Firebase Hosting.", body_style
    ))
    story.append(Spacer(1, 10))
    story.append(Paragraph("<i>Documento oficial gerado em 13 de Outubro de 2026 para fins de apresentação e avaliação acadêmica.</i>", ParagraphStyle('Foot', parent=styles['Italic'], fontSize=8, textColor=colors.HexColor('#7A7A75'))))

    doc.build(story, canvasmaker=NumberedCanvas)
    print("PDF gerado com sucesso!")

if __name__ == '__main__':
    build_pdf()
