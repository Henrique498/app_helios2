import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1D',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    padding: 4,
  },
  header: {
    marginBottom: 24,
  },
  iconTop: {
    marginBottom: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
  },
  titleHighlight: {
    color: '#F5B800',
  },
  subtitle: {
    color: '#9BA3B4',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },


  daysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  dayTab: {
    minWidth: 56,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#131B26',
    borderWidth: 1,
    borderColor: '#1F2A3A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  dayTabActive: {
    backgroundColor: '#F5B800',
    borderColor: '#F5B800',
  },
  dayTabText: {
    color: '#9BA3B4',
    fontSize: 13,
    fontWeight: '700',
  },
  dayTabTextActive: {
    color: '#0A0E17',
    fontWeight: '800',
  },


  card: {
    backgroundColor: '#0D1B2A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E2D3D',
    padding: 16,
  },
  cardHeader: {
    backgroundColor: '#F5B800',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#0A0E17',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyText: {
    color: '#9BA3B4',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 24,
  },


  itemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#1E2D3D',
    paddingVertical: 12,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  numeroCirculo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1B2838',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroCirculoConcluido: {
    backgroundColor: '#22C55E',
  },
  numeroTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  exerciseIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(245, 184, 0, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  exerciseDetails: {
    color: '#9BA3B4',
    fontSize: 12,
    marginTop: 3,
  },


  gavetaExpandida: {
    marginTop: 12,
    backgroundColor: '#0A0F1D',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E2D3D',
    padding: 12,
    gap: 10,
  },
  gavetaTitulo: {
    color: '#F5B800',
    fontSize: 12,
    fontWeight: '800',
  },
  inputsLinha: {
    flexDirection: 'row',
    gap: 8,
  },
  campoBox: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  campoLabel: {
    color: '#94A3B8',
    fontSize: 10,
    marginBottom: 2,
  },
  campoInput: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    padding: 0,
  },
  ajusteCargaRow: {
    flexDirection: 'row',
    gap: 8,
  },
  ajusteBtn: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: 'center',
  },
  ajusteBtnTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  metricasBox: {
    gap: 4,
  },
  metricaTexto: {
    color: '#94A3B8',
    fontSize: 11,
  },
  metricaDestaque: {
    color: '#F5B800',
    fontWeight: '700',
  },
  acoesGavetaRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  btnSalvarEdicao: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#F5B800',
    borderRadius: 8,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSalvarEdicaoTexto: {
    color: '#F5B800',
    fontSize: 13,
    fontWeight: '700',
  },
  btnConcluirEx: {
    flex: 2,
    backgroundColor: '#16A34A',
    borderRadius: 8,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  btnConcluirExTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },


  addButton: {
    borderWidth: 1.5,
    borderColor: '#F5B800',
    borderRadius: 24,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  addButtonText: {
    color: '#F5B800',
    fontSize: 14,
    fontWeight: '700',
  },
  concluirTreinoButton: {
    backgroundColor: '#F5B800',
    borderRadius: 24,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  concluirTreinoButtonText: {
    color: '#0A0E17',
    fontSize: 15,
    fontWeight: '800',
  },
});
