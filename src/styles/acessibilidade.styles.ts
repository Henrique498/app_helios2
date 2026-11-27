import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1D',
  },
  conteudo: {
    padding: 20,
    paddingBottom: 40,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  card: {
    backgroundColor: '#0D1B2A',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
    padding: 16,
    gap: 18,
  },
  opcaoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  opcaoTextos: {
    flex: 1,
    paddingRight: 12,
  },
  opcaoTitulo: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  opcaoSubtitulo: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  botaoSistema: {
    marginTop: 20,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#FFB800',
    borderRadius: 12,
    minHeight: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  botaoSistemaTexto: {
    color: '#FFB800',
    fontWeight: '700',
    fontSize: 14,
  },
});
