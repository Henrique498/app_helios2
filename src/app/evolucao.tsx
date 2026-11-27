import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useRotina } from '../contexts/RotinaContext';
import {
  analisarVolumeSemanal,
  calcularDescansoEntreTreinos,
  FrequenciaMeta,
  gerarPlanoMesociclo,
  gerarRankingsExercicios,
  SessaoConcluida,
  TipoPeriodizacao,
} from '../utils/metricasTreino';

const ESTILOS_PERIODIZACAO = [
  'Hipertrofia Linear',
  'Força Máxima (5x5)',
  'Ondulatória (DUP)',
  'Resistência / Cutting',
];

const NOMES_MESES = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

type PontoMensal = {
  chave: string;
  label: string;
  tonelagem: number;
  treinos: number;
  variacaoPercentual: number | null;
  status: 'SUBIU' | 'DESCEU' | 'ESTAVEL';
};

function gerarSerieMensal(historico: SessaoConcluida[]): PontoMensal[] {
  const agora = new Date();
  const chaveMesAtual = `${agora.getFullYear()}-${String(
    agora.getMonth() + 1
  ).padStart(2, '0')}`;

  const baseMeses: Record<
    string,
    { label: string; tonelagem: number; treinos: number }
  > = {
    '2026-06': { label: 'Jun', tonelagem: 18500, treinos: 12 },
    '2026-07': { label: 'Jul', tonelagem: 22400, treinos: 15 },
    '2026-08': { label: 'Ago', tonelagem: 20100, treinos: 13 },
    '2026-09': { label: 'Set', tonelagem: 25800, treinos: 17 },
    '2026-10': { label: 'Out', tonelagem: 29200, treinos: 19 },
    '2026-11': { label: 'Nov', tonelagem: 0, treinos: 0 },
  };

  historico.forEach((sessao) => {
    const dt = new Date(sessao.data);
    if (isNaN(dt.getTime())) return;
    const ano = dt.getFullYear();
    const mesIdx = dt.getMonth();
    const chave = `${ano}-${String(mesIdx + 1).padStart(2, '0')}`;

    if (!baseMeses[chave]) {
      baseMeses[chave] = {
        label: NOMES_MESES[mesIdx],
        tonelagem: 0,
        treinos: 0,
      };
    }
    baseMeses[chave].tonelagem += sessao.tonelagemTotal;
    baseMeses[chave].treinos += 1;
  });

  const ordenados = Object.entries(baseMeses)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6);

  return ordenados.map(([chave, dados], index) => {
    // Não calcula variação percentual para o mês base nem para o mês em andamento
    if (index === 0 || chave === chaveMesAtual) {
      return {
        chave,
        ...dados,
        variacaoPercentual: null,
        status: 'ESTAVEL',
      };
    }

    const anterior = ordenados[index - 1][1].tonelagem;
    if (anterior <= 0) {
      return { chave, ...dados, variacaoPercentual: 100, status: 'SUBIU' };
    }

    const diff = Math.round(((dados.tonelagem - anterior) / anterior) * 100);
    const status = diff > 0 ? 'SUBIU' : diff < 0 ? 'DESCEU' : 'ESTAVEL';

    return {
      chave,
      ...dados,
      variacaoPercentual: diff,
      status,
    };
  });
}

export default function EvolucaoScreen() {
  const router = useRouter();
  const {
    rotina,
    historicoSessoes,
    periodizacao,
    atualizarPeriodizacao,
    amigos,
  } = useRotina();

  const [abaRanking, setAbaRanking] = useState<'USADOS' | 'PESO'>('USADOS');
  const [criterioAmigos, setCriterioAmigos] = useState<'TONELAGEM' | 'TREINOS'>(
    'TONELAGEM'
  );

  const serieMensal = useMemo(
    () => gerarSerieMensal(historicoSessoes),
    [historicoSessoes]
  );
  const [mesSelecionadoIdx, setMesSelecionadoIdx] = useState<number>(
    serieMensal.length - 1
  );

  const maiorTonelagemGrafico = Math.max(
    ...serieMensal.map((m) => m.tonelagem),
    1
  );
  const mesAtivo =
    serieMensal[mesSelecionadoIdx] || serieMensal[serieMensal.length - 1];

  const {
    tonelagemTotalSemanal,
    repeticoesTotaisSemanais,
    musculoMaisTreinado,
    rankingMusculos,
  } = analisarVolumeSemanal(rotina);
  const { maisUsados, maisPesados } = gerarRankingsExercicios(
    rotina,
    historicoSessoes
  );
  const descansoEntreTreinos = calcularDescansoEntreTreinos(historicoSessoes);

  const evolucaoPositiva =
    historicoSessoes.length >= 2
      ? historicoSessoes[0].tonelagemTotal >= historicoSessoes[1].tonelagemTotal
      : true;

  const amigosOrdenados = [...amigos].sort((a, b) =>
    criterioAmigos === 'TONELAGEM'
      ? b.tonelagemSemana - a.tonelagemSemana
      : b.treinosSemana - a.treinosSemana
  );

  const planoMesociclo = useMemo(
    () =>
      gerarPlanoMesociclo(
        25,
        periodizacao.semanasMesociclo,
        periodizacao.estiloMesociclo
      ),
    [periodizacao.semanasMesociclo, periodizacao.estiloMesociclo]
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#0A0F1D' }}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 40,
      }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Topo */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 18,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text
          style={{ color: '#FFB800', fontSize: 18, fontWeight: '800' }}
          accessibilityRole="header"
        >
          Dashboard de Evolução
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 1. Indicador de Evolução + Descanso entre treinos */}
      <View
        accessible
        accessibilityLabel={`${
          evolucaoPositiva
            ? 'Em evolução contínua'
            : 'Atenção: volume abaixo do último treino'
        }. ${descansoEntreTreinos}`}
        style={{
          backgroundColor: '#0D1B2A',
          borderWidth: 1,
          borderColor: evolucaoPositiva ? '#16A34A' : '#DC2626',
          borderRadius: 16,
          padding: 16,
          marginBottom: 18,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Ionicons
            name={evolucaoPositiva ? 'trending-up' : 'trending-down'}
            size={30}
            color={evolucaoPositiva ? '#22C55E' : '#EF4444'}
            importantForAccessibility="no"
          />
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '800' }}>
              {evolucaoPositiva
                ? 'Em Evolução Contínua!'
                : 'Atenção: Volume abaixo do último treino'}
            </Text>
            <Text style={{ color: '#94A3B8', fontSize: 12, marginTop: 2 }}>
              {descansoEntreTreinos}
            </Text>
          </View>
        </View>
      </View>

      {/* 2. Gráfico de Evolução Mensal (Subiu / Desceu) */}
      <Text
        accessibilityRole="header"
        style={{
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: '800',
          marginBottom: 10,
        }}
      >
        Evolução Mensal (Tonelagem & Frequência)
      </Text>

      <View
        style={{
          backgroundColor: '#0D1B2A',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#1E293B',
          padding: 16,
          marginBottom: 20,
        }}
      >
        {mesAtivo && (
          <View
            accessibilityLiveRegion="polite"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#111827',
              borderRadius: 12,
              padding: 12,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: '#1E293B',
            }}
          >
            <View>
              <Text style={{ color: '#94A3B8', fontSize: 11 }}>
                Desempenho em {mesAtivo.label}/{mesAtivo.chave.slice(0, 4)}
              </Text>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 18,
                  fontWeight: '900',
                  marginTop: 2,
                }}
              >
                {mesAtivo.tonelagem.toLocaleString('pt-BR')} kg
              </Text>
              <Text style={{ color: '#94A3B8', fontSize: 11, marginTop: 2 }}>
                {mesAtivo.treinos} treinos concluídos
              </Text>
            </View>

            {mesAtivo.variacaoPercentual !== null ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  backgroundColor:
                    mesAtivo.status === 'SUBIU'
                      ? 'rgba(34, 197, 94, 0.16)'
                      : mesAtivo.status === 'DESCEU'
                        ? 'rgba(239, 68, 68, 0.16)'
                        : 'rgba(148, 163, 184, 0.16)',
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 8,
                }}
              >
                <Ionicons
                  name={
                    mesAtivo.status === 'SUBIU'
                      ? 'arrow-up'
                      : mesAtivo.status === 'DESCEU'
                        ? 'arrow-down'
                        : 'remove'
                  }
                  size={15}
                  color={
                    mesAtivo.status === 'SUBIU'
                      ? '#22C55E'
                      : mesAtivo.status === 'DESCEU'
                        ? '#EF4444'
                        : '#94A3B8'
                  }
                  importantForAccessibility="no"
                />
                <Text
                  style={{
                    color:
                      mesAtivo.status === 'SUBIU'
                        ? '#22C55E'
                        : mesAtivo.status === 'DESCEU'
                          ? '#EF4444'
                          : '#94A3B8',
                    fontWeight: '800',
                    fontSize: 13,
                  }}
                >
                  {mesAtivo.variacaoPercentual > 0
                    ? `+${mesAtivo.variacaoPercentual}%`
                    : `${mesAtivo.variacaoPercentual}%`}
                </Text>
              </View>
            ) : (
              <Text style={{ color: '#94A3B8', fontSize: 11 }}>
                {mesAtivo.treinos === 0 ? 'Em andamento' : 'Mês base'}
              </Text>
            )}
          </View>
        )}

        {/* Barras verticais dos meses */}
        <View
          accessibilityLabel="Gráfico de evolução mensal. Toque em um mês para ver detalhes."
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: 150,
            paddingTop: 20,
            paddingHorizontal: 4,
          }}
        >
          {serieMensal.map((ponto, idx) => {
            const alturaPx = Math.max(
              14,
              Math.round((ponto.tonelagem / maiorTonelagemGrafico) * 110)
            );
            const selecionado = idx === mesSelecionadoIdx;

            const corBarra =
              ponto.status === 'SUBIU'
                ? '#22C55E'
                : ponto.status === 'DESCEU'
                  ? '#EF4444'
                  : '#FFB800';

            const textoVariacao =
              ponto.variacaoPercentual === null
                ? 'mês base'
                : ponto.status === 'SUBIU'
                  ? `subiu ${ponto.variacaoPercentual}%`
                  : ponto.status === 'DESCEU'
                    ? `desceu ${Math.abs(ponto.variacaoPercentual)}%`
                    : 'estável';

            return (
              <Pressable
                key={ponto.chave}
                onPress={() => setMesSelecionadoIdx(idx)}
                hitSlop={{ top: 8, bottom: 8 }}
                accessibilityRole="button"
                accessibilityLabel={`${ponto.label}: ${ponto.tonelagem.toLocaleString(
                  'pt-BR'
                )} quilos, ${ponto.treinos} treinos, ${textoVariacao}`}
                accessibilityState={{ selected: selecionado }}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                {ponto.variacaoPercentual !== null && (
                  <Text
                    style={{
                      color: corBarra,
                      fontSize: 10,
                      fontWeight: '800',
                      marginBottom: 4,
                    }}
                  >
                    {ponto.variacaoPercentual > 0
                      ? `+${ponto.variacaoPercentual}%`
                      : `${ponto.variacaoPercentual}%`}
                  </Text>
                )}

                <View
                  style={{
                    width: 26,
                    height: alturaPx,
                    backgroundColor: corBarra,
                    borderRadius: 6,
                    opacity: selecionado ? 1 : 0.65,
                    borderWidth: selecionado ? 2 : 0,
                    borderColor: '#FFFFFF',
                  }}
                />

                <Text
                  style={{
                    color: selecionado ? '#FFB800' : '#94A3B8',
                    fontSize: 12,
                    fontWeight: selecionado ? '800' : '600',
                    marginTop: 8,
                  }}
                >
                  {ponto.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Legenda */}
        <View
          importantForAccessibility="no-hide-descendants"
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 16,
            marginTop: 14,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: '#1E293B',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#22C55E',
              }}
            />
            <Text style={{ color: '#94A3B8', fontSize: 11 }}>Subiu</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#EF4444',
              }}
            />
            <Text style={{ color: '#94A3B8', fontSize: 11 }}>Desceu</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#FFB800',
              }}
            />
            <Text style={{ color: '#94A3B8', fontSize: 11 }}>
              Base / Estável
            </Text>
          </View>
        </View>
      </View>

      {/* 3. Periodização & Objetivo Pessoal */}
      <Text
        accessibilityRole="header"
        style={{
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: '800',
          marginBottom: 10,
        }}
      >
        Periodização & Objetivo Pessoal
      </Text>

      <View
        style={{
          backgroundColor: '#0D1B2A',
          borderRadius: 14,
          borderWidth: 1,
          borderColor: '#1E293B',
          padding: 14,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: '#94A3B8', fontSize: 12, marginBottom: 6 }}>
          Frequência do Objetivo Pessoal:
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
          {(['SEMANAL', 'MENSAL'] as FrequenciaMeta[]).map((freq) => {
            const ativo = periodizacao.frequenciaMeta === freq;
            return (
              <Pressable
                key={freq}
                onPress={() => atualizarPeriodizacao({ frequenciaMeta: freq })}
                accessibilityRole="radio"
                accessibilityState={{ selected: ativo }}
                style={{
                  flex: 1,
                  backgroundColor: ativo ? '#FFB800' : '#111827',
                  paddingVertical: 8,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: ativo ? '#0A0F1D' : '#94A3B8',
                    fontWeight: '800',
                    fontSize: 12,
                  }}
                >
                  {freq === 'SEMANAL' ? 'Meta Semanal' : 'Meta Mensal'}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <TextInput
          style={{
            backgroundColor: '#111827',
            borderWidth: 1,
            borderColor: '#1E293B',
            borderRadius: 10,
            color: '#FFFFFF',
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 13,
            marginBottom: 14,
          }}
          placeholder="Escreva seu objetivo específico..."
          placeholderTextColor="#94A3B8"
          accessibilityLabel="Objetivo pessoal"
          value={periodizacao.objetivoPessoal}
          onChangeText={(txt) =>
            atualizarPeriodizacao({ objetivoPessoal: txt })
          }
        />

        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
          {(
            [
              { id: 'MICRO', label: 'Microciclo\n(Semanal)' },
              { id: 'MESO', label: 'Mesociclo\n(3-6 sem)' },
              { id: 'MACRO', label: 'Macrociclo\n(Anual)' },
            ] as { id: TipoPeriodizacao; label: string }[]
          ).map((item) => {
            const ativo = periodizacao.tipo === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => atualizarPeriodizacao({ tipo: item.id })}
                accessibilityRole="radio"
                accessibilityState={{ selected: ativo }}
                accessibilityLabel={
                  item.id === 'MICRO'
                    ? 'Microciclo semanal'
                    : item.id === 'MESO'
                      ? 'Mesociclo de 3 a 6 semanas'
                      : 'Macrociclo anual'
                }
                style={{
                  flex: 1,
                  backgroundColor: ativo ? '#FFB800' : '#111827',
                  borderWidth: 1,
                  borderColor: ativo ? '#FFB800' : '#1E293B',
                  borderRadius: 10,
                  paddingVertical: 8,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: ativo ? '#0A0F1D' : '#94A3B8',
                    fontSize: 11,
                    fontWeight: '800',
                    textAlign: 'center',
                  }}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {periodizacao.tipo === 'MICRO' && (
          <View style={{ gap: 4 }}>
            <Text style={{ color: '#FFB800', fontWeight: '800', fontSize: 13 }}>
              Microciclo Semanal (Medido por Peso & Repetições)
            </Text>
            <Text style={{ color: '#E2E8F0', fontSize: 13 }}>
              • Peso total movimentado:{' '}
              {tonelagemTotalSemanal.toLocaleString('pt-BR')} kg
            </Text>
            <Text style={{ color: '#E2E8F0', fontSize: 13 }}>
              • Repetições totais na semana: {repeticoesTotaisSemanais} reps
            </Text>
          </View>
        )}

        {periodizacao.tipo === 'MESO' && (
          <View style={{ gap: 8 }}>
            <Text style={{ color: '#FFB800', fontWeight: '800', fontSize: 13 }}>
              Mesociclo Nichado ({periodizacao.semanasMesociclo} semanas)
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {ESTILOS_PERIODIZACAO.map((estilo) => {
                const selecionado = periodizacao.estiloMesociclo === estilo;
                return (
                  <Pressable
                    key={estilo}
                    onPress={() =>
                      atualizarPeriodizacao({ estiloMesociclo: estilo })
                    }
                    accessibilityRole="radio"
                    accessibilityState={{ selected: selecionado }}
                    style={{
                      backgroundColor: selecionado
                        ? 'rgba(255, 184, 0, 0.2)'
                        : '#111827',
                      borderWidth: 1,
                      borderColor: selecionado ? '#FFB800' : '#1E293B',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: selecionado ? '#FFB800' : '#94A3B8',
                        fontSize: 12,
                        fontWeight: '700',
                      }}
                    >
                      {estilo}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginTop: 4,
              }}
            >
              <Text style={{ color: '#94A3B8', fontSize: 12 }}>Duração:</Text>
              {[3, 4, 5, 6].map((sem) => (
                <Pressable
                  key={sem}
                  onPress={() =>
                    atualizarPeriodizacao({ semanasMesociclo: sem })
                  }
                  accessibilityRole="radio"
                  accessibilityLabel={`${sem} semanas`}
                  accessibilityState={{
                    selected: periodizacao.semanasMesociclo === sem,
                  }}
                  style={{
                    minHeight: 44,
                    justifyContent: 'center',
                    backgroundColor:
                      periodizacao.semanasMesociclo === sem
                        ? '#FFB800'
                        : '#111827',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      color:
                        periodizacao.semanasMesociclo === sem
                          ? '#0A0F1D'
                          : '#FFFFFF',
                      fontWeight: '700',
                      fontSize: 12,
                    }}
                  >
                    {sem} sem
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Progressão semanal com cargas arredondadas em 2.5kg (ex: 17.5kg) */}
            <View style={{ marginTop: 8, gap: 6 }}>
              {planoMesociclo.map((sem) => (
                <View
                  key={sem.semana}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#111827',
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#1E293B',
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 12,
                        fontWeight: '700',
                      }}
                    >
                      Semana {sem.semana} • {sem.fase}
                    </Text>
                    <Text style={{ color: '#94A3B8', fontSize: 11 }}>
                      {sem.repsAlvo} ({sem.percentual1RM}% 1RM)
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#FFB800',
                      fontSize: 13,
                      fontWeight: '800',
                    }}
                  >
                    {sem.cargaSugeridaKg} kg
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {periodizacao.tipo === 'MACRO' && (
          <View style={{ gap: 4 }}>
            <Text style={{ color: '#FFB800', fontWeight: '800', fontSize: 13 }}>
              Macrociclo (Meta Anual)
            </Text>
            <Text style={{ color: '#E2E8F0', fontSize: 13 }}>
              • Meta: {periodizacao.metaMacroAnual}
            </Text>
            <Text style={{ color: '#94A3B8', fontSize: 12 }}>
              • Sessões concluídas no ano: {historicoSessoes.length} /{' '}
              {periodizacao.metaTreinosAno}
            </Text>
          </View>
        )}
      </View>

      {/* 4. Volume Load por Músculo */}
      <Text
        accessibilityRole="header"
        style={{
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: '800',
          marginBottom: 10,
        }}
      >
        Volume Load por Músculo (Tonelagem)
      </Text>
      <View
        style={{
          backgroundColor: '#0D1B2A',
          borderRadius: 14,
          borderWidth: 1,
          borderColor: '#1E293B',
          padding: 14,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: '#94A3B8', fontSize: 12 }}>
          Volume Total Semanal
        </Text>
        <Text
          style={{
            color: '#FFB800',
            fontSize: 24,
            fontWeight: '900',
            marginBottom: 8,
          }}
        >
          {tonelagemTotalSemanal.toLocaleString('pt-BR')} kg
        </Text>

        {musculoMaisTreinado && (
          <View
            style={{
              backgroundColor: 'rgba(255, 184, 0, 0.14)',
              padding: 10,
              borderRadius: 10,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: '#FFB800', fontSize: 13, fontWeight: '800' }}>
              Músculo com maior volume: {musculoMaisTreinado.musculo} (
              {musculoMaisTreinado.tonelagem.toLocaleString('pt-BR')} kg)
            </Text>
          </View>
        )}

        {rankingMusculos.map((m) => (
          <View
            key={m.musculo}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#1E293B',
            }}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>
              {m.musculo}
            </Text>
            <Text style={{ color: '#94A3B8' }}>
              {m.tonelagem.toLocaleString('pt-BR')} kg ({m.series} séries)
            </Text>
          </View>
        ))}
      </View>

      {/* 5. Ranking de Exercícios */}
      <Text
        accessibilityRole="header"
        style={{
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: '800',
          marginBottom: 10,
        }}
      >
        Ranking de Exercícios
      </Text>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
        <Pressable
          onPress={() => setAbaRanking('USADOS')}
          accessibilityRole="tab"
          accessibilityState={{ selected: abaRanking === 'USADOS' }}
          style={{
            flex: 1,
            backgroundColor: abaRanking === 'USADOS' ? '#FFB800' : '#111827',
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: abaRanking === 'USADOS' ? '#0A0F1D' : '#94A3B8',
              fontWeight: '800',
              fontSize: 12,
            }}
          >
            Mais Usados
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setAbaRanking('PESO')}
          accessibilityRole="tab"
          accessibilityState={{ selected: abaRanking === 'PESO' }}
          style={{
            flex: 1,
            backgroundColor: abaRanking === 'PESO' ? '#FFB800' : '#111827',
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: abaRanking === 'PESO' ? '#0A0F1D' : '#94A3B8',
              fontWeight: '800',
              fontSize: 12,
            }}
          >
            Com Mais Peso (kg)
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          backgroundColor: '#0D1B2A',
          borderRadius: 14,
          borderWidth: 1,
          borderColor: '#1E293B',
          padding: 14,
          marginBottom: 20,
        }}
      >
        {(abaRanking === 'USADOS' ? maisUsados : maisPesados).map((ex, idx) => (
          <View
            key={ex.nome}
            accessible
            accessibilityLabel={`${idx + 1}º lugar: ${ex.nome}, ${
              abaRanking === 'USADOS'
                ? `usado ${ex.vezesUsado} vezes`
                : `maior carga ${ex.maiorCarga} quilos`
            }`}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#1E293B',
            }}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>
              #{idx + 1} {ex.nome}
            </Text>
            <Text style={{ color: '#FFB800', fontWeight: '700' }}>
              {abaRanking === 'USADOS'
                ? `${ex.vezesUsado}x`
                : `${ex.maiorCarga} kg`}
            </Text>
          </View>
        ))}
      </View>

      {/* 6. Competição de Amigos */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <Text
          style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '800' }}
          accessibilityRole="header"
        >
          Competição de Amigos
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Ordenar por ${
            criterioAmigos === 'TONELAGEM' ? 'peso total' : 'treinos'
          }`}
          accessibilityHint="Toque para alternar entre peso total e número de treinos"
          onPress={() =>
            setCriterioAmigos((c) =>
              c === 'TONELAGEM' ? 'TREINOS' : 'TONELAGEM'
            )
          }
        >
          <Text style={{ color: '#FFB800', fontSize: 12, fontWeight: '700' }}>
            {criterioAmigos === 'TONELAGEM'
              ? 'Por Peso Total ▾'
              : 'Por Treinos ▾'}
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          backgroundColor: '#0D1B2A',
          borderRadius: 14,
          borderWidth: 1,
          borderColor: '#1E293B',
          padding: 14,
        }}
      >
        {amigosOrdenados.map((amigo, index) => (
          <View
            key={amigo.id}
            accessible
            accessibilityLabel={`${index + 1}º lugar: ${amigo.nome}${
              amigo.isUsuario ? ' (você)' : ''
            }, ${
              amigo.treinosSemana
            } treinos na semana, ${amigo.tonelagemSemana.toLocaleString(
              'pt-BR'
            )} quilos`}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
              marginBottom: 6,
              backgroundColor: amigo.isUsuario
                ? 'rgba(255, 184, 0, 0.14)'
                : '#111827',
              borderWidth: amigo.isUsuario ? 1 : 0,
              borderColor: '#FFB800',
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              <MaterialCommunityIcons
                name={index === 0 ? 'trophy' : 'medal-outline'}
                size={22}
                color={index === 0 ? '#FFB800' : '#94A3B8'}
                importantForAccessibility="no"
              />
              <View>
                <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>
                  {index + 1}º {amigo.nome}
                </Text>
                <Text style={{ color: '#94A3B8', fontSize: 11 }}>
                  {amigo.treinosSemana} treinos na semana
                </Text>
              </View>
            </View>

            <Text style={{ color: '#FFB800', fontWeight: '800', fontSize: 13 }}>
              {criterioAmigos === 'TONELAGEM'
                ? `${amigo.tonelagemSemana.toLocaleString('pt-BR')} kg`
                : `${amigo.treinosSemana} treinos`}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
