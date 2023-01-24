import chalk from "chalk";
import fs from "fs";

function extraiLinks(texto){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResultado = [];

    let temp;
    while((temp = regex.exec(texto)) != null){
        arrayResultado.push({ [temp[1]] : [temp[2]]})
    }
    return(arrayResultado);
}

function trataErro(erro){
    throw new Error(chalk.red(erro.code, "Não há um arquivo no caminho..."));
}

async function pegarArquivo(caminhoDoArquivo){ 
    const encoding = "utf-8";
    try{
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        console.log(extraiLinks(texto));
    }catch(erro){
        trataErro(erro)
    } 
}

pegarArquivo("./Arquivos/texto.md");