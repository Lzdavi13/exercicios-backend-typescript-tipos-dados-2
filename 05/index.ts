import { readFile } from "fs/promises";

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

async function listarUsuario(profissao: string) {
  const bancoDeDados_Json = await readFile("../bd.json", {
    encoding: "utf8",
  });

  const bancoDeDados: BancoDeDados = JSON.parse(bancoDeDados_Json);

  const indiceUsuario: number = bancoDeDados.usuarios.findIndex(
    (usuario: Usuario) => usuario.profissao === profissao
  );

  if (indiceUsuario < 0) {
    throw new Error("Usuario não encontrado");
  }

  console.log("Usuario encontrado:", bancoDeDados.usuarios[indiceUsuario]);
}

listarUsuario("programador");
