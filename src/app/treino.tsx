import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { CalendarioRotinas } from '../components/CalendarioRotinas';
import { useRotina } from '../contexts/RotinaContext';
import { styles } from '../styles/treinos.styles';
import { DiaSemana } from '../types/treinos';

export default function TreinoScreen() {
  const { dia } = useLocalSearchParams<{ dia?: DiaSemana }>();
  const { rotina, removerExercicio } = useRotina();
  const [diaSelecionado, setDiaSelecionado] = useState<DiaSemana>('SEG');

  useEffect(() => {
    if (
      dia &&
      ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'].includes(dia)
    ) {
      setDiaSelecionado(dia);
    }
  }, [dia]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.header}>
          <MaterialCommunityIcons
            name="dumbbell"
            size={32}
            color="#F5B800"
            style={styles.iconTop}
            importantForAccessibility="no"
          />
          <Text style={styles.title} accessibilityRole="header">
            Minha Rotina{'\n'}de{' '}
            <Text style={styles.titleHighlight}>Treino</Text>
          </Text>
          <Text style={styles.subtitle}>
            Monte sua própria grade de treinos e acompanhe sua evolução.{'\n'}
            Defina os exercícios, séries, repetições e o foco de cada dia da
            semana.
          </Text>
        </View>

        <CalendarioRotinas
          diaSelecionado={diaSelecionado}
          onSelectDia={setDiaSelecionado}
          exercicios={rotina[diaSelecionado] || []}
          onRemoverExercicio={(id) => removerExercicio(diaSelecionado, id)}
          onAbrirModalAdicionar={() =>
            router.push({
              pathname: '/adicionar-exercicio',
              params: { dia: diaSelecionado },
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}
