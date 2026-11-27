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
      <Text
        style={base.label}
        importantForAccessibility="no"
        accessibilityElementsHidden
      >
        Telefone
      </Text>

      <View style={base.inputBox}>
        <Pressable
          style={styles.seletor}
          onPress={() => setAberto(true)}
          accessibilityRole="button"
          accessibilityLabel={`País: ${pais.nome}, código mais ${pais.ddi}`}
          accessibilityHint="Toque para escolher outro país"
        >
          <Text style={styles.flag}>{pais.flag}</Text>
          <Text style={styles.ddi}>+{pais.ddi}</Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color="#94A3B8"
            importantForAccessibility="no"
            accessibilityElementsHidden
          />
        </Pressable>

        <TextInput
          style={base.input}
          placeholder="Digite o seu número de telefone"
          placeholderTextColor="#94A3B8"
          accessibilityLabel="Telefone"
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
          <Pressable
            style={styles.fechar}
            onPress={() => setAberto(false)}
            accessibilityRole="button"
            accessibilityLabel="Fechar seleção de país"
          />

          <View style={styles.modal} accessibilityViewIsModal>
            <Text style={styles.modalTitulo} accessibilityRole="header">
              Selecione o país
            </Text>

            <FlatList
              data={PAISES}
              keyExtractor={(item) => item.sigla}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.item}
                  onPress={() => escolher(item)}
                  accessibilityRole="button"
                  accessibilityLabel={`${item.nome}, código mais ${item.ddi}`}
                  accessibilityState={{ selected: item.sigla === pais.sigla }}
                >
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
