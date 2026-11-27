import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { Plano } from '../data/planos';
import { styles } from '../styles/planos.styles';

type Props = {
  plano: Plano;
  onPress: () => void;
};

export default function PlanoCard({ plano, onPress }: Props) {
  const d = plano.destaque;
  const corTexto = d ? '#000000' : '#FFFFFF';

  return (
    <Pressable
      style={[styles.card, d && styles.cardDestaque]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Plano ${plano.nome}, ${plano.preco}. Benefícios: ${plano.beneficios
        .map((b) => b.texto)
        .join(', ')}`}
      accessibilityHint="Toque duas vezes para escolher este plano"
    >
      <View style={[styles.topo, d && styles.topoDestaque]}>
        <Text style={styles.plano}>
          PLANO{' '}
          <Text style={[styles.nomePlano, d && styles.nomePlanoDestaque]}>
            {plano.nome}
          </Text>
        </Text>
      </View>

      <Text style={[styles.preco, d && styles.textoDestaque]}>
        {plano.preco}
      </Text>

      <View style={styles.lista}>
        {plano.beneficios.map((b) => (
          <View key={b.texto} style={styles.item}>
            <MaterialCommunityIcons
              name={b.icone}
              size={20}
              color={corTexto}
              importantForAccessibility="no"
              accessibilityElementsHidden
            />
            <Text style={[styles.itemTexto, d && styles.textoDestaque]}>
              {b.texto}
            </Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}
