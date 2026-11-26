# ADR-001: Next.js full-stack, Supabase e Vercel

- **Status:** Aceita
- **Data:** 2026-11-26
- **Decisor:** Renato

## Contexto

Um dev, com poucas horas por semana, precisa de front, back, banco e login. As credenciais do IGDB e do TMDB não podem ficar no navegador, então algum código precisa rodar no servidor. O projeto também precisa de testes automatizados desde o primeiro commit.

## Decisão

- **App:** Next.js (App Router) com TypeScript, usando as rotas de servidor como back-end, num repositório só.
- **Banco e login:** Supabase (Postgres, Auth e Row Level Security).
- **Hospedagem:** Vercel, com preview por Pull Request.
- **Runtime:** Node.js 26, a versão LTS atual e o padrão da Vercel para projetos novos.
- **Testes:**
  - **Vitest** para unidade e integração: roda TypeScript direto, é rápido e tem a API que o mercado conhece do Jest.
  - **Playwright** para ponta a ponta: testa em navegadores reais e espera os elementos sozinho, o que reduz testes instáveis.
  - **@axe-core/playwright** para acessibilidade, dentro dos testes de ponta a ponta.
  - **MSW (Mock Service Worker)** para simular as APIs externas no nível da rede, com respostas gravadas.
  - **Stryker** para teste de mutação nas regras de XP, quando elas estiverem estáveis.

## Alternativas consideradas

- **React (Vite) com API separada em NestJS:** mais parecido com sistemas grandes, mas dobra o setup, o deploy e a manutenção para uma pessoa só.
- **Firebase:** rápido de começar, mas o banco NoSQL complica as consultas de progresso, conquistas e estatísticas.
- **Jest no lugar do Vitest:** funciona, mas exige mais configuração para TypeScript e ESM.

## Consequências

- Um deploy só e menos infraestrutura para manter.
- O Postgres permite consultas ricas e segurança por linha (RLS).
- A lógica pode acabar presa ao Next.js. A mitigação é manter as regras de negócio em `src/domain/` como funções puras, sem importar nada do Next.js nem do Supabase, o que também as torna testáveis isoladamente.
