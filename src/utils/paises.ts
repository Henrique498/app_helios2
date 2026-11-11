import { apenasNumeros, formatarTelefone } from './formatadores';

export type Pais = {
  sigla: string;
  nome: string;
  ddi: string;
  flag: string;
  formatar: (texto: string) => string;
};

function formatarEUA(texto: string) {
  const n = apenasNumeros(texto).slice(0, 10);

  if (n.length <= 3) return n;
  if (n.length <= 6) return `(${n.slice(0, 3)}) ${n.slice(3)}`;
  return `(${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6)}`;
}

function formatarGenerico(texto: string) {
  return apenasNumeros(texto)
    .slice(0, 12)
    .replace(/(\d{3})(?=\d)/g, '$1 ');
}

export const PAISES: Pais[] = [
  {
    sigla: 'BR',
    nome: 'Brasil',
    ddi: '55',
    flag: '🇧🇷',
    formatar: formatarTelefone,
  },
  {
    sigla: 'US',
    nome: 'Estados Unidos',
    ddi: '1',
    flag: '🇺🇸',
    formatar: formatarEUA,
  },
  {
    sigla: 'PT',
    nome: 'Portugal',
    ddi: '351',
    flag: '🇵🇹',
    formatar: formatarGenerico,
  },
  {
    sigla: 'AR',
    nome: 'Argentina',
    ddi: '54',
    flag: '🇦🇷',
    formatar: formatarGenerico,
  },
  {
    sigla: 'PY',
    nome: 'Paraguai',
    ddi: '595',
    flag: '🇵🇾',
    formatar: formatarGenerico,
  },
  {
    sigla: 'UY',
    nome: 'Uruguai',
    ddi: '598',
    flag: '🇺🇾',
    formatar: formatarGenerico,
  },
  {
    sigla: 'CL',
    nome: 'Chile',
    ddi: '56',
    flag: '🇨🇱',
    formatar: formatarGenerico,
  },
  {
    sigla: 'ES',
    nome: 'Espanha',
    ddi: '34',
    flag: '🇪🇸',
    formatar: formatarGenerico,
  },
  {
    sigla: 'GB',
    nome: 'Reino Unido',
    ddi: '44',
    flag: '🇬🇧',
    formatar: formatarGenerico,
  },
  {
    sigla: 'DE',
    nome: 'Alemanha',
    ddi: '49',
    flag: '🇩🇪',
    formatar: formatarGenerico,
  },
];
