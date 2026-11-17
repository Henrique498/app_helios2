import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRotina } from '../contexts/RotinaContext';
import { styles } from '../styles/personalizacao';
import { DiaSemana, NOMES_DIAS } from '../types/treinos';

const TODOS_DIAS: DiaSemana[] = [
  'SEG',
  'TER',
  'QUA',
  'QUI',
  'SEX',
  'SAB',
  'DOM',
];

export default function MinhaRotinaScreen() {
  const { rotina } = useRotina();

  const abrirDia = (dia: DiaSemana) => {
    router.push({
      pathname: '/treino',
      params: { dia },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={{ marginBottom: 14, alignSelf: 'flex-start' }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.heroTitle}>Minha Rotina</Text>
        <Text style={styles.heroSubtitle}>
          Visualize sua semana e acompanhe sua evolução.
        </Text>

        {TODOS_DIAS.map((dia) => {
          const totalExercicios = rotina[dia]?.length || 0;
          return (
            <TouchableOpacity
              key={dia}
              style={styles.dayListCard}
              activeOpacity={0.8}
              onPress={() => abrirDia(dia)}
            >
              <View style={styles.dayBadge}>
                <Text style={styles.dayBadgeText}>
                  {dia.charAt(0) + dia.slice(1).toLowerCase()}
                </Text>
              </View>

              <View style={styles.dayCardInfo}>
                <Text style={styles.dayCardName}>{NOMES_DIAS[dia]}</Text>
                <Text style={styles.dayCardCount}>
                  {totalExercicios}{' '}
                  {totalExercicios === 1 ? 'exercício' : 'exercícios'}
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#8E96A4" />
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[styles.primaryButton, { marginTop: 14 }]}
          onPress={() =>
            router.push({
              pathname: '/adicionar-exercicio',
              params: { dia: 'SEG' },
            })
          }
        >
          <Text style={styles.primaryButtonText}>+ Criar Nova Rotina</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
