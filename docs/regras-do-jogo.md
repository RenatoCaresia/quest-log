# Regras do jogo

Esta é a fonte da verdade das regras de gamificação. Os valores abaixo foram confirmados pelo Renato em 2026-11-26. Um valor só muda junto com um teste que descreve a mudança. Valor que não está aqui não é inventado no código: vai para "Decisões pendentes" e é decidido antes.

## XP

| Ação | XP |
| --- | --- |
| Concluir um filme | 50 |
| Concluir uma série | 150 |
| Concluir um livro | 150 |
| Concluir um jogo | 200 |
| Dar nota a um item concluído | 10 |
| Desbloquear uma conquista | 25 |
| Completar uma side quest ou meta | Metade do XP base dos itens pedidos |
| Abandonar ou pausar um item | 0, sem penalidade |

- Cada item dá XP de conclusão uma única vez.
- Desmarcar a conclusão gera um evento negativo que estorna o XP daquele item.

## Níveis

XP total necessário para chegar ao nível *n*:

```
XP(n) = 50 · n · (n − 1)
```

| Nível | XP total |
| --- | --- |
| 1 | 0 |
| 2 | 100 |
| 3 | 300 |
| 4 | 600 |
| 5 | 1.000 |

Nível a partir do XP: `n = piso((1 + raiz(1 + 0,08 · XP)) / 2)`.

| Níveis | Título |
| --- | --- |
| 1 a 4 | Aprendiz |
| 5 a 9 | Aventureiro |
| 10 a 19 | Veterano |
| 20 ou mais | Lenda |

## Conquistas

| Conquista | Regra |
| --- | --- |
| Primeiro Passo | Concluir o primeiro item |
| Maratonista | Concluir 3 itens em 7 dias |
| Cinéfilo I | Concluir 10 filmes |
| Seriador I | Concluir 5 séries |
| Leitor I | Concluir 5 livros |
| Zerador I | Concluir 5 jogos |
| Multiverso | Ter ao menos 1 filme, 1 série, 1 livro e 1 jogo concluídos |
| Crítico | Avaliar 10 itens |
| Missão Cumprida | Completar a primeira side quest |
| Desapego | Abandonar um item pela primeira vez |

Cada conquista é desbloqueada uma única vez, com data. As regras dependem de conclusões, notas e quests, nunca de XP, para uma conquista não disparar outra em cadeia.

## Side quests

- Mídia: filme, série, livro, jogo ou qualquer uma.
- Quantidade: de 1 a 10 itens.
- Prazo: até 90 dias.
- Só contam itens concluídos depois da criação da quest.
- No máximo 3 quests ativas ao mesmo tempo.
- Prazo vencido sem completar: a quest vira "falhou", sem perder XP.

## Metas anuais

- Uma por mídia.
- Quantidade: de 1 a 100 itens.
- Prazo: 31 de dezembro do ano da meta.
- Ficam fora do limite de 3 quests.
- A meta de leitura também mostra as páginas lidas no ano.

## Decisões pendentes

Estas regras ainda não estão definidas. Cada uma precisa de resposta antes do TDD da funcionalidade correspondente.

1. **Transições de status (QL-04):** a tabela de decisão com todas as combinações entre Quero, Em andamento, Pausado, Concluído e Abandonado. Ver [`testes.md`](testes.md).
2. **Maratonista (QL-06):** "7 dias" é uma janela móvel de 7 dias corridos? Conta o dia da conclusão?
3. **Fuso horário dos prazos (QL-07):** prazos e "31 de dezembro" seguem o fuso do usuário ou UTC?
4. **Estorno em quest completada (QL-05/QL-07):** se o usuário desmarcar um item que contou para uma quest já completada, a recompensa da quest é estornada?
5. **Trocar a nota (QL-05):** mudar a nota de um item dá os 10 XP de novo?
6. **Concluir de novo (QL-05):** reassistir ou rejogar algo já concluído dá XP?
7. **Meta criada no meio do ano (QL-07):** itens concluídos no mesmo ano, antes da criação da meta, contam?
8. **XP negativo (S0-04):** o cálculo de nível pode receber XP negativo? Se receber, deve dar erro ou tratar como 0?
