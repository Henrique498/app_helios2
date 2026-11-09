import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../styles/LoginScreen.styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {
    console.log('login', email, senha);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="light" />

      <View style={styles.content}>
        <Image
          source={require('../../assets/logo-helios.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Bem-vindo de volta.</Text>
        <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#6B7385"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#6B7385"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.registerLink}>Cadastre-se aqui.</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleLogin}
        >
            <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
