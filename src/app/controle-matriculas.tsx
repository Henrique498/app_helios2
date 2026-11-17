import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/gestor.styles';

type StatusMatricula = 'Ativa' | 'Pendente' | 'Vencida';

const ALUNOS: {
  id: string;
  nome: string;
  plano: string;
  vencimento: string;
  status: StatusMatricula;
}[] = [
  {
    id: '1',
    nome: 'Ana Oliveira',
    plano: 'Plano Gold',
    vencimento: '25/10',
    status: 'Ativa',
  },
  {
    id: '2',
    nome: 'Lucas Silva',
    plano: 'Plano Black',
    vencimento: '12/10',
    status: 'Ativa',
  },
  {
    id: '3',
    nome: 'Mariana Costa',
    plano: 'Plano Gold',
    vencimento: '02/10',
    status: 'Pendente',
  },
  {
    id: '4',
    nome: 'Rodrigo Santos',
    plano: 'Plano Trimestral',
    vencimento: '28/09',
    status: 'Vencida',
  },
];

const COR_STATUS: Record<StatusMatricula, string> = {
  Ativa: '#15803D',
  Pendente: '#CA8A04',
  Vencida: '#B91C1C',
};

export default function ControleMatriculasScreen() {
  const router = useRouter();
  const [busca, setBusca] = useState('');
  const [aba, setAba] = useState<'Todas' | 'Ativas' | 'Pendentes' | 'Vencidas'>(
    'Todas'
  );

  const alunosFiltrados = ALUNOS.filter((aluno) => {
    const bateBusca = aluno.nome.toLowerCase().includes(busca.toLowerCase());
    if (!bateBusca) return false;
    if (aba === 'Ativas') return aluno.status === 'Ativa';
    if (aba === 'Pendentes') return aluno.status === 'Pendente';
    if (aba === 'Vencidas') return aluno.status === 'Vencida';
    return true;
  });

  return (
    <View style={styles.tela}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.topoBar}>
          <Pressable
            onPress={() => router.replace('/LoginScreen')}
            hitSlop={10}
          >
            <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="arm-flex" size={34} color="#FFB800" />
          <Text style={styles.logoTexto}>
            Helios<Text style={{ color: '#FFB800' }}>Gym</Text>
          </Text>
        </View>

        <Text style={styles.tituloPagina}>Controle de Matrículas</Text>

        <View style={styles.buscaBox}>
          <TextInput
            style={styles.input}
            placeholder="Buscar aluno por nome ou CPF"
            placeholderTextColor="#64748B"
            value={busca}
            onChangeText={setBusca}
          />
          <Ionicons name="search" size={18} color="#64748B" />
        </View>

        <View style={styles.filtrosRow}>
          {(['Todas', 'Ativas', 'Pendentes', 'Vencidas'] as const).map(
            (item) => {
              const ativo = aba === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => setAba(item)}
                  style={[styles.filtroItem, ativo && styles.filtroItemAtivo]}
                >
                  <Text
                    style={[
                      styles.filtroTexto,
                      ativo && styles.filtroTextoAtivo,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            }
          )}
        </View>

        <View style={styles.resumoRow}>
          <View style={styles.resumoCard}>
            <Text style={styles.resumoNumero}>142</Text>
            <Text style={styles.resumoLabel}>Ativas</Text>
          </View>
          <View style={styles.resumoCard}>
            <Text style={styles.resumoNumero}>8</Text>
            <Text style={styles.resumoLabel}>A Vencer</Text>
          </View>
        </View>

        {alunosFiltrados.map((aluno) => (
          <View key={aluno.id} style={styles.alunoCard}>
            <View style={styles.alunoEsquerda}>
              <View style={styles.avatarCirculo}>
                <Ionicons name="person-outline" size={20} color="#FFB800" />
              </View>
              <View>
                <Text style={styles.alunoNome}>{aluno.nome}</Text>
                <Text style={styles.alunoSub}>
                  {aluno.plano} • Vence em {aluno.vencimento}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.badge,
                { backgroundColor: COR_STATUS[aluno.status] },
              ]}
            >
              <Text style={styles.badgeTexto}>{aluno.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <Pressable style={styles.fab} onPress={() => router.push('/cadastro')}>
        <Ionicons name="add" size={28} color="#0A0F1D" />
      </Pressable>
    </View>
  );
}
