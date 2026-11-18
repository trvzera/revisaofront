# Revisão de JavaScript

Uma página de estudo para quem está começando, com explicações em português, exemplos interativos e código comentado. Usa apenas HTML, CSS e JavaScript, sem bibliotecas e sem etapa de compilação.

## Como abrir

Baixe o repositório e abra o arquivo `index.html` no navegador.

Para testar `localStorage` e `sessionStorage` com uma origem HTTP consistente, prefira um servidor local. Se tiver Python instalado, abra um terminal na pasta do projeto e execute:

```sh
python -m http.server 5500
```

Em alguns sistemas, o comando é `python3 -m http.server 5500`. Depois, acesse **http://localhost:5500**. Para encerrar o servidor, pressione `Ctrl+C` no terminal. Outra opção é abrir a pasta no VS Code e usar a extensão Live Server.

## Arquivos

- `index.html`: conteúdo da revisão, campos, botões e exemplos de código.
- `style.css`: aparência e adaptação para celular, com comentários.
- `script.js`: toda a lógica dos exemplos, organizada e comentada por assunto.
- `cadastro.html` e `cadastro.js`: exemplo integrado dos documentos, com cadastro de alunos, média, máscara de CPF, rascunho, lista salva e tema claro/escuro.
- `guia.html`: guia completo enviado, convertido para leitura no navegador, incluindo tabelas, código, exercícios e gabarito.
- `materiais/`: os dois documentos Word originais, preservados como recebidos.

O HTML carrega o JavaScript com `<script src="script.js" defer></script>`. O atributo `defer` faz o script executar depois que o HTML foi lido.

## Conteúdos

| Assunto | O que praticar | Referência informada |
| --- | --- | --- |
| Variáveis e tipos | `let`, `const`, `var` como referência, string, number, boolean, undefined, null, arrays, objetos e `typeof` | Páginas 65 a 69 |
| Condicionais | `if`, `else if`, `else`, comparações e operadores lógicos | Páginas 70 a 72 |
| Funções | Declaração, parâmetros, argumentos, chamada e `return` | Páginas 73 a 85 |
| DOM | Selecionar elementos, mudar texto e classes, criar e remover itens e reagir a eventos | Páginas 73 a 85 |
| Máscara | Formatar celular com `input`, `replace`, `slice` e condições | Páginas 73 a 85 |
| Armazenamento | `setItem`, `getItem` e `removeItem` com localStorage e sessionStorage | Sem páginas informadas |

As referências de páginas foram fornecidas na solicitação. A revisão inicial segue os tópicos listados. Os documentos enviados depois foram incorporados no guia e no exemplo integrado; eles não são as páginas da apostila.

## Materiais complementares

Abra `guia.html` para ler o **Guia de estudos — JavaScript para a prova de Front-end**, com os 12 exercícios e o gabarito. O texto original foi mantido; a nota no início explica que as referências ao projeto de alunos correspondem a `cadastro.html` e `cadastro.js` nesta versão.

Abra `cadastro.html` para praticar o código do segundo documento. A adaptação corrige a máscara de CPF: os grupos de captura precisam das substituições `$1.$2` e `$1-$2`, em vez de `"2"`. Também valida campos vazios, trata dados salvos com formato inesperado e só apresenta o cadastro como concluído depois que a gravação funciona.

O exemplo integrado usa funções tradicionais, callbacks escritos com `function`, `forEach` para percorrer os alunos e `filter` para excluir um item. `push` inclui um aluno no array. Os comentários e o guia explicam essas operações. O tema claro/escuro demonstra eventos, classes CSS, condições e preferências salvas.

Para experimentar o cadastro, use **dados fictícios**, como nome “Aluno de teste” e CPF `12345678901`. Esse número serve apenas para demonstrar a formatação, não representa uma validação de CPF.

## Roteiro de estudo

1. Leia uma seção e use seus campos e botões.
2. Abra “Veja a ideia no código” para ver um resumo do conceito.
3. Abra `script.js` e procure a seção com o mesmo número.
4. Leia os comentários e tente o desafio proposto na página.
5. Abra o console do navegador (F12 → Console) para ver os exemplos de tipos.

As funções usam nomes descritivos e a sintaxe tradicional `function`. As verificações de campos vazios e números inválidos mostram como evitar resultados enganosos: por exemplo, `Number("")` resulta em `0`.

## Experimentos úteis

- **Variáveis:** teste idades 0, 17 e 18. Veja quando o boolean `maiorDeIdade` muda.
- **Condicionais:** compare as notas 4.9, 5, 6.9 e 7. Valores fora de 0 a 10 são rejeitados.
- **Funções:** some 2 e 3, depois teste 0 e números negativos. Números decimais usam a precisão padrão do JavaScript: `0.1 + 0.2` resulta em `0.30000000000000004`.
- **DOM:** altere o texto, ligue o destaque, adicione tópicos e remova todos os itens.
- **Máscara:** cole `11912345678`, tente letras e apague o campo. A máscara aceita celular brasileiro com 11 dígitos, sem `+55`; ela formata, mas não verifica se o número existe. A implementação é simples: editar no meio do campo pode mover o cursor para o fim.
- **Armazenamento:** salve um nome e uma meta e recarregue a mesma aba. Ambos devem voltar. Abra uma nova aba independente e digite o mesmo endereço: o nome continua disponível e a nova aba começa com sua própria sessão. Duplicar uma aba ou abri-la a partir de outra pode copiar os dados iniciais da sessão. A restauração de abas do navegador também pode recuperar a sessão.

## Sobre os dados salvos

O projeto não envia os valores digitados para um servidor. Os exemplos usam apenas estas chaves no navegador:

- `revisaofront_nome`, em `localStorage`.
- `revisaofront_meta`, em `sessionStorage`.
- `revisaoFront.alunos` e `revisaoFront.tema`, em `localStorage`, no cadastro integrado.
- `revisaoFront.rascunho`, em `sessionStorage`, no cadastro integrado.

Os botões de apagar removem apenas a chave correspondente, usando `removeItem()`. O código não usa `clear()`, que apagaria todas as chaves daquele armazenamento na mesma origem.

O armazenamento é separado por origem (protocolo, domínio e porta). Permissões, modo privado e a abertura via `file://` podem limitar seu funcionamento. Por isso, o código usa `try/catch` para mostrar uma mensagem quando o navegador bloqueia uma operação.
# revisaofront
