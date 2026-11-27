import { describe, expect, it } from "vitest";
import { calcularNivel } from "./nivel";

describe("calcularNivel", () => {
  // Cada linha é um exemplo do Esquema do Cenário de
  // docs/features/ql-05-xp-e-niveis.feature: [xp, nível esperado].
  it.each([
    // Sem XP (o -1 está no teste de erro, logo abaixo)
    [0, 1],
    [1, 1],
    // Limite do nível 2
    [999, 1],
    [1000, 2],
    [1001, 2],
    // Limite do nível 3
    [2999, 2],
    [3000, 3],
    [3001, 3],
    // Limite do nível 5
    [9999, 4],
    [10000, 5],
    [10001, 5],
    // Sem nível máximo
    [190000, 20],
    [990000, 45],
  ])("calcularNivel_Com%iXp_RetornaNivel%i", (xp, nivelEsperado) => {
    // Arrange: o XP e o nível esperado vêm da linha da tabela

    // Act
    const nivel = calcularNivel(xp);

    // Assert
    expect(nivel).toBe(nivelEsperado);
  });

  it("calcularNivel_ComXpNegativo_LancaErro", () => {
    // Arrange
    const xp = -1;

    // Act
    const calcular = () => calcularNivel(xp);

    // Assert
    expect(calcular).toThrow(RangeError);
  });
});
