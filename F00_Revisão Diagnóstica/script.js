// FICHA 0 — Revisão Diagnóstica

// Variáveis, tipos de dados e operadores

// Exercício 1 — Variáveis e tipos de dados
// const para valores que não vão mudar; let para desconto - valor ainda desconhecido
const nome = "Teclado Mecânico";
const preco = 89.99;
const stock = 14;
const emPromocao = true;
let desconto; // declarada sem valor - por omissão é undefined

console.log("--- Exercício 1 ---");
console.log(typeof nome); // "string"
console.log(typeof preco); // "number"
console.log(typeof stock); // "number"
console.log(typeof emPromocao); // "boolean"
console.log(typeof desconto); // "undefined"

// Exercício 2 — Preço com IVA + string formatada
// toFixed(2) devolve uma STRING — parseFloat converte de volta para número
// para que possamos chamar toFixed() novamente sem obter "110.650"
const precoComIVA = parseFloat((preco * 1.23).toFixed(2));

console.log("--- Exercício 2 ---");
console.log(`${nome} – ${precoComIVA}€ (stock: ${stock})`);
// Expected: "Teclado Mecânico – 110.65€ (stock: 14)"

// Controlo de fluxo

// Exercício 3 — classificarStock
function classificarStock(unidades) {
  // Guarda: rejeitar qualquer valor que não seja um inteiro não negativo
  if (typeof unidades !== "number" || unidades < 0) {
    throw new Error(`classificarStock: valor inválido (${unidades})`);
  }

  // Devido aos retornos antecipados, cada condição só precisa de um limite superior —
  // se chegámos a "if (unidades <= 5)", já sabemos que unidades > 0.
  if (unidades === 0) return "Esgotado";
  if (unidades <= 5) return "Stock crítico";
  if (unidades <= 20) return "Stock normal";
  return "Stock elevado";
}

// Exercício 4 — Testar classificarStock com pelo menos 4 valores
console.log("--- Exercício 4 ---");
console.log(classificarStock(0)); // "Esgotado"
console.log(classificarStock(3)); // "Stock crítico"
console.log(classificarStock(14)); // "Stock normal"
console.log(classificarStock(28)); // "Stock elevado"

// Capturar uma chamada inválida - try/catch interceta o Error lançado
// para que o script não termine abruptamente; tratamos o problema nós próprios.
try {
  console.log(classificarStock(-5));
} catch (erro) {
  // Aqui poderíamos, p.e., registar o erro num serviço externo ou mostrar
  // uma mensagem amigável ao utilizador em vez de deixar o script crashar.
  console.error("Erro apanhado:", erro.message);
  // Output: "Erro apanhado: classificarStock: valor inválido (-5)"
}

// Exercício 5 — Operador ternário
console.log("--- Exercício 5 ---");
const etiqueta = emPromocao ? "Em promoção" : "Preço normal";
console.log(etiqueta); // "Em promoção"

// Arrays e Métodos

const produtos = [
  {
    nome: "Teclado Mecânico",
    preco: 89.99,
    stock: 14,
    emPromocao: true,
    descricao: "Teclado mecânico com switches de alta qualidade",
  },
  {
    nome: "Rato Sem Fios",
    preco: 34.5,
    stock: 2,
    emPromocao: false,
    descricao: "Rato sem fios ergonómico com sensor óptico",
  },
  {
    nome: 'Monitor 27"',
    preco: 349.0,
    stock: 0,
    emPromocao: true,
    descricao: "Monitor LED de 27 polegadas Full HD",
  },
  {
    nome: "Headset Gaming",
    preco: 59.9,
    stock: 28,
    emPromocao: false,
    descricao: "Headset gaming com som surround 7.1",
  },
  {
    nome: "Webcam HD",
    preco: 45.0,
    stock: 7,
    emPromocao: true,
    descricao: "Webcam HD 1080p com microfone integrado",
  },
];

// Exercício 6 — Imprimir os nomes dos produtos em maiúsculas
// forEach é a escolha certa aqui: não estamos a construir um novo array,
// apenas a executar um efeito secundário (imprimir) para cada elemento.
console.log("--- Exercício 6 ---");
produtos.forEach((produto) => {
  console.log(produto.nome.toUpperCase());
});

// Exercício 7 — calcularValorStock
function calcularValorStock(arrayProdutos) {
  // reduce "dobra" o array num único valor.
  // acc (acumulador) começa em 0 e somamos preço × stock para cada produto.
  const total = arrayProdutos.reduce((acc, produto) => {
    return acc + produto.preco * produto.stock;
  }, 0);

  console.log(`Valor total em stock: ${total.toFixed(2)}€`);
  return total;
}

console.log("--- Exercício 7 ---");
calcularValorStock(produtos);

// Exercício 8 — Produtos disponíveis e esgotados
// filter devolve um novo array — o original não é modificado.
// produtosDisponiveis é declarado aqui para que o exercício 12 o possa usar.
console.log("--- Exercício 8 ---");
const produtosDisponiveis = produtos.filter((p) => p.stock);

console.log(`Produtos disponíveis: ${produtosDisponiveis.length}`);
// O número de artigos esgotados é simplesmente a diferença
console.log(
  `Produtos esgotados: ${produtos.length - produtosDisponiveis.length}`,
);

// Exercício 9 — descricaoProduto
function descricaoProduto(produto) {
  // Reutilizar classificarStock do exercício 3
  const classificacao = classificarStock(produto.stock);
  // Reutilizar a lógica ternária do exercício 5
  const etiquetaPromocao = produto.emPromocao ? "Em promoção" : "Preço normal";

  return `${produto.nome} — ${produto.preco.toFixed(2)}€ — ${classificacao} — ${etiquetaPromocao}`;
}

// Testar com todos os produtos do array
console.log("--- Exercício 9 ---");
produtos.forEach((produto) => {
  console.log(descricaoProduto(produto));
});

// DOM

// Exercício 11 — renderizarProdutos (chamada ao carregar a página)
function renderizarProdutos(arrayProdutos) {
  const container = document.getElementById("lista-produtos");

  // Limpar o contentor antes de cada renderização para evitar duplicados
  container.innerHTML = "";

  arrayProdutos.forEach((produto) => {
    const item = document.createElement("p");
    // textContent é mais seguro do que innerHTML — nunca interpreta a string como HTML,
    // por isso um nome de produto como "<script>" não pode causar problemas.
    item.textContent = descricaoProduto(produto);
    container.appendChild(item);
  });
}

function renderizarComFiltro() {
  const termo = inputFiltro.value.toLowerCase();
  const arrayBase = mostrarTodos ? produtos : produtosDisponiveis;
  const produtosFiltrados = arrayBase.filter((p) =>
    p.nome.toLowerCase().includes(termo),
  );
  renderizarProdutos(ordenarPorPreco(produtosFiltrados));
}

// Exercício 13 — ordenarPorPreco (aplicada antes de cada chamada de renderização)
function ordenarPorPreco(arrayProdutos) {
  // toSorted() cria uma cópia superficial e ordena — ao contrário de sort(),
  // não muta o array original, pelo que produtos se mantém inalterado.
  return arrayProdutos.toSorted((a, b) => a.preco - b.preco);
}

// Renderização inicial com ordenação por preço aplicada (exercício 13 integrado aqui)
renderizarProdutos(ordenarPorPreco(produtos));

// Exercício 12 — Botão de alternância: disponíveis ↔ todos os produtos
const btn = document.getElementById("btn-disponiveis");

// Este booleano regista qual a vista actualmente activa.
// Ler o texto do botão para decidir o que fazer a seguir é frágil —
// uma variável de estado dedicada é sempre a melhor abordagem.
let mostrarTodos = true;

btn.addEventListener("click", () => {
  mostrarTodos = !mostrarTodos;
  btn.textContent = mostrarTodos ? "Mostrar disponíveis" : "Mostrar todos";
  renderizarComFiltro();
});

// Exercício 14 — Filtro de pesquisa em tempo real
const inputFiltro = document.getElementById("filtro-nome");

// "input" é disparado a cada tecla (ao contrário de "change", que só dispara ao perder o foco)
inputFiltro.addEventListener("input", renderizarComFiltro);
