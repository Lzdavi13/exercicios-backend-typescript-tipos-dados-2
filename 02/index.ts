import { readFile, writeFile } from "fs/promises";

type Usuario = {
  nome: string;
  email: string;
  cpf: string;
  profissao?: string;
  endereco: {
    cep: string;
    rua: string;
    complemento?: string;
    bairro: string;
    cidade: string;
  } | null;
};

async function cadastrarUsuario(usuario: Usuario): Promise<void> {
  const bancoDeDados_Json = await readFile("../bd.json", {
    encoding: "utf8",
  });

  type BancoDeDados = {
    usuarios: Usuario[];
  };

  const bancoDeDados: BancoDeDados = JSON.parse(bancoDeDados_Json);

  bancoDeDados.usuarios.push(usuario);

  const _bancoDeDados = JSON.stringify(bancoDeDados);

  await writeFile("../bd.json", _bancoDeDados);

  console.log({
    messagem: "Usuario cadastrado com sucesso",
    usuarioCadastrado: usuario,
  });
}

async function listarUsuarios() {
  const listaDeUsuarios = JSON.parse(
    await readFile("../bd.json", {
      encoding: "utf8",
    })
  );

  console.log(`Lista de usuarios:`, listaDeUsuarios.usuarios);
}

const usuario1: Usuario = {
  nome: "Luiz Davi",
  email: "luiz@gmail.com",
  cpf: "922.474.210-67",
  profissao: "Programador",
  endereco: {
    cep: "65570-000",
    rua: "São Raimundo",
    bairro: "Boa vista",
    cidade: "Araioses",
  },
};

cadastrarUsuario(usuario1);
