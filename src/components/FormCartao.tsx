import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { styles } from '../styles/Pagamento.styles';
import {
  apenasNumeros,
  formatarCNPJ,
  formatarCPF,
  formatarNumeroCartao,
  formatarValidade,
} from '../utils/formatadores';
import CampoTexto from './CampoTexto';

type Props = {
  tipo: 'credito' | 'debito';
  onFinalizar: () => void;
};

const TIPOS_DOCUMENTO = ['CPF', 'CNPJ'] as const;
type TipoDocumento = (typeof TIPOS_DOCUMENTO)[number];

export default function FormCartao({ tipo, onFinalizar }: Props) {
  const [nomeCartao, setNomeCartao] = useState('');
  const [numero, setNumero] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');
  const [titular, setTitular] = useState('');
  const [tipoDoc, setTipoDoc] = useState<TipoDocumento>('CPF');
  const [documento, setDocumento] = useState('');
  const [docAberto, setDocAberto] = useState(false);

  function escolherTipo(novo: TipoDocumento) {
    setTipoDoc(novo);
    setDocumento('');
    setDocAberto(false);
  }

  function mudarDocumento(texto: string) {
    setDocumento(tipoDoc === 'CPF' ? formatarCPF(texto) : formatarCNPJ(texto));
  }

  function validar(): string | null {
    const mes = Number(validade.slice(0, 2));
    const tamanhoDoc = tipoDoc === 'CPF' ? 11 : 14;

    if (!nomeCartao.trim()) return 'Digite o nome impresso no cartão.';
    if (apenasNumeros(numero).length < 13)
      return 'Número do cartão incompleto.';
    if (validade.length < 5 || mes < 1 || mes > 12)
      return 'Validade inválida (use MM/AA).';
    if (cvv.length < 3) return 'CVV inválido.';
    if (!titular.trim()) return 'Digite o nome do titular.';
    if (apenasNumeros(documento).length !== tamanhoDoc)
      return `${tipoDoc} inválido.`;
    return null;
  }

  function finalizar() {
    const erro = validar();

    if (erro) {
      Alert.alert('Atenção', erro);
      return;
    }

    onFinalizar();
  }

  return (
    <View style={styles.formulario}>
      <Text style={styles.formTitulo}>
        {tipo === 'credito' ? 'Cartão de Crédito' : 'Cartão de Débito'}
      </Text>

      <Text style={styles.secao}>Informações do Cartão</Text>

      <View style={styles.linha}>
        <View style={styles.coluna}>
          <CampoTexto
            tema="claro"
            label="Nome no cartão"
            placeholder="Insira o nome do cartão"
            value={nomeCartao}
            onChangeText={setNomeCartao}
          />
        </View>
        <View style={styles.coluna}>
          <CampoTexto
            tema="claro"
            label="Número do Cartão"
            placeholder="0000 0000 0000 0000"
            value={numero}
            onChangeText={(t) => setNumero(formatarNumeroCartao(t))}
            keyboardType="numeric"
            esquerda={
              <Ionicons
                name="card-outline"
                size={16}
                color="#000000"
                style={{ marginRight: 6 }}
              />
            }
          />
        </View>
      </View>

      <View style={styles.linha}>
        <View style={styles.coluna}>
          <CampoTexto
            tema="claro"
            label="Validade"
            placeholder="MM/AA"
            value={validade}
            onChangeText={(t) => setValidade(formatarValidade(t))}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.coluna}>
          <CampoTexto
            tema="claro"
            label="CVV"
            placeholder="CVV"
            value={cvv}
            onChangeText={(t) => setCvv(apenasNumeros(t).slice(0, 4))}
            keyboardType="numeric"
            secureTextEntry
            direita={<Ionicons name="lock-closed" size={16} color="#000000" />}
          />
        </View>
      </View>

      <Text style={styles.secao}>Informações de Cobrança</Text>

      <CampoTexto
        tema="claro"
        label="Nome do titular do cartão"
        placeholder="Insira o nome do titular do cartão"
        value={titular}
        onChangeText={setTitular}
      />

      <View style={styles.linha}>
        <View style={styles.coluna}>
          <Text style={styles.labelForm}>Selecione o tipo de documento</Text>
          <Pressable
            style={styles.dropdown}
            onPress={() => setDocAberto(!docAberto)}
          >
            <Text style={styles.dropdownTexto}>{tipoDoc}</Text>
            <Ionicons
              name={docAberto ? 'chevron-up' : 'chevron-down'}
              size={16}
              color="#000000"
            />
          </Pressable>

          {docAberto ? (
            <View style={styles.dropdownLista}>
              {TIPOS_DOCUMENTO.map((t) => (
                <Pressable
                  key={t}
                  style={styles.dropdownItem}
                  onPress={() => escolherTipo(t)}
                >
                  <Text style={styles.dropdownTexto}>{t}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.coluna}>
          <CampoTexto
            tema="claro"
            label="Documento do titular do cartão"
            placeholder="Insira seus dados"
            value={documento}
            onChangeText={mudarDocumento}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Pressable style={styles.botaoFinalizar} onPress={finalizar}>
        <Text style={styles.botaoFinalizarTexto}>Finalizar compra</Text>
      </Pressable>
    </View>
  );
}
