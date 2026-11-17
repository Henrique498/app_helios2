import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
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
const NUMEROS = [29, 30, 31, ...Array.from({ length: 25 }, (_, i) => i + 1)];
const SEMANAS = [0, 1, 2, 3].map((i) => NUMEROS.slice(i * 7, i * 7 + 7));

export default function CalendarioRotina() {
  const { rotina } = useRotina();
  const [diaDescanso, setDiaDescanso] = useState<DiaSemana | null>(null);

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
          <View style={styles.chip}>
            <Text style={styles.chipTexto}>Set ▾</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipTexto}>2027 ▾</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.calDireita}
          onPress={() => router.push('/minha-rotina')}
        >
          <Text style={styles.suaRotina}>Sua Rotina</Text>
          <Ionicons name="chevron-forward" size={16} color="#FFB800" />
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
      {SEMANAS.map((semana, sIndex) => (
        <View key={sIndex} style={styles.semana}>
          {semana.map((numero, dIndex) => {
            const diaKey = DIAS_KEYS[dIndex];
            const ativo = (rotina[diaKey]?.length || 0) > 0;

            return (
              <TouchableOpacity
                key={`${sIndex}-${dIndex}`}
                style={[styles.celula, ativo && styles.celulaAtiva]}
                onPress={() => irParaTreino(dIndex)}
              >
                <Text
                  style={[styles.celulaTexto, ativo && styles.celulaTextoAtivo]}
                >
                  {numero}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      {/* Card de descanso ao tocar em Sab ou Dom sem treino */}
      {diaDescanso && (rotina[diaDescanso]?.length || 0) === 0 ? (
        <View style={styles.descansoCard}>
          <View style={styles.descansoInfo}>
            <Ionicons name="bed-outline" size={22} color="#FFB800" />
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
    </View>
  );
}
