/**
 * Calcula o nível do jogador a partir do XP total.
 * As regras estão em docs/regras-do-jogo.md.
 */
export function calcularNivel(xp: number): number {
  if (xp >= 3000) {
    return 3;
  }
  if (xp >= 1000) {
    return 2;
  }
  return 1;
}
