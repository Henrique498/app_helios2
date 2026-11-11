import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 166,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'center',
  },

  topo: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  textos: { flex: 1 },
  titulo: { color: '#FFFFFF', fontSize: 24, fontWeight: '700' },
  subtitulo: { color: '#A0AEC0', fontSize: 10 },

  botao: {
    alignSelf: 'center',
    width: '75%',
    height: 38,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFB800',
    backgroundColor: '#0D1B2A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  botaoTexto: { color: '#FFB800', fontSize: 14 },

  linhaCodigo: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  qrBox: { backgroundColor: '#FFFFFF', padding: 6, borderRadius: 4 },
  infoCodigo: { flex: 1, alignItems: 'center' },
  codigoTitulo: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  codigoSub: { color: '#A0AEC0', fontSize: 10, marginBottom: 10 },

  pilula: {
    width: 170,
    height: 36,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFB800',
    backgroundColor: '#0D1B2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pilulaTexto: { color: '#FFB800', fontSize: 18, fontWeight: '600' },
  expira: { color: '#A0AEC0', fontSize: 10, marginTop: 8 },

  recargaBloco: { alignItems: 'center', marginTop: 14 },
  recargaLabel: { color: '#FFFFFF', fontSize: 10, marginBottom: 6 },
});
