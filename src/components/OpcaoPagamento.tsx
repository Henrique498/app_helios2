import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles/Pagamento.styles';

type Props = {
  titulo: string;
  marcas: string[];
  selecionado: boolean;
  onPress: () => void;
};

export default function OpcaoPagamento({
  titulo,
  marcas,
  selecionado,
  onPress,
}: Props) {
  return (
    <Pressable
      style={[styles.opcao, selecionado && styles.opcaoSelecionada]}
      onPress={onPress}
    >
      <View style={styles.opcaoTextos}>
        <Text style={styles.opcaoTitulo}>{titulo}</Text>
        <View style={styles.marcas}>
          {marcas.map((m) => (
            <View key={m} style={styles.marca}>
              <Text style={styles.marcaTexto}>{m}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.radio, selecionado && styles.radioSelecionado]}>
        {selecionado ? <View style={styles.radioMiolo} /> : null}
      </View>
    </Pressable>
  );
}
