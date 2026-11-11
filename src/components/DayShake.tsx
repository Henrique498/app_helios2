import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { styles } from '../styles/DayShake.styles';
import { formatarTempo } from '../utils/formatadores';

type Estado = 'inicial' | 'ativo' | 'recarga';

const DURACAO_CODIGO = 30; // segundos (simulação)
const DURACAO_RECARGA = 20; // segundos (simulação)

export default function DayShake() {
  const [estado, setEstado] = useState<Estado>('inicial');
  const [restante, setRestante] = useState(0);
  const [codigo, setCodigo] = useState('');

  // 1) Enquanto não estiver "inicial", conta 1 segundo por vez
  useEffect(() => {
    if (estado === 'inicial') return;

    const id = setInterval(() => {
      setRestante((r) => Math.max(0, r - 1));
    }, 1000);

    return () => clearInterval(id);
  }, [estado]);

  // 2) Quando o tempo zera, passa para a próxima fase
  useEffect(() => {
    if (estado === 'inicial' || restante > 0) return;

    if (estado === 'ativo') {
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
            <MaterialCommunityIcons name="cup" size={38} color="#FFFFFF" />
            <View style={styles.textos}>
              <Text style={styles.titulo}>Day Shake</Text>
              <Text style={styles.subtitulo}>Seu beneficio exclusivo</Text>
            </View>
          </View>

          <Pressable style={styles.botao} onPress={gerarCodigo}>
            <Text style={styles.botaoTexto}>Gerar Codigo</Text>
          </Pressable>
        </>
      )}

      {estado === 'ativo' && (
        <View style={styles.linhaCodigo}>
          <View style={styles.qrBox}>
            <QRCode value={codigo} size={96} />
          </View>

          <View style={styles.infoCodigo}>
            <Text style={styles.codigoTitulo}>Codigo Ativo!</Text>
            <Text style={styles.codigoSub}>Use no caixa da academia.</Text>

            <View style={styles.pilula}>
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
            <MaterialCommunityIcons name="cup" size={38} color="#FFFFFF" />
            <View style={styles.textos}>
              <Text style={styles.titulo}>Day Shake</Text>
              <Text style={styles.subtitulo}>
                Após o uso, você ficará 24h sem poder gerar um novo código.
              </Text>
            </View>
          </View>

          <View style={styles.recargaBloco}>
            <Text style={styles.recargaLabel}>Novo código disponível em:</Text>
            <View style={styles.pilula}>
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
