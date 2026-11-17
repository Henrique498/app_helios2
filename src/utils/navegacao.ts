import { router } from 'expo-router';

export function voltarTela() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/dashboard');
  }
}
