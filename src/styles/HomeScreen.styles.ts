import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0b0e',
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // Camada transparente para dar contraste às letras
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 36,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 180,
    height: 60,
  },
  card: {
    backgroundColor: '#131822',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#9A9EB0',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FCA311',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#0A0B0E',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  loginContainer: {
    paddingVertical: 4,
  },
  loginText: {
    color: '#A0A5B5',
    fontSize: 14,
  },
  loginLink: {
    color: '#FCA311',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
