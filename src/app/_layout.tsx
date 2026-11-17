import { router, Stack, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { RotinaProvider } from '../contexts/RotinaContext';

const TELAS_RAIZ = ['/', '/HomeScreen', '/login', '/LoginScreen', '/dashboard'];

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
      if (pathname === '/dashboard') {
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
    <RotinaProvider>
      <Stack screenOptions={{ headerShown: false, gestureEnabled: true }} />
    </RotinaProvider>
  );
}
