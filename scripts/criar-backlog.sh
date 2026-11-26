#!/usr/bin/env bash
# Cria no GitHub os labels, as milestones (sprints) e as issues do backlog do Quest Log.
#
# Requisitos:
#   - GitHub CLI instalado e autenticado (rode "gh auth login" uma vez)
#   - Rodar de dentro da pasta do repositório, que já precisa estar no GitHub
#
# Uso:
#   bash scripts/criar-backlog.sh
#
# Pode rodar de novo sem duplicar nada: issues e milestones que já existem são puladas.

set -euo pipefail

cd "$(dirname "$0")/.."
BACKLOG_DIR="docs/backlog"
BACKLOG_FILE="$BACKLOG_DIR/backlog.txt"

if ! gh auth status >/dev/null 2>&1; then
  echo "O GitHub CLI não está autenticado. Rode: gh auth login" >&2
  exit 1
fi

echo "1/3 Labels"
criar_label() {
  gh label create "$1" --color "$2" --description "$3" --force >/dev/null
  echo "  ok: $1"
}
criar_label feat   1D76DB "Funcionalidade nova"
criar_label test   0E8A16 "Testes"
criar_label ci     5319E7 "Integração contínua"
criar_label chore  C5DEF5 "Configuração e manutenção"
criar_label docs   0075CA "Documentação e decisões"
criar_label design F9A8D4 "Identidade visual e telas"
criar_label spike  FBCA04 "Investigação curta com prazo"
criar_label bug    D73A4A "Algo não funciona"

echo "2/3 Milestones"
milestones_existentes=$(gh api "repos/{owner}/{repo}/milestones?state=all&per_page=100" --jq '.[].title')
for sprint in "Sprint 0" "Sprint 1" "Sprint 2" "Sprint 3" "Sprint 4" "Sprint 5"; do
  if grep -qxF "$sprint" <<<"$milestones_existentes"; then
    echo "  já existe: $sprint"
  else
    gh api "repos/{owner}/{repo}/milestones" -f title="$sprint" >/dev/null
    echo "  criada: $sprint"
  fi
done

echo "3/3 Issues"
issues_existentes=$(gh issue list --state all --limit 500 --json title --jq '.[].title')
while IFS='|' read -r arquivo titulo label milestone; do
  # Pula linhas vazias e comentários
  [[ -z "${arquivo// }" || "$arquivo" == \#* ]] && continue

  if grep -qxF "$titulo" <<<"$issues_existentes"; then
    echo "  já existe: $titulo"
    continue
  fi

  gh issue create \
    --title "$titulo" \
    --body-file "$BACKLOG_DIR/$arquivo" \
    --label "$label" \
    --milestone "$milestone" >/dev/null
  echo "  criada: $titulo"
done < "$BACKLOG_FILE"

echo "Pronto. Agora adicione as issues ao quadro no GitHub Projects."
