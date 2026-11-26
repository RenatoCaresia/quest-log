# Como trabalhamos no Quest Log

Este é um projeto solo feito como um time de verdade. Toda mudança segue o mesmo caminho, e a `main` está sempre pronta para ir ao ar.

## O caminho de uma funcionalidade

1. **Issue pronta.** Pegue a issue do topo de "Pronto para fazer" no quadro e mova para "Em andamento". Só uma por vez.
2. **Critérios em Gherkin.** Antes de qualquer código, escreva ou revise os cenários em `docs/features/<funcionalidade>.feature`.
3. **Branch.** A partir da `main` atualizada: `git switch -c feat/ql-02-busca-unificada`.
4. **TDD.** Cada regra nasce de um teste, em ciclos curtos de red, green e refactor, com um commit por fase.
5. **Suíte inteira.** Antes de abrir o PR, rode `npm run lint`, `npm run typecheck` e `npm test`.
6. **Pull Request.** Abra cedo, como rascunho, com o template preenchido e `Closes #N`.
7. **CI e revisão.** O CI precisa estar verde. Revise o próprio PR no dia seguinte, com olhos descansados.
8. **Merge.** Use **Create a merge commit**, nunca squash: o squash apagaria os commits de red, green e refactor, que são a prova do TDD.

## Nomes de branch

| Prefixo | Quando usar | Exemplo |
| --- | --- | --- |
| `feat/` | Funcionalidade nova | `feat/ql-05-xp-e-niveis` |
| `fix/` | Correção de bug | `fix/42-xp-duplicado` |
| `test/` | Só testes | `test/e2e-fluxo-principal` |
| `ci/` | Pipeline e automação | `ci/testes-e2e` |
| `docs/` | Documentação e decisões | `docs/adr-002-google-books` |
| `chore/` | Configuração e manutenção | `chore/sentry` |

## Prefixos de commit

O histórico conta a história de cada ciclo de TDD.

| Prefixo | Quando usar |
| --- | --- |
| `red:` | Um teste novo que falha pelo motivo certo |
| `green:` | O mínimo de código para o teste passar |
| `refactor:` | Melhoria de estrutura, com todos os testes verdes |
| `test:` | Testes fora de um ciclo red/green (E2E, acessibilidade, regressão extra) |
| `feat:` | Código de funcionalidade sem regra de negócio (telas, ligações) |
| `fix:` | A correção de um bug, depois do `red:` que o reproduz |
| `ci:` | Pipeline, GitHub Actions, Dependabot |
| `docs:` | Documentação, ADRs, arquivos `.feature` |
| `chore:` | Configuração, dependências, manutenção |

Um ciclo completo fica assim:

```
red: calcularNivel retorna 2 com exatamente 100 XP
green: implementa calcularNivel pela fórmula 50·n·(n−1)
refactor: extrai xpParaAlcancarNivel
```

Commits `red:` só existem em branches de funcionalidade. A `main` é protegida, então só recebe código com a suíte verde.

## Bugs

Todo bug vira primeiro um teste que o reproduz, falhando (`red: reproduz bug #42 ...`). Só depois vem a correção (`fix: ...`). O teste fica na suíte como regressão.

## Pronta para começar (Definition of Ready)

- Tem critérios de aceite escritos.
- A tela está no wireframe, se a história tiver interface.
- Todos os valores de regra estão em [`docs/regras-do-jogo.md`](docs/regras-do-jogo.md). Valor que não está lá é decidido antes, nunca inventado no código.
- Cabe em até 2 dias de trabalho. Se não couber, quebre em partes.

## Pronta de verdade (Definition of Done)

- Os cenários em Gherkin estão cobertos por testes.
- As regras novas nasceram de testes, e o histórico mostra o ciclo.
- O CI está verde: lint, tipos, testes e build.
- Os critérios de aceite foram conferidos no ambiente de preview.
- Não há segredo no código; chaves só em variáveis de ambiente.
- O README ou um ADR foi atualizado se algo importante mudou.
- Está em produção.
