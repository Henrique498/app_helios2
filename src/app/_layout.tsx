import { router, Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top', 'bottom']}
        style={{ flex: 1, backgroundColor: '#0A0F1D' }}
      >
        <StatusBar style="light" />
        <RotinaProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              contentStyle: {
                backgroundColor: '#0A0F1D',
              },
            }}
          />
        </RotinaProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
