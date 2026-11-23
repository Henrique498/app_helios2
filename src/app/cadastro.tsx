import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardTypeOptions,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import CampoTelefone from '../components/CampoTelefone';
import { styles } from '../styles/Cadastro.styles';
import {
  apenasNumeros,
  formatarCPF,
  formatarData,
} from '../utils/formatadores';
import { PAISES, Pais } from '../utils/paises';
import { cadastrarUsuario } from '../utils/usuarios';

type CampoProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (texto: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  direita?: React.ReactNode;
};

function Campo({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  direita,
}: CampoProps) {
  return (
    <View style={styles.Campo}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#8A84A6"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />
        {direita}
      </View>
    </View>
  );
}

export default function Cadastro() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmar, setVerConfirmar] = useState(false);
  const [pais, setPais] = useState<Pais>(PAISES[0]);

  function validar(): string | null {
    if (!nome.trim()) return 'Digite seu nome completo.';
    if (nascimento.length < 10)
      return 'Digite a data de nascimento completa (DD/MM/AAAA).';
    if (apenasNumeros(cpf).length !== 11)
      return 'O CPF precisa ter 11 dígitos.';
    if (apenasNumeros(telefone).length < 8) return 'Digite um telefone válido.';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Digite um e-mail válido.';
    if (senha.length < 6) return 'A senha precisa ter pelo menos 6 caracteres.';
    if (senha !== confirmar) return 'As senhas não são iguais.';
    if (senha === '123456' || senha === '1234567')
      return 'Escolha outra senha (essa é reservada).';
    return null;
  }

  async function continuar() {
    const erro = validar();

    if (erro) {
      Alert.alert('Atenção', erro);
      return;
    }

    const resultado = await cadastrarUsuario({
      nome: nome.trim(),
      email,
      senha,
    });

    if (resultado === 'email-existente') {
      Alert.alert('Atenção', 'Já existe uma conta com esse e-mail.');
      return;
    }

    router.push('/planos');
  }

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Pressable onPress={() => router.back()} style={styles.voltar}>
        <Ionicons name="arrow-back" size={24} color={'#FFFFFF'} />
      </Pressable>

      <Text style={styles.logoTexto}>Helios</Text>
      <Text style={styles.titulo}>Cadastro de alunos</Text>

      <Campo
        label="Nome Completo"
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <Campo
        label="Data de Nascimento"
        placeholder="Data de Nascimento (ex: DD/MM/AAAA)"
        value={nascimento}
        onChangeText={(texto) => setNascimento(formatarData(texto))}
        keyboardType="numeric"
      />

      <Campo
        label="CPF"
        placeholder="Digite seu CPF"
        value={cpf}
        onChangeText={(texto) => setCpf(formatarCPF(texto))}
        keyboardType="numeric"
      />

      <CampoTelefone
        value={telefone}
        onChangeText={setTelefone}
        pais={pais}
        onChangePais={setPais}
      />

      <Campo
        label="E-Mail"
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Campo
        label="Senha"
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={!verSenha}
        direita={
          <Pressable onPress={() => setVerSenha(!verSenha)}>
            <Ionicons
              name={verSenha ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={'#D3D3D3'}
            />
          </Pressable>
        }
      />

      <Campo
        label="Confirmar senha"
        placeholder="Confirme sua senha"
        value={confirmar}
        onChangeText={setConfirmar}
        secureTextEntry={!verConfirmar}
        direita={
          <Pressable onPress={() => setVerConfirmar(!verConfirmar)}>
            <Ionicons
              name={verConfirmar ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={'#D3D3D3'}
            />
          </Pressable>
        }
      />

      <Pressable style={styles.botao} onPress={continuar}>
        <Text style={styles.botaoTexto}>Continuar cadastro</Text>
      </Pressable>
    </ScrollView>
  );
}
