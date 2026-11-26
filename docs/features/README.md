# Critérios de aceite em Gherkin

Cada funcionalidade ganha um arquivo `.feature` aqui **antes** de qualquer código. Os cenários descrevem o comportamento esperado e guiam os testes.

## Regras

- **Em português:** todo arquivo começa com `# language: pt`.
- **Declarativo:** descreva o quê, não os cliques. "Quando concluo o filme", e não "Quando clico no botão Concluir".
- **Curto e independente:** cada cenário funciona sozinho, sem depender da ordem dos outros.
- **Esquema do Cenário:** quando a mesma regra vale para vários dados, use `Esquema do Cenário` com uma tabela de `Exemplos`. É ali que os valores-limite aparecem.
- **Um arquivo por funcionalidade:** `ql-05-xp-e-niveis.feature`, `ql-07-quests-e-metas.feature`.

## Palavras-chave

| Gherkin em português | Para quê |
| --- | --- |
| `Funcionalidade:` | O nome da funcionalidade e a história |
| `Contexto:` | Passos comuns a todos os cenários do arquivo |
| `Cenário:` | Um comportamento concreto |
| `Esquema do Cenário:` | Um comportamento testado com vários dados |
| `Dado` / `Quando` / `Então` | Situação inicial, ação e resultado |
| `E` / `Mas` | Continuação do passo anterior |
| `Exemplos:` | A tabela de dados do esquema |

O modelo está em [`_modelo.feature`](_modelo.feature).
