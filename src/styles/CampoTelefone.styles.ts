import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  seletor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 10,
    marginRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#1F2A44',
    height: '100%',
  },
  flag: { fontSize: 20 },
  ddi: { color: '#FFFFFF', fontSize: 14 },

  fundoModal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  fechar: { flex: 1 },
  modal: {
    maxHeight: '60%',
    backgroundColor: '#0E1729',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  modalTitulo: {
    color: '#FFB800',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2A44',
  },
  itemNome: { flex: 1, color: '#FFFFFF', fontSize: 15 },
  itemDdi: { color: '#8A94A6', fontSize: 14 },
});
