# WhatsApp Admin — Painel de Monitoramento WhatsApp ↔ Slack

Painel administrativo para monitorar e gerenciar a integração de mensagens entre WhatsApp e Slack, com dashboard em tempo real, listagem com filtros e exportação CSV.

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4)
![Vite](https://img.shields.io/badge/Vite-6-646CFF)

## Funcionalidades

- **Autenticação JWT** — Login com email/senha, rotas protegidas e logout automático em caso de token expirado
- **Dashboard** — Estatísticas do dia (total de mensagens, volume por direção, taxa de falha) e gráfico de volume diário dos últimos 30 dias
- **Listagem de Mensagens** — Tabela paginada com filtros por direção, status, período e busca por texto/telefone/nome
- **Detalhe da Mensagem** — Visualização completa com link direto para a execução no n8n
- **Exportação CSV** — Download de mensagens filtradas com aviso para exportações grandes (>10k registros)
- **Tema Claro/Escuro** — Toggle de tema com persistência no localStorage
- **Responsivo** — Layout adaptável com sidebar colapsável em mobile

## Tech Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 |
| Linguagem | TypeScript 5.7 |
| Build | Vite 6 |
| Estilização | Tailwind CSS 4 |
| Roteamento | React Router 7 |
| Estado do servidor | TanStack React Query 5 |
| HTTP Client | Axios |
| Gráficos | Recharts 2 |
| Ícones | Lucide React |
| Utilitários | date-fns, clsx, tailwind-merge, class-variance-authority |

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- API backend rodando (ver [Variáveis de Ambiente](#variáveis-de-ambiente))

## Instalação

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/whatsapp-admin.git
cd whatsapp-admin

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000/api
VITE_N8N_URL=https://seu-n8n.exemplo.com
```

| Variável | Descrição | Padrão |
|---|---|---|
| `VITE_API_URL` | URL base da API backend | `http://localhost:3000/api` |
| `VITE_N8N_URL` | URL da instância n8n (para links de execução) | — |

## Executando

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AppLayout.tsx        # Layout principal com sidebar e header
│   ├── ExportButton.tsx     # Botão de exportação CSV
│   ├── MessageFilters.tsx   # Filtros da listagem de mensagens
│   ├── MessageTable.tsx     # Tabela de mensagens
│   ├── PaginationControls.tsx # Controles de paginação
│   ├── ProtectedRoute.tsx   # Wrapper de rota autenticada
│   ├── StatsCard.tsx        # Card de estatística do dashboard
│   ├── ThemeToggle.tsx      # Toggle claro/escuro
│   └── VolumeChart.tsx      # Gráfico de barras de volume diário
├── contexts/            # Contextos React
│   ├── AuthContext.tsx      # Autenticação (login, logout, token)
│   └── ThemeContext.tsx     # Tema claro/escuro
├── lib/                 # Utilitários e configurações
│   ├── api.ts               # Instância Axios com interceptors
│   ├── types.ts             # Tipos TypeScript (DTOs, enums)
│   └── utils.ts             # Funções utilitárias
├── pages/               # Páginas da aplicação
│   ├── DashboardPage.tsx    # Dashboard com stats e gráfico
│   ├── LoginPage.tsx        # Tela de login
│   ├── MessageDetailPage.tsx # Detalhe de uma mensagem
│   └── MessagesListPage.tsx # Listagem de mensagens
├── App.tsx              # Rotas e providers
├── main.tsx             # Entry point
└── index.css            # Estilos globais (Tailwind)
```

## Endpoints da API Esperados

O frontend consome os seguintes endpoints:

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/auth/login` | Autenticação (retorna JWT + user) |
| `GET` | `/messages` | Listagem paginada com filtros |
| `GET` | `/messages/:id` | Detalhe de uma mensagem |
| `GET` | `/messages/stats` | Estatísticas do dashboard |
| `GET` | `/messages/export` | Exportação CSV |

## Licença

Este projeto é privado.
