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

  it("calcularNivel_Com1000Xp_RetornaNivel2", () => {
    // Arrange
    const xp = 1000;

    // Act
    const nivel = calcularNivel(xp);

    // Assert
    expect(nivel).toBe(2);
  });

  it("calcularNivel_Com999Xp_RetornaNivel1", () => {
    // Arrange
    const xp = 999;

    // Act
    const nivel = calcularNivel(xp);

    // Assert
    expect(nivel).toBe(1);
  });

  it("calcularNivel_Com1001Xp_RetornaNivel2", () => {
    // Arrange
    const xp = 1001;

    // Act
    const nivel = calcularNivel(xp);

    // Assert
    expect(nivel).toBe(2);
  });

  it("calcularNivel_Com3000Xp_RetornaNivel3", () => {
    // Arrange
    const xp = 3000;

    // Act
    const nivel = calcularNivel(xp);

    // Assert
    expect(nivel).toBe(3);
  });
});
