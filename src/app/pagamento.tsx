import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import FormCartao from '../components/FormCartao';
import OpcaoPagamento from '../components/OpcaoPagamento';
import { styles } from '../styles/Pagamento.styles';
import { apenasNumeros } from '../utils/formatadores';
import { salvarCartaoFinal } from '../utils/usuarios';

type Metodo = 'credito' | 'debito';

export default function Pagamento() {
  const router = useRouter();
  const { plano } = useLocalSearchParams<{ plano?: string }>();
  const [metodo, setMetodo] = useState<Metodo | null>(null);

  function handleVoltar() {
    if (metodo !== null) {
      setMetodo(null);
      return true;
    }
    router.back();
    return true;
  }

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', handleVoltar);
    return () => sub.remove();
  }, [metodo]);

  async function finalizar(numeroCartao?: string) {
    const digitos = apenasNumeros(numeroCartao ?? '');
    if (digitos.length >= 4) {
      await salvarCartaoFinal(digitos.slice(-4));
    }

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
        <Pressable
          onPress={handleVoltar}
          style={styles.voltar}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.logo}>
          Helios<Text style={styles.logoGym}>Gym</Text>
        </Text>

        <Text style={styles.pergunta} accessibilityRole="header">
          Qual sua forma de pagamento?
        </Text>
        <View style={styles.seguro}>
          <Ionicons
            name="shield-checkmark-outline"
            size={15}
            color="#34C759"
            importantForAccessibility="no"
            accessibilityElementsHidden
          />
          <Text style={styles.seguroTexto}>Compra 100% segura</Text>
        </View>
      </View>

      <View accessibilityRole="radiogroup">
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
      </View>

      {metodo ? (
        <FormCartao key={metodo} tipo={metodo} onFinalizar={finalizar} />
      ) : null}
    </ScrollView>
  );
}
