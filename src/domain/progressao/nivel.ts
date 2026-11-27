/**
 * Calcula o nível do jogador a partir do XP total.
 * As regras estão em docs/regras-do-jogo.md.
 */
export function calcularNivel(xp: number): number {
  return xp >= 1000 ? 2 : 1;
}
