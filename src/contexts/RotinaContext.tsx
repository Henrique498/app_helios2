import React, { createContext, useContext, useState } from 'react';
import { DiaSemana, Exercicio, TREINOS_INICIAIS } from '../types/treinos';
import {
  AmigoRanking,
  calcular1RM,
  ConfigPeriodizacao,
  extrairRepsNumericas,
  RegistroExecucao,
  SessaoConcluida,
} from '../utils/metricasTreino';

type HistoricoCarga = {
  data: string;
  carga: number;
};

type RotinaContextType = {
  rotina: Record<DiaSemana, Exercicio[]>;
  historicoSessoes: SessaoConcluida[];
  historicoCargas: Record<string, HistoricoCarga[]>;
  periodizacao: ConfigPeriodizacao;
  amigos: AmigoRanking[];
  adicionarExercicio: (dia: DiaSemana, exercicio: Exercicio) => void;
  removerExercicio: (dia: DiaSemana, id: string) => void;
  editarExercicio: (
    dia: DiaSemana,
    id: string,
    dadosAtualizados: Partial<Exercicio>
  ) => void;
  alterarCargaExercicio: (dia: DiaSemana, id: string, deltaKg: number) => void;
  concluirTreino: (dia: DiaSemana, duracaoSegundos: number) => SessaoConcluida;
  atualizarPeriodizacao: (nova: Partial<ConfigPeriodizacao>) => void;
};

const RotinaContext = createContext<RotinaContextType | undefined>(undefined);

const AMIGOS_INICIAIS: AmigoRanking[] = [
  { id: '1', nome: 'Lucas Silva', treinosSemana: 5, tonelagemSemana: 28400 },
  {
    id: '2',
    nome: 'Você (Aluno)',
    treinosSemana: 4,
    tonelagemSemana: 24950,
    isUsuario: true,
  },
  { id: '3', nome: 'Ana Oliveira', treinosSemana: 4, tonelagemSemana: 19200 },
  { id: '4', nome: 'Rodrigo Santos', treinosSemana: 3, tonelagemSemana: 16800 },
];

export function RotinaProvider({ children }: { children: React.ReactNode }) {
  const [rotina, setRotina] =
    useState<Record<DiaSemana, Exercicio[]>>(TREINOS_INICIAIS);

  const [historicoSessoes, setHistoricoSessoes] = useState<SessaoConcluida[]>([
    {
      id: 's1',
      data: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
      diaSemana: 'QUA',
      duracaoSegundos: 3480,
      tonelagemTotal: 8900,
      repeticoesTotais: 130,
      exercicios: [
        {
          exercicioId: 'qua-1',
          nome: 'Agachamento Livre',
          grupo: 'Pernas',
          series: 4,
          repeticoes: 10,
          carga: 60,
          tonelagem: 2400,
          oneRM: 80,
          percentual1RM: 75,
        },
      ],
    },
    {
      id: 's2',
      data: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
      diaSemana: 'SEG',
      duracaoSegundos: 3120,
      tonelagemTotal: 7400,
      repeticoesTotais: 110,
      exercicios: [
        {
          exercicioId: 'seg-1',
          nome: 'Supino Reto',
          grupo: 'Peito',
          series: 4,
          repeticoes: 10,
          carga: 40,
          tonelagem: 1600,
          oneRM: 53,
          percentual1RM: 75,
        },
      ],
    },
  ]);

  const [historicoCargas, setHistoricoCargas] = useState<
    Record<string, HistoricoCarga[]>
  >({
    'Supino Reto': [
      { data: '01/11', carga: 35 },
      { data: '08/11', carga: 38 },
      { data: '15/11', carga: 40 },
    ],
    'Agachamento Livre': [
      { data: '01/11', carga: 50 },
      { data: '08/11', carga: 55 },
      { data: '15/11', carga: 60 },
    ],
  });

  const [periodizacao, setPeriodizacao] = useState<ConfigPeriodizacao>({
    tipo: 'MICRO',
    frequenciaMeta: 'SEMANAL',
    objetivoPessoal: 'Hipertrofia e progressão de carga',
    estiloMesociclo: 'Hipertrofia Linear',
    semanasMesociclo: 4,
    metaMacroAnual: '180 treinos no ano + 100kg no Supino',
    metaTreinosAno: 180,
  });

  const [amigos, setAmigos] = useState<AmigoRanking[]>(AMIGOS_INICIAIS);

  function adicionarExercicio(dia: DiaSemana, exercicio: Exercicio) {
    setRotina((prev) => ({
      ...prev,
      [dia]: [...(prev[dia] || []), exercicio],
    }));
  }

  function removerExercicio(dia: DiaSemana, id: string) {
    setRotina((prev) => ({
      ...prev,
      [dia]: (prev[dia] || []).filter((item) => item.id !== id),
    }));
  }

  // 👇 AQUI ENTRA A FUNÇÃO editarExercicio
  function editarExercicio(
    dia: DiaSemana,
    id: string,
    dadosAtualizados: Partial<Exercicio>
  ) {
    setRotina((prev) => {
      const listaAtualizada = (prev[dia] || []).map((ex) => {
        if (ex.id !== id) return ex;

        if (dadosAtualizados.carga && dadosAtualizados.carga !== ex.carga) {
          const hoje = new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
          });
          setHistoricoCargas((hPrev) => ({
            ...hPrev,
            [ex.nome]: [
              ...(hPrev[ex.nome] || []),
              { data: hoje, carga: Number(dadosAtualizados.carga) || 0 },
            ],
          }));
        }

        return { ...ex, ...dadosAtualizados };
      });

      return { ...prev, [dia]: listaAtualizada };
    });
  }

  function alterarCargaExercicio(dia: DiaSemana, id: string, deltaKg: number) {
    setRotina((prev) => {
      const listaAtualizada = (prev[dia] || []).map((ex) => {
        if (ex.id !== id) return ex;
        const cargaAtual = Number(ex.carga) || 0;
        const novaCarga = Math.max(0, cargaAtual + deltaKg);

        const hoje = new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
        });
        setHistoricoCargas((hPrev) => ({
          ...hPrev,
          [ex.nome]: [
            ...(hPrev[ex.nome] || []),
            { data: hoje, carga: novaCarga },
          ],
        }));

        return { ...ex, carga: String(novaCarga) };
      });

      return { ...prev, [dia]: listaAtualizada };
    });
  }

  function concluirTreino(
    dia: DiaSemana,
    duracaoSegundos: number
  ): SessaoConcluida {
    const lista = rotina[dia] || [];
    let tonelagemTotal = 0;
    let repeticoesTotais = 0;

    const registros: RegistroExecucao[] = lista.map((ex) => {
      const series = Number(ex.series) || 0;
      const reps = extrairRepsNumericas(ex.repeticoes);
      const carga = Number(ex.carga) || 0;
      const ton = series * reps * carga;
      const oneRM = calcular1RM(carga, reps);
      const percentual1RM = oneRM > 0 ? Math.round((carga / oneRM) * 100) : 0;

      tonelagemTotal += ton;
      repeticoesTotais += series * reps;

      return {
        exercicioId: ex.id,
        nome: ex.nome,
        grupo: ex.grupo || 'Geral',
        series,
        repeticoes: reps,
        carga,
        tonelagem: ton,
        oneRM,
        percentual1RM,
      };
    });

    const novaSessao: SessaoConcluida = {
      id: String(Date.now()),
      data: new Date().toISOString(),
      diaSemana: dia,
      duracaoSegundos,
      tonelagemTotal,
      repeticoesTotais,
      exercicios: registros,
    };

    setHistoricoSessoes((prev) => [novaSessao, ...prev]);

    setAmigos((prev) =>
      prev
        .map((a) =>
          a.isUsuario
            ? {
                ...a,
                treinosSemana: a.treinosSemana + 1,
                tonelagemSemana: a.tonelagemSemana + tonelagemTotal,
              }
            : a
        )
        .sort((a, b) => b.tonelagemSemana - a.tonelagemSemana)
    );

    return novaSessao;
  }

  function atualizarPeriodizacao(nova: Partial<ConfigPeriodizacao>) {
    setPeriodizacao((prev) => ({ ...prev, ...nova }));
  }

  return (
    <RotinaContext.Provider
      value={{
        rotina,
        historicoSessoes,
        historicoCargas,
        periodizacao,
        amigos,
        adicionarExercicio,
        removerExercicio,
        editarExercicio,
        alterarCargaExercicio,
        concluirTreino,
        atualizarPeriodizacao,
      }}
    >
      {children}
    </RotinaContext.Provider>
  );
}

export function useRotina() {
  const ctx = useContext(RotinaContext);
  if (!ctx)
    throw new Error('useRotina deve ser usado dentro de RotinaProvider');
  return ctx;
}
