import { Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
            <MaterialCommunityIcons name={b.icone} size={20} color={corTexto} />
            <Text style={[styles.itemTexto, d && styles.textoDestaque]}>
              {b.texto}
            </Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}
