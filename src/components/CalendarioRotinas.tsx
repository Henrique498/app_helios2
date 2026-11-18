import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRotina } from '../contexts/RotinaContext';
import { styles } from '../styles/treinos.styles';
import { DiaSemana, Exercicio, NOMES_DIAS } from '../types/treinos';
import {
  calcular1RM,
  calcularTonelagemExercicio,
  extrairRepsNumericas,
} from '../utils/metricasTreino';
import {
  handlerInteiro,
  handlerPeso,
  handlerReps,
  pesoValido,
  repsValidas,
  seriesValidas,
} from '../utils/validadores';

interface CalendarioRotinasProps {
  diaSelecionado: DiaSemana;
  onSelectDia: (dia: DiaSemana) => void;
  exercicios: Exercicio[];
  onRemoverExercicio: (id: string) => void;
  onAbrirModalAdicionar: () => void;
  onEditarDia?: () => void;
}

const DIAS: DiaSemana[] = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];
const CARGA_MAXIMA = 500;

export function CalendarioRotinas({
  diaSelecionado,
  onSelectDia,
  exercicios,
  onRemoverExercicio,
  onAbrirModalAdicionar,
  onEditarDia,
}: CalendarioRotinasProps) {
  const router = useRouter();
  const { editarExercicio, concluirTreino, historicoCargas } = useRotina();

  const [expandidoId, setExpandidoId] = useState<string | null>(null);
  const [concluidosIds, setConcluidosIds] = useState<string[]>([]);

  const [editSeries, setEditSeries] = useState('');
  const [editReps, setEditReps] = useState('');
  const [editCarga, setEditCarga] = useState('');

  function aoClicarExercicio(item: Exercicio) {
    if (expandidoId === item.id) {
      setExpandidoId(null);
      return;
    }
    setExpandidoId(item.id);
    setEditSeries(item.series || '');
    setEditReps(item.repeticoes || '');
    setEditCarga(item.carga || '0');
  }

  function validarEdicao(): string | null {
    if (!seriesValidas(editSeries)) return 'Informe de 1 a 20 séries.';
    if (!repsValidas(editReps))
      return 'Informe as repetições de 1 a 100 (ex.: 12 ou 8-12).';
    if (!pesoValido(editCarga))
      return `Informe um peso válido (0 a ${CARGA_MAXIMA} kg).`;
    return null;
  }

  function salvarEdicao(id: string) {
    const erro = validarEdicao();
    if (erro) {
      Alert.alert('Atenção', erro);
      return;
    }

    editarExercicio(diaSelecionado, id, {
      series: editSeries,
      repeticoes: editReps,
      carga: String(Number(editCarga || '0')),
    });
    Alert.alert('Salvo!', 'Treino atualizado com sucesso.');
  }

  function alternarConcluirExercicio(id: string) {
    setConcluidosIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function aoConcluirTreinoCompleto() {
    if (exercicios.length === 0) {
      Alert.alert('Treino vazio', 'Adicione exercícios antes de concluir.');
      return;
    }

    const sessao = concluirTreino(diaSelecionado, 2700);
    setConcluidosIds(exercicios.map((e) => e.id));

    Alert.alert(
      'Treino Concluído!',
      `Volume Load total: ${sessao.tonelagemTotal.toLocaleString('pt-BR')} kg\nRepetições totais: ${sessao.repeticoesTotais}`,
      [
        { text: 'Ver Evolução', onPress: () => router.push('/evolucao') },
        { text: 'OK' },
      ]
    );
  }

  return (
    <>
      {/* Abas dos dias */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={[styles.daysRow, { paddingRight: 16 }]}
      >
        {DIAS.map((dia) => {
          const ativo = diaSelecionado === dia;
          return (
            <TouchableOpacity
              key={dia}
              style={[styles.dayTab, ativo && styles.dayTabActive]}
              onPress={() => {
                setExpandidoId(null);
                onSelectDia(dia);
              }}
            >
              <Text
                style={[styles.dayTabText, ativo && styles.dayTabTextActive]}
              >
                {dia}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Card principal igual ao protótipo */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{NOMES_DIAS[diaSelecionado]}</Text>

          <TouchableOpacity
            onPress={onEditarDia || (() => router.push('/evolucao'))}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="pencil" size={20} color="#0A0E17" />
          </TouchableOpacity>
        </View>

        {exercicios.length === 0 ? (
          <Text style={styles.emptyText}>
            Nenhum exercício cadastrado para este dia.
          </Text>
        ) : (
          exercicios.map((item, index) => {
            const aberto = expandidoId === item.id;
            const concluido = concluidosIds.includes(item.id);
            const cargaNum = Number(item.carga) || 0;
            const repsNum = extrairRepsNumericas(item.repeticoes);
            const tonEx = calcularTonelagemExercicio(item);
            const oneRM = calcular1RM(cargaNum, repsNum);
            const perc1RM =
              oneRM > 0 ? Math.round((cargaNum / oneRM) * 100) : 0;
            const pesosAnteriores = historicoCargas[item.nome] || [];

            return (
              <View key={item.id} style={styles.itemWrapper}>
                {/* Linha principal (clicar expande) */}
                <Pressable
                  onPress={() => aoClicarExercicio(item)}
                  style={styles.exerciseRow}
                >
                  <MaterialCommunityIcons
                    name="drag-vertical"
                    size={20}
                    color="#64748B"
                  />

                  <View
                    style={[
                      styles.numeroCirculo,
                      concluido && styles.numeroCirculoConcluido,
                    ]}
                  >
                    {concluido ? (
                      <Ionicons name="checkmark" size={16} color="#0A0E17" />
                    ) : (
                      <Text style={styles.numeroTexto}>{index + 1}</Text>
                    )}
                  </View>

                  <View style={styles.exerciseInfo}>
                    <Text
                      style={[
                        styles.exerciseName,
                        concluido && {
                          textDecorationLine: 'line-through',
                          color: '#94A3B8',
                        },
                      ]}
                    >
                      {item.nome}
                    </Text>
                    <Text style={styles.exerciseDetails}>
                      {item.series} séries • {item.repeticoes} repetições
                      {cargaNum > 0 ? ` • ${cargaNum}kg` : ''}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => onRemoverExercicio(item.id)}
                    hitSlop={10}
                  >
                    <Ionicons name="trash-outline" size={20} color="#94A3B8" />
                  </TouchableOpacity>
                </Pressable>

                {/* Gaveta expandida ao clicar no exercício */}
                {aberto && (
                  <View style={styles.gavetaExpandida}>
                    <Text style={styles.gavetaTitulo}>
                      Editar exercício & detalhes
                    </Text>

                    {/* Campos editáveis: Séries, Reps e Peso */}
                    <View style={styles.inputsLinha}>
                      <View style={styles.campoBox}>
                        <Text style={styles.campoLabel}>Séries</Text>
                        <TextInput
                          style={styles.campoInput}
                          keyboardType="number-pad"
                          maxLength={2}
                          value={editSeries}
                          onChangeText={handlerInteiro(setEditSeries, 20)}
                        />
                      </View>

                      <View style={styles.campoBox}>
                        <Text style={styles.campoLabel}>Repetições</Text>
                        <TextInput
                          style={styles.campoInput}
                          keyboardType="numbers-and-punctuation"
                          maxLength={7}
                          value={editReps}
                          onChangeText={handlerReps(setEditReps)}
                        />
                      </View>

                      <View style={styles.campoBox}>
                        <Text style={styles.campoLabel}>Peso (kg)</Text>
                        <TextInput
                          style={styles.campoInput}
                          keyboardType="decimal-pad"
                          maxLength={5}
                          value={editCarga}
                          onChangeText={handlerPeso(setEditCarga)}
                        />
                      </View>
                    </View>

                    {/* Atalhos rápidos para subir/descer peso */}
                    <View style={styles.ajusteCargaRow}>
                      <Pressable
                        style={styles.ajusteBtn}
                        onPress={() =>
                          setEditCarga((c) =>
                            String(Math.max(0, (Number(c) || 0) - 2.5))
                          )
                        }
                      >
                        <Text style={styles.ajusteBtnTexto}>- 2.5 kg</Text>
                      </Pressable>

                      <Pressable
                        style={styles.ajusteBtn}
                        onPress={() =>
                          setEditCarga((c) =>
                            String(
                              Math.min(CARGA_MAXIMA, (Number(c) || 0) + 2.5)
                            )
                          )
                        }
                      >
                        <Text style={styles.ajusteBtnTexto}>+ 2.5 kg</Text>
                      </Pressable>
                    </View>

                    {/* Métricas e histórico */}
                    <View style={styles.metricasBox}>
                      <Text style={styles.metricaTexto}>
                        Volume Load:{' '}
                        <Text style={styles.metricaDestaque}>{tonEx} kg</Text> •
                        1RM est.:{' '}
                        <Text style={styles.metricaDestaque}>
                          {oneRM} kg ({perc1RM}%)
                        </Text>
                      </Text>
                      <Text style={styles.metricaTexto}>
                        Histórico:{' '}
                        {pesosAnteriores.length > 0
                          ? pesosAnteriores
                              .map((h) => `${h.data}: ${h.carga}kg`)
                              .join(' → ')
                          : `${cargaNum}kg`}
                      </Text>
                    </View>

                    {/* Botões Salvar Edição e Concluir Exercício */}
                    <View style={styles.acoesGavetaRow}>
                      <Pressable
                        style={styles.btnSalvarEdicao}
                        onPress={() => salvarEdicao(item.id)}
                      >
                        <Text style={styles.btnSalvarEdicaoTexto}>Salvar</Text>
                      </Pressable>

                      <Pressable
                        style={[
                          styles.btnConcluirEx,
                          concluido && { backgroundColor: '#15803D' },
                        ]}
                        onPress={() => alternarConcluirExercicio(item.id)}
                      >
                        <Ionicons
                          name={
                            concluido
                              ? 'checkmark-circle'
                              : 'checkmark-circle-outline'
                          }
                          size={18}
                          color="#FFFFFF"
                        />
                        <Text style={styles.btnConcluirExTexto}>
                          {concluido ? 'Concluído' : 'Concluir Exercício'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </View>
            );
          })
        )}

        {/* Botão + Adicionar Exercício */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={onAbrirModalAdicionar}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+ Adicionar Exercício.</Text>
        </TouchableOpacity>

        {/* Botão Concluir Treino Completo */}
        {exercicios.length > 0 && (
          <TouchableOpacity
            style={styles.concluirTreinoButton}
            onPress={aoConcluirTreinoCompleto}
            activeOpacity={0.85}
          >
            <Ionicons name="trophy-outline" size={20} color="#0A0E17" />
            <Text style={styles.concluirTreinoButtonText}>Concluir Treino</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}
