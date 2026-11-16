import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/DashBoard.styles';

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
const ROTINA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sab'];
const NUMEROS = [29, 30, 31, ...Array.from({ length: 25 }, (_, i) => i + 1)];
const SEMANAS = [0, 1, 2, 3].map((i) => NUMEROS.slice(i * 7, i * 7 + 7));

const DIAS_VALIDOS_TREINO = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];

export default function CalendarioRotina() {
  const irParaTreino = (diaLabel: string) => {
    const diaFormatado = diaLabel.toUpperCase();

    if (DIAS_VALIDOS_TREINO.includes(diaFormatado)) {
      router.push({
        pathname: '/treino',
        params: { dia: diaFormatado },
      });
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

        <View style={styles.calDireita}>
          <Text style={styles.suaRotina}>Sua Rotina</Text>
          <Ionicons name="calendar-outline" size={22} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.semana}>
        {DIAS.map((dia) => {
          const ativo = ROTINA.includes(dia);
          return (
            <TouchableOpacity
              key={dia}
              style={[styles.celula, ativo && styles.celulaAtiva]}
              activeOpacity={0.7}
              onPress={() => irParaTreino(dia)}
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

      {SEMANAS.map((semana, i) => (
        <View key={i} style={styles.semana}>
          {semana.map((numero, j) => {
            const diaCorrespondente = DIAS[j];
            return (
              <TouchableOpacity
                key={j}
                style={styles.celula}
                activeOpacity={0.7}
                onPress={() => irParaTreino(diaCorrespondente)}
              >
                <Text style={styles.celulaTexto}>{numero}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}
