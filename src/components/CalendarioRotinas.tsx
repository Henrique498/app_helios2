import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/treinos.styles';
import { DiaSemana, Exercicio, NOMES_DIAS } from '../types/treinos';

interface CalendarioRotinasProps {
  diaSelecionado: DiaSemana;
  onSelectDia: (dia: DiaSemana) => void;
  exercicios: Exercicio[];
  onRemoverExercicio: (id: string) => void;
  onAbrirModalAdicionar: () => void;
  onEditarDia?: () => void;
}

const DIAS: DiaSemana[] = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];

export function CalendarioRotinas({
  diaSelecionado,
  onSelectDia,
  exercicios,
  onRemoverExercicio,
  onAbrirModalAdicionar,
  onEditarDia,
}: CalendarioRotinasProps) {
  return (
    <>
      <View style={styles.daysRow}>
        {DIAS.map((dia) => {
          const ativo = diaSelecionado === dia;
          return (
            <TouchableOpacity
              key={dia}
              style={[styles.dayTab, ativo && styles.dayTabActive]}
              onPress={() => onSelectDia(dia)}
              activeOpacity={0.8}
            >
              <Text
                style={[styles.dayTabText, ativo && styles.dayTabTextActive]}
              >
                {dia}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderTitle}>
            {NOMES_DIAS[diaSelecionado]}
          </Text>
          <TouchableOpacity onPress={onEditarDia}>
            <MaterialCommunityIcons name="pencil" size={20} color="#0A0E17" />
          </TouchableOpacity>
        </View>

        <View style={styles.exerciseList}>
          {exercicios.map((item, index) => (
            <View key={item.id} style={styles.exerciseRow}>
              <MaterialCommunityIcons
                name="drag-vertical"
                size={20}
                color="#6B7385"
                style={styles.dragIcon}
              />

              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>

              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{item.nome}</Text>
                <Text style={styles.exerciseMeta}>
                  {item.series} séries • {item.repeticoes} repetições
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => onRemoverExercicio(item.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="trash-outline" size={20} color="#8E96A4" />
              </TouchableOpacity>
            </View>
          ))}

          {exercicios.length === 0 && (
            <Text style={styles.emptyText}>
              Nenhum exercício cadastrado para este dia.
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={onAbrirModalAdicionar}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+ Adicionar Exercício.</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
