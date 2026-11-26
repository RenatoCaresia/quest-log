# Quest Log

[![CI](https://github.com/RenatoCaresia/quest-log/actions/workflows/ci.yml/badge.svg)](https://github.com/RenatoCaresia/quest-log/actions/workflows/ci.yml)

> Seu backlog de filmes, séries, jogos e livros vira uma campanha de RPG.

O Quest Log junta num lugar só tudo o que você quer ver, jogar e ler. Cada título concluído vale XP, você sobe de nível, desbloqueia conquistas e cria side quests e metas para finalmente terminar o que começou.

**Status:** em desenvolvimento, Sprint 0 (fundação).

## O problema

Quem consome muita mídia tem listas espalhadas: a watchlist do streaming, a lista de desejos da Steam, a pilha de livros, anotações no celular ou só a memória. Nas entrevistas de descoberta, duas de três pessoas guardavam a lista só na cabeça e esqueciam o que queriam ver ou jogar. Quem já era organizado usava três apps diferentes.

## O que o MVP entrega

| Código | História |
| --- | --- |
| QL-01 | Criar conta e entrar, com 3 itens pedidos no primeiro acesso |
| QL-02 | Buscar filmes, séries, jogos e livros num campo só |
| QL-03 | Adicionar ao backlog sem duplicar |
| QL-04 | Gerenciar o backlog: status, filtros, favoritos e nota de meia em meia estrela |
| QL-05 | Ganhar XP e subir de nível |
| QL-06 | Desbloquear conquistas |
| QL-07 | Criar side quests e metas anuais |
| QL-08 | Tela inicial pessoal e perfil com estatísticas e páginas lidas |
| QL-09 | Compartilhar a conclusão nos stories do Instagram |

## Stack

| Camada | Escolha |
| --- | --- |
| App (front e back) | Next.js (App Router) e TypeScript |
| Interface | Tailwind CSS |
| Banco e login | Supabase (Postgres, Auth e Row Level Security) |
| Testes | Vitest, Playwright, axe e MSW; Stryker para mutação |
| CI/CD | GitHub Actions e Vercel |
| Monitoramento | Sentry |
| Runtime | Node.js 26 (LTS) |

O porquê de cada escolha está no [ADR-001](docs/adr/001-stack.md).

## Qualidade

As regras de negócio nascem de testes (TDD: red, green, refactor), e o histórico de commits mostra cada ciclo. Toda funcionalidade começa com critérios de aceite em Gherkin, em [`docs/features`](docs/features). Teste falhando bloqueia o merge na `main`. A estratégia completa está em [`docs/testes.md`](docs/testes.md).

## Rodando localmente

Pré-requisitos: Node.js 26 e npm.

```bash
git clone https://github.com/RenatoCaresia/quest-log.git
cd quest-log
cp .env.example .env.local   # preencha as chaves
npm install
npm run dev
```

| Script | O que faz |
| --- | --- |
| `npm run dev` | Sobe o app em modo de desenvolvimento |
| `npm run lint` | Checa o estilo e erros comuns do código |
| `npm run typecheck` | Checa os tipos do TypeScript |
| `npm test` | Roda os testes de unidade e integração |
| `npm run build` | Gera o build de produção |

## Documentação

- [Como contribuir e fluxo de trabalho](CONTRIBUTING.md)
- [Estratégia de testes](docs/testes.md)
- [Regras do jogo (XP, níveis, conquistas, quests)](docs/regras-do-jogo.md)
- [Decisões de arquitetura (ADRs)](docs/adr)
- [Critérios de aceite em Gherkin](docs/features)

## Créditos dos dados

This product uses the TMDB API but is not endorsed or certified by TMDB.

Dados de jogos fornecidos pelo [IGDB](https://www.igdb.com). Dados de livros fornecidos pela [Open Library](https://openlibrary.org).

## Licença

[MIT](LICENSE) © 2026 Renato Augusto Nunes Caresia
