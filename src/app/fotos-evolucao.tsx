import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useFotosEvolucao } from '../hook/useFotosEvolucao';
import { styles } from '../styles/FotosEvolucao.styles';
import {
  FotoComUri,
  NOMES_POSICOES,
  POSICOES,
  PosicaoFoto,
} from '../types/fotos';

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

function diasEntre(inicio: string, fim: string) {
  const ms = new Date(fim).getTime() - new Date(inicio).getTime();
  return Math.max(0, Math.round(ms / 86400000));
}

export default function FotosEvolucao() {
  const router = useRouter();
  const { fotos, carregando, adicionar, remover } = useFotosEvolucao();

  const [posicao, setPosicao] = useState<PosicaoFoto>('frente');
  const [fotoAberta, setFotoAberta] = useState<FotoComUri | null>(null);
  const [salvando, setSalvando] = useState(false);

  const fotosDaPosicao = useMemo(
    () => fotos.filter((f) => f.posicao === posicao),
    [fotos, posicao]
  );

  const maisRecente = fotosDaPosicao[0];
  const maisAntiga = fotosDaPosicao[fotosDaPosicao.length - 1];
  const temComparacao = fotosDaPosicao.length >= 2;
  const dias = temComparacao ? diasEntre(maisAntiga.data, maisRecente.data) : 0;

  async function salvarResultado(resultado: ImagePicker.ImagePickerResult) {
    if (resultado.canceled || !resultado.assets?.[0]) return;

    try {
      setSalvando(true);
      await adicionar(resultado.assets[0].uri, posicao);
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a foto. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  }

  async function tirarFoto() {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) {
      Alert.alert(
        'Permissão necessária',
        'Libere o acesso à câmera nas configurações do aparelho para tirar fotos.'
      );
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.7,
    });
    await salvarResultado(resultado);
  }

  async function escolherDaGaleria() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.7,
    });
    await salvarResultado(resultado);
  }

  function confirmarExclusao(foto: FotoComUri) {
    Alert.alert('Excluir foto', 'Deseja excluir esta foto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await remover(foto.id);
          setFotoAberta(null);
        },
      },
    ]);
  }

  if (carregando) {
    return (
      <SafeAreaView style={styles.tela}>
        <View style={styles.carregando}>
          <ActivityIndicator
            size="large"
            color="#FFB800"
            accessibilityLabel="Carregando fotos"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.tela}>
      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Topo */}
        <View style={styles.topo}>
          <Pressable
            onPress={() => router.back()}
            style={styles.voltar}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>

          <View>
            <Text style={styles.titulo} accessibilityRole="header">
              Minha <Text style={styles.tituloDestaque}>Evolução</Text>
            </Text>
            <Text style={styles.subtitulo}>
              Registre fotos e compare seu progresso
            </Text>
          </View>
        </View>

        {/* Posição da foto */}
        <Text style={styles.rotulo}>Posição da foto</Text>
        <View style={styles.chipsLinha}>
          {POSICOES.map((p) => {
            const ativo = posicao === p;
            return (
              <Pressable
                key={p}
                style={[styles.chip, ativo && styles.chipAtivo]}
                onPress={() => setPosicao(p)}
                accessibilityRole="radio"
                accessibilityState={{ selected: ativo }}
                accessibilityLabel={NOMES_POSICOES[p]}
              >
                <Text
                  style={[styles.chipTexto, ativo && styles.chipTextoAtivo]}
                >
                  {NOMES_POSICOES[p]}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Ações */}
        <View style={styles.acoesLinha}>
          <Pressable
            style={[
              styles.botaoPrincipal,
              salvando && styles.botaoDesabilitado,
            ]}
            onPress={tirarFoto}
            disabled={salvando}
            accessibilityRole="button"
            accessibilityLabel="Tirar foto"
            accessibilityState={{ disabled: salvando, busy: salvando }}
          >
            {salvando ? (
              <ActivityIndicator color="#0A0F1D" />
            ) : (
              <>
                <Ionicons
                  name="camera"
                  size={20}
                  color="#0A0F1D"
                  importantForAccessibility="no"
                />
                <Text style={styles.botaoPrincipalTexto}>Tirar foto</Text>
              </>
            )}
          </Pressable>

          <Pressable
            style={[
              styles.botaoSecundario,
              salvando && styles.botaoDesabilitado,
            ]}
            onPress={escolherDaGaleria}
            disabled={salvando}
            accessibilityRole="button"
            accessibilityLabel="Escolher da galeria"
            accessibilityState={{ disabled: salvando }}
          >
            <Ionicons
              name="images-outline"
              size={20}
              color="#FFB800"
              importantForAccessibility="no"
            />
            <Text style={styles.botaoSecundarioTexto}>Galeria</Text>
          </Pressable>
        </View>

        {/* Antes e depois */}
        <Text style={styles.secaoTitulo} accessibilityRole="header">
          Antes e depois • {NOMES_POSICOES[posicao]}
        </Text>
        <View style={styles.card}>
          {temComparacao ? (
            <>
              <View style={styles.comparacaoLinha}>
                <Pressable
                  style={styles.comparacaoColuna}
                  onPress={() => setFotoAberta(maisAntiga)}
                  accessibilityRole="button"
                  accessibilityLabel={`Primeira foto, ${formatarData(
                    maisAntiga.data
                  )}. Toque para ampliar`}
                >
                  <Image
                    source={{ uri: maisAntiga.uri }}
                    style={styles.comparacaoImagem}
                    accessibilityLabel={`Foto de ${NOMES_POSICOES[
                      posicao
                    ].toLowerCase()}`}
                  />
                  <Text style={styles.comparacaoLegenda}>Primeira foto</Text>
                  <Text style={styles.comparacaoData}>
                    {formatarData(maisAntiga.data)}
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.comparacaoColuna}
                  onPress={() => setFotoAberta(maisRecente)}
                  accessibilityRole="button"
                  accessibilityLabel={`Foto mais recente, ${formatarData(
                    maisRecente.data
                  )}. Toque para ampliar`}
                >
                  <Image
                    source={{ uri: maisRecente.uri }}
                    style={styles.comparacaoImagem}
                    accessibilityLabel={`Foto de ${NOMES_POSICOES[
                      posicao
                    ].toLowerCase()}`}
                  />
                  <Text style={styles.comparacaoLegenda}>Mais recente</Text>
                  <Text style={styles.comparacaoData}>
                    {formatarData(maisRecente.data)}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.resumoEvolucao}>
                <Ionicons
                  name="trending-up"
                  size={18}
                  color="#FFB800"
                  importantForAccessibility="no"
                />
                <Text style={styles.resumoEvolucaoTexto}>
                  {dias === 0
                    ? 'Fotos do mesmo dia'
                    : `${dias} ${dias === 1 ? 'dia' : 'dias'} de evolução`}
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.vazio}>
              <Ionicons
                name="camera-outline"
                size={32}
                color="#94A3B8"
                importantForAccessibility="no"
              />
              <Text style={styles.vazioTexto}>
                {fotosDaPosicao.length === 0
                  ? `Você ainda não tem fotos de ${NOMES_POSICOES[
                      posicao
                    ].toLowerCase()}.\nTire a primeira para começar a acompanhar.`
                  : 'Tire mais uma foto desta posição para comparar o antes e o depois.'}
              </Text>
            </View>
          )}
        </View>

        {/* Histórico */}
        <Text style={styles.secaoTitulo} accessibilityRole="header">
          Histórico ({fotosDaPosicao.length})
        </Text>
        {fotosDaPosicao.length > 0 ? (
          <View style={styles.grade}>
            {fotosDaPosicao.map((foto) => (
              <Pressable
                key={foto.id}
                style={styles.miniatura}
                onPress={() => setFotoAberta(foto)}
                accessibilityRole="button"
                accessibilityLabel={`Foto de ${NOMES_POSICOES[
                  foto.posicao
                ].toLowerCase()}, ${formatarData(foto.data)}`}
              >
                <Image
                  source={{ uri: foto.uri }}
                  style={styles.miniaturaImagem}
                />
                <Text style={styles.miniaturaData}>
                  {formatarData(foto.data)}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <Text style={styles.vazioTexto}>Nenhuma foto nesta posição.</Text>
        )}
      </ScrollView>

      {/* Foto ampliada */}
      <Modal
        visible={fotoAberta !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setFotoAberta(null)}
      >
        <View style={styles.modalFundo} accessibilityViewIsModal>
          <View style={styles.modalTopo}>
            <Pressable
              style={styles.modalBotaoIcone}
              onPress={() => setFotoAberta(null)}
              accessibilityRole="button"
              accessibilityLabel="Fechar foto"
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </Pressable>

            {fotoAberta ? (
              <Pressable
                style={styles.modalBotaoIcone}
                onPress={() => confirmarExclusao(fotoAberta)}
                accessibilityRole="button"
                accessibilityLabel="Excluir foto"
              >
                <Ionicons name="trash-outline" size={22} color="#FF4D4D" />
              </Pressable>
            ) : null}
          </View>

          {fotoAberta ? (
            <>
              <Image
                source={{ uri: fotoAberta.uri }}
                style={styles.modalImagem}
                resizeMode="contain"
                accessibilityLabel={`Foto de ${NOMES_POSICOES[
                  fotoAberta.posicao
                ].toLowerCase()}, ${formatarData(fotoAberta.data)}`}
              />
              <View style={styles.modalInfo}>
                <Text style={styles.modalInfoTitulo}>
                  {NOMES_POSICOES[fotoAberta.posicao]}
                </Text>
                <Text style={styles.modalInfoData}>
                  {formatarData(fotoAberta.data)}
                </Text>
              </View>
            </>
          ) : null}
        </View>
      </Modal>
    </SafeAreaView>
  );
}
