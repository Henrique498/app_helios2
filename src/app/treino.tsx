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

import { AdicionarExercicioModal } from '../components/AdicionarExercicioModal';
import { CalendarioRotinas } from '../components/CalendarioRotinas';
import { styles } from '../styles/treinos.styles';
import { DiaSemana, Exercicio, TREINOS_INICIAIS } from '../types/treinos';

export default function TreinoScreen() {
  const { dia } = useLocalSearchParams<{ dia?: DiaSemana }>();

  const [diaSelecionado, setDiaSelecionado] = useState<DiaSemana>('SEG');
  const [rotina, setRotina] =
    useState<Record<DiaSemana, Exercicio[]>>(TREINOS_INICIAIS);
  const [modalVisivel, setModalVisivel] = useState(false);

  useEffect(() => {
    if (dia && ['SEG', 'TER', 'QUA', 'QUI', 'SEX'].includes(dia)) {
      setDiaSelecionado(dia);
    }
  }, [dia]);

  const removerExercicio = (id: string) => {
    setRotina((prev) => ({
      ...prev,
      [diaSelecionado]: prev[diaSelecionado].filter((item) => item.id !== id),
    }));
  };

  const adicionarExercicio = (
    nome: string,
    series: string,
    repeticoes: string
  ) => {
    const novoItem: Exercicio = {
      id: String(Date.now()),
      nome,
      series,
      repeticoes,
    };

    setRotina((prev) => ({
      ...prev,
      [diaSelecionado]: [...prev[diaSelecionado], novoItem],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.header}>
          <MaterialCommunityIcons
            name="dumbbell"
            size={32}
            color="#F5B800"
            style={styles.iconTop}
          />
          <Text style={styles.title}>
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
          onRemoverExercicio={removerExercicio}
          onAbrirModalAdicionar={() => setModalVisivel(true)}
        />
      </ScrollView>

      <AdicionarExercicioModal
        visible={modalVisivel}
        diaSelecionado={diaSelecionado}
        onClose={() => setModalVisivel(false)}
        onConfirm={adicionarExercicio}
      />
    </SafeAreaView>
  );
}
