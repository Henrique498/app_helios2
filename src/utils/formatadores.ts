export function apenasNumeros(texto: string) {
  return texto.replace(/\D/g, '');
}

export function formatarData(texto: string) {
  const n = apenasNumeros(texto).slice(0, 8);

  if (n.length <= 2) return n;
  if (n.length <= 4) return `${n.slice(0, 2)}/${n.slice(2)}`;
  return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4)}`;
}

export function formatarCPF(texto: string) {
  const n = apenasNumeros(texto).slice(0, 11);

  if (n.length <= 3) return n;
  if (n.length <= 6) return `${n.slice(0, 3)}.${n.slice(3)}`;
  if (n.length <= 9) return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6)}`;
  return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6, 9)}-${n.slice(9)}`;
}

export function formatarTelefone(texto: string) {
  const n = apenasNumeros(texto).slice(0, 11);

  if (n.length <= 2) return n;
  if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  if (n.length <= 10)
    return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
}

export function formatarCEP(texto: string) {
  const n = apenasNumeros(texto).slice(0, 8);

  if (n.length <= 5) return n;
  return `${n.slice(0, 5)}-${n.slice(5)}`;
}

export function formatarNumeroCartao(texto: string) {
  const n = apenasNumeros(texto).slice(0, 16);
  return n.replace(/(\d{4})(?=\d)/g, '$1 ');
}

export function formatarValidade(texto: string) {
  const n = apenasNumeros(texto).slice(0, 4);

  if (n.length <= 2) return n;
  return `${n.slice(0, 2)}/${n.slice(2)}`;
}

export function formatarCNPJ(texto: string) {
  const n = apenasNumeros(texto).slice(0, 14);

  if (n.length <= 2) return n;
  if (n.length <= 5) return `${n.slice(0, 2)}.${n.slice(2)}`;
  if (n.length <= 8) return `${n.slice(0, 2)}.${n.slice(2, 5)}.${n.slice(5)}`;
  if (n.length <= 12)
    return `${n.slice(0, 2)}.${n.slice(2, 5)}.${n.slice(5, 8)}/${n.slice(8)}`;
  return `${n.slice(0, 2)}.${n.slice(2, 5)}.${n.slice(5, 8)}/${n.slice(8, 12)}-${n.slice(12)}`;
}

export function formatarTempo(totalSegundos: number, comHoras = false) {
  const h = Math.floor(totalSegundos / 3600);
  const m = Math.floor((totalSegundos % 3600) / 60);
  const s = totalSegundos % 60;
  const dois = (n: number) => String(n).padStart(2, '0');

  return comHoras
    ? `${dois(h)}:${dois(m)}:${dois(s)}`
    : `${dois(m)}:${dois(s)}`;
}
