export type DiaSemana = 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX' | 'SAB' | 'DOM';

export type Exercicio = {
  id: string;
  nome: string;
  grupo?: string;
  series: string;
  repeticoes: string;
  carga?: string;
  descanso?: string;
  observacoes?: string;
};

export const NOMES_DIAS: Record<DiaSemana, string> = {
  SEG: 'Segunda-feira',
  TER: 'Terça-feira',
  QUA: 'Quarta-feira',
  QUI: 'Quinta-feira',
  SEX: 'Sexta-feira',
  SAB: 'Sábado',
  DOM: 'Domingo',
};

export type GrupoMuscular = {
  id: string;
  nome: string;
  icone: string;
  exemplos: string;
  exercicios: string[];
};

export const GRUPOS_MUSCULARES: GrupoMuscular[] = [
  {
    id: 'peito',
    nome: 'Peito',
    icone: 'arm-flex-outline',
    exemplos: 'Supino reto, inclinado, crucifixo...',
    exercicios: [
      'Supino Reto com Barra',
      'Supino Inclinado com Halteres',
      'Crucifixo na Máquina (Peck Deck)',
      'Cross Over Polia Alta',
      'Flexão de Braço',
    ],
  },
  {
    id: 'costas',
    nome: 'Costas',
    icone: 'human-handsup',
    exemplos: 'Puxada frontal, remada curvada, serrote...',
    exercicios: [
      'Puxada Frontal Aberta',
      'Remada Curvada com Barra',
      'Remada Baixa Triângulo',
      'Remada Unilateral (Serrote)',
      'Pulldown na Polia',
    ],
  },
  {
    id: 'pernas',
    nome: 'Pernas',
    icone: 'run',
    exemplos: 'Agachamento, leg press, extensora...',
    exercicios: [
      'Agachamento Livre',
      'Leg Press 45°',
      'Cadeira Extensora',
      'Mesa Flexora',
      'Stiff com Barra',
      'Panturrilha em Pé',
    ],
  },
  {
    id: 'ombros',
    nome: 'Ombros',
    icone: 'weight-lifter',
    exemplos: 'Desenvolvimento, elevação lateral...',
    exercicios: [
      'Desenvolvimento com Halteres',
      'Elevação Lateral',
      'Elevação Frontal',
      'Crucifixo Inverso',
    ],
  },
  {
    id: 'biceps',
    nome: 'Bíceps',
    icone: 'arm-flex',
    exemplos: 'Rosca direta, alternada, martelo...',
    exercicios: [
      'Rosca Direta com Barra',
      'Rosca Alternada com Halteres',
      'Rosca Martelo',
      'Rosca Scott',
    ],
  },
  {
    id: 'triceps',
    nome: 'Tríceps',
    icone: 'dumbbell',
    exemplos: 'Tríceps pulley, testa, francês...',
    exercicios: [
      'Tríceps Pulley Corda',
      'Tríceps Testa com Barra W',
      'Tríceps Francês Unilateral',
      'Mergulho no Banco',
    ],
  },
  {
    id: 'abdomen',
    nome: 'Abdômen',
    icone: 'human',
    exemplos: 'Abdominal supra, infra, prancha...',
    exercicios: [
      'Abdominal Supra no Solo',
      'Abdominal Infra Elevação de Pernas',
      'Prancha Isométrica',
    ],
  },
  {
    id: 'cardio',
    nome: 'Cardio',
    icone: 'heart-pulse',
    exemplos: 'Esteira, bicicleta, escada...',
    exercicios: [
      'Esteira (Caminhada/Corrida)',
      'Bicicleta Ergométrica',
      'Simulador de Escada',
    ],
  },
];

export const TREINOS_INICIAIS: Record<DiaSemana, Exercicio[]> = {
  SEG: [
    {
      id: 'seg-1',
      nome: 'Supino Reto',
      grupo: 'Peito',
      series: '4',
      repeticoes: '10-12',
      carga: '40',
      descanso: '90',
    },
    {
      id: 'seg-2',
      nome: 'Supino Inclinado',
      grupo: 'Peito',
      series: '3',
      repeticoes: '12',
      carga: '30',
      descanso: '60',
    },
    {
      id: 'seg-3',
      nome: 'Tríceps Pulley',
      grupo: 'Tríceps',
      series: '3',
      repeticoes: '12-15',
      carga: '25',
      descanso: '60',
    },
  ],
  TER: [
    {
      id: 'ter-1',
      nome: 'Puxada Frontal',
      grupo: 'Costas',
      series: '4',
      repeticoes: '10-12',
      carga: '45',
      descanso: '90',
    },
    {
      id: 'ter-2',
      nome: 'Remada Curvada',
      grupo: 'Costas',
      series: '3',
      repeticoes: '12',
      carga: '35',
      descanso: '60',
    },
    {
      id: 'ter-3',
      nome: 'Rosca Direta',
      grupo: 'Bíceps',
      series: '3',
      repeticoes: '12',
      carga: '20',
      descanso: '60',
    },
  ],
  QUA: [
    {
      id: 'qua-1',
      nome: 'Agachamento Livre',
      grupo: 'Pernas',
      series: '4',
      repeticoes: '10',
      carga: '60',
      descanso: '120',
    },
    {
      id: 'qua-2',
      nome: 'Leg Press 45°',
      grupo: 'Pernas',
      series: '4',
      repeticoes: '12',
      carga: '120',
      descanso: '90',
    },
    {
      id: 'qua-3',
      nome: 'Cadeira Extensora',
      grupo: 'Pernas',
      series: '3',
      repeticoes: '15',
      carga: '35',
      descanso: '60',
    },
  ],
  QUI: [
    {
      id: 'qui-1',
      nome: 'Desenvolvimento com Halteres',
      grupo: 'Ombros',
      series: '4',
      repeticoes: '10-12',
      carga: '16',
      descanso: '90',
    },
    {
      id: 'qui-2',
      nome: 'Elevação Lateral',
      grupo: 'Ombros',
      series: '4',
      repeticoes: '15',
      carga: '10',
      descanso: '60',
    },
    {
      id: 'qui-3',
      nome: 'Abdominal Supra',
      grupo: 'Abdômen',
      series: '3',
      repeticoes: '20',
      descanso: '45',
    },
  ],
  SEX: [
    {
      id: 'sex-1',
      nome: 'Stiff',
      grupo: 'Pernas',
      series: '4',
      repeticoes: '12',
      carga: '40',
      descanso: '90',
    },
    {
      id: 'sex-2',
      nome: 'Mesa Flexora',
      grupo: 'Pernas',
      series: '3',
      repeticoes: '12-15',
      carga: '30',
      descanso: '60',
    },
    {
      id: 'sex-3',
      nome: 'Esteira (Cardio)',
      grupo: 'Cardio',
      series: '1',
      repeticoes: '20 min',
    },
  ],
  SAB: [],
  DOM: [],
};
