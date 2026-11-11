import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#0A0F1D' },
  conteudo: { paddingHorizontal: 20, paddingTop: 56, paddingBottom: 40 },

  cabecalho: { alignItems: 'center', marginBottom: 28 },
  voltar: { position: 'absolute', left: 0, top: 6 },
  logo: { color: '#FFFFFF', fontSize: 34 },
  logoGym: { color: '#FFCC00' },
  subtitulo: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },

  card: {
    backgroundColor: '#0D1B2A',
    borderWidth: 1,
    borderColor: '#2D3748',
    borderRadius: 12,
    marginBottom: 28,
    overflow: 'hidden',
  },
  cardDestaque: { backgroundColor: '#FFB800', borderColor: '#FFB800' },

  topo: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#FFB800',
  },
  topoDestaque: { borderBottomColor: '#000000' },
  plano: { color: '#FFFFFF', fontSize: 32, fontWeight: '900' },
  nomePlano: { color: '#FFB800', fontWeight: '400' },
  nomePlanoDestaque: { color: '#000000' },

  preco: {
    color: '#F2F2F7',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 14,
    marginLeft: 16,
  },
  textoDestaque: { color: '#000000' },

  lista: { padding: 16, gap: 12 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  itemTexto: { color: '#FFFFFF', fontSize: 12, flexShrink: 1 },
});
