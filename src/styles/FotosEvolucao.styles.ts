
import { Platform, StatusBar, StyleSheet } from 'react-native';

const COR_FUNDO = '#0A0F1D';
const COR_CARD = '#111827';
const COR_BORDA = '#1E293B';
const COR_DESTAQUE = '#FFB800';
const COR_TEXTO = '#E2E8F0';
const COR_TEXTO_SUAVE = '#94A3B8';

export const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: COR_FUNDO,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0,
  },
  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  carregando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Topo
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  voltar: {
    padding: 6,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  tituloDestaque: {
    color: COR_DESTAQUE,
  },
  subtitulo: {
    color: COR_TEXTO_SUAVE,
    fontSize: 13,
    marginTop: 2,
  },

  // Escolha da posição (Frente / Lado / Costas)
  rotulo: {
    color: COR_TEXTO,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  chipsLinha: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COR_BORDA,
    backgroundColor: COR_CARD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipAtivo: {
    backgroundColor: COR_DESTAQUE,
    borderColor: COR_DESTAQUE,
  },
  chipTexto: {
    color: COR_TEXTO_SUAVE,
    fontSize: 14,
    fontWeight: '600',
  },
  chipTextoAtivo: {
    color: COR_FUNDO,
    fontWeight: '800',
  },

  // Botões de ação
  acoesLinha: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  botaoPrincipal: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: COR_DESTAQUE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  botaoPrincipalTexto: {
    color: COR_FUNDO,
    fontSize: 15,
    fontWeight: '800',
  },
  botaoSecundario: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COR_DESTAQUE,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  botaoSecundarioTexto: {
    color: COR_DESTAQUE,
    fontSize: 15,
    fontWeight: '700',
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },

  // Seções
  secaoTitulo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 12,
  },
  card: {
    backgroundColor: COR_CARD,
    borderWidth: 1,
    borderColor: COR_BORDA,
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
  },

  // Antes e depois
  comparacaoLinha: {
    flexDirection: 'row',
    gap: 10,
  },
  comparacaoColuna: {
    flex: 1,
  },
  comparacaoImagem: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 10,
    backgroundColor: COR_BORDA,
  },
  comparacaoLegenda: {
    color: COR_TEXTO,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
  },
  comparacaoData: {
    color: COR_TEXTO_SUAVE,
    fontSize: 12,
    marginTop: 2,
  },
  resumoEvolucao: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COR_BORDA,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  resumoEvolucaoTexto: {
    color: COR_DESTAQUE,
    fontSize: 14,
    fontWeight: '700',
  },

  // Estado vazio
  vazio: {
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  vazioTexto: {
    color: COR_TEXTO_SUAVE,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Histórico (grade)
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  miniatura: {
    width: '31%',
    aspectRatio: 3 / 4,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COR_CARD,
  },
  miniaturaImagem: {
    width: '100%',
    height: '100%',
  },
  miniaturaData: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Modal de foto ampliada
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
  },
  modalTopo: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 12 : 56,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  modalBotaoIcone: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImagem: {
    width: '100%',
    height: '72%',
  },
  modalInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  modalInfoTitulo: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  modalInfoData: {
    color: COR_TEXTO_SUAVE,
    fontSize: 13,
    marginTop: 2,
  },
});
