import { describe, expect, it } from "vitest";
import { calcularNivel } from "./nivel";

describe("calcularNivel", () => {
  it("calcularNivel_Com0Xp_RetornaNivel1", () => {
    // Arrange
    const xp = 0;

    // Act
    const nivel = calcularNivel(xp);

    // Assert
    expect(nivel).toBe(1);
  });
   it("calcularNivel_Com100Xp_RetornaNivel2", () => {
    // Arrange
    const xp = 100;

    // Act
    const nivel = calcularNivel(xp);

    // Assert
    expect(nivel).toBe(2);
  });
});
