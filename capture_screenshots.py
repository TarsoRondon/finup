# -*- coding: utf-8 -*-
import os
import time
from playwright.sync_api import sync_playwright

OUTPUT_DIR = r"c:\Users\Aluno\Documents\Desenvolvimento\finup\screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

URL = "http://localhost:4173"

def capture_all():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        context = browser.new_context(viewport={"width": 1400, "height": 900})
        page = context.new_page()

        print("1. Acessando Landing Page...")
        page.goto(URL, wait_until="networkidle")
        time.sleep(2)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "01_landing_page.png"))

        print("2. Abrindo Modal de Login...")
        page.locator("header button:has-text('Entrar')").click()
        time.sleep(1)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "02_tela_login.png"))

        print("3. Abrindo Aba de Cadastro dentro do Modal...")
        page.locator(".fixed button:has-text('Criar Conta')").click()
        time.sleep(1)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "03_tela_cadastro.png"))

        print("4. Abrindo Aba de Recuperar Senha...")
        page.locator(".fixed button:has-text('Entrar')").click()
        time.sleep(0.5)
        page.locator(".fixed button:has-text('Esqueceu a senha?')").click()
        time.sleep(1)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "04_tela_recuperar_senha.png"))

        print("5. Entrando no Modo Demonstração (Painel Administrativo)...")
        page.locator(".fixed button:has-text('Voltar para o Login')").click()
        time.sleep(0.5)
        page.locator(".fixed button:has-text('Acesso Demo')").click()
        time.sleep(2)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "05_dashboard_principal.png"))

        print("6. Capturando Área Pix 24/7...")
        page.locator("button:has-text('Área Pix 24/7')").click()
        time.sleep(1.5)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "06_area_pix.png"))

        print("7. Capturando Transferências TED/DOC...")
        page.locator("button:has-text('Transferências TED')").click()
        time.sleep(1.5)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "07_transferencias_ted.png"))

        print("8. Capturando Pagamentos & Boletos...")
        page.locator("button:has-text('Pagamentos / Boletos')").click()
        time.sleep(1.5)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "08_boletos_pagamentos.png"))

        print("9. Capturando Cartões & Faturas...")
        page.locator("button:has-text('Cartões & Faturas')").click()
        time.sleep(1.5)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "09_cartoes_faturas.png"))

        print("10. Capturando Extrato & Transações...")
        page.locator("button:has-text('Extrato & Transações')").click()
        time.sleep(1.5)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "10_extrato_transacoes.png"))

        print("11. Capturando Carteira de Investimentos B3...")
        page.locator("button:has-text('Investimentos B3')").click()
        time.sleep(1.5)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "11_investimentos_b3.png"))

        print("12. Capturando Metas & Planejamento...")
        page.locator("button:has-text('Metas & Orçamento')").click()
        time.sleep(1.5)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "12_metas_orcamento.png"))

        print("13. Capturando FinUp IA Assistente...")
        page.locator("button:has-text('FinUp IA Assistente')").click()
        time.sleep(1.5)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "13_finup_ia_assistente.png"))

        print("14. Capturando Relatórios Analíticos & PDF...")
        page.locator("button:has-text('Relatórios & PDF')").click()
        time.sleep(1.5)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "14_relatorios_analiticos.png"))

        print("15. Capturando Configurações do Sistema...")
        page.locator("button:has-text('Configurações')").click()
        time.sleep(1.5)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "15_configuracoes_sistema.png"))

        browser.close()
        print("SUCESSO: Todas as 15 telas foram capturadas!")

if __name__ == '__main__':
    capture_all()
