import { Ionicons } from '@expo/vector-icons';
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
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Sair"
          >
            <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* A logo compacta oficial é gerada universalmente pelo _layout.tsx */}
        <Text
          style={[styles.tituloPagina, { marginTop: 16 }]}
          accessibilityRole="header"
        >
          Controle de Matrículas
        </Text>

        <View style={styles.buscaBox}>
          <TextInput
            style={styles.input}
            placeholder="Buscar aluno por nome ou CPF"
            placeholderTextColor="#94A3B8"
            accessibilityLabel="Buscar aluno por nome ou CPF"
            value={busca}
            onChangeText={setBusca}
          />
          <Ionicons
            name="search"
            size={18}
            color="#94A3B8"
            importantForAccessibility="no"
            accessibilityElementsHidden
          />
        </View>

        <View style={styles.filtrosRow}>
          {(['Todas', 'Ativas', 'Pendentes', 'Vencidas'] as const).map(
            (item) => {
              const ativo = aba === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => setAba(item)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: ativo }}
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
          <View
            style={styles.resumoCard}
            accessible
            accessibilityLabel="142 matrículas ativas"
          >
            <Text style={styles.resumoNumero}>142</Text>
            <Text style={styles.resumoLabel}>Ativas</Text>
          </View>
          <View
            style={styles.resumoCard}
            accessible
            accessibilityLabel="8 matrículas a vencer"
          >
            <Text style={styles.resumoNumero}>8</Text>
            <Text style={styles.resumoLabel}>A Vencer</Text>
          </View>
        </View>

        {alunosFiltrados.map((aluno) => (
          <View
            key={aluno.id}
            style={styles.alunoCard}
            accessible
            accessibilityLabel={`${aluno.nome}, ${aluno.plano}, vence em ${
              aluno.vencimento
            }, matrícula ${aluno.status.toLowerCase()}`}
          >
            <View style={styles.alunoEsquerda}>
              <View style={styles.avatarCirculo}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#FFB800"
                  importantForAccessibility="no"
                />
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

      <Pressable
        style={styles.fab}
        onPress={() => router.push('/cadastro')}
        accessibilityRole="button"
        accessibilityLabel="Cadastrar novo aluno"
      >
        <Ionicons name="add" size={28} color="#0A0F1D" />
      </Pressable>
    </View>
  );
}
