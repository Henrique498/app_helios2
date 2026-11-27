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

import { useRotina } from '../contexts/RotinaContext';
import { styles } from '../styles/personalizacao';
import { DiaSemana } from '../types/treinos';

export default function ConfigurarExercicioScreen() {
  const {
    dia = 'SEG',
    nome = 'Supino Reto',
    grupo = 'Peito',
  } = useLocalSearchParams<{
    dia?: DiaSemana;
    nome?: string;
    grupo?: string;
  }>();

  const { adicionarExercicio } = useRotina();

  const [series, setSeries] = useState(3);
  const [repeticoes, setRepeticoes] = useState(12);
  const [carga, setCarga] = useState(0);
  const [descanso, setDescanso] = useState(60);
  const [observacoes, setObservacoes] = useState('');

  const handleSalvar = () => {
    adicionarExercicio(dia, {
      id: Date.now().toString(),
      nome,
      grupo,
      series: String(series),
      repeticoes: String(repeticoes),
      carga: String(carga),
      descanso: String(descanso),
      observacoes,
    });

    router.replace({
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
            Configurar Exercício
          </Text>
        </View>

        <View style={styles.exerciseHeaderCard}>
          <View style={styles.yellowIconBox}>
            <MaterialCommunityIcons
              name="dumbbell"
              size={26}
              color="#0A0E17"
              importantForAccessibility="no"
              accessibilityElementsHidden
            />
          </View>
          <View>
            <Text style={styles.exerciseHeaderTitle}>{nome}</Text>
            <Text style={styles.exerciseHeaderSub}>{grupo}</Text>
          </View>
        </View>

        <Text style={styles.fieldLabel}>Séries</Text>
        <View style={styles.stepperContainer}>
          <TouchableOpacity
            style={styles.stepperBtnMinus}
            hitSlop={8}
            onPress={() => setSeries((v) => Math.max(1, v - 1))}
            accessibilityRole="button"
            accessibilityLabel="Diminuir séries"
          >
            <Ionicons name="remove" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text
            style={styles.stepperValue}
            accessibilityLabel={`${series} séries`}
          >
            {series}
          </Text>
          <TouchableOpacity
            style={styles.stepperBtnPlus}
            hitSlop={8}
            onPress={() => setSeries((v) => v + 1)}
            accessibilityRole="button"
            accessibilityLabel="Aumentar séries"
          >
            <Ionicons name="add" size={20} color="#0A0E17" />
          </TouchableOpacity>
        </View>

        <Text style={styles.fieldLabel}>Repetições</Text>
        <View style={styles.stepperContainer}>
          <TouchableOpacity
            style={styles.stepperBtnMinus}
            hitSlop={8}
            onPress={() => setRepeticoes((v) => Math.max(1, v - 1))}
            accessibilityRole="button"
            accessibilityLabel="Diminuir repetições"
          >
            <Ionicons name="remove" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text
            style={styles.stepperValue}
            accessibilityLabel={`${repeticoes} repetições`}
          >
            {repeticoes}
          </Text>
          <TouchableOpacity
            style={styles.stepperBtnPlus}
            hitSlop={8}
            onPress={() => setRepeticoes((v) => v + 1)}
            accessibilityRole="button"
            accessibilityLabel="Aumentar repetições"
          >
            <Ionicons name="add" size={20} color="#0A0E17" />
          </TouchableOpacity>
        </View>

        <Text style={styles.fieldLabel}>Carga (opcional)</Text>
        <View style={styles.stepperContainer}>
          <TouchableOpacity
            style={styles.stepperBtnMinus}
            hitSlop={8}
            onPress={() => setCarga((v) => Math.max(0, v - 2))}
            accessibilityRole="button"
            accessibilityLabel="Diminuir carga em 2 quilos"
          >
            <Ionicons name="remove" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <View
            style={styles.stepperValueRow}
            accessible
            accessibilityLabel={`${carga} quilos`}
          >
            <Text style={styles.stepperValue}>{carga}</Text>
            <Text style={styles.stepperUnit}>kg</Text>
          </View>
          <TouchableOpacity
            style={styles.stepperBtnPlus}
            hitSlop={8}
            onPress={() => setCarga((v) => v + 2)}
            accessibilityRole="button"
            accessibilityLabel="Aumentar carga em 2 quilos"
          >
            <Ionicons name="add" size={20} color="#0A0E17" />
          </TouchableOpacity>
        </View>

        <Text
          style={styles.fieldLabel}
          importantForAccessibility="no"
          accessibilityElementsHidden
        >
          Observações (opcional)
        </Text>
        <TextInput
          style={styles.textArea}
          placeholder="Ex.: foco na contração, descanso de 1 min..."
          placeholderTextColor="#94A3B8"
          accessibilityLabel="Observações"
          multiline
          value={observacoes}
          onChangeText={setObservacoes}
        />

        <View style={styles.restCard}>
          <View style={styles.restHeader}>
            <Ionicons
              name="time-outline"
              size={20}
              color="#9BA3B4"
              importantForAccessibility="no"
              accessibilityElementsHidden
            />
            <Text style={styles.restTitle}>Descanso entre as séries</Text>
          </View>

          <View style={styles.restControls}>
            <TouchableOpacity
              style={styles.stepperBtnMinus}
              hitSlop={8}
              onPress={() => setDescanso((v) => Math.max(15, v - 15))}
              accessibilityRole="button"
              accessibilityLabel="Diminuir descanso em 15 segundos"
            >
              <Ionicons name="remove" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View
              style={styles.restCenter}
              accessible
              accessibilityLabel={`${descanso} segundos`}
            >
              <Text style={styles.restNumber}>{descanso}</Text>
              <Text style={styles.restSeconds}>segundos</Text>
            </View>

            <TouchableOpacity
              style={styles.stepperBtnMinus}
              hitSlop={8}
              onPress={() => setDescanso((v) => v + 15)}
              accessibilityRole="button"
              accessibilityLabel="Aumentar descanso em 15 segundos"
            >
              <Ionicons name="add" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSalvar}
          accessibilityRole="button"
          accessibilityLabel="Salvar exercício"
        >
          <Text style={styles.primaryButtonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
