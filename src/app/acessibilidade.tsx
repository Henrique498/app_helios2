import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native';
import { styles } from '../styles/acessibilidade.styles';

export default function AcessibilidadeScreen() {
  const router = useRouter();
  const [altoContraste, setAltoContraste] = useState(false);
  const [textoGrande, setTextoGrande] = useState(false);
  const [reduzirAnimacoes, setReduzirAnimacoes] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@helios_a11y').then((raw) => {
      if (!raw) return;
      const prefs = JSON.parse(raw);
      setAltoContraste(!!prefs.altoContraste);
      setTextoGrande(!!prefs.textoGrande);
      setReduzirAnimacoes(!!prefs.reduzirAnimacoes);
    });
  }, []);

  async function salvar(chave: string, valor: boolean) {
    const atual = {
      altoContraste,
      textoGrande,
      reduzirAnimacoes,
      [chave]: valor,
    };
    await AsyncStorage.setItem('@helios_a11y', JSON.stringify(atual));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.cabecalho}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.titulo} accessibilityRole="header">
            Acessibilidade
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.opcaoLinha}>
            <View style={styles.opcaoTextos}>
              <Text style={styles.opcaoTitulo}>Alto contraste</Text>
              <Text style={styles.opcaoSubtitulo}>
                Aumenta o destaque entre textos, bordas e fundos
              </Text>
            </View>
            <Switch
              value={altoContraste}
              onValueChange={(v) => {
                setAltoContraste(v);
                salvar('altoContraste', v);
              }}
              accessibilityLabel="Ativar alto contraste"
              trackColor={{ false: '#334155', true: '#FFB800' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.opcaoLinha}>
            <View style={styles.opcaoTextos}>
              <Text style={styles.opcaoTitulo}>Texto ampliado</Text>
              <Text style={styles.opcaoSubtitulo}>
                Aumenta o tamanho das fontes nas telas de treino
              </Text>
            </View>
            <Switch
              value={textoGrande}
              onValueChange={(v) => {
                setTextoGrande(v);
                salvar('textoGrande', v);
              }}
              accessibilityLabel="Ativar texto ampliado"
              trackColor={{ false: '#334155', true: '#FFB800' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.opcaoLinha}>
            <View style={styles.opcaoTextos}>
              <Text style={styles.opcaoTitulo}>Reduzir animações</Text>
              <Text style={styles.opcaoSubtitulo}>
                Pausa vídeos e transições automáticas
              </Text>
            </View>
            <Switch
              value={reduzirAnimacoes}
              onValueChange={(v) => {
                setReduzirAnimacoes(v);
                salvar('reduzirAnimacoes', v);
              }}
              accessibilityLabel="Reduzir animações"
              trackColor={{ false: '#334155', true: '#FFB800' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <Pressable
          style={styles.botaoSistema}
          onPress={() => Linking.openSettings()}
          accessibilityRole="button"
          accessibilityLabel="Abrir configurações de acessibilidade do sistema"
        >
          <Text style={styles.botaoSistemaTexto}>
            Ajustes de acessibilidade do aparelho
          </Text>
          <Ionicons
            name="open-outline"
            size={18}
            color="#FFB800"
            importantForAccessibility="no"
            accessibilityElementsHidden
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
