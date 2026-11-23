import AsyncStorage from '@react-native-async-storage/async-storage';

export type Usuario = {
  nome: string;
  email: string;
  senha: string;
  cartaoFinal?: string;
};

const CHAVE_USUARIOS = '@helios/usuarios';
const CHAVE_SESSAO = '@helios/sessao';

const normalizar = (email: string) => email.trim().toLowerCase();

async function lerUsuarios(): Promise<Usuario[]> {
  const bruto = await AsyncStorage.getItem(CHAVE_USUARIOS);
  return bruto ? JSON.parse(bruto) : [];
}

export async function cadastrarUsuario(
  u: Usuario
): Promise<'ok' | 'email-existente'> {
  const usuarios = await lerUsuarios();
  const email = normalizar(u.email);

  if (usuarios.some((x) => x.email === email)) return 'email-existente';

  usuarios.push({ ...u, email });
  await AsyncStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
  await AsyncStorage.setItem(CHAVE_SESSAO, email);
  return 'ok';
}

export async function autenticar(
  email: string,
  senha: string
): Promise<Usuario | 'nao-cadastrado' | 'senha-incorreta'> {
  const usuarios = await lerUsuarios();
  const achado = usuarios.find((x) => x.email === normalizar(email));

  if (!achado) return 'nao-cadastrado';
  if (achado.senha !== senha) return 'senha-incorreta';

  await AsyncStorage.setItem(CHAVE_SESSAO, achado.email);
  return achado;
}

export async function usuarioLogado(): Promise<Usuario | null> {
  const email = await AsyncStorage.getItem(CHAVE_SESSAO);
  if (!email) return null;
  const usuarios = await lerUsuarios();
  return usuarios.find((x) => x.email === email) ?? null;
}

export async function salvarCartaoFinal(final: string) {
  const email = await AsyncStorage.getItem(CHAVE_SESSAO);
  if (!email) return;
  const usuarios = await lerUsuarios();
  const atualizados = usuarios.map((x) =>
    x.email === email ? { ...x, cartaoFinal: final } : x
  );
  await AsyncStorage.setItem(CHAVE_USUARIOS, JSON.stringify(atualizados));
}

export async function sairDaSessao() {
  await AsyncStorage.removeItem(CHAVE_SESSAO);
}
