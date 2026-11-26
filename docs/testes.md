# Estratégia de testes

Combinada em 2026-11-26 e válida para todo o desenvolvimento do Quest Log.

## Ferramentas

| Ferramenta | Para quê | Por que ela |
| --- | --- | --- |
| Vitest | Testes de unidade e integração | Roda TypeScript direto, é rápido e tem a API do Jest, que o mercado conhece |
| Playwright | Testes de ponta a ponta | Usa navegadores reais e espera os elementos sozinho, o que reduz testes instáveis |
| @axe-core/playwright | Acessibilidade | Roda as regras do axe dentro dos fluxos de ponta a ponta |
| MSW (Mock Service Worker) | Simular as APIs externas | Intercepta as requisições no nível da rede, sem mudar o código do app |
| Stryker | Teste de mutação | Altera o código de propósito para ver se os testes percebem |

## A pirâmide

| Nível | Quantidade | O que cobre |
| --- | --- | --- |
| Unidade | Muitos | Regras de `src/domain/`: XP, níveis, conquistas, quests, metas, transições de status, adaptadores das APIs |
| Integração | Alguns | Ações do servidor com banco real (Supabase local): gravar eventos de XP, RLS bloqueando outro usuário |
| Ponta a ponta | Poucos (3 a 5) | Fluxos principais no navegador, com verificação de acessibilidade |

## TDD nas regras de negócio

Toda regra de gamificação e de domínio nasce de um teste:

1. **Red:** escreva UM teste para um comportamento que ainda não existe. Rode e confirme que ele falha pelo motivo certo (a asserção), e não por erro de compilação ou de ambiente.
2. **Green:** implemente o mínimo para o teste passar.
3. **Refactor:** melhore a estrutura, só com todos os testes verdes.

Um comportamento por vez. Nunca escreva todos os testes de uma vez. Cada fase vira um commit (`red:`, `green:`, `refactor:`).

As regras ficam em `src/domain/` como funções puras, sem importar nada do Next.js, do React nem do Supabase. É isso que permite testá-las isoladas.

### Nome e estrutura dos testes

Nome no formato `metodo_Cenario_ResultadoEsperado`, e corpo em Arrange / Act / Assert, com comentários:

```ts
import { describe, it, expect } from 'vitest'
import { calcularNivel } from './nivel'

describe('calcularNivel', () => {
  it('calcularNivel_Com100Xp_RetornaNivel2', () => {
    // Arrange
    const xp = 100

    // Act
    const nivel = calcularNivel(xp)

    // Assert
    expect(nivel).toBe(2)
  })
})
```

### Análise de valor-limite

Em todo limite numérico, teste o valor exato, um abaixo e um acima.

| Regra | Limite | Valores testados |
| --- | --- | --- |
| Subir para o nível 2 | 100 XP | 99, 100, 101 |
| Subir para o nível 3 | 300 XP | 299, 300, 301 |
| Subir para o nível 5 | 1.000 XP | 999, 1.000, 1.001 |
| Itens de uma quest | 1 a 10 | 0, 1, 2 e 9, 10, 11 |
| Prazo de uma quest | até 90 dias | 89, 90, 91 |
| Itens de uma meta | 1 a 100 | 0, 1, 2 e 99, 100, 101 |
| Quests ativas | no máximo 3 | 2, 3, 4 |
| Nota | 1 a 10 (meias estrelas) | 0, 1, 2 e 9, 10, 11 |
| Senha | 8 ou mais caracteres | 7, 8, 9 |
| Busca | 2 ou mais letras | 1, 2, 3 |

### Tabela de decisão das transições de status

Antes de QL-04, montamos juntos a tabela abaixo. Cada célula diz se a transição é permitida, e cada linha vira um teste.

| De \ Para | Quero | Em andamento | Pausado | Concluído | Abandonado |
| --- | --- | --- | --- | --- | --- |
| Quero | — | ? | ? | ? | ? |
| Em andamento | ? | — | ? | ? | ? |
| Pausado | ? | ? | — | ? | ? |
| Concluído | ? | ? | ? | — | ? |
| Abandonado | ? | ? | ? | ? | — |

### Datas e tempo

Nenhuma regra usa a data real do sistema. Toda regra que depende de tempo (prazos de quest, metas anuais, conquistas por período) recebe um relógio como parâmetro:

```ts
export type Relogio = () => Date

export function questVenceu(prazo: Date, agora: Relogio): boolean {
  return agora() > prazo
}

// No teste, o relógio é fixo e o resultado é sempre o mesmo:
const relogioFixo: Relogio = () => new Date('2027-01-15T12:00:00-03:00')
```

## Critérios de aceite em Gherkin

Antes de implementar cada funcionalidade, escrevemos juntos os cenários em `docs/features/`. As regras de escrita estão em [`features/README.md`](features/README.md).

## APIs externas

- Os testes nunca chamam as APIs reais do TMDB, do IGDB nem da Open Library.
- Respostas reais de exemplo ficam gravadas em `tests/fixtures/<api>/`.
- O MSW devolve essas respostas nos testes.
- Para cada API, cobrimos os casos ruins:
  - campo faltando (sem capa, sem autor, sem número de páginas)
  - lista vazia
  - erro 500
  - tempo esgotado
- Chaves de API ficam em variáveis de ambiente, nunca no código.

## Ponta a ponta e acessibilidade

- Poucos testes, só para os fluxos principais: cadastrar, adicionar item, concluir item e ver o XP subir.
- Cada fluxo roda o axe e falha se encontrar problemas de contraste, capas sem texto alternativo ou elementos inacessíveis pelo teclado.

## Integração contínua

- O GitHub Actions roda lint, tipos, testes e build a cada push e a cada Pull Request.
- A `main` é protegida: teste falhando bloqueia o merge (quality gate).
- O selo de status dos testes fica no topo do README.

## Teste de mutação

Quando as regras de XP estiverem estáveis, rodamos o Stryker em `src/domain/`. Ele cria "mutantes", pequenas alterações no código como trocar `>` por `>=`. Mutante que sobrevive aponta um teste que está faltando.

## Bugs

Todo bug vira primeiro um teste que o reproduz, falhando. Só depois vem a correção. O teste fica na suíte para sempre, como regressão.
