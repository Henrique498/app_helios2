import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1D',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  logo: {
    width: 180,
    height: 60,
    alignSelf: 'center',
    marginBottom: 48,
  },

  title: {
    color: '#FCA311',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },

  subtitle: {
    color: '#9A9EB0',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 32,
  },

  input: {
    backgroundColor: '#0F1A2B',
    borderWidth: 1,
    borderColor: '#1B2A42',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 14,
  },

  registerLink: {
    Color: '#FCA311',
    fontSize: 12,
    textDecorationLine: 'underline',
    marginBottom: 32,
  },

  button: {
    backgroundColor: '#FFB800',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },

  buttoText: {
    color: '#0A0B0E',
    fontSize: 16,
    fontWeight: '600',
  },
});
