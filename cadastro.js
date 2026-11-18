// Exemplo integrado adaptado dos documentos enviados.
// Use nomes e CPFs fictícios. Leia o guia.html para acompanhar cada etapa.
"use strict";

// 1. VARIÁVEIS E TIPOS DE DADOS
// const: referência que não será reatribuída. let: valor que pode mudar.
// Usamos const/let em vez de var para trabalhar com escopo de bloco.
const CHAVE_ALUNOS = "revisaoFront.alunos"; // string
const CHAVE_RASCUNHO = "revisaoFront.rascunho";
let alunos = []; // array de objetos

// 2. DOM: selecionar elementos que já existem no HTML.
// # no começo do seletor indica um ID do HTML.
const formulario = document.querySelector("#formulario");
const campoNome = document.querySelector("#nome");
const campoCpf = document.querySelector("#cpf");
const campoNota1 = document.querySelector("#nota1");
const campoNota2 = document.querySelector("#nota2");
const resumo = document.querySelector("#resumo");
const dados = document.querySelector("#dados");
const lista = document.querySelector("#lista-alunos");
const contador = document.querySelector("#contador");
const listaVazia = document.querySelector("#lista-vazia");
const aviso = document.querySelector("#aviso");
const botaoLimpar = document.querySelector("#limpar-rascunho");

// 3. FUNÇÕES: parâmetros recebem os argumentos passados na chamada.
// return devolve um valor; console.log apenas exibe algo no console.
function calcularMedia(nota1, nota2) {
  return (nota1 + nota2) / 2;
}

// 4. CONDICIONAIS: a primeira condição verdadeira determina o retorno.
function verificarSituacao(media) {
  if (media >= 7) {
    return "Aprovado";
  } else if (media >= 5) {
    return "Recuperação";
  } else {
    return "Reprovado";
  }
}

// 5. MÁSCARA: remove letras, limita dígitos e adiciona pontuação.
// \D = qualquer caractere que não seja dígito; g = todas as ocorrências.
// \d = dígito; {3} = três repetições; $1 e $2 = grupos capturados.
// Esta função só formata: não verifica se o CPF é válido.
function aplicarMascaraCpf(valor) {
  return valor
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

// 6. SESSIONSTORAGE: rascunho da sessão desta aba.
// O objeto é convertido em string porque Storage armazena texto.
function salvarRascunho() {
  const rascunho = {
    nome: campoNome.value,
    cpf: campoCpf.value,
    nota1: campoNota1.value,
    nota2: campoNota2.value
  };

  try {
    sessionStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(rascunho));
    aviso.textContent = "Rascunho salvo nesta aba. Recarregue para testar.";
  } catch (erro) {
    aviso.textContent = "O navegador não permitiu salvar o rascunho.";
    console.error(erro);
  }
}

function restaurarRascunho() {
  try {
    const texto = sessionStorage.getItem(CHAVE_RASCUNHO);
    // getItem retorna null quando a chave não existe.
    if (texto === null) return;

    const rascunho = JSON.parse(texto);
    if (rascunho === null || typeof rascunho.nome !== "string" ||
        typeof rascunho.cpf !== "string" || typeof rascunho.nota1 !== "string" ||
        typeof rascunho.nota2 !== "string") {
      throw new Error("O rascunho salvo tem um formato inesperado.");
    }
    campoNome.value = rascunho.nome;
    campoCpf.value = aplicarMascaraCpf(rascunho.cpf);
    campoNota1.value = rascunho.nota1;
    campoNota2.value = rascunho.nota2;
    aviso.textContent = "Rascunho recuperado do sessionStorage.";
  } catch (erro) {
    aviso.textContent = "Não foi possível recuperar o rascunho.";
    console.error(erro);
  }
}

// 7. LOCALSTORAGE: cadastros que podem sobreviver ao fechamento da aba.
// JSON.stringify: objeto/array → texto. JSON.parse: texto JSON → valor.
function carregarAlunos() {
  try {
    const texto = localStorage.getItem(CHAVE_ALUNOS);
    if (texto !== null) {
      const salvos = JSON.parse(texto);
      if (!Array.isArray(salvos)) throw new Error("A lista salva não é um array.");
      // Cada item precisa ter os campos que a lista vai mostrar.
      for (const alunoSalvo of salvos) {
        if (alunoSalvo === null || typeof alunoSalvo.nome !== "string" ||
            typeof alunoSalvo.cpf !== "string" || !Number.isFinite(alunoSalvo.media) ||
            typeof alunoSalvo.situacao !== "string") {
          throw new Error("Um cadastro salvo tem formato inesperado.");
        }
      }
      alunos = salvos;
    }
  } catch (erro) {
    aviso.textContent = "Não foi possível carregar a lista salva.";
    console.error(erro);
  }
}

function salvarAlunos() {
  try {
    localStorage.setItem(CHAVE_ALUNOS, JSON.stringify(alunos));
    return true; // boolean
  } catch (erro) {
    aviso.textContent = "Não foi possível salvar. Confira as permissões de armazenamento do navegador.";
    console.error(erro);
    return false;
  }
}

// 8. DOM: criar elementos e registrar eventos em cada botão.
function renderizarAlunos() {
  lista.replaceChildren(); // Esvazia a lista antes de reconstruí-la.
  contador.textContent = `${alunos.length} aluno(s)`;
  listaVazia.hidden = alunos.length > 0;

  alunos.forEach(function (aluno, indice) {
    const item = document.createElement("li");
    item.classList.add("aluno");

    const informacoes = document.createElement("div");
    const nome = document.createElement("strong");
    nome.textContent = aluno.nome; // Texto do usuário não vira HTML.

    const detalhes = document.createElement("p");
    detalhes.textContent = `CPF: ${aluno.cpf} • Média: ${aluno.media.toFixed(2)} • ${aluno.situacao}`;
    informacoes.append(nome, detalhes);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.classList.add("secundario");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.setAttribute("aria-label", `Excluir cadastro de ${aluno.nome}`);

    botaoExcluir.addEventListener("click", function () {
      // filter cria outro array, removendo o item do índice selecionado.
      const anteriores = alunos;
      alunos = alunos.filter(function (alunoAtual, indiceAtual) {
        return indiceAtual !== indice;
      });

      if (!salvarAlunos()) {
        alunos = anteriores;
        return;
      }

      renderizarAlunos();
      aviso.textContent = "Cadastro excluído do localStorage.";
    });

    item.append(informacoes, botaoExcluir);
    lista.appendChild(item);
  });
}

// 9. EVENTOS: uma função passada ao listener é chamada quando o evento ocorre.
campoCpf.addEventListener("input", function () {
  campoCpf.value = aplicarMascaraCpf(campoCpf.value);
});

// O evento input também chega ao formulário quando um campo muda.
formulario.addEventListener("input", salvarRascunho);

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // Impede o envio padrão e o recarregamento da página.

  const nome = campoNome.value.trim(); // string sem espaços nas pontas
  const cpf = campoCpf.value;
  const nota1 = Number(campoNota1.value); // string → number
  const nota2 = Number(campoNota2.value);

  // || significa OU. ! inverte um boolean. === compara valor e tipo.
  if (nome === "" || campoNota1.value === "" || campoNota2.value === "" ||
      !Number.isFinite(nota1) || !Number.isFinite(nota2) ||
      nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
    aviso.textContent = "Preencha um nome e notas entre 0 e 10.";
    return;
  }

  if (cpf.replace(/\D/g, "").length !== 11) {
    aviso.textContent = "Preencha os 11 dígitos do CPF fictício. A máscara não valida um CPF real.";
    return;
  }
  const media = calcularMedia(nota1, nota2);
  const situacao = verificarSituacao(media);
  const aprovado = media >= 7; // boolean: true ou false
  const aluno = { nome, cpf, nota1, nota2, media, situacao }; // object

  alunos.push(aluno); // Adiciona o objeto ao array.
  if (!salvarAlunos()) {
    alunos.pop(); // Desfaz a inclusão se não for possível persistir.
    return;
  }


  // Atualizar texto e classes mostra a manipulação do DOM na prática.
  resumo.textContent = `${nome}: média ${media.toFixed(2)} — ${situacao}.`;
  resumo.classList.remove("aprovado", "recuperacao", "reprovado");
  if (aprovado) {
    resumo.classList.add("aprovado");
  } else if (media >= 5) {
    resumo.classList.add("recuperacao");
  } else {
    resumo.classList.add("reprovado");
  }

  // typeof mostra os tipos; JSON com indentação facilita a leitura.
  dados.textContent = `campoNota1.value: ${typeof campoNota1.value}\n` +
    `nota1 convertida: ${typeof nota1}\n` +
    `aprovado: ${aprovado} (${typeof aprovado})\n\n` +
    JSON.stringify(aluno, null, 2);

  renderizarAlunos();
  aviso.textContent = "Aluno salvo no localStorage. Recarregue para conferir!";
});

botaoLimpar.addEventListener("click", function () {
  try {
    // removeItem apaga apenas esta chave, preservando os outros dados.
    sessionStorage.removeItem(CHAVE_RASCUNHO);
    formulario.reset();
    resumo.textContent = "Aguardando um cadastro.";
    resumo.classList.remove("aprovado", "recuperacao", "reprovado");
    dados.textContent = "Os tipos e o objeto do último cadastro vão aparecer aqui.";
    aviso.textContent = "Formulário e rascunho limpos. Os alunos cadastrados continuam salvos.";
  } catch (erro) {
    aviso.textContent = "Não foi possível remover o rascunho do navegador.";
    console.error(erro);
  }
});

// 10. INICIALIZAÇÃO: estas chamadas executam ao carregar a página.
restaurarRascunho();
carregarAlunos();
renderizarAlunos();

// 11. TEMA CLARO/ESCURO: evento + DOM + condição + localStorage.
const botaoTema = document.querySelector("#alternar-tema");
const CHAVE_TEMA = "revisaoFront.tema";

function aplicarTema(tema) {
  const escuro = tema === "escuro"; // boolean: true ou false
  // documentElement representa o elemento <html>.
  // Com true, toggle adiciona a classe; com false, remove.
  // A classe ativa as regras .tema-escuro do CSS.
  document.documentElement.classList.toggle("tema-escuro", escuro);

  if (escuro) {
    botaoTema.textContent = "Ativar tema claro";
  } else {
    botaoTema.textContent = "Ativar tema escuro";
  }
}

botaoTema.addEventListener("click", function () {
  const estaEscuro = document.documentElement.classList.contains("tema-escuro");
  // Se já está escuro, o próximo tema será claro, e vice-versa.
  const novoTema = estaEscuro ? "claro" : "escuro";
  aplicarTema(novoTema);

  try {
    localStorage.setItem(CHAVE_TEMA, novoTema);
  } catch (erro) {
    // A troca continua funcionando mesmo sem permissão para salvar.
    console.warn("Não foi possível salvar a preferência de tema.", erro);
  }
});

// Na abertura da página, recuperar a escolha feita anteriormente.
try {
  const temaSalvo = localStorage.getItem(CHAVE_TEMA);
  aplicarTema(temaSalvo);
} catch (erro) {
  aplicarTema("claro");
  console.warn("Não foi possível recuperar a preferência de tema.", erro);
}



