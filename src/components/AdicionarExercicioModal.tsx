import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/treinos.styles';
import { DiaSemana, NOMES_DIAS } from '../types/treinos';

interface AdicionarExercicioModalProps {
  visible: boolean;
  diaSelecionado: DiaSemana;
  onClose: () => void;
  onConfirm: (nome: string, series: string, repeticoes: string) => void;
}

export function AdicionarExercicioModal({
  visible,
  diaSelecionado,
  onClose,
  onConfirm,
}: AdicionarExercicioModalProps) {
  const [nome, setNome] = useState('');
  const [series, setSeries] = useState('3');
  const [repeticoes, setRepeticoes] = useState('12');

  const handleSalvar = () => {
    if (!nome.trim()) return;
    onConfirm(nome.trim(), series || '3', repeticoes || '12');
    setNome('');
    setSeries('3');
    setRepeticoes('12');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Novo Exercício ({NOMES_DIAS[diaSelecionado]})
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nome do exercício (ex: Supino Inclinado)"
            placeholderTextColor="#6B7385"
            value={nome}
            onChangeText={setNome}
          />

          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Séries (ex: 3)"
              placeholderTextColor="#6B7385"
              keyboardType="numeric"
              value={series}
              onChangeText={setSeries}
            />
            <TextInput
              style={[styles.input, { flex: 1, marginLeft: 8 }]}
              placeholder="Repetições (ex: 12)"
              placeholderTextColor="#6B7385"
              keyboardType="numeric"
              value={repeticoes}
              onChangeText={setRepeticoes}
            />
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalBtn, styles.modalBtnCancel]}
              onPress={onClose}
            >
              <Text style={styles.modalBtnCancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalBtn, styles.modalBtnConfirm]}
              onPress={handleSalvar}
            >
              <Text style={styles.modalBtnConfirmText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
