import { Marcellus_400Regular, useFonts } from '@expo-google-fonts/marcellus';
import { router, Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Alert, BackHandler, TextInput, View } from 'react-native';
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


const estadoGlobalInputs = {
  email: '',
  validadeCartao: '',
  numeroCartao: '',
  cvv: '',
  rotaAtual: '/',
};

function validarEmailGlobal(email: string): string | null {
  const limpo = email.trim().toLowerCase();
  if (!limpo) return 'Digite seu e-mail.';
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(limpo)) {
    return 'Digite um e-mail válido (ex: usuario@gmail.com).';
  }
  return null;
}

function validarValidadeGlobal(validade: string): string | null {
  const match = validade.trim().match(/^(\d{2})\/(\d{2})$/);
  if (!match) return 'Validade inválida. Use o formato MM/AA.';
  const mes = Number(match[1]);
  const ano = 2000 + Number(match[2]);
  if (mes < 1 || mes > 12) return 'Mês da validade inválido (01 a 12).';

  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const mesAtual = hoje.getMonth() + 1;
  if (ano < anoAtual || (ano === anoAtual && mes < mesAtual)) {
    return 'Este cartão já está vencido.';
  }
  return null;
}

function sanitizarPorPlaceholder(placeholder: string, texto: string): string {
  const p = placeholder.toLowerCase();


  if (p.includes('e-mail') || p.includes('email')) {
    const semEspacos = texto.replace(/\s/g, '');
    estadoGlobalInputs.email = semEspacos;
    return semEspacos;
  }

 
  if (p.includes('validade') || p.includes('mm/aa') || p.includes('expira')) {
    const digitos = texto.replace(/\D/g, '').slice(0, 4);
    const formatado =
      digitos.length > 2
        ? `${digitos.slice(0, 2)}/${digitos.slice(2)}`
        : digitos;
    estadoGlobalInputs.validadeCartao = formatado;
    return formatado;
  }


  if (p.includes('cartão') || p.includes('cartao') || p.includes('0000 0000')) {
    const digitos = texto.replace(/\D/g, '').slice(0, 16);
    estadoGlobalInputs.numeroCartao = digitos;
    return digitos.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

 
  if (
    p.includes('cvv') ||
    p.includes('cvc') ||
    p.includes('código de segurança')
  ) {
    const digitos = texto.replace(/\D/g, '').slice(0, 4);
    estadoGlobalInputs.cvv = digitos;
    return digitos;
  }

  
  if (p.includes('repet') || p.includes('reps')) {
    const num = texto.replace(/\D/g, '');
    if (!num) return '';
    return String(Math.min(100, Number(num)));
  }

 
  if (p.includes('série') || p.includes('serie')) {
    const num = texto.replace(/\D/g, '');
    if (!num) return '';
    return String(Math.min(12, Number(num)));
  }

  
  if (p.includes('carga') || p.includes('peso') || p.includes('kg')) {
    const num = texto.replace(/[^0-9.,]/g, '');
    if (!num) return '';
    const valor = Number(num.replace(',', '.'));
    if (!Number.isNaN(valor) && valor > 500) return '500';
    return num;
  }

 
  if (p.includes('descanso') || p.includes('segundos')) {
    const num = texto.replace(/\D/g, '');
    if (!num) return '';
    return String(Math.min(600, Number(num)));
  }

  return texto;
}


if (!(TextInput as any).__validacaoGlobalAplicada) {
  (TextInput as any).__validacaoGlobalAplicada = true;
  const originalRender = (TextInput as any).render;

  if (originalRender) {
    (TextInput as any).render = function (props: any, ref: any) {
      const placeholder = String(props?.placeholder || '');
      const ehNumerico =
        /repet|reps|série|serie|carga|peso|kg|descanso|cartão|cartao|cvv|cvc|validade|mm\/aa|cpf|telefone|nascimento/i.test(
          placeholder
        );

      const novoProps = {
        ...props,
        keyboardType:
          props.keyboardType ?? (ehNumerico ? 'numeric' : undefined),
        onChangeText: (txt: string) => {
          const textoValidado = sanitizarPorPlaceholder(placeholder, txt);
          if (props.onChangeText) {
            props.onChangeText(textoValidado);
          }
        },
      };
      return originalRender.call(this, novoProps, ref);
    };
  }
}


function validarAntesDeNavegar(destino: any): boolean {
  const rotaDestino =
    typeof destino === 'string' ? destino : destino?.pathname || '';
  const rotaAtual = estadoGlobalInputs.rotaAtual;


  if (
    (rotaAtual === '/login' || rotaAtual === '/LoginScreen') &&
    ['/dashboard', '/cadastro-instrutor', '/controle-matriculas'].includes(
      rotaDestino
    )
  ) {
    const erroEmail = validarEmailGlobal(estadoGlobalInputs.email);
    if (erroEmail) {
      Alert.alert('E-mail inválido', erroEmail);
      return false;
    }
  }

  
  if (rotaAtual === '/pagamento' && rotaDestino !== '/pagamento') {
    if (estadoGlobalInputs.validadeCartao) {
      const erroValidade = validarValidadeGlobal(
        estadoGlobalInputs.validadeCartao
      );
      if (erroValidade) {
        Alert.alert('Cartão inválido', erroValidade);
        return false;
      }
    }
    if (
      estadoGlobalInputs.numeroCartao &&
      estadoGlobalInputs.numeroCartao.length < 13
    ) {
      Alert.alert('Cartão inválido', 'Número do cartão incompleto.');
      return false;
    }
    if (estadoGlobalInputs.cvv && estadoGlobalInputs.cvv.length < 3) {
      Alert.alert('Cartão inválido', 'CVV deve ter 3 ou 4 dígitos.');
      return false;
    }
  }

  return true;
}

const originalBack = router.back.bind(router);
router.back = () => {
  if (router.canGoBack()) {
    originalBack();
  } else {
    router.replace('/dashboard');
  }
};

const originalPush = router.push.bind(router);
router.push = ((href: any, options?: any) => {
  if (!validarAntesDeNavegar(href)) return;
  return originalPush(href, options);
}) as typeof router.push;

const originalReplace = router.replace.bind(router);
router.replace = ((href: any, options?: any) => {
  if (!validarAntesDeNavegar(href)) return;
  return originalReplace(href, options);
}) as typeof router.replace;

export default function RootLayout() {
  const pathname = usePathname();
  estadoGlobalInputs.rotaAtual = pathname;
  const configLogo = CONFIG_LOGO_FIGMA[pathname];

  const [fontsLoaded] = useFonts({
    Marcellus_400Regular,
  });

  useEffect(() => {
    estadoGlobalInputs.email = '';
    estadoGlobalInputs.validadeCartao = '';
    estadoGlobalInputs.numeroCartao = '';
    estadoGlobalInputs.cvv = '';
  }, [pathname]);

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
