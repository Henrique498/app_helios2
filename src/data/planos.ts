import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

export type Icone = ComponentProps<typeof MaterialCommunityIcons>['name'];

export type Beneficio = { icone: Icone; texto: string };

export type Plano = {
  id: string;
  nome: string;
  preco: string;
  destaque: boolean;
  beneficios: Beneficio[];
};

const checkin: Beneficio = {
  icone: 'map-marker-outline',
  texto: 'Check-in ilimitado na unudade',
};
const treinos: Beneficio = {
  icone: 'run',
  texto: 'Treinos especiais no Helios Basic App',
};
const desafios: Beneficio = {
  icone: 'dumbbell',
  texto: 'Desafios fitness no Helios Basic Club',
};
const personalizavel: Beneficio = {
  icone: 'star',
  texto: 'Treino Personalizavel',
};

export const PLANOS: Plano[] = [
  {
    id: 'basic',
    nome: 'BASIC',
    preco: 'R$ 90,90',
    destaque: false,
    beneficios: [checkin, treinos, desafios],
  },

  {
    id: 'fit',
    nome: 'FIT',
    preco: 'R$ 119,90',
    destaque: false,
    beneficios: [checkin, treinos, desafios, personalizavel],
  },

  {
    id: 'black',
    nome: 'BLACK',
    preco: 'R$ 159, 90',
    destaque: true,
    beneficios: [
      checkin,
      treinos,
      desafios,
      personalizavel,
      { icone: 'domain', texto: 'Acesso a Todas as Unidades Helios' },
      {
        icone: 'account-group',
        texto: '5 acessos mensais para convidar amigos, 1 por visita',
      },
      { icone: 'cup', texto: 'Day Shake' },
    ],
  },
];
