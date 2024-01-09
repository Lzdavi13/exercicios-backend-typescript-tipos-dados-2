import { readFile, writeFile } from "fs/promises";

type Usario = {
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

async function cadastrarUsuario(usuario: Usario): Promise<void> {
  const bancoDeDados_Json = await readFile("../bd.json", {
    encoding: "utf8",
  });

  type BancoDeDados = {
    usuarios: Usario[];
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

const usuario1: Usario = {
  nome: "José Santos",
  email: "joss@gmail.com",
  cpf: "322325222",
  profissao: "UX Design",
  endereco: {
    cep: "01321-000",
    rua: "São Domingos",
    bairro: "Bela Vista",
    cidade: "São Paulo",
  },
};

cadastrarUsuario(usuario1);
