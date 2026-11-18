import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { emailValido } from '../utils/validadores';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function aoEntrar() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha para entrar.');
      return;
    }
    if (!emailValido(email)) {
      Alert.alert(
        'E-mail inválido',
        'Digite um e-mail válido, por exemplo: nome@email.com'
      );
      return;
    }
    if (senha === '123456') {
      router.replace('/cadastro-instrutor');
      return;
    }
    if (senha === '1234567') {
      router.replace('/controle-matriculas');
      return;
    }
    router.replace({
      pathname: '/dashboard',
      params: { plano: 'black', nome: 'Aluno' },
    });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#0A0F1D' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 24,
          paddingVertical: 40,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          onPress={() => router.replace('/')}
          style={{ position: 'absolute', top: 16, left: 20, padding: 6 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>

        {/* Espaçamento para a logo universal do _layout.tsx não sobrepor o subtítulo */}
        <View style={{ alignItems: 'center', marginBottom: 28, marginTop: 40 }}>
          <Text style={{ color: '#94A3B8', fontSize: 14, marginTop: 12 }}>
            Acesse sua conta para continuar
          </Text>
        </View>

        <Text
          style={{
            color: '#E2E8F0',
            fontSize: 13,
            fontWeight: '600',
            marginBottom: 6,
          }}
        >
          E-mail
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#111827',
            borderWidth: 1,
            borderColor: '#1E293B',
            borderRadius: 12,
            height: 52,
            paddingHorizontal: 14,
            marginBottom: 16,
          }}
        >
          <Ionicons
            name="mail-outline"
            size={20}
            color="#64748B"
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{ flex: 1, color: '#FFFFFF', fontSize: 15 }}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#64748B"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text
          style={{
            color: '#E2E8F0',
            fontSize: 13,
            fontWeight: '600',
            marginBottom: 6,
          }}
        >
          Senha
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#111827',
            borderWidth: 1,
            borderColor: '#1E293B',
            borderRadius: 12,
            height: 52,
            paddingHorizontal: 14,
            marginBottom: 24,
          }}
        >
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#64748B"
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{ flex: 1, color: '#FFFFFF', fontSize: 15 }}
            placeholder="Digite sua senha"
            placeholderTextColor="#64748B"
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={setSenha}
          />
          <Pressable onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Ionicons
              name={mostrarSenha ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#94A3B8"
            />
          </Pressable>
        </View>

        <Pressable
          onPress={aoEntrar}
          style={{
            backgroundColor: '#FFB800',
            borderRadius: 12,
            height: 54,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#0A0F1D', fontSize: 17, fontWeight: '800' }}>
            Entrar
          </Text>
        </Pressable>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 22,
            gap: 6,
          }}
        >
          <Text style={{ color: '#94A3B8', fontSize: 14 }}>
            Ainda não tem conta?
          </Text>
          <Pressable onPress={() => router.push('/cadastro')}>
            <Text style={{ color: '#FFB800', fontSize: 14, fontWeight: '700' }}>
              Cadastre-se
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
