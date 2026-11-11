import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { styles as base } from '../styles/Cadastro.styles';
import { styles } from '../styles/CampoTelefone.styles';
import { PAISES, Pais } from '../utils/paises';

type Props = {
  value: string;
  onChangeText: (texto: string) => void;
  pais: Pais;
  onChangePais: (pais: Pais) => void;
};

export default function CampoTelefone({
  value,
  onChangeText,
  pais,
  onChangePais,
}: Props) {
  const [aberto, setAberto] = useState(false);

  function escolher(novo: Pais) {
    onChangePais(novo);
    onChangeText('');
    setAberto(false);
  }

  return (
    <View style={base.campo}>
      <Text style={base.label}>Telefone</Text>

      <View style={base.inputBox}>
        <Pressable style={styles.seletor} onPress={() => setAberto(true)}>
          <Text style={styles.flag}>{pais.flag}</Text>
          <Text style={styles.ddi}>+{pais.ddi}</Text>
          <Ionicons name="chevron-down" size={16} color="#8A94A6" />
        </Pressable>

        <TextInput
          style={base.input}
          placeholder="Digite o seu número de telefone"
          placeholderTextColor="#8A94A6"
          value={value}
          onChangeText={(texto) => onChangeText(pais.formatar(texto))}
          keyboardType="phone-pad"
        />
      </View>

      <Modal
        visible={aberto}
        transparent
        animationType="slide"
        onRequestClose={() => setAberto(false)}
      >
        <View style={styles.fundoModal}>
          <Pressable style={styles.fechar} onPress={() => setAberto(false)} />

          <View style={styles.modal}>
            <Text style={styles.modalTitulo}>Selecione o país</Text>

            <FlatList
              data={PAISES}
              keyExtractor={(item) => item.sigla}
              renderItem={({ item }) => (
                <Pressable style={styles.item} onPress={() => escolher(item)}>
                  <Text style={styles.flag}>{item.flag}</Text>
                  <Text style={styles.itemNome}>{item.nome}</Text>
                  <Text style={styles.itemDdi}>+{item.ddi}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
