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

async function excluirUsuario(cpf: string) {
  const bancoDeDados: BancoDeDados = JSON.parse(
    await readFile("../bd.json", {
      encoding: "utf8",
    })
  );

  const indiceUsuario: number = bancoDeDados.usuarios.findIndex(
    (usuario: Usuario) => usuario.cpf === cpf
  );

  if (indiceUsuario < 0) {
    throw new Error("Usuario não encontrado");
  }

  bancoDeDados.usuarios.splice(indiceUsuario, 1);

  await writeFile("../bd.json", JSON.stringify(bancoDeDados));

  console.log("Usuario excluido:", bancoDeDados.usuarios[indiceUsuario]);
}

excluirUsuario("951.139.360-06");
