import {
  Image,
  ImageStyle,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

type HeliosLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  mostrarTexto?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
};

const TAMANHOS = {
  sm: { width: 36, height: 36, fontSize: 20 },
  md: { width: 42, height: 42, fontSize: 24 },
  lg: { width: 52, height: 52, fontSize: 30 },
};

export function HeliosLogo({
  size = 'md',
  mostrarTexto = true,
  containerStyle,
  imageStyle,
}: HeliosLogoProps) {
  const dimensao = TAMANHOS[size];

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        },
        containerStyle,
      ]}
    >
      {mostrarTexto && (
        <Text
          style={{
            color: '#FFFFFF',
            fontFamily: 'Marcellus_400Regular',
            fontSize: dimensao.fontSize,
            letterSpacing: 0.8,
          }}
        >
          Helios
        </Text>
      )}

      <Image
        source={require('../../assets/images/helios-logo.png')}
        style={[
          {
            width: dimensao.width,
            height: dimensao.height,
            resizeMode: 'contain',
          },
          imageStyle,
        ]}
      />
    </View>
  );
}
