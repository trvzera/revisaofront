// REVISÃO DE JAVASCRIPT PARA INICIANTES
// Leia na ordem: cada parte acompanha uma seção do index.html.
// Não é preciso instalar bibliotecas. O navegador executa este arquivo.

// 1. VARIÁVEIS E TIPOS DE DADOS --------------------------------------
// const: a variável não pode receber outra atribuição.
// let: a variável pode receber outro valor depois.
// Esses exemplos aparecem também no console do navegador (F12).
const linguagem = "JavaScript"; // string: um texto entre aspas
let aulasEstudadas = 0; // number: um número, sem aspas
aulasEstudadas = aulasEstudadas + 1; // agora vale 1
const estouAprendendo = true; // boolean: true ou false
let assuntoFuturo; // undefined: ainda não recebeu um valor
const semResposta = null; // null: ausência intencional de valor
const materias = ["HTML", "CSS", "JavaScript"]; // array: lista de valores
const aluno = { nome: "Ana", idade: 18 }; // objeto: propriedades e valores

console.log("Texto:", linguagem, "Tipo:", typeof linguagem);
console.log("Número:", aulasEstudadas, "Tipo:", typeof aulasEstudadas);
console.log("Boolean:", estouAprendendo, "Tipo:", typeof estouAprendendo);
console.log("Sem atribuição:", assuntoFuturo, "Tipo:", typeof assuntoFuturo);
console.log("Ausência intencional:", semResposta);
// typeof null retorna "object": é uma particularidade histórica do JS.
console.log("Lista:", materias, "Primeiro item:", materias[0]);
console.log("Objeto:", aluno, "Nome do aluno:", aluno.nome);

// Buscamos os elementos pelo mesmo ID definido no HTML.
const campoNome = document.getElementById("nome-variavel");
const campoIdade = document.getElementById("idade-variavel");
const resultadoVariaveis = document.getElementById("resultado-variaveis");
const botaoVariaveis = document.getElementById("botao-variaveis");

function mostrarVariaveis() {
  // .value lê o que foi digitado. trim() remove espaços das pontas.
  const nome = campoNome.value.trim();
  const idade = Number(campoIdade.value); // converte texto em número

  // Number("") daria 0. Por isso verificamos o campo vazio separadamente.
  // || significa "ou": basta uma condição ser verdadeira.
  if (nome === "" || campoIdade.value === "" || !Number.isInteger(idade) || idade < 0 || idade > 130) {
    resultadoVariaveis.textContent = "Preencha o nome e uma idade inteira entre 0 e 130.";
    return; // encerra esta execução sem continuar
  }

  const maiorDeIdade = idade >= 18; // a comparação resulta em boolean
  // + junta os textos. \n cria uma nova linha no resultado.
  resultadoVariaveis.textContent = "nome = " + nome + " | tipo: " + typeof nome
    + "\nidade = " + idade + " | tipo: " + typeof idade
    + "\nmaiorDeIdade = " + maiorDeIdade + " | tipo: " + typeof maiorDeIdade;
}

// Sem () aqui: o navegador chama a função somente quando houver clique.
botaoVariaveis.addEventListener("click", mostrarVariaveis);

// 2. LÓGICA CONDICIONAL ----------------------------------------------
const campoNota = document.getElementById("nota");
const resultadoNota = document.getElementById("resultado-nota");
const botaoNota = document.getElementById("botao-nota");

function verificarNota() {
  const nota = Number(campoNota.value);

  // Number.isFinite verifica se temos um número finito.
  // ! significa "não". Rejeitamos valores inválidos antes da classificação.
  if (campoNota.value === "" || !Number.isFinite(nota) || nota < 0 || nota > 10) {
    resultadoNota.textContent = "Digite uma nota válida entre 0 e 10.";
    return;
  }

  // O programa testa de cima para baixo e executa apenas um caminho.
  if (nota >= 7) {
    resultadoNota.textContent = "Nota " + nota + ": aprovação!";
  } else if (nota >= 5) {
    resultadoNota.textContent = "Nota " + nota + ": recuperação. Vamos praticar!";
  } else {
    resultadoNota.textContent = "Nota " + nota + ": reprovação. Retome os conteúdos e tente de novo.";
  }
}

botaoNota.addEventListener("click", verificarNota);

// 3. FUNÇÕES: PARÂMETROS, CHAMADA E RETORNO ----------------------------
// a e b são parâmetros: recebem os números quando a função é chamada.
// return devolve a soma para o lugar que chamou a função.
function somar(a, b) {
  return a + b;
}

const campoNumeroA = document.getElementById("numero-a");
const campoNumeroB = document.getElementById("numero-b");
const resultadoSoma = document.getElementById("resultado-soma");
const botaoSoma = document.getElementById("botao-soma");

function mostrarSoma() {
  const numeroA = Number(campoNumeroA.value);
  const numeroB = Number(campoNumeroB.value);

  if (campoNumeroA.value === "" || campoNumeroB.value === "" || !Number.isFinite(numeroA) || !Number.isFinite(numeroB)) {
    resultadoSoma.textContent = "Preencha os dois campos com números válidos.";
    return;
  }

  const total = somar(numeroA, numeroB); // chamada com dois argumentos

  if (!Number.isFinite(total)) {
    resultadoSoma.textContent = "O resultado ficou grande demais. Tente números menores.";
    return;
  }

  resultadoSoma.textContent = numeroA + " + " + numeroB + " = " + total;
  // Números decimais podem apresentar pequenas diferenças de precisão em JS.
  // Por exemplo: 0.1 + 0.2 resulta em 0.30000000000000004.
}

botaoSoma.addEventListener("click", mostrarSoma);

// 4. MANIPULAÇÃO DO DOM ----------------------------------------------
const textoDom = document.getElementById("texto-dom");
const campoTexto = document.getElementById("novo-texto");
const campoTopico = document.getElementById("novo-topico");
const listaTopicos = document.getElementById("lista-topicos");
const resultadoDom = document.getElementById("resultado-dom");
const botaoTexto = document.getElementById("botao-texto");
const botaoDestaque = document.getElementById("botao-destaque");
const botaoAdicionar = document.getElementById("botao-adicionar");
const botaoRemover = document.getElementById("botao-remover");

function alterarTexto() {
  const novoTexto = campoTexto.value.trim();

  if (novoTexto === "") {
    resultadoDom.textContent = "Escreva uma mensagem antes de alterar o texto.";
    return;
  }

  // textContent coloca texto na página, sem interpretá-lo como HTML.
  textoDom.textContent = novoTexto;
  resultadoDom.textContent = "Texto alterado com textContent!";
}

function alternarDestaque() {
  // A aparência de .highlight está no style.css.
  const destacado = textoDom.classList.toggle("highlight");
  // aria-pressed comunica o estado do botão a leitores de tela.
  botaoDestaque.setAttribute("aria-pressed", destacado);
  resultadoDom.textContent = "Destaque alternado com classList.toggle()!";
}

function adicionarTopico() {
  const topico = campoTopico.value.trim();

  if (topico === "") {
    resultadoDom.textContent = "Digite um tópico antes de adicionar.";
    return;
  }

  const novoItem = document.createElement("li"); // cria um <li>
  novoItem.textContent = topico; // preenche o texto do item
  listaTopicos.appendChild(novoItem); // coloca o item dentro da <ul>
  campoTopico.value = ""; // limpa o campo para o próximo tópico
  resultadoDom.textContent = "Tópico adicionado com createElement() e appendChild()!";
}

function removerUltimoTopico() {
  // lastElementChild é o último elemento dentro da lista.
  const ultimoItem = listaTopicos.lastElementChild;

  if (ultimoItem === null) {
    resultadoDom.textContent = "A lista já está vazia. Adicione um tópico!";
    return;
  }

  ultimoItem.remove();
  resultadoDom.textContent = "Último tópico removido com remove()!";
}

botaoTexto.addEventListener("click", alterarTexto);
botaoDestaque.addEventListener("click", alternarDestaque);
botaoAdicionar.addEventListener("click", adicionarTopico);
botaoRemover.addEventListener("click", removerUltimoTopico);

// 5. MÁSCARA SIMPLES DE CELULAR --------------------------------------
const campoCelular = document.getElementById("celular");
const resultadoMascara = document.getElementById("resultado-mascara");

function aplicarMascaraCelular() {
  // /\D/g encontra todos os caracteres que NÃO são dígitos.
  // replace troca esses caracteres por "" (nada).
  let numeros = campoCelular.value.replace(/\D/g, "");
  numeros = numeros.slice(0, 11); // mantém só os primeiros 11 dígitos

  let formatado = numeros;

  // Tratamos os comprimentos para a máscara aparecer aos poucos.
  // length informa a quantidade de caracteres do texto.
  if (numeros.length > 7) {
    formatado = "(" + numeros.slice(0, 2) + ") " + numeros.slice(2, 7) + "-" + numeros.slice(7);
  } else if (numeros.length > 2) {
    formatado = "(" + numeros.slice(0, 2) + ") " + numeros.slice(2);
  } else if (numeros.length > 0) {
    formatado = "(" + numeros;
  }

  campoCelular.value = formatado;
  resultadoMascara.textContent = numeros.length + " de 11 dígitos preenchidos.";

  if (numeros.length === 11) {
    resultadoMascara.textContent = "Máscara completa: " + formatado + ". Isso não confirma que o número existe.";
  }
}

campoCelular.addEventListener("input", aplicarMascaraCelular);

// 6. LOCALSTORAGE E SESSIONSTORAGE -----------------------------------
// A chave funciona como uma etiqueta para encontrar cada valor.
// Usamos nomes próprios do projeto para não alterar dados de outros exemplos.
const chaveNome = "revisaofront_nome";
const chaveMeta = "revisaofront_meta";
const campoNomeLocal = document.getElementById("nome-local");
const campoMetaSessao = document.getElementById("meta-sessao");
const resultadoLocal = document.getElementById("resultado-local");
const resultadoSessao = document.getElementById("resultado-sessao");
const botaoSalvarLocal = document.getElementById("salvar-local");
const botaoApagarLocal = document.getElementById("apagar-local");
const botaoSalvarSessao = document.getElementById("salvar-sessao");
const botaoApagarSessao = document.getElementById("apagar-sessao");

function salvarNome() {
  const nome = campoNomeLocal.value.trim();

  if (nome === "") {
    resultadoLocal.textContent = "Digite um nome antes de salvar.";
    return;
  }

  // try tenta executar. catch trata um erro, se ele acontecer.
  // O navegador pode bloquear o armazenamento nas suas configurações.
  try {
    localStorage.setItem(chaveNome, nome);
    resultadoLocal.textContent = "Nome salvo no localStorage: " + nome + ". Recarregue para testar!";
  } catch (erro) {
    resultadoLocal.textContent = "Não foi possível salvar. Verifique se o navegador permite armazenamento neste endereço.";
  }
}

function apagarNome() {
  try {
    // Removemos só a nossa chave. clear() apagaria todas as chaves da origem.
    localStorage.removeItem(chaveNome);
    campoNomeLocal.value = "";
    resultadoLocal.textContent = "Nome removido do localStorage.";
  } catch (erro) {
    resultadoLocal.textContent = "Não foi possível apagar. O armazenamento pode estar bloqueado.";
  }
}

function salvarMeta() {
  const meta = campoMetaSessao.value.trim();

  if (meta === "") {
    resultadoSessao.textContent = "Digite uma meta antes de salvar.";
    return;
  }

  try {
    sessionStorage.setItem(chaveMeta, meta);
    resultadoSessao.textContent = "Meta salva no sessionStorage: " + meta + ". Recarregue esta aba para testar!";
  } catch (erro) {
    resultadoSessao.textContent = "Não foi possível salvar. Verifique se o navegador permite armazenamento neste endereço.";
  }
}

function apagarMeta() {
  try {
    sessionStorage.removeItem(chaveMeta);
    campoMetaSessao.value = "";
    resultadoSessao.textContent = "Meta removida do sessionStorage.";
  } catch (erro) {
    resultadoSessao.textContent = "Não foi possível apagar. O armazenamento pode estar bloqueado.";
  }
}

function carregarNome() {
  try {
    const nomeSalvo = localStorage.getItem(chaveNome);

    // getItem retorna null quando a chave ainda não existe.
    if (nomeSalvo !== null) {
      campoNomeLocal.value = nomeSalvo;
      resultadoLocal.textContent = "Nome recuperado do localStorage: " + nomeSalvo;
    }
  } catch (erro) {
    resultadoLocal.textContent = "O localStorage está indisponível neste endereço ou navegador.";
  }
}

function carregarMeta() {
  try {
    const metaSalva = sessionStorage.getItem(chaveMeta);

    if (metaSalva !== null) {
      campoMetaSessao.value = metaSalva;
      resultadoSessao.textContent = "Meta recuperada do sessionStorage: " + metaSalva;
    }
  } catch (erro) {
    resultadoSessao.textContent = "O sessionStorage está indisponível neste endereço ou navegador.";
  }
}

botaoSalvarLocal.addEventListener("click", salvarNome);
botaoApagarLocal.addEventListener("click", apagarNome);
botaoSalvarSessao.addEventListener("click", salvarMeta);
botaoApagarSessao.addEventListener("click", apagarMeta);

// Estas chamadas executam assim que o script é carregado.
// Cada armazenamento é lido separadamente: uma falha não impede o outro.
carregarNome();
carregarMeta();
