import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import {
  AccessibilityInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../styles/HomeScreen.styles';

const videoSource = require('../../assets/background-video.mp4');

export default function HomeScreen() {
  const router = useRouter();
  const [reduzir, setReduzir] = useState(false);

  const player = useVideoPlayer(videoSource, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduzir);
    const sub = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduzir
    );
    return () => sub.remove();
  }, []);

  useEffect(() => {
    reduzir ? player.pause() : player.play();
  }, [reduzir, player]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View
        style={StyleSheet.absoluteFill}
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden
      >
        <VideoView
          player={player}
          style={{ flex: 1 }}
          contentFit="cover"
          nativeControls={false}
        />
      </View>
      <View style={styles.overlay} pointerEvents="none" />

      <View style={styles.content}>
        {/* Header limpo (a logo oficial é gerada universalmente pelo _layout.tsx) */}
        <View style={styles.header} />

        <View style={styles.card}>
          <Text style={styles.title} accessibilityRole="header">
            Sua evolução começa aqui
          </Text>
          <Text style={styles.subtitle}>
            Acompanhe seus treinos, planos e evolução em um só lugar.
          </Text>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => router.push('/cadastro')}
            accessibilityRole="button"
            accessibilityLabel="Começar agora, criar conta"
          >
            <Text style={styles.buttonText}>COMEÇAR AGORA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.loginContainer}
            onPress={() => router.push('/login')}
            accessibilityRole="link"
            accessibilityLabel="Já tem uma conta? Entrar"
          >
            <Text style={styles.loginText}>
              Já tem uma conta? <Text style={styles.loginLink}>Entrar.</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
