import { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { styles } from '../styles/CampoTexto.styles';

type Props = TextInputProps & {
  label: string;
  tema?: 'escuro' | 'claro';
  esquerda?: React.ReactNode;
  direita?: React.ReactNode;
};

export default function CampoTexto({
  label,
  tema = 'escuro',
  esquerda,
  direita,
  onFocus,
  onBlur,
  ...rest
}: Props) {
  const [focado, setFocado] = useState(false);
  const claro = tema === 'claro';

  return (
    <View style={styles.bloco}>
      <Text
        style={[styles.label, claro && styles.labelClaro]}
        importantForAccessibility="no"
        accessibilityElementsHidden
      >
        {label}
      </Text>

      <View
        style={[
          styles.caixa,
          claro ? styles.caixaClara : styles.caixaEscura,
          focado && styles.caixaFoco,
        ]}
      >
        {esquerda}
        <TextInput
          {...rest}
          accessibilityLabel={rest.accessibilityLabel ?? label}
          placeholderTextColor={claro ? '#64748B' : '#A0AEC0'}
          style={[styles.input, claro && styles.inputClaro]}
          onFocus={(e) => {
            setFocado(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocado(false);
            onBlur?.(e);
          }}
        />
        {direita}
      </View>
    </View>
  );
}
