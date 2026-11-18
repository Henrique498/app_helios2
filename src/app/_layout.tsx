import { Marcellus_400Regular, useFonts } from '@expo-google-fonts/marcellus';
import { router, Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { BackHandler, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HeliosLogo } from '../components/HeliosLogo';
import { RotinaProvider } from '../contexts/RotinaContext';

const TELAS_RAIZ = [
  '/',
  '/HomeScreen',
  '/login',
  '/LoginScreen',
  '/dashboard',
  '/cadastro-instrutor',
  '/controle-matriculas',
];

const CONFIG_LOGO_FIGMA: Record<
  string,
  {
    size: 'sm' | 'md' | 'lg';
    top: number;
    mostrarTexto: boolean;
    transparente?: boolean;
  }
> = {
  '/': { size: 'md', top: 12, mostrarTexto: true, transparente: true },
  '/HomeScreen': {
    size: 'md',
    top: 12,
    mostrarTexto: true,
    transparente: true,
  },
  '/login': { size: 'lg', top: 56, mostrarTexto: true },
  '/LoginScreen': { size: 'lg', top: 56, mostrarTexto: true },
  '/cadastro': { size: 'md', top: 8, mostrarTexto: true },
  '/RegisterScreen': { size: 'md', top: 8, mostrarTexto: true },
  '/controle-matriculas': { size: 'sm', top: 8, mostrarTexto: false },
  '/cadastro-instrutor': { size: 'md', top: 8, mostrarTexto: true },
};

const originalBack = router.back.bind(router);
router.back = () => {
  if (router.canGoBack()) {
    originalBack();
  } else {
    router.replace('/dashboard');
  }
};

export default function RootLayout() {
  const pathname = usePathname();
  const configLogo = CONFIG_LOGO_FIGMA[pathname];

  const [fontsLoaded] = useFonts({
    Marcellus_400Regular,
  });

  useEffect(() => {
    if (pathname === '/pagamento') return;

    const onBackPress = () => {
      if (
        pathname === '/dashboard' ||
        pathname === '/cadastro-instrutor' ||
        pathname === '/controle-matriculas'
      ) {
        return true;
      }

      if (TELAS_RAIZ.includes(pathname)) {
        return false;
      }

      router.back();
      return true;
    };

    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, [pathname]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top', 'bottom']}
        style={{ flex: 1, backgroundColor: '#0A0F1D' }}
      >
        <StatusBar style="light" />
        <RotinaProvider>
          <View style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                contentStyle: {
                  backgroundColor: '#0A0F1D',
                },
              }}
            />

            {configLogo && (
              <View
                pointerEvents="none"
                style={{
                  position: 'absolute',
                  top: configLogo.top,
                  left: 56,
                  right: 56,
                  paddingVertical: 2,
                  backgroundColor: configLogo.transparente
                    ? 'transparent'
                    : '#0A0F1D',
                  alignItems: 'center',
                  zIndex: 20,
                }}
              >
                <HeliosLogo
                  size={configLogo.size}
                  mostrarTexto={configLogo.mostrarTexto}
                />
              </View>
            )}
          </View>
        </RotinaProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
