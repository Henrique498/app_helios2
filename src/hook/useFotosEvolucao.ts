
import AsyncStorage from '@react-native-async-storage/async-storage';
// Expo SDK 54 ou mais novo: 'expo-file-system/legacy'
// Expo SDK 53 ou mais antigo: troque por 'expo-file-system'
import * as FileSystem from 'expo-file-system/legacy';
import { useEffect, useState } from 'react';
import { FotoComUri, FotoEvolucao, PosicaoFoto } from '../types/fotos';

const CHAVE = '@heliosgym/fotos-evolucao';
const PASTA = `${FileSystem.documentDirectory}fotos-evolucao/`;

export function useFotosEvolucao() {
  const [registros, setRegistros] = useState<FotoEvolucao[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const salvo = await AsyncStorage.getItem(CHAVE);
        if (salvo) setRegistros(JSON.parse(salvo));
      } catch {
        // se der erro ao ler, começa com a lista vazia
      } finally {
        setCarregando(false);
      }
    })();
  }, []);

  async function persistir(lista: FotoEvolucao[]) {
    setRegistros(lista);
    await AsyncStorage.setItem(CHAVE, JSON.stringify(lista));
  }

  // Copia a foto para uma pasta permanente do app (a do picker/câmera é
  // temporária e o sistema pode apagar) e registra na lista.
  async function adicionar(uriOrigem: string, posicao: PosicaoFoto) {
    await FileSystem.makeDirectoryAsync(PASTA, { intermediates: true });

    const id = String(Date.now());
    const arquivo = `${id}.jpg`;
    await FileSystem.copyAsync({ from: uriOrigem, to: PASTA + arquivo });

    await persistir([
      { id, arquivo, posicao, data: new Date().toISOString() },
      ...registros,
    ]);
  }

  async function remover(id: string) {
    const alvo = registros.find((f) => f.id === id);
    if (alvo) {
      await FileSystem.deleteAsync(PASTA + alvo.arquivo, { idempotent: true });
    }
    await persistir(registros.filter((f) => f.id !== id));
  }

  // Mais recente primeiro
  const fotos: FotoComUri[] = registros.map((f) => ({
    ...f,
    uri: PASTA + f.arquivo,
  }));

  return { fotos, carregando, adicionar, remover };
}
