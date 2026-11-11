import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import PlanoCard from '../components/PlanoCard';
import { PLANOS, Plano } from '../data/planos';
import { styles } from '../styles/planos.styles';

export default function Planos() {
  const router = useRouter();

  function escolher(plano: Plano) {
    router.push({ pathname: '/endereco', params: { plano: plano.id } });
  }
  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <View style={styles.cabecalho}>
        <Pressable style={styles.voltar} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={'#FFFFFF'} />
        </Pressable>
        <Text style={styles.logo}>
          Helios<Text style={styles.logoGym}>Gym</Text>
        </Text>
        <Text style={styles.subtitulo}>Escolha o plano ideal para você</Text>
      </View>

      {PLANOS.map((plano) => (
        <PlanoCard
          key={plano.id}
          plano={plano}
          onPress={() => escolher(plano)}
        />
      ))}
    </ScrollView>
  );
}
