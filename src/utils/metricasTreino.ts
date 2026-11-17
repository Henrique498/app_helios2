import { DiaSemana, Exercicio } from '../types/treinos';

export type RegistroExecucao = {
  exercicioId: string;
  nome: string;
  grupo: string;
  series: number;
  repeticoes: number;
  carga: number;
  tonelagem: number;
  oneRM: number;
  percentual1RM: number;
};

export type SessaoConcluida = {
  id: string;
  data: string;
  diaSemana: DiaSemana;
  duracaoSegundos: number;
  tonelagemTotal: number;
  repeticoesTotais: number;
  exercicios: RegistroExecucao[];
};

export type TipoPeriodizacao = 'MICRO' | 'MESO' | 'MACRO';
export type FrequenciaMeta = 'SEMANAL' | 'MENSAL';

export type ConfigPeriodizacao = {
  tipo: TipoPeriodizacao;
  frequenciaMeta: FrequenciaMeta;
  objetivoPessoal: string;
  estiloMesociclo: string;
  semanasMesociclo: number;
  metaMacroAnual: string;
  metaTreinosAno: number;
};

export type AmigoRanking = {
  id: string;
  nome: string;
  treinosSemana: number;
  tonelagemSemana: number;
  isUsuario?: boolean;
};

export type SemanaMesocicloPlano = {
  semana: number;
  fase: string;
  percentual1RM: number;
  repsAlvo: string;
  cargaSugeridaKg: number;
};

export function arredondarAnilha(peso: number): number {
  if (peso <= 0) return 0;
  return Math.round(peso / 2.5) * 2.5;
}

export function extrairRepsNumericas(reps: string): number {
  if (!reps) return 0;
  if (reps.includes('-')) {
    const [min, max] = reps.split('-').map((n) => Number(n.replace(/\D/g, '')));
    return Math.round(((min || 0) + (max || 0)) / 2);
  }
  return Number(reps.replace(/\D/g, '')) || 0;
}

export function calcular1RM(carga: number, reps: number): number {
  if (carga <= 0) return 0;
  if (reps <= 1) return arredondarAnilha(carga);
  return arredondarAnilha(carga * (1 + reps / 30));
}

export function calcularTonelagemExercicio(ex: Exercicio): number {
  const series = Number(ex.series) || 0;
  const reps = extrairRepsNumericas(ex.repeticoes);
  const carga = Number(ex.carga) || 0;
  return series * reps * carga;
}

export function gerarPlanoMesociclo(
  oneRMBase: number,
  semanas: number,
  estilo: string
): SemanaMesocicloPlano[] {
  const base = oneRMBase > 0 ? oneRMBase : 25;
  const plano: SemanaMesocicloPlano[] = [];

  for (let i = 1; i <= semanas; i++) {
    const isDeload = semanas >= 4 && i === semanas;
    let perc = 70;
    let fase = 'Acumulação';
    let repsAlvo = '10-12 reps';

    if (isDeload) {
      perc = 60;
      fase = 'Deload (Recuperação)';
      repsAlvo = '12 reps leves';
    } else if (estilo.includes('Força')) {
      perc = Math.min(92, 78 + (i - 1) * 4);
      fase = i === 1 ? 'Base de Força' : 'Intensificação';
      repsAlvo = '4-6 reps';
    } else if (estilo.includes('Ondulatória')) {
      const impar = i % 2 !== 0;
      perc = impar ? 70 : 82;
      fase = impar ? 'Volume Metabólico' : 'Tensão Mecânica';
      repsAlvo = impar ? '12-15 reps' : '6-8 reps';
    } else if (estilo.includes('Cutting')) {
      perc = 65 + (i - 1) * 2;
      fase = 'Densidade Metabólica';
      repsAlvo = '15 reps (descanso curto)';
    } else {
      // Hipertrofia Linear padrão
      perc = 70 + (i - 1) * 3;
      fase = i === 1 ? 'Adaptação' : 'Progressão de Carga';
      repsAlvo = i <= 2 ? '10-12 reps' : '8-10 reps';
    }

    const cargaBruta = (base * perc) / 100;
    const cargaSugeridaKg = arredondarAnilha(cargaBruta);

    plano.push({
      semana: i,
      fase,
      percentual1RM: perc,
      repsAlvo,
      cargaSugeridaKg,
    });
  }

  return plano;
}

export function calcularDescansoEntreTreinos(
  historico: SessaoConcluida[]
): string {
  if (!historico.length) return 'Primeiro treino da semana';
  const ultimaData = new Date(historico[0].data).getTime();
  const diffMs = Date.now() - ultimaData;
  const horas = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));

  if (horas < 1) return 'Concluído há menos de 1h (Em recuperação imediata)';
  if (horas < 24) return `${horas}h de descanso desde o último treino`;
  const dias = Math.floor(horas / 24);
  const restoHoras = horas % 24;
  return `${dias}d ${restoHoras}h de descanso entre treinos`;
}

export function analisarVolumeSemanal(rotina: Record<DiaSemana, Exercicio[]>) {
  const porMusculo: Record<
    string,
    { tonelagem: number; series: number; reps: number }
  > = {};
  let tonelagemTotalSemanal = 0;
  let repeticoesTotaisSemanais = 0;

  Object.values(rotina).forEach((lista) => {
    lista.forEach((ex) => {
      const grupo = ex.grupo || 'Outros';
      const series = Number(ex.series) || 0;
      const reps = extrairRepsNumericas(ex.repeticoes);
      const carga = Number(ex.carga) || 0;
      const ton = series * reps * carga;

      if (!porMusculo[grupo]) {
        porMusculo[grupo] = { tonelagem: 0, series: 0, reps: 0 };
      }
      porMusculo[grupo].tonelagem += ton;
      porMusculo[grupo].series += series;
      porMusculo[grupo].reps += series * reps;

      tonelagemTotalSemanal += ton;
      repeticoesTotaisSemanais += series * reps;
    });
  });

  const rankingMusculos = Object.entries(porMusculo)
    .map(([musculo, dados]) => ({ musculo, ...dados }))
    .sort((a, b) => b.tonelagem - a.tonelagem);

  return {
    tonelagemTotalSemanal,
    repeticoesTotaisSemanais,
    musculoMaisTreinado: rankingMusculos[0] || null,
    rankingMusculos,
  };
}

export function gerarRankingsExercicios(
  rotina: Record<DiaSemana, Exercicio[]>,
  historico: SessaoConcluida[]
) {
  const mapa: Record<
    string,
    { nome: string; grupo: string; vezesUsado: number; maiorCarga: number }
  > = {};

  Object.values(rotina).forEach((lista) => {
    lista.forEach((ex) => {
      const chave = ex.nome.trim().toLowerCase();
      const carga = Number(ex.carga) || 0;
      if (!mapa[chave]) {
        mapa[chave] = {
          nome: ex.nome,
          grupo: ex.grupo || 'Geral',
          vezesUsado: 1,
          maiorCarga: carga,
        };
      } else {
        mapa[chave].vezesUsado += 1;
        if (carga > mapa[chave].maiorCarga) mapa[chave].maiorCarga = carga;
      }
    });
  });

  historico.forEach((sessao) => {
    sessao.exercicios.forEach((ex) => {
      const chave = ex.nome.trim().toLowerCase();
      if (!mapa[chave]) {
        mapa[chave] = {
          nome: ex.nome,
          grupo: ex.grupo,
          vezesUsado: 1,
          maiorCarga: ex.carga,
        };
      } else {
        mapa[chave].vezesUsado += 1;
        if (ex.carga > mapa[chave].maiorCarga)
          mapa[chave].maiorCarga = ex.carga;
      }
    });
  });

  const lista = Object.values(mapa);
  return {
    maisUsados: [...lista]
      .sort((a, b) => b.vezesUsado - a.vezesUsado)
      .slice(0, 5),
    maisPesados: [...lista]
      .sort((a, b) => b.maiorCarga - a.maiorCarga)
      .slice(0, 5),
  };
}
