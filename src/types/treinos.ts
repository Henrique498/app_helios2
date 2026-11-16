export type DiaSemana = 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX';

export type Exercicio = {
  id: string;
  nome: string;
  series: string;
  repeticoes: string;
};

export const NOMES_DIAS: Record<DiaSemana, string> = {
  SEG: 'Segunda-feira',
  TER: 'Terça-feira',
  QUA: 'Quarta-feira',
  QUI: 'Quinta-feira',
  SEX: 'Sexta-feira',
};

export const TREINOS_INICIAIS: Record<DiaSemana, Exercicio[]> = {
  SEG: [
    { id: '1', nome: 'Supino Reto', series: '3', repeticoes: '12' },
    { id: '2', nome: 'Agachamento Livre', series: '4', repeticoes: '10' },
    { id: '3', nome: 'Desenvolvimento', series: '3', repeticoes: '12' },
    { id: '4', nome: 'Rosca Direta', series: '3', repeticoes: '12' },
  ],
  TER: [
    { id: '1', nome: 'Leg Press 45°', series: '4', repeticoes: '12' },
    { id: '2', nome: 'Cadeira Extensora', series: '3', repeticoes: '15' },
  ],
  QUA: [
    { id: '1', nome: 'Puxada Frontal', series: '4', repeticoes: '10' },
    { id: '2', nome: 'Remada Curvada', series: '3', repeticoes: '12' },
    { id: '3', nome: 'Rosca Direta', series: '3', repeticoes: '12' },
    { id: '4', nome: 'Rosca Martelo', series: '3', repeticoes: '12' },
  ],
  QUI: [
    {
      id: '1',
      nome: 'Desenvolvimento Halteres',
      series: '4',
      repeticoes: '10',
    },
    { id: '2', nome: 'Elevação Lateral', series: '4', repeticoes: '15' },
    { id: '3', nome: 'Tríceps Pulley', series: '3', repeticoes: '12' },
    { id: '4', nome: 'Tríceps Testa', series: '3', repeticoes: '12' },
  ],
  SEX: [
    { id: '1', nome: 'Stiff', series: '4', repeticoes: '10' },
    { id: '2', nome: 'Mesa Flexora', series: '3', repeticoes: '12' },
  ],
};
