import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import AlterarCartaoModal from '../components/AlterarCartaoModal';
import CalendarioRotina from '../components/CalendarioRotina';
import DayShake from '../components/DayShake';
import { PLANOS } from '../data/planos';
import { styles } from '../styles/DashBoard.styles';

const TEXTO_GERENCIAR: Record<string, string> = {
  basic: 'Gerenciar Assinatura',
  fit: 'Gerenciar Plano',   
  black: 'Gerenciar Plano',
};

export default function Dashboard() {
  const router = useRouter();
  const { plano: planoId, nome = 'Aluno' } = useLocalSearchParams<{
    plano?: string;
    nome?: string;
  }>();

  const [cartaoFinal, setCartaoFinal] = useState('4566');
  const [modalCartao, setModalCartao] = useState(false);

  const plano = PLANOS.find((p) => p.id === planoId) ?? PLANOS[0];

  function salvarCartao(final: string, bandeira: string) {
    setCartaoFinal(final);
    setModalCartao(false);
    Alert.alert(
      'Cartão atualizado',
      `${bandeira} final ${final} salvo com sucesso!`
    );
  }

  function cancelarPlano() {
    Alert.alert(
      'Cancelar plano',
      'Tem certeza que deseja cancelar seu plano?',
      [
        { text: 'Voltar', style: 'cancel' },
        {
          text: 'Cancelar plano',
          style: 'destructive',
          onPress: () => router.replace('/'),
        },
      ]
    );
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <View style={styles.cabecalho}>
        <Ionicons name="menu" size={26} color="#FFFFFF" />
        <Text style={styles.logo}>
          Helios<Text style={styles.logoGym}>Gym</Text>
        </Text>
        <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
      </View>

      <View style={styles.corpo}>
        <View style={styles.saudacao}>
          <Ionicons name="person-circle" size={52} color="#FFB800" />
          <Text style={styles.saudacaoTexto}>Olá, {nome}!</Text>
        </View>

        <CalendarioRotina />

        <Pressable
          style={styles.botaoTreino}
          onPress={() => console.log('TODO: abrir tela de personalização')}
        >
          <MaterialCommunityIcons name="dumbbell" size={30} color="#000000" />
          <Text style={styles.botaoTreinoTexto}>Personalizar seu treino</Text>
        </Pressable>

        {plano.id === 'black' ? <DayShake /> : null}

        <View style={styles.cartao}>
          <View style={styles.planoTopo}>
            <View>
              <View style={styles.selo}>
                <Text style={styles.seloTexto}>Plano {plano.nome}</Text>
              </View>
              <Text style={styles.planoNome}>
                Plano <Text style={styles.planoNomeDestaque}>{plano.nome}</Text>
              </Text>
              <Text style={styles.planoPreco}>{plano.preco} / Mês</Text>
            </View>
            <Ionicons name="star-outline" size={26} color="#FFB800" />
          </View>

          <View style={styles.divisor} />

          <Text style={styles.rotulo}>PRÓXIMA RENOVAÇÃO</Text>
          <View style={styles.renovacao}>
            <Ionicons name="calendar-outline" size={18} color="#FFB800" />
            <Text style={styles.renovacaoData}>01 de Maio de 2027</Text>
          </View>
        </View>

        <View style={styles.cartao}>
          <Text style={styles.rotulo}>Forma de pagamento</Text>
          <View style={styles.pagLinha}>
            <View style={styles.pagInfo}>
              <Ionicons name="card" size={26} color="#FFFFFF" />
              <Text style={styles.cartaoFinal}>•••• •••• {cartaoFinal}</Text>
            </View>
            <Pressable
              style={styles.botaoAlterar}
              onPress={() => setModalCartao(true)}
            >
              <Text style={styles.botaoAlterarTexto}>Alterar</Text>
            </Pressable>
          </View>

          <View style={styles.divisor} />

          <Text style={styles.rotulo}>Status do plano</Text>
          <View style={styles.statusLinha}>
            <View style={styles.ponto} />
            <Text style={styles.statusTexto}>Ativo</Text>
          </View>
        </View>

        <Pressable style={styles.botaoPrincipal}>
          <Text style={styles.botaoPrincipalTexto}>
            {TEXTO_GERENCIAR[plano.id]}
          </Text>
        </Pressable>

        <Pressable style={styles.cancelar} onPress={cancelarPlano}>
          <Text style={styles.cancelarTexto}>Cancelar plano</Text>
        </Pressable>
      </View>

      <AlterarCartaoModal
        visible={modalCartao}
        onClose={() => setModalCartao(false)}
        onSalvar={salvarCartao}
      />
    </ScrollView>
  );
}
