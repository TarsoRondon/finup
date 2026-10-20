-- =============================================================================
-- FINUP — SCRIPT DE CRIAÇÃO DO BANCO DE DADOS E DADOS INICIAIS (SEED)
-- Sistema: FinUp — Gestão Financeira Pessoal, Open Finance e Investimentos
-- Componente Curricular: Desenvolvimento de Sistemas — IFRO Campus Porto Velho Calama
-- Docente: Prof. Rafael Pitwak | Discente: Tarso Rondon
-- SGBD Compatível: PostgreSQL 14+ / MySQL 8.0 / MariaDB 10.5+
-- =============================================================================

-- 1. CRIAÇÃO DO BANCO DE DADOS
CREATE DATABASE IF NOT EXISTS finup_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE finup_db;

-- 2. TABELA: USUARIOS
DROP TABLE IF EXISTS investimentos;
DROP TABLE IF EXISTS metas;
DROP TABLE IF EXISTS cartoes;
DROP TABLE IF EXISTS boletos;
DROP TABLE IF EXISTS transacoes;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id VARCHAR(64) PRIMARY KEY,
    nome_completo VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    perfil VARCHAR(20) NOT NULL DEFAULT 'titular', -- 'titular', 'convidado', 'admin'
    tema_preferido VARCHAR(10) NOT NULL DEFAULT 'dark', -- 'dark', 'light'
    data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABELA: CATEGORIAS
CREATE TABLE categorias (
    id VARCHAR(64) PRIMARY KEY,
    id_usuario VARCHAR(64) NULL, -- NULL indica categoria padrão do sistema
    nome VARCHAR(80) NOT NULL,
    tipo VARCHAR(20) NOT NULL, -- 'receita', 'despesa', 'investimento'
    icone VARCHAR(50) DEFAULT 'Tag',
    cor VARCHAR(20) DEFAULT '#00A878',
    CONSTRAINT fk_categoria_usuario FOREIGN KEY (id_usuario) 
        REFERENCES usuarios(id) ON DELETE CASCADE
);

-- 4. TABELA: TRANSACOES
CREATE TABLE transacoes (
    id VARCHAR(64) PRIMARY KEY,
    id_usuario VARCHAR(64) NOT NULL,
    id_categoria VARCHAR(64) NULL,
    descricao VARCHAR(150) NOT NULL,
    valor DECIMAL(12, 2) NOT NULL,
    tipo VARCHAR(20) NOT NULL, -- 'receita', 'despesa', 'pix_enviado', 'pix_recebido', 'transferencia'
    status VARCHAR(20) NOT NULL DEFAULT 'concluido', -- 'concluido', 'pendente', 'cancelado'
    metodo_pagamento VARCHAR(30) DEFAULT 'saldo_conta',
    autenticacao_bacen VARCHAR(64) NULL,
    data_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_transacao_usuario FOREIGN KEY (id_usuario) 
        REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_transacao_categoria FOREIGN KEY (id_categoria) 
        REFERENCES categorias(id) ON DELETE SET NULL
);

-- 5. TABELA: BOLETOS
CREATE TABLE boletos (
    id VARCHAR(64) PRIMARY KEY,
    id_usuario VARCHAR(64) NOT NULL,
    titulo VARCHAR(120) NOT NULL,
    valor DECIMAL(12, 2) NOT NULL,
    vencimento DATE NOT NULL,
    codigo_barras VARCHAR(60) NOT NULL,
    status_pagamento VARCHAR(20) NOT NULL DEFAULT 'pendente', -- 'pendente', 'pago', 'vencido'
    data_baixa TIMESTAMP NULL,
    CONSTRAINT fk_boleto_usuario FOREIGN KEY (id_usuario) 
        REFERENCES usuarios(id) ON DELETE CASCADE
);

-- 6. TABELA: CARTOES
CREATE TABLE cartoes (
    id VARCHAR(64) PRIMARY KEY,
    id_usuario VARCHAR(64) NOT NULL,
    tipo_cartao VARCHAR(20) NOT NULL, -- 'fisico', 'virtual'
    titular_nome VARCHAR(120) NOT NULL,
    ultimos_digitos VARCHAR(4) NOT NULL,
    limite_total DECIMAL(12, 2) NOT NULL DEFAULT 5000.00,
    limite_usado DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    bloqueado BOOLEAN NOT NULL DEFAULT FALSE,
    dia_fechamento INT NOT NULL DEFAULT 20,
    dia_vencimento INT NOT NULL DEFAULT 28,
    CONSTRAINT fk_cartao_usuario FOREIGN KEY (id_usuario) 
        REFERENCES usuarios(id) ON DELETE CASCADE
);

-- 7. TABELA: METAS
CREATE TABLE metas (
    id VARCHAR(64) PRIMARY KEY,
    id_usuario VARCHAR(64) NOT NULL,
    titulo VARCHAR(120) NOT NULL,
    valor_alvo DECIMAL(12, 2) NOT NULL,
    valor_atual DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    data_prazo DATE NOT NULL,
    icone_badge VARCHAR(40) DEFAULT 'Target',
    CONSTRAINT fk_meta_usuario FOREIGN KEY (id_usuario) 
        REFERENCES usuarios(id) ON DELETE CASCADE
);

-- 8. TABELA: INVESTIMENTOS
CREATE TABLE investimentos (
    id VARCHAR(64) PRIMARY KEY,
    id_usuario VARCHAR(64) NOT NULL,
    ticker_ativo VARCHAR(20) NOT NULL, -- 'PETR4', 'VALE3', 'BTC', 'ETH'
    tipo_ativo VARCHAR(30) NOT NULL, -- 'Ação B3', 'Criptomoeda', 'Renda Fixa'
    quantidade DECIMAL(14, 6) NOT NULL,
    preco_medio DECIMAL(12, 2) NOT NULL,
    preco_mercado DECIMAL(12, 2) NOT NULL,
    data_aquisicao DATE NOT NULL,
    CONSTRAINT fk_investimento_usuario FOREIGN KEY (id_usuario) 
        REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =============================================================================
-- DADOS INICIAIS (SEED) PARA TESTE IMEDIATO
-- =============================================================================

-- Usuário de Teste / Avaliador do IFRO
INSERT INTO usuarios (id, nome_completo, email, senha_hash, perfil, tema_preferido, data_cadastro)
VALUES 
('usr_ifro_teste_01', 'Prof. Rafael Pitwak (Avaliador)', 'avaliador.ifro@finup.com', '$2b$10$wE1Vp7UuM20eZ/F3KxGvUeA6jG2jQ6F4hUeT3w8G4c9M8m0h1uK.', 'titular', 'dark', NOW()),
('usr_demo_visitante', 'Usuário Demonstração FinUp', 'demo@finup.app', '$2b$10$DEMO_SESSION_BYPASS_HASH_ONLY_TESTING_PURPOSES.', 'convidado', 'dark', NOW());

-- Categorias Padrão
INSERT INTO categorias (id, id_usuario, nome, tipo, icone, cor)
VALUES
('cat_01', NULL, 'Salário & Proventos', 'receita', 'Briefcase', '#10B981'),
('cat_02', NULL, 'Rendimentos & Dividendos', 'receita', 'TrendingUp', '#059669'),
('cat_03', NULL, 'Moradia & Contas', 'despesa', 'Home', '#EF4444'),
('cat_04', NULL, 'Alimentação & Mercado', 'despesa', 'Utensils', '#F59E0B'),
('cat_05', NULL, 'Transporte & Combustível', 'despesa', 'Car', '#6366F1'),
('cat_06', NULL, 'Lazer & Assinaturas', 'despesa', 'Film', '#EC4899'),
('cat_07', NULL, 'Reserva de Emergência', 'investimento', 'ShieldCheck', '#3B82F6');

-- Transações Iniciais para o Usuário de Teste
INSERT INTO transacoes (id, id_usuario, id_categoria, descricao, valor, tipo, status, metodo_pagamento, autenticacao_bacen, data_registro)
VALUES
('tx_01', 'usr_ifro_teste_01', 'cat_01', 'Salário Mensal — Depósito em Conta', 7850.00, 'receita', 'concluido', 'ted', 'BACEN-AUT-2026-994821', NOW() - INTERVAL 10 DAY),
('tx_02', 'usr_ifro_teste_01', 'cat_02', 'Dividendos PETR4 + VALE3', 420.50, 'receita', 'concluido', 'proventos', 'BACEN-AUT-2026-994822', NOW() - INTERVAL 5 DAY),
('tx_03', 'usr_ifro_teste_01', 'cat_03', 'Aluguel & Condomínio', 1850.00, 'despesa', 'concluido', 'boleto', 'BACEN-AUT-2026-112349', NOW() - INTERVAL 8 DAY),
('tx_04', 'usr_ifro_teste_01', 'cat_04', 'Supermercado Mensal', 645.80, 'despesa', 'concluido', 'pix_enviado', 'PIX-E00038166202610121400', NOW() - INTERVAL 3 DAY),
('tx_05', 'usr_ifro_teste_01', 'cat_06', 'Assinatura Netflix & Spotify', 79.80, 'despesa', 'concluido', 'cartao_credito', 'CC-AUT-991283', NOW() - INTERVAL 2 DAY),
('tx_06', 'usr_ifro_teste_01', 'cat_05', 'Transferência Pix Recebida — Freela', 1200.00, 'pix_recebido', 'concluido', 'pix_recebido', 'PIX-E00038166202610141620', NOW() - INTERVAL 1 DAY);

-- Boletos Iniciais
INSERT INTO boletos (id, id_usuario, titulo, valor, vencimento, codigo_barras, status_pagamento, data_baixa)
VALUES
('bol_01', 'usr_ifro_teste_01', 'Conta de Energia Elétrica (Energisa RO)', 214.30, CURRENT_DATE + INTERVAL 5 DAY, '34191.79001 01043.510047 91020.150008 8 98760000021430', 'pendente', NULL),
('bol_02', 'usr_ifro_teste_01', 'Plano de Internet Fibra Óptica', 119.90, CURRENT_DATE + INTERVAL 8 DAY, '23793.38128 60000.123456 12000.654321 1 98800000011990', 'pendente', NULL),
('bol_03', 'usr_ifro_teste_01', 'Seguro Automotivo Porto', 189.50, CURRENT_DATE - INTERVAL 12 DAY, '00190.00009 01234.567800 00001.992831 4 98600000018950', 'pago', NOW() - INTERVAL 11 DAY);

-- Cartões de Crédito
INSERT INTO cartoes (id, id_usuario, tipo_cartao, titular_nome, ultimos_digitos, limite_total, limite_usado, bloqueado, dia_fechamento, dia_vencimento)
VALUES
('crd_01', 'usr_ifro_teste_01', 'fisico', 'RAFAEL PITWAK', '8421', 12000.00, 1850.40, FALSE, 20, 28),
('crd_02', 'usr_ifro_teste_01', 'virtual', 'RAFAEL PITWAK (VIRTUAL)', '3190', 4000.00, 319.80, FALSE, 20, 28);

-- Metas Financeiras
INSERT INTO metas (id, id_usuario, titulo, valor_alvo, valor_atual, data_prazo, icone_badge)
VALUES
('met_01', 'usr_ifro_teste_01', 'Reserva de Emergência (6 Meses)', 25000.00, 18500.00, '2026-12-31', 'ShieldCheck'),
('met_02', 'usr_ifro_teste_01', 'Viagem de Férias e Evento Tech', 8000.00, 5200.00, '2027-01-20', 'Plane'),
('met_03', 'usr_ifro_teste_01', 'Upgrade Setup de Trabalho', 6000.00, 3000.00, '2026-11-30', 'Monitor');

-- Investimentos Custodiados
INSERT INTO investimentos (id, id_usuario, ticker_ativo, tipo_ativo, quantidade, preco_medio, preco_mercado, data_aquisicao)
VALUES
('inv_01', 'usr_ifro_teste_01', 'PETR4', 'Ação B3', 150.000000, 32.40, 37.85, '2026-03-15'),
('inv_02', 'usr_ifro_teste_01', 'VALE3', 'Ação B3', 80.000000, 61.20, 64.90, '2026-04-10'),
('inv_03', 'usr_ifro_teste_01', 'BTC', 'Criptomoeda', 0.045000, 342000.00, 395000.00, '2026-02-01'),
('inv_04', 'usr_ifro_teste_01', 'Tesouro Selic 2029', 'Renda Fixa', 1.000000, 14200.00, 14890.30, '2026-01-05');
