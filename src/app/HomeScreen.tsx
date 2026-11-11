import { StatusBar } from 'expo-status-bar';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/HomeScreen.styles';

import { useRouter } from 'expo-router';

const videoSource = require('../../assets/background-video.mp4');
export default function HomeScreen() {
  const router = useRouter();
  const player = useVideoPlayer(videoSource, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={StyleSheet.absoluteFill}>
        <VideoView
          player={player}
          style={{ flex: 1 }}
          contentFit="cover"
          nativeControls={false}
        />
      </View>
      {/* Camada escura de sobreposição */}
      <View style={styles.overlay} pointerEvents="none" />

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/logo-helios.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Sua evolução começa aqui</Text>
          <Text style={styles.subtitle}>
            Acompanhe seus treinos, planos e evolução em um só lugar.
          </Text>

          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => router.push('/cadastro')}>
            <Text style={styles.buttonText}>COMEÇAR AGORA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.loginContainer}
            onPress={() => router.push('/login')}
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
