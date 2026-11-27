import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '../styles/personalizacao';
import { DiaSemana, GRUPOS_MUSCULARES } from '../types/treinos';

export default function AdicionarExercicioScreen() {
  const { dia = 'SEG' } = useLocalSearchParams<{ dia?: DiaSemana }>();

  const [abaAtiva, setAbaAtiva] = useState<'exercicios' | 'personalizado'>(
    'exercicios'
  );
  const [busca, setBusca] = useState('');

  const [grupoExpandido, setGrupoExpandido] = useState<string | null>('peito');
  const [nomePersonalizado, setNomePersonalizado] = useState('');

  const irParaConfigurar = (nomeExercicio: string, grupo: string) => {
    router.push({
      pathname: '/configurar-exercicio',
      params: {
        dia,
        nome: nomeExercicio,
        grupo,
      },
    });
  };

  const gruposFiltrados = GRUPOS_MUSCULARES.filter(
    (g) =>
      g.nome.toLowerCase().includes(busca.toLowerCase()) ||
      g.exercicios.some((ex) => ex.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.screenTitle} accessibilityRole="header">
            Adicionar Exercício
          </Text>
        </View>

        {/* Barra de Busca */}
        <View style={styles.searchBox}>
          <Ionicons
            name="search"
            size={18}
            color="#94A3B8"
            importantForAccessibility="no"
            accessibilityElementsHidden
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar exercício..."
            placeholderTextColor="#94A3B8"
            accessibilityLabel="Buscar exercício"
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        {/* Seletor Exercícios / Personalizado */}
        <View style={styles.segmentRow}>
          <TouchableOpacity
            style={[
              styles.segmentBtn,
              abaAtiva === 'exercicios' && styles.segmentBtnActive,
            ]}
            onPress={() => setAbaAtiva('exercicios')}
            accessibilityRole="tab"
            accessibilityState={{ selected: abaAtiva === 'exercicios' }}
          >
            <Text
              style={[
                styles.segmentText,
                abaAtiva === 'exercicios' && styles.segmentTextActive,
              ]}
            >
              Exercícios
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentBtn,
              abaAtiva === 'personalizado' && styles.segmentBtnActive,
            ]}
            onPress={() => setAbaAtiva('personalizado')}
            accessibilityRole="tab"
            accessibilityState={{ selected: abaAtiva === 'personalizado' }}
          >
            <Text
              style={[
                styles.segmentText,
                abaAtiva === 'personalizado' && styles.segmentTextActive,
              ]}
            >
              Personalizado
            </Text>
          </TouchableOpacity>
        </View>

        {abaAtiva === 'exercicios' ? (
          gruposFiltrados.map((grupo) => {
            const aberto =
              grupoExpandido === grupo.id || busca.trim().length > 0;
            return (
              <View key={grupo.id}>
                <TouchableOpacity
                  style={styles.groupCard}
                  activeOpacity={0.8}
                  onPress={() => setGrupoExpandido(aberto ? null : grupo.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`${grupo.nome}. ${grupo.exemplos}`}
                  accessibilityState={{ expanded: aberto }}
                >
                  <View style={styles.groupIconCircle}>
                    <MaterialCommunityIcons
                      name={grupo.icone as any}
                      size={22}
                      color="#9BA3B4"
                      importantForAccessibility="no"
                      accessibilityElementsHidden
                    />
                  </View>

                  <View style={styles.groupInfo}>
                    <Text style={styles.groupTitle}>{grupo.nome}</Text>
                    <Text style={styles.groupExamples}>{grupo.exemplos}</Text>
                  </View>

                  <Ionicons
                    name={aberto ? 'chevron-down' : 'chevron-forward'}
                    size={18}
                    color="#8E96A4"
                    importantForAccessibility="no"
                    accessibilityElementsHidden
                  />
                </TouchableOpacity>

                {aberto &&
                  grupo.exercicios
                    .filter(
                      (ex) =>
                        ex.toLowerCase().includes(busca.toLowerCase()) ||
                        grupo.nome.toLowerCase().includes(busca.toLowerCase())
                    )
                    .map((exercicio) => (
                      <TouchableOpacity
                        key={exercicio}
                        style={[
                          styles.groupCard,
                          {
                            marginLeft: 16,
                            paddingVertical: 12,
                            borderColor: '#2A374A',
                          },
                        ]}
                        activeOpacity={0.7}
                        onPress={() => irParaConfigurar(exercicio, grupo.nome)}
                        accessibilityRole="button"
                        accessibilityLabel={`Configurar ${exercicio}`}
                      >
                        <Text
                          style={[styles.groupTitle, { flex: 1, fontSize: 14 }]}
                        >
                          {exercicio}
                        </Text>
                        <Ionicons
                          name="chevron-forward"
                          size={18}
                          color="#F5B800"
                          importantForAccessibility="no"
                          accessibilityElementsHidden
                        />
                      </TouchableOpacity>
                    ))}
              </View>
            );
          })
        ) : (
          <View style={styles.customFormCard}>
            <Text
              style={styles.fieldLabel}
              importantForAccessibility="no"
              accessibilityElementsHidden
            >
              Nome do Exercício Personalizado
            </Text>
            <View style={styles.searchBox}>
              <TextInput
                style={[styles.searchInput, { marginLeft: 0 }]}
                placeholder="Ex.: Elevação Pélvica na Máquina"
                placeholderTextColor="#94A3B8"
                accessibilityLabel="Nome do exercício personalizado"
                value={nomePersonalizado}
                onChangeText={setNomePersonalizado}
              />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Configurar exercício"
              onPress={() => {
                const nomeFinal =
                  nomePersonalizado.trim() || 'Exercício Personalizado';
                irParaConfigurar(nomeFinal, 'Personalizado');
              }}
            >
              <Text style={styles.primaryButtonText}>Configurar Exercício</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
