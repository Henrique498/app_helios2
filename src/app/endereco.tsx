import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CampoTexto from '../components/CampoTexto';
import { styles } from '../styles/Endereco.styles';
import { apenasNumeros, formatarCEP } from '../utils/formatadores';

export default function Endereco() {
  const router = useRouter();
  const { plano } = useLocalSearchParams<{ plano?: string }>();

  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [buscando, setBuscando] = useState(false);

  async function buscarCep(valor: string) {
    const n = apenasNumeros(valor);
    if (n.length !== 8) return;

    try {
      setBuscando(true);
      const resposta = await fetch(`https://viacep.com.br/ws/${n}/json/`);
      const dados = await resposta.json();

      if (dados.erro) {
        Alert.alert(
          'CEP não encontrado',
          'Confira o CEP ou preencha manualmente.'
        );
        return;
      }

      setEstado(dados.uf ?? '');
      setCidade(dados.localidade ?? '');
      setBairro(dados.bairro ?? '');
      setRua(dados.logradouro ?? '');
    } catch {
      Alert.alert(
        'Sem conexão',
        'Não foi possível buscar o CEP. Preencha manualmente.'
      );
    } finally {
      setBuscando(false);
    }
  }

  function mudarCep(texto: string) {
    const formatado = formatarCEP(texto);
    setCep(formatado);
    buscarCep(formatado);
  }

  function validar(): string | null {
    if (apenasNumeros(cep).length !== 8) return 'Digite o CEP completo.';
    if (estado.trim().length !== 2) return 'Digite a sigla do estado (ex: SP).';
    if (!cidade.trim()) return 'Digite sua cidade.';
    if (!bairro.trim()) return 'Digite seu bairro.';
    if (!rua.trim()) return 'Digite o nome da rua.';
    if (!numero.trim()) return 'Digite o número.';
    return null;
  }

  function avancar() {
    const erro = validar();

    if (erro) {
      Alert.alert('Atenção', erro);
      return;
    }

    router.push({ pathname: '/pagamento', params: { plano: plano ?? '' } });
  }

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Pressable onPress={() => router.back()} style={styles.voltar}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </Pressable>

      <Text style={styles.logo}>
        Helios<Text style={styles.logoGym}>Gym</Text>
      </Text>

      <Text style={styles.titulo}>Qual seu endereço de cobrança?</Text>
      <Text style={styles.subtitulo}>
        Por Favor, insira seus dados para identificarmos seu cadastro anterior
      </Text>

      <CampoTexto
        label="CEP"
        placeholder="00000-000"
        value={cep}
        onChangeText={mudarCep}
        keyboardType="numeric"
        direita={buscando ? <ActivityIndicator color="#FFB800" /> : null}
      />
      <CampoTexto
        label="Estado"
        placeholder="Ex: SP"
        value={estado}
        onChangeText={(t) => setEstado(t.toUpperCase())}
        maxLength={2}
        autoCapitalize="characters"
      />
      <CampoTexto
        label="Cidade"
        placeholder="Digite sua cidade"
        value={cidade}
        onChangeText={setCidade}
      />
      <CampoTexto
        label="Bairro"
        placeholder="Digite seu bairro"
        value={bairro}
        onChangeText={setBairro}
      />
      <CampoTexto
        label="Rua"
        placeholder="Nome da sua rua ou avenida"
        value={rua}
        onChangeText={setRua}
      />
      <CampoTexto
        label="Número"
        placeholder="Ex: 123"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
      />
      <CampoTexto
        label="Complemento (opcional)"
        placeholder="Ex: Apto 42, Bloco B"
        value={complemento}
        onChangeText={setComplemento}
      />

      <Pressable style={styles.botao} onPress={avancar}>
        <Text style={styles.botaoTexto}>Avançar para Pagamento</Text>
      </Pressable>
    </ScrollView>
  );
}
