

// ---------- E-mail ----------
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function emailValido(email: string) {
  return EMAIL_REGEX.test(email.trim().toLowerCase());
}

// ---------- Validade do cartão ----------
// Máscara: digita 1230 -> mostra 12/30
export function formatarValidade(texto: string) {
  const d = texto.replace(/\D/g, '').slice(0, 4);
  return d.length <= 2 ? d : `${d.slice(0, 2)}/${d.slice(2)}`;
}

// Mês 01–12, não vencido e no máximo 20 anos à frente
export function validadeValida(valor: string) {
  const m = valor.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return false;
  const mes = Number(m[1]);
  const ano = 2000 + Number(m[2]);
  if (mes < 1 || mes > 12) return false;

  const agora = new Date();
  const primeiroDiaMesSeguinte = new Date(ano, mes, 1);
  return primeiroDiaMesSeguinte > agora && ano <= agora.getFullYear() + 20;
}

// ---------- Treino: filtros de digitação ----------
// Inteiro positivo com limite máximo (séries: 20)
export function sanitizarInteiro(texto: string, max: number) {
  const d = texto.replace(/\D/g, '').replace(/^0+/, '');
  if (d === '') return '';
  return Number(d) > max ? String(max) : d;
}

// Repetições: aceita "12" ou faixa "8-12", cada valor até o máximo
export function sanitizarReps(texto: string, max = 100) {
  const limpo = texto.replace(/[^0-9-]/g, '');
  const [a = '', b] = limpo.split('-');

  const limitar = (s: string) => {
    const d = s.replace(/^0+/, '');
    if (d === '') return '';
    return Number(d) > max ? String(max) : d;
  };

  if (b === undefined) return limitar(a);
  if (a === '') return limitar(b);
  return `${limitar(a)}-${limitar(b)}`;
}

// Peso em kg: aceita vírgula ou ponto, 1 casa decimal, máximo 500
export function sanitizarPeso(texto: string, max = 500) {
  let t = texto.replace(',', '.').replace(/[^0-9.]/g, '');
  const [inteiro, ...resto] = t.split('.');
  t = resto.length ? `${inteiro}.${resto.join('').slice(0, 1)}` : inteiro;
  if (t === '' || t === '.') return t === '.' ? '0.' : '';
  return Number(t) > max ? String(max) : t;
}

// ---------- Treino: validação na hora de salvar ----------
export function seriesValidas(v: string) {
  return /^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 20;
}

export function repsValidas(v: string) {
  const m = v.match(/^(\d{1,3})(?:-(\d{1,3}))?$/);
  if (!m) return false;
  const a = Number(m[1]);
  const b = m[2] === undefined ? a : Number(m[2]);
  return a >= 1 && b <= 100 && a <= b;
}

// Vazio conta como 0 (peso corporal)
export function pesoValido(v: string) {
  if (v === '') return true;
  if (!/^\d+(\.\d)?$/.test(v)) return false;
  return Number(v) <= 500;
}

// ---------- Atalhos para usar direto no onChangeText ----------
export const handlerValidade = (set: (v: string) => void) => (t: string) =>
  set(formatarValidade(t));

export const handlerInteiro =
  (set: (v: string) => void, max: number) => (t: string) =>
    set(sanitizarInteiro(t, max));

export const handlerReps = (set: (v: string) => void) => (t: string) =>
  set(sanitizarReps(t));

export const handlerPeso = (set: (v: string) => void) => (t: string) =>
  set(sanitizarPeso(t));
