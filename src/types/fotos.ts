

export type PosicaoFoto = 'frente' | 'lado' | 'costas';

export const POSICOES: PosicaoFoto[] = ['frente', 'lado', 'costas'];

export const NOMES_POSICOES: Record<PosicaoFoto, string> = {
  frente: 'Frente',
  lado: 'Lado',
  costas: 'Costas',
};

// O que é salvo no AsyncStorage (guardamos só o nome do arquivo, porque
// o caminho absoluto da pasta pode mudar no iOS depois de uma atualização)
export type FotoEvolucao = {
  id: string;
  arquivo: string;
  posicao: PosicaoFoto;
  data: string; // ISO
};

// O que a tela usa (com o caminho completo já montado)
export type FotoComUri = FotoEvolucao & { uri: string };
