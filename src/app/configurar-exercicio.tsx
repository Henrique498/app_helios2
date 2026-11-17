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
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Configurar Exercício</Text>
        </View>

        <View style={styles.exerciseHeaderCard}>
          <View style={styles.yellowIconBox}>
            <MaterialCommunityIcons name="dumbbell" size={26} color="#0A0E17" />
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
            onPress={() => setSeries((v) => Math.max(1, v - 1))}
          >
            <Ionicons name="remove" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.stepperValue}>{series}</Text>
          <TouchableOpacity
            style={styles.stepperBtnPlus}
            onPress={() => setSeries((v) => v + 1)}
          >
            <Ionicons name="add" size={20} color="#0A0E17" />
          </TouchableOpacity>
        </View>

        <Text style={styles.fieldLabel}>Repetições</Text>
        <View style={styles.stepperContainer}>
          <TouchableOpacity
            style={styles.stepperBtnMinus}
            onPress={() => setRepeticoes((v) => Math.max(1, v - 1))}
          >
            <Ionicons name="remove" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.stepperValue}>{repeticoes}</Text>
          <TouchableOpacity
            style={styles.stepperBtnPlus}
            onPress={() => setRepeticoes((v) => v + 1)}
          >
            <Ionicons name="add" size={20} color="#0A0E17" />
          </TouchableOpacity>
        </View>

        <Text style={styles.fieldLabel}>Carga (opcional)</Text>
        <View style={styles.stepperContainer}>
          <TouchableOpacity
            style={styles.stepperBtnMinus}
            onPress={() => setCarga((v) => Math.max(0, v - 2))}
          >
            <Ionicons name="remove" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepperValueRow}>
            <Text style={styles.stepperValue}>{carga}</Text>
            <Text style={styles.stepperUnit}>kg</Text>
          </View>
          <TouchableOpacity
            style={styles.stepperBtnPlus}
            onPress={() => setCarga((v) => v + 2)}
          >
            <Ionicons name="add" size={20} color="#0A0E17" />
          </TouchableOpacity>
        </View>

        <Text style={styles.fieldLabel}>Observações (opcional)</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Ex.: foco na contração, descanso de 1 min..."
          placeholderTextColor="#6B7385"
          multiline
          value={observacoes}
          onChangeText={setObservacoes}
        />

        <View style={styles.restCard}>
          <View style={styles.restHeader}>
            <Ionicons name="time-outline" size={20} color="#9BA3B4" />
            <Text style={styles.restTitle}>Descanso entre as séries</Text>
          </View>

          <View style={styles.restControls}>
            <TouchableOpacity
              style={styles.stepperBtnMinus}
              onPress={() => setDescanso((v) => Math.max(15, v - 15))}
            >
              <Ionicons name="remove" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.restCenter}>
              <Text style={styles.restNumber}>{descanso}</Text>
              <Text style={styles.restSeconds}>segundos</Text>
            </View>

            <TouchableOpacity
              style={styles.stepperBtnMinus}
              onPress={() => setDescanso((v) => v + 15)}
            >
              <Ionicons name="add" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleSalvar}>
          <Text style={styles.primaryButtonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
