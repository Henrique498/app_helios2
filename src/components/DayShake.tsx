import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Pressable, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { styles } from '../styles/DayShake.styles';
import { formatarTempo } from '../utils/formatadores';

type Estado = 'inicial' | 'ativo' | 'recarga';

const DURACAO_CODIGO = 60;
const DURACAO_RECARGA = 20;

export default function DayShake() {
  const [estado, setEstado] = useState<Estado>('inicial');
  const [restante, setRestante] = useState(0);
  const [codigo, setCodigo] = useState('');

  useEffect(() => {
    if (estado === 'inicial') return;

    const id = setInterval(() => {
      setRestante((r) => Math.max(0, r - 1));
    }, 1000);

    return () => clearInterval(id);
  }, [estado]);

  useEffect(() => {
    if (estado === 'inicial' || restante > 0) return;

    if (estado === 'ativo') {
      AccessibilityInfo.announceForAccessibility('Código expirado.');
      setCodigo('');
      setRestante(DURACAO_RECARGA);
      setEstado('recarga');
    } else {
      setEstado('inicial');
    }
  }, [restante, estado]);

  function gerarCodigo() {
    setCodigo(`HELIOS-DAYSHAKE-${Date.now()}`);
    setRestante(DURACAO_CODIGO);
    setEstado('ativo');
    AccessibilityInfo.announceForAccessibility(
      `Código gerado. Ele expira em ${DURACAO_CODIGO} segundos.`
    );
  }

  return (
    <LinearGradient
      colors={['#0D1B2A', '#0D1B2A', '#3F3720']}
      locations={[0, 0.45, 1]}
      style={styles.card}
    >
      {estado === 'inicial' && (
        <>
          <View style={styles.topo}>
            <MaterialCommunityIcons
              name="cup"
              size={38}
              color="#FFFFFF"
              importantForAccessibility="no"
              accessibilityElementsHidden
            />
            <View style={styles.textos}>
              <Text style={styles.titulo} accessibilityRole="header">
                Day Shake
              </Text>
              <Text style={styles.subtitulo}>Seu benefício exclusivo</Text>
            </View>
          </View>

          <Pressable
            style={styles.botao}
            onPress={gerarCodigo}
            accessibilityRole="button"
            accessibilityLabel="Gerar código do Day Shake"
          >
            <Text style={styles.botaoTexto}>Gerar Código</Text>
          </Pressable>
        </>
      )}

      {estado === 'ativo' && (
        <View style={styles.linhaCodigo}>
          <View
            style={styles.qrBox}
            accessible
            accessibilityRole="image"
            accessibilityLabel="Código QR do Day Shake. Apresente no caixa da academia."
          >
            <QRCode value={codigo} size={96} />
          </View>

          <View style={styles.infoCodigo}>
            <Text style={styles.codigoTitulo} accessibilityRole="header">
              Código Ativo!
            </Text>
            <Text style={styles.codigoSub}>Use no caixa da academia.</Text>

            <View
              style={styles.pilula}
              accessible
              accessibilityRole="timer"
              accessibilityLabel={`Tempo restante: ${restante} segundos`}
            >
              <Text style={styles.pilulaTexto}>{formatarTempo(restante)}</Text>
            </View>

            <Text style={styles.expira}>
              Expira em {DURACAO_CODIGO} segundos
            </Text>
          </View>
        </View>
      )}

      {estado === 'recarga' && (
        <>
          <View style={styles.topo}>
            <MaterialCommunityIcons
              name="cup"
              size={38}
              color="#FFFFFF"
              importantForAccessibility="no"
              accessibilityElementsHidden
            />
            <View style={styles.textos}>
              <Text style={styles.titulo} accessibilityRole="header">
                Day Shake
              </Text>
              <Text style={styles.subtitulo}>
                Após o uso, você ficará 24h sem poder gerar um novo código.
              </Text>
            </View>
          </View>

          <View style={styles.recargaBloco}>
            <Text style={styles.recargaLabel}>Novo código disponível em:</Text>
            <View
              style={styles.pilula}
              accessible
              accessibilityRole="timer"
              accessibilityLabel={`Tempo restante para recarga: ${restante} segundos`}
            >
              <Text style={styles.pilulaTexto}>
                {formatarTempo(restante, true)}
              </Text>
            </View>
          </View>
        </>
      )}
    </LinearGradient>
  );
}
