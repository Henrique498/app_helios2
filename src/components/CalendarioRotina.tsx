import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { styles } from '../styles/DashBoard.styles';

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
const ROTINA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sab'];
const NUMEROS = [29, 30, 31, ...Array.from({ length: 25 }, (_, i) => i + 1)];
const SEMANAS = [0, 1, 2, 3].map((i) => NUMEROS.slice(i * 7, i * 7 + 7));

export default function CalendarioRotina() {
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
            <View
              key={dia}
              style={[styles.celula, ativo && styles.celulaAtiva]}
            >
              <Text
                style={[styles.celulaTexto, ativo && styles.celulaTextoAtivo]}
              >
                {dia}
              </Text>
            </View>
          );
        })}
      </View>

      {SEMANAS.map((semana, i) => (
        <View key={i} style={styles.semana}>
          {semana.map((numero, j) => (
            <View key={j} style={styles.celula}>
              <Text style={styles.celulaTexto}>{numero}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
