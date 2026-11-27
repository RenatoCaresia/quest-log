# language: pt
Funcionalidade: Calcular o nível pelo XP
  Como jogador do Quest Log
  Quero que meu nível acompanhe o XP que acumulei
  Para ver meu progresso crescer conforme concluo itens

  Regra: o XP total para chegar ao nível n é 50 · n · (n − 1), sem nível máximo

    Esquema do Cenário: Nível de acordo com o XP total
      Dado que tenho <xp> de XP
      Quando consulto meu nível
      Então meu nível é <nivel>

      Exemplos: Sem XP
        | xp | nivel |
        | 0  | 1     |

      Exemplos: Limite do nível 2
        | xp  | nivel |
        | 99  | 1     |
        | 100 | 2     |
        | 101 | 2     |

      Exemplos: Limite do nível 3
        | xp  | nivel |
        | 299 | 2     |
        | 300 | 3     |
        | 301 | 3     |

      Exemplos: Limite do nível 5
        | xp   | nivel |
        | 999  | 4     |
        | 1000 | 5     |
        | 1001 | 5     |

      Exemplos: Sem nível máximo
        | xp    | nivel |
        | 19000 | 20    |
        | 99000 | 45    |

  Regra: XP negativo é um erro, porque o XP total nunca fica abaixo de zero

    Cenário: XP negativo é recusado
      Dado que o XP informado é -1
      Quando o nível é calculado
      Então o cálculo é recusado com um erro de XP inválido
