import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  /** Recebe os 4 últimos dígitos e a bandeira detectada */
  onSalvar: (final: string, bandeira: string) => void;
};

function detectarBandeira(numero: string): string {
  if (/^4/.test(numero)) return 'VISA';
  if (/^(5[1-5]|2[2-7])/.test(numero)) return 'Mastercard';
  if (/^3[47]/.test(numero)) return 'AMEX';
  if (/^3(0|6|8)/.test(numero)) return 'Diners';
  if (/^(4011|4312|4389|5041|5067|6362|6363)/.test(numero)) return 'Elo';
  return 'Cartão';
}

function formatarNumero(v: string) {
  return v
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function formatarValidade(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

function validadeOk(v: string) {
  if (!/^\d{2}\/\d{2}$/.test(v)) return false;
  const mes = Number(v.slice(0, 2));
  const ano = 2000 + Number(v.slice(3));
  if (mes < 1 || mes > 12) return false;
  const hoje = new Date();
  // válido até o último dia do mês informado
  return (
    ano > hoje.getFullYear() ||
    (ano === hoje.getFullYear() && mes >= hoje.getMonth() + 1)
  );
}

export default function AlterarCartaoModal({
  visible,
  onClose,
  onSalvar,
}: Props) {
  const [numero, setNumero] = useState('');
  const [nome, setNome] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');
  const [erro, setErro] = useState('');

  const digitos = numero.replace(/\D/g, '');
  const bandeira = detectarBandeira(digitos);

  function limpar() {
    setNumero('');
    setNome('');
    setValidade('');
    setCvv('');
    setErro('');
  }

  function fechar() {
    limpar();
    onClose();
  }

  function salvar() {
    if (digitos.length !== 16)
      return setErro('Número do cartão deve ter 16 dígitos.');
    if (nome.trim().length < 3)
      return setErro('Informe o nome impresso no cartão.');
    if (!validadeOk(validade))
      return setErro('Validade inválida ou vencida (MM/AA).');
    if (cvv.length < 3) return setErro('CVV inválido.');

    // Aqui entraria a chamada à API/gateway de pagamento.
    // Na simulação, só devolvemos os 4 últimos dígitos.
    onSalvar(digitos.slice(-4), bandeira);
    limpar();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={fechar}
    >
      <KeyboardAvoidingView
        style={s.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={s.sheet}>
          <View style={s.header}>
            <Text style={s.titulo}>Alterar forma de pagamento</Text>
            <Pressable onPress={fechar} hitSlop={10}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </Pressable>
          </View>

          <ScrollView keyboardShouldPersistTaps="handled">
            <Text style={s.label}>Número do cartão</Text>
            <View style={s.inputLinha}>
              <TextInput
                style={s.inputFlex}
                value={numero}
                onChangeText={(t) => {
                  setNumero(formatarNumero(t));
                  setErro('');
                }}
                placeholder="0000 0000 0000 0000"
                placeholderTextColor="#666"
                keyboardType="number-pad"
                maxLength={19}
              />
              {digitos.length > 0 ? (
                <Text style={s.bandeira}>{bandeira}</Text>
              ) : null}
            </View>

            <Text style={s.label}>Nome impresso no cartão</Text>
            <TextInput
              style={s.input}
              value={nome}
              onChangeText={(t) => {
                setNome(t.toUpperCase());
                setErro('');
              }}
              placeholder="NOME SOBRENOME"
              placeholderTextColor="#666"
              autoCapitalize="characters"
            />

            <View style={s.duas}>
              <View style={{ flex: 1 }}>
                <Text style={s.label}>Validade</Text>
                <TextInput
                  style={s.input}
                  value={validade}
                  onChangeText={(t) => {
                    setValidade(formatarValidade(t));
                    setErro('');
                  }}
                  placeholder="MM/AA"
                  placeholderTextColor="#666"
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.label}>CVV</Text>
                <TextInput
                  style={s.input}
                  value={cvv}
                  onChangeText={(t) => {
                    setCvv(t.replace(/\D/g, '').slice(0, 4));
                    setErro('');
                  }}
                  placeholder="000"
                  placeholderTextColor="#666"
                  keyboardType="number-pad"
                  secureTextEntry
                  maxLength={4}
                />
              </View>
            </View>

            {erro ? <Text style={s.erro}>{erro}</Text> : null}

            <Pressable style={s.botao} onPress={salvar}>
              <Text style={s.botaoTexto}>Salvar cartão</Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  sheet: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titulo: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  label: { color: '#AAAAAA', fontSize: 12, marginTop: 14, marginBottom: 6 },
  input: {
    backgroundColor: '#262626',
    color: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 10,
    paddingRight: 14,
  },
  inputFlex: {
    flex: 1,
    color: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  bandeira: { color: '#FFB800', fontWeight: '700', fontSize: 12 },
  duas: { flexDirection: 'row', gap: 12 },
  erro: { color: '#FF453A', marginTop: 14, fontSize: 13 },
  botao: {
    backgroundColor: '#FFB800',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  botaoTexto: { color: '#000000', fontWeight: '700', fontSize: 16 },
});
