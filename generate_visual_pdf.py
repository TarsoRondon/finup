# -*- coding: utf-8 -*-
import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak, KeepTogether, HRFlowable, Table, TableStyle
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

PDF_OUTPUT = r"c:\Users\Aluno\Documents\Desenvolvimento\finup\FINUP_CATALOGO_VISUAL_COM_PRINTS.pdf"
SHOTS_DIR = r"c:\Users\Aluno\Documents\Desenvolvimento\finup\screenshots"

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
            self.drawString(54, 755, "FINUP — CATÁLOGO VISUAL DE TELAS & ARQUITETURA")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#7A7A75"))
            self.drawRightString(558, 755, "IFRO Calama · 2026")
            self.setStrokeColor(colors.HexColor("#E2E2DE"))
            self.setLineWidth(0.5)
            self.line(54, 747, 558, 747)

        # Footer
        self.setStrokeColor(colors.HexColor("#E2E2DE"))
        self.setLineWidth(0.5)
        self.line(54, 42, 558, 42)
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#7A7A75"))
        self.drawString(54, 28, "FinUp: Open Finance, Banco Digital & Inteligência Artificial Contextual")
        self.drawRightString(558, 28, f"Página {self._pageNumber} de {page_count}")
        self.restoreState()

def build_pdf():
    doc = SimpleDocTemplate(
        PDF_OUTPUT,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#111111'),
        spaceAfter=4
    )

    sub_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#00A878'),
        spaceAfter=14
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#111111'),
        spaceBefore=10,
        spaceAfter=6
    )

    screen_title = ParagraphStyle(
        'ScreenTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#006B52'),
        spaceBefore=4,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#2E2E2A'),
        spaceAfter=4
    )

    meta_style = ParagraphStyle(
        'Meta',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#00A878')
    )

    story = []

    # ==================== CAPA ====================
    story.append(Paragraph("💎 FinUp — Catálogo Visual de Telas com Capturas Oficiais", title_style))
    story.append(Paragraph("Apresentação de Todas as Telas do Sistema com Prints Reais e Descrição Técnica", sub_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#00A878'), spaceAfter=12))

    meta_info = [
        [Paragraph("<b>Aluno Desenvolvedor:</b> Tarso Rondon", body_style), Paragraph("<b>Instituição:</b> IFRO — Campus Calama", body_style)],
        [Paragraph("<b>Orientador:</b> Prof. Rafael Pitwak", body_style), Paragraph("<b>Componente:</b> Desenvolvimento de Sistemas", body_style)],
        [Paragraph("<b>Metodologia:</b> Spec-Driven Development", body_style), Paragraph("<b>Data:</b> Outubro de 2026 · Versão 2.4", body_style)]
    ]
    t_meta = Table(meta_info, colWidths=[250, 250])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F4FAF7')),
        ('PADDING', (0,0), (-1,-1), 5),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#C2E5D8')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E2DE')),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 12))

    # ==================== RESUMO GERAL ====================
    story.append(Paragraph("Resumo do Sistema", h1_style))
    story.append(Paragraph(
        "O <b>FinUp</b> é uma plataforma fintech completa focada na unificação de serviços financeiros. "
        "O sistema integra contas virtuais, leitura de extratos via Open Finance, liquidação de boletos por código de barras, "
        "Área Pix 24/7 com autenticação bancária, gestão de cartões físicos/virtuais, carteira de investimentos na B3 e criptomoedas com cotações ao vivo, "
        "e um assistente financeiro com Inteligência Artificial contextual.", body_style
    ))
    story.append(Spacer(1, 8))

    # ==================== TELAS COM IMAGENS ====================
    telas = [
        {
            "img": "01_landing_page.png",
            "titulo": "Tela 01 — Landing Page Institucional (Página Inicial)",
            "modulo": "Público / Institucional",
            "desc": "Portal de entrada com proposta de valor, design editorial moderno (estética Pierre Finance), selos de conformidade com o Banco Central e LGPD, detalhamento dos recursos de Open Finance e botão de acesso direto ao Modo Demonstração."
        },
        {
            "img": "02_tela_login.png",
            "titulo": "Tela 02 — Modal de Autenticação Unificada (Login)",
            "modulo": "Autenticação & Segurança",
            "desc": "Interface de acesso seguro com validação de credenciais de E-mail/Senha pelo Firebase Authentication, suporte a Google OAuth, atalho para recuperação de senha e botão de 1 clique para Modo Demonstração sem necessidade de cadastro."
        },
        {
            "img": "03_tela_cadastro.png",
            "titulo": "Tela 03 — Tela de Cadastro de Novo Usuário",
            "modulo": "Autenticação & Segurança",
            "desc": "Formulário de abertura de conta com validação em tempo real de requisitos de segurança de senha (mínimo de 6 dígitos e presença de números), preenchimento de nome completo e emissão segura de token."
        },
        {
            "img": "04_tela_recuperar_senha.png",
            "titulo": "Tela 04 — Tela de Recuperação de Senha (Esqueceu a Senha)",
            "modulo": "Autenticação & Segurança",
            "desc": "Módulo de recuperação e autoatendimento com envio de link de redefinição para o e-mail cadastrado, feedback de confirmação imediato na tela e retorno rápido para o login."
        },
        {
            "img": "05_dashboard_principal.png",
            "titulo": "Tela 05 — Dashboard Consolidado (Painel Administrativo Principal)",
            "modulo": "Painel Geral / Open Finance",
            "desc": "Síntese do patrimônio líquido do cliente. Exibe o Ticker de Cotações em tempo real no topo (BTC, ETH, Dólar, Euro e B3), cards de saldo em conta corrente, patrimônio total, receitas vs. despesas, banner ativo da FinUp IA com diagnóstico de contas e widget de boletos a vencer."
        },
        {
            "img": "06_area_pix.png",
            "titulo": "Tela 06 — Área Pix 24/7 (Envio, Recebimento & Comprovantes)",
            "modulo": "Operações Bancárias",
            "desc": "Módulo de transferências instantâneas. Permite envio com débito imediato no saldo, gerador e leitor de QR Code / Chave, simulador de recebimento de Pix para testes e emissão de comprovante oficial autenticado com ID único, data/hora e botão de impressão."
        },
        {
            "img": "07_transferencias_ted.png",
            "titulo": "Tela 07 — Transferências Bancárias Tradicionais (TED / DOC)",
            "modulo": "Operações Bancárias",
            "desc": "Formulário guiado em etapas: Seleção da instituição bancária (Banco do Brasil, Bradesco, Itaú, Nubank, Inter, Santander, Caixa), preenchimento de favorecido, agência e conta corrente, com validação de saldo e recibo com chave de autenticação."
        },
        {
            "img": "08_boletos_pagamentos.png",
            "titulo": "Tela 08 — Gestão & Pagamento de Boletos Bancários",
            "modulo": "Contas a Pagar",
            "desc": "Central de compromissos a vencer com separação entre faturas pendentes e pagas. Possui leitor/simulador de código de barras de 44 ou 48 dígitos, alertas amarelos para contas próximas do vencimento e baixa no saldo com botão de pagamento imediato."
        },
        {
            "img": "09_cartoes_faturas.png",
            "titulo": "Tela 09 — Gestão de Cartões de Crédito & Faturas",
            "modulo": "Meios de Pagamento",
            "desc": "Visualização realista de cartões físicos e virtuais, revelação de dados com máscara segura, botão de cópia de número para compras online, bloqueio e desbloqueio temporário em 1 clique e botão para pagamento integral da fatura com recomposição do limite."
        },
        {
            "img": "10_extrato_transacoes.png",
            "titulo": "Tela 10 — Extrato Bancário Completo & Lançamentos Manuais",
            "modulo": "Controle Orçamentário",
            "desc": "Histórico de todas as movimentações financeiras com badges de status, categorização automática (Alimentação, Moradia, Transporte, etc.), campo de busca por palavra-chave, modal para inserção de receitas/despesas manuais e exportação de planilha em formato CSV (UTF-8 BOM)."
        },
        {
            "img": "11_investimentos_b3.png",
            "titulo": "Tela 11 — Carteira de Investimentos B3, FIIs e Criptoativos",
            "modulo": "Gestão Patrimonial",
            "desc": "Custódia consolidada de ativos de renda variável (ações da B3 como PETR4, VALE3, ITUB4), Fundos Imobiliários e criptomoedas (Bitcoin e Ethereum). Calcula automaticamente o custo de aquisição, cotação atual de mercado, lucro/prejuízo nominal e rentabilidade percentual."
        },
        {
            "img": "12_metas_orcamento.png",
            "titulo": "Tela 12 — Metas Financeiras & Teto de Gastos Orçamentário",
            "modulo": "Planejamento Financeiro",
            "desc": "Acompanhamento de objetivos com barras de progresso visuais percentuais até a conquista, prazos estimados, botões de aporte rápido (+R$ 100, +R$ 500) debitados do saldo e barras de monitoramento de teto de gastos por categoria."
        },
        {
            "img": "13_finup_ia_assistente.png",
            "titulo": "Tela 13 — FinUp Intelligence (Assistente Financeiro IA)",
            "modulo": "Inteligência Artificial Contextual",
            "desc": "Chatbot conversacional conectado aos dados financeiros do usuário. Responde perguntas sobre fluxo de caixa, alerta sobre boletos que vencem na semana, sugere oportunidades de economia e projeta metas a partir do saldo disponível."
        },
        {
            "img": "14_relatorios_analiticos.png",
            "titulo": "Tela 14 — Relatórios Analíticos & Exportação de PDF",
            "modulo": "Analytics & Controladoria",
            "desc": "Métricas de fluxo de caixa, cálculo automático de taxa de poupança mensal, gráficos de distribuição de gastos por categoria gerados com Recharts, exportação contábil CSV e layout otimizado para impressão (@media print) em página A4 limpa sem menus."
        },
        {
            "img": "15_configuracoes_sistema.png",
            "titulo": "Tela 15 — Configurações, Tema & Governança",
            "modulo": "Governança & Preferências",
            "desc": "Painel de preferências gerais do usuário, alternância de tema Escuro / Claro, termos de conformidade e privacidade LGPD e botão de restauração dos dados padrão do Modo Demonstração para fins de teste."
        }
    ]

    for item in telas:
        img_path = os.path.join(SHOTS_DIR, item["img"])
        
        card_content = []
        card_content.append(Paragraph(item["titulo"], screen_title))
        card_content.append(Paragraph(f"<b>Módulo:</b> {item['modulo']}", meta_style))
        card_content.append(Spacer(1, 3))
        card_content.append(Paragraph(f"<b>O que é esta tela / Funcionamento:</b> {item['desc']}", body_style))
        card_content.append(Spacer(1, 4))
        
        if os.path.exists(img_path):
            # Imagem proporcional cabendo na largura da página (500px largura, 255px altura)
            img = Image(img_path, width=504, height=255)
            card_content.append(img)
        
        card_table = Table([[card_content]], colWidths=[504])
        card_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#FFFFFF')),
            ('PADDING', (0,0), (-1,-1), 8),
            ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor('#D5D5D0')),
            ('LINEBELOW', (0,0), (-1,-1), 0.5, colors.HexColor('#E4E4E0')),
        ]))

        story.append(KeepTogether([card_table]))
        story.append(Spacer(1, 14))

    doc.build(story, canvasmaker=NumberedCanvas)
    print("PDF Visual com todos os Prints gerado com sucesso!")

if __name__ == '__main__':
    build_pdf()
