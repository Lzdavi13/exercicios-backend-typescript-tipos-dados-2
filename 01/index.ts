import { readFile, writeFile } from "fs/promises";

async function escritaDeArquivos(
  caminhoArquivo: string,
  conteudo: string
): Promise<void> {
  const conteudoJson = JSON.stringify(conteudo);
  await writeFile(caminhoArquivo, conteudoJson);
}

async function leituraDeArquivos(caminhoArquivo: string): Promise<string> {
  const conteudoEscrito = await readFile(caminhoArquivo, {
    encoding: "utf8",
  });

  return JSON.parse(conteudoEscrito);
}

escritaDeArquivos("../bd.json", "Hello World!");

leituraDeArquivos("../bd.json")
  .then((result) => console.log(result))
  .catch((erro) => console.log(erro));
