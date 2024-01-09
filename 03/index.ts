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

type BancoDeDados = {
  usuarios: Usuario[];
};

async function atualizarUsuario(usuario: Usuario, cpf: string) {
  const bancoDeDados = JSON.parse(
    await readFile("../bd.json", {
      encoding: "utf8",
    })
  ) as BancoDeDados;

  const indiceUsuario: number = bancoDeDados.usuarios.findIndex(
    (usuario: Usuario) => usuario.cpf === cpf
  );

  if (indiceUsuario < 0) {
    throw new Error("Usuario não encontrado");
  }

  bancoDeDados.usuarios.splice(indiceUsuario, 1, usuario);

  await writeFile("../bd.json", JSON.stringify(bancoDeDados));

  console.log("Usuario atualizado:", bancoDeDados.usuarios[indiceUsuario]);
}

const usuario1: Usuario = {
  nome: "José Santos Gomes",
  email: "joss2@gmail.com",
  cpf: "951.139.360-06",
  profissao: "Product Manager",
  endereco: {
    cep: "01321-000",
    rua: "São Domingos",
    bairro: "Bela Vista",
    cidade: "São Paulo",
  },
};

atualizarUsuario(usuario1, "654.484.960-08");

async function listarUsuario(cpf: string) {
  const bancoDeDados_Json = await readFile("../bd.json", {
    encoding: "utf8",
  });

  const bancoDeDados: BancoDeDados = JSON.parse(bancoDeDados_Json);

  const indiceUsuario: number = bancoDeDados.usuarios.findIndex(
    (usuario: Usuario) => usuario.cpf === cpf
  );

  if (indiceUsuario < 0) {
    throw new Error("Usuario não encontrado");
  }

  console.log("Usuario encontrado:", bancoDeDados.usuarios[indiceUsuario]);
}

const cpf: string = "922.474.210-67";

listarUsuario(cpf);
