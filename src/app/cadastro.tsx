import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
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

  function continuar() {
    console.log({
      nome,
      nascimento,
      cpf: apenasNumeros(cpf),
      telefone: `+${pais.ddi}${apenasNumeros(telefone)}`,
      email,
    });
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
        placeholder="Data de Nascimento (ex: DD/MM/AAAA"
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
