import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#0A0F1D' },
  conteudo: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  voltar: { marginBottom: 8 },
  logoTexto: { color: '#FFFFFF', fontSize: 32, textAlign: 'center' },
  titulo: {
    color: '#FFB800',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 24,
  },
  campo: { marginBottom: 16 },
  label: { color: '#FFFFFF', fontSize: 14, marginBottom: 6 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E1729',
    borderWidth: 1,
    borderColor: '#1F2A44',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  input: { flex: 1, color: '#FFFFFF', fontSize: 14 },
  botao: {
    backgroundColor: '#FFB800',
    borderRadius: 24,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 32,
    marginTop: 16,
  },
  botaoTexto: { color: '#000000', fontSize: 16 },
});
