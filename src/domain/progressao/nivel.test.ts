import { describe, expect, it } from "vitest";
import { calcularNivel } from "./nivel";

describe("calcularNivel", () => {
  // Cada linha é um exemplo do Esquema do Cenário de
  // docs/features/ql-05-xp-e-niveis.feature: [xp, nível esperado].
  it.each([
    // Sem XP
    [0, 1],
    // Limite do nível 2
    [999, 1],
    [1000, 2],
    [1001, 2],
    // Limite do nível 3
    [3000, 3],
  ])("calcularNivel_Com%iXp_RetornaNivel%i", (xp, nivelEsperado) => {
    // Arrange: o XP e o nível esperado vêm da linha da tabela

    // Act
    const nivel = calcularNivel(xp);

    // Assert
    expect(nivel).toBe(nivelEsperado);
  });
});
