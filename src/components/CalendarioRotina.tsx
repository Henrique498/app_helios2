import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useRotina } from '../contexts/RotinaContext';
import { styles } from '../styles/DashBoard.styles';
import { DiaSemana, NOMES_DIAS } from '../types/treinos';

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
const DIAS_KEYS: DiaSemana[] = [
  'SEG',
  'TER',
  'QUA',
  'QUI',
  'SEX',
  'SAB',
  'DOM',
];
const MESES = [
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

type Celula = { numero: number; doMes: boolean; data: Date };
type Seletor = 'mes' | 'ano' | null;

// Monta as semanas do mês (começando na segunda), completando com dias
// do mês anterior e do próximo para fechar as linhas.
function montarSemanas(ano: number, mes: number): Celula[][] {
  const deslocamento = (new Date(ano, mes, 1).getDay() + 6) % 7;
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  const totalCelulas = Math.ceil((deslocamento + totalDias) / 7) * 7;

  const celulas: Celula[] = [];
  for (let i = 0; i < totalCelulas; i++) {
    const data = new Date(ano, mes, i - deslocamento + 1);
    celulas.push({
      numero: data.getDate(),
      doMes: data.getMonth() === mes,
      data,
    });
  }

  return Array.from({ length: totalCelulas / 7 }, (_, s) =>
    celulas.slice(s * 7, s * 7 + 7)
  );
}

export default function CalendarioRotina() {
  const { rotina } = useRotina();
  const [diaDescanso, setDiaDescanso] = useState<DiaSemana | null>(null);
  const [seletor, setSeletor] = useState<Seletor>(null);

  const hoje = new Date();
  const [mesVisivel, setMesVisivel] = useState(
    () => new Date(hoje.getFullYear(), hoje.getMonth(), 1)
  );

  const ano = mesVisivel.getFullYear();
  const mes = mesVisivel.getMonth();
  const semanas = useMemo(() => montarSemanas(ano, mes), [ano, mes]);

  // 12 anos: 5 antes e 6 depois do ano atual
  const anosDisponiveis = Array.from(
    { length: 12 },
    (_, i) => hoje.getFullYear() - 5 + i
  );

  function mudarMes(delta: number) {
    setDiaDescanso(null);
    setMesVisivel(new Date(ano, mes + delta, 1));
  }

  function escolherMes(novoMes: number) {
    setDiaDescanso(null);
    setMesVisivel(new Date(ano, novoMes, 1));
    setSeletor(null);
  }

  function escolherAno(novoAno: number) {
    setDiaDescanso(null);
    setMesVisivel(new Date(novoAno, mes, 1));
    setSeletor(null);
  }

  const irParaTreino = (indexDia: number) => {
    const diaKey = DIAS_KEYS[indexDia];
    const temTreino = (rotina[diaKey]?.length || 0) > 0;

    if (temTreino) {
      setDiaDescanso(null);
      router.push({
        pathname: '/treino',
        params: { dia: diaKey },
      });
    } else {
      setDiaDescanso((prev) => (prev === diaKey ? null : diaKey));
    }
  };

  return (
    <View style={styles.calendario}>
      <View style={styles.calTopo}>
        <View style={styles.chips}>
          <TouchableOpacity
            onPress={() => mudarMes(-1)}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Mês anterior"
          >
            <Ionicons name="chevron-back" size={20} color="#FFB800" />
          </TouchableOpacity>

          <Pressable
            style={styles.chip}
            onPress={() => setSeletor('mes')}
            accessibilityRole="button"
            accessibilityLabel={`Mês: ${MESES[mes]}. Toque para alterar`}
          >
            <Text style={styles.chipTexto}>{MESES[mes]} ▾</Text>
          </Pressable>
          <Pressable
            style={styles.chip}
            onPress={() => setSeletor('ano')}
            accessibilityRole="button"
            accessibilityLabel={`Ano: ${ano}. Toque para alterar`}
          >
            <Text style={styles.chipTexto}>{ano} ▾</Text>
          </Pressable>

          <TouchableOpacity
            onPress={() => mudarMes(1)}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Próximo mês"
          >
            <Ionicons name="chevron-forward" size={20} color="#FFB800" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.calDireita}
          onPress={() => router.push('/minha-rotina')}
          accessibilityRole="button"
          accessibilityLabel="Abrir Sua Rotina"
        >
          <Text style={styles.suaRotina}>Sua Rotina</Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color="#FFB800"
            importantForAccessibility="no"
            accessibilityElementsHidden
          />
        </TouchableOpacity>
      </View>

      {/* Linha dos dias da semana (Seg a Dom) */}
      <View style={styles.semana}>
        {DIAS.map((dia, index) => {
          const diaKey = DIAS_KEYS[index];
          const ativo = (rotina[diaKey]?.length || 0) > 0;

          return (
            <TouchableOpacity
              key={dia}
              style={[styles.celula, ativo && styles.celulaAtiva]}
              onPress={() => irParaTreino(index)}
              accessibilityRole="button"
              accessibilityLabel={NOMES_DIAS[diaKey]}
              accessibilityState={{ selected: ativo }}
            >
              <Text
                style={[styles.celulaTexto, ativo && styles.celulaTextoAtivo]}
              >
                {dia}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Grelha dos números do mês */}
      {semanas.map((semana, sIndex) => (
        <View key={sIndex} style={styles.semana}>
          {semana.map((celula, dIndex) => {
            const diaKey = DIAS_KEYS[dIndex];
            const ativo = (rotina[diaKey]?.length || 0) > 0;
            const ehHoje = celula.data.toDateString() === hoje.toDateString();
            const rotuloDia = celula.data.toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            });

            return (
              <TouchableOpacity
                key={`${sIndex}-${dIndex}`}
                style={[
                  styles.celula,
                  ativo && styles.celulaAtiva,
                  ehHoje && { borderWidth: 1.5, borderColor: '#FFFFFF' },
                ]}
                onPress={() => irParaTreino(dIndex)}
                accessibilityRole="button"
                accessibilityLabel={`${rotuloDia}${ehHoje ? ', hoje' : ''}${
                  !celula.doMes ? ', fora do mês atual' : ''
                }, ${ativo ? 'com treino' : 'dia de descanso'}`}
                accessibilityState={{ selected: ehHoje }}
              >
                <Text
                  style={[
                    styles.celulaTexto,
                    ativo && styles.celulaTextoAtivo,
                    !celula.doMes && { opacity: 0.35 },
                  ]}
                >
                  {celula.numero}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      {/* Card de descanso ao tocar em um dia da semana sem treino */}
      {diaDescanso && (rotina[diaDescanso]?.length || 0) === 0 ? (
        <View style={styles.descansoCard} accessibilityLiveRegion="polite">
          <View style={styles.descansoInfo}>
            <Ionicons
              name="bed-outline"
              size={22}
              color="#FFB800"
              importantForAccessibility="no"
              accessibilityElementsHidden
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.descansoTitulo}>
                {NOMES_DIAS[diaDescanso]} é dia de descanso
              </Text>
              <Text style={styles.descansoSubtitulo}>
                Não quer descansar? Adicione exercícios.
              </Text>
            </View>
          </View>

          <Pressable
            style={styles.botaoAdicionarDescanso}
            accessibilityRole="button"
            accessibilityLabel={`Adicionar exercício para ${NOMES_DIAS[diaDescanso]}`}
            onPress={() =>
              router.push({
                pathname: '/adicionar-exercicio',
                params: { dia: diaDescanso },
              })
            }
          >
            <Text style={styles.botaoAdicionarDescansoTexto}>+ Adicionar</Text>
          </Pressable>
        </View>
      ) : null}

      {/* Seletor de mês / ano */}
      <Modal
        visible={seletor !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSeletor(null)}
      >
        <Pressable
          style={styles.seletorOverlay}
          onPress={() => setSeletor(null)}
        >
          <Pressable
            style={styles.seletorBox}
            onPress={() => {}}
            accessibilityViewIsModal
          >
            <Text style={styles.seletorTitulo} accessibilityRole="header">
              {seletor === 'mes' ? 'Escolha o mês' : 'Escolha o ano'}
            </Text>

            <View style={styles.seletorGrade}>
              {seletor === 'mes'
                ? MESES.map((nomeMes, i) => {
                    const ativo = i === mes;
                    return (
                      <Pressable
                        key={nomeMes}
                        style={[
                          styles.seletorItem,
                          ativo && styles.seletorItemAtivo,
                        ]}
                        onPress={() => escolherMes(i)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: ativo }}
                      >
                        <Text
                          style={[
                            styles.seletorItemTexto,
                            ativo && styles.seletorItemTextoAtivo,
                          ]}
                        >
                          {nomeMes}
                        </Text>
                      </Pressable>
                    );
                  })
                : anosDisponiveis.map((a) => {
                    const ativo = a === ano;
                    return (
                      <Pressable
                        key={a}
                        style={[
                          styles.seletorItem,
                          ativo && styles.seletorItemAtivo,
                        ]}
                        onPress={() => escolherAno(a)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: ativo }}
                      >
                        <Text
                          style={[
                            styles.seletorItemTexto,
                            ativo && styles.seletorItemTextoAtivo,
                          ]}
                        >
                          {a}
                        </Text>
                      </Pressable>
                    );
                  })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
