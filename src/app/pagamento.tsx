import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import FormCartao from '../components/FormCartao';
import OpcaoPagamento from '../components/OpcaoPagamento';
import { styles } from '../styles/Pagamento.styles';

type Metodo = 'credito' | 'debito';

export default function Pagamento() {
  const router = useRouter();
  const { plano } = useLocalSearchParams<{ plano?: string }>();
  const [metodo, setMetodo] = useState<Metodo | null>(null);

  function finalizar() {
    Alert.alert('Compra finalizada', 'Seu pagamento foi enviado!', [
      {
        text: 'OK',
        onPress: () =>
          router.replace({
            pathname: '/dashboard',
            params: { plano: plano ?? 'basic' },
          }),
      },
    ]);
  }
  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.topo}>
        <Pressable onPress={() => router.back()} style={styles.voltar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.logo}>
          Helios<Text style={styles.logoGym}>Gym</Text>
        </Text>

        <Text style={styles.pergunta}>Qual sua forma de pagamento?</Text>
        <View style={styles.seguro}>
          <Ionicons name="shield-checkmark-outline" size={15} color="#34C759" />
          <Text style={styles.seguroTexto}>Compra 100% segura</Text>
        </View>
      </View>

      <OpcaoPagamento
        titulo="Cartão de Crédito"
        marcas={['VISA', 'Mastercard', 'AMEX', 'Diners', 'Elo']}
        selecionado={metodo === 'credito'}
        onPress={() => setMetodo('credito')}
      />
      <OpcaoPagamento
        titulo="Cartão de Débito"
        marcas={['Itaú', 'Banco do Brasil', 'Inter', 'Bradesco']}
        selecionado={metodo === 'debito'}
        onPress={() => setMetodo('debito')}
      />

      {metodo ? (
        <FormCartao key={metodo} tipo={metodo} onFinalizar={finalizar} />
      ) : null}
    </ScrollView>
  );
}
