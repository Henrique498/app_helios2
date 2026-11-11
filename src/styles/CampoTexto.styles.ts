import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bloco: { marginBottom: 14 },
  label: { color: '#FFFFFF', fontSize: 11, marginBottom: 5 },
  labelClaro: { color: '#000000', fontSize: 12 },

  caixa: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  caixaEscura: {
    height: 41,
    backgroundColor: '#0D1B2A',
    borderColor: '#A0AEC0',
    borderRadius: 6,
  },
  caixaClara: {
    height: 36,
    backgroundColor: '#F2F2F7',
    borderColor: '#D1D1D6',
    borderRadius: 2,
  },
  caixaFoco: { borderColor: '#FFB800' },

  input: { flex: 1, color: '#FFFFFF', fontSize: 14 },
  inputClaro: { color: '#0A0F1D', fontSize: 12 },
});
