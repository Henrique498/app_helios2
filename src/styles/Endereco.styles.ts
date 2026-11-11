import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#0A0F1D' },
  conteudo: { paddingHorizontal: 26, paddingTop: 48, paddingBottom: 40 },
  voltar: { marginBottom: 4 },
  logo: {
    color: '#FFFFFF',
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 24,
  },
  logoGym: { color: '#FFCC00' },
  titulo: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
  subtitulo: { color: '#AEAEB2', fontSize: 11, marginTop: 2, marginBottom: 18 },
  botao: {
    backgroundColor: '#FFB800',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  botaoTexto: { color: '#000000', fontSize: 16 },
});
