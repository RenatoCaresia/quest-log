/** XP da fórmula de níveis: XP(n) = 500 · n · (n − 1). */
const XP_BASE = 500;

/**
 * XP total necessário para alcançar um nível.
 * As regras estão em docs/regras-do-jogo.md.
 */
export function xpParaAlcancarNivel(nivel: number): number {
  return XP_BASE * nivel * (nivel - 1);
}

/**
 * Calcula o nível do jogador a partir do XP total.
 *
 * Sobe nível por nível enquanto o XP alcança o próximo. Usa só números
 * inteiros, o que evita os erros de arredondamento da fórmula inversa
 * com raiz quadrada.
 */
export function calcularNivel(xp: number): number {
  let nivel = 1;
  while (xpParaAlcancarNivel(nivel + 1) <= xp) {
    nivel++;
  }
  return nivel;
}
