import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { styles } from '../styles/gestor.styles';
import { formatarCPF, formatarCREF, formatarData } from '../utils/formatadores';

const LISTA_ESPECIALIDADES = [
  'Musculação',
  'Dança',
  'Treinamento Funcional',
  'Crossfit',
  'Pilates',
  'Spinning / Bike',
  'Lutas / Artes Marciais',
  'Natação / Hidroginástica',
];

export default function CadastroInstrutorScreen() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [cref, setCref] = useState('');
  const [especialidadesSelecionadas, setEspecialidadesSelecionadas] = useState<
    string[]
  >([]);
  const [modalEspecialidades, setModalEspecialidades] = useState(false);
  const [emailProf, setEmailProf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmar, setVerConfirmar] = useState(false);

  function alternarEspecialidade(item: string) {
    setEspecialidadesSelecionadas((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  }

  function aoCadastrar() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Digite o nome completo do instrutor.');
      return;
    }
    if (nascimento.length < 10) {
      Alert.alert(
        'Atenção',
        'Digite a data de nascimento completa (DD/MM/AAAA).'
      );
      return;
    }
    if (cpf.length < 14) {
      Alert.alert('Atenção', 'Digite um CPF válido (000.000.000-00).');
      return;
    }
    if (!cref.trim()) {
      Alert.alert('Atenção', 'Informe o número do CREF do instrutor.');
      return;
    }
    if (especialidadesSelecionadas.length === 0) {
      Alert.alert('Atenção', 'Selecione pelo menos uma especialidade.');
      return;
    }
    if (!emailProf.trim() || !emailProf.includes('@')) {
      Alert.alert('Atenção', 'Digite um e-mail profissional válido.');
      return;
    }
    if (!senha.trim() || senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não conferem ou estão vazias.');
      return;
    }

    Alert.alert(
      'Instrutor Cadastrado!',
      `${nome} (${especialidadesSelecionadas.join(', ')}) foi cadastrado com sucesso.\n\nPara entrar como instrutor no Login, use qualquer e-mail e a senha: 1234567`,
      [
        {
          text: 'Ir para o Login',
          onPress: () => router.replace('/LoginScreen'),
        },
      ]
    );
  }

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.topoBar}>
        <Pressable onPress={() => router.replace('/LoginScreen')} hitSlop={10}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.logoContainer}>
        <Text style={styles.logoTexto}>Helios</Text>
        <MaterialCommunityIcons name="arm-flex" size={32} color="#FFB800" />
      </View>

      <Text style={styles.tituloPagina}>Painel do Gestor</Text>

      <Text style={styles.secaoTitulo}>DADOS PESSOAIS</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#64748B"
          autoCapitalize="words"
          value={nome}
          onChangeText={setNome}
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (ex: DD/MM/AAAA)"
          placeholderTextColor="#64748B"
          keyboardType="numeric"
          maxLength={10}
          value={nascimento}
          onChangeText={(txt) => setNascimento(formatarData(txt))}
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu CPF (000.000.000-00)"
          placeholderTextColor="#64748B"
          keyboardType="numeric"
          maxLength={14}
          value={cpf}
          onChangeText={(txt) => setCpf(formatarCPF(txt))}
        />
      </View>

      <Text style={styles.secaoTitulo}>INFORMAÇÕES PROFISSIONAIS</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Número do CREF (ex: CREF 000000-G/SP)"
          placeholderTextColor="#64748B"
          autoCapitalize="characters"
          maxLength={16}
          value={cref}
          onChangeText={(txt) => setCref(formatarCREF(txt))}
        />
      </View>

      {/* Dropdown de Especialidades */}
      <Pressable
        style={styles.inputBox}
        onPress={() => setModalEspecialidades(true)}
      >
        <Text
          style={
            especialidadesSelecionadas.length > 0
              ? styles.dropdownTexto
              : styles.dropdownPlaceholder
          }
          numberOfLines={1}
        >
          {especialidadesSelecionadas.length > 0
            ? especialidadesSelecionadas.join(', ')
            : 'Especialidades (ex: Musculação, Dança)'}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#94A3B8" />
      </Pressable>

      <Text style={styles.secaoTitulo}>CONTATO E ACESSO</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Digite o e-mail profissional"
          placeholderTextColor="#64748B"
          keyboardType="email-address"
          autoCapitalize="none"
          value={emailProf}
          onChangeText={setEmailProf}
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Digite a senha de login"
          placeholderTextColor="#64748B"
          secureTextEntry={!verSenha}
          value={senha}
          onChangeText={setSenha}
        />
        <Pressable onPress={() => setVerSenha(!verSenha)}>
          <Ionicons
            name={verSenha ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#94A3B8"
          />
        </Pressable>
      </View>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor="#64748B"
          secureTextEntry={!verConfirmar}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
        <Pressable onPress={() => setVerConfirmar(!verConfirmar)}>
          <Ionicons
            name={verConfirmar ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#94A3B8"
          />
        </Pressable>
      </View>

      <Pressable style={styles.botaoPrincipal} onPress={aoCadastrar}>
        <Text style={styles.botaoPrincipalTexto}>Cadastrar Instrutor</Text>
      </Pressable>

      {/* Modal do Dropdown de Especialidades */}
      <Modal
        visible={modalEspecialidades}
        transparent
        animationType="slide"
        onRequestClose={() => setModalEspecialidades(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalEspecialidades(false)}
        >
          <Pressable style={styles.modalBox} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>
                Selecione as Especialidades
              </Text>
              <Pressable onPress={() => setModalEspecialidades(false)}>
                <Ionicons name="close" size={24} color="#94A3B8" />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {LISTA_ESPECIALIDADES.map((item) => {
                const selecionada = especialidadesSelecionadas.includes(item);
                return (
                  <Pressable
                    key={item}
                    style={[
                      styles.opcaoItem,
                      selecionada && styles.opcaoItemAtiva,
                    ]}
                    onPress={() => alternarEspecialidade(item)}
                  >
                    <Text
                      style={[
                        styles.opcaoTexto,
                        selecionada && styles.opcaoTextoAtiva,
                      ]}
                    >
                      {item}
                    </Text>
                    <Ionicons
                      name={selecionada ? 'checkbox' : 'square-outline'}
                      size={22}
                      color={selecionada ? '#FFB800' : '#64748B'}
                    />
                  </Pressable>
                );
              })}
            </ScrollView>

            <Pressable
              style={styles.modalBotaoConfirmar}
              onPress={() => setModalEspecialidades(false)}
            >
              <Text style={styles.modalBotaoConfirmarTexto}>Confirmar</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}
