# Ficha 00 - Revisão Diagnóstica

Revisão de JavaScript fundamental com base no cenário de uma loja online. Cobre variáveis e tipos de dados, controlo de fluxo, métodos de array e introdução à manipulação do DOM.

## Exercícios

- Ex. 1-5: variáveis (`const`/`let`), `typeof`, preço com IVA, `classificarStock`, operador ternário
- Ex. 6-9: array de produtos - `forEach`, `reduce`, `filter`, `descricaoProduto`
- Ex. 10-12: DOM - renderizar lista, botão de alternância disponíveis/todos
- Ex. 13-14 (desafios): `ordenarPorPreco` com `toSorted()`, filtro de pesquisa em tempo real

## Dúvidas frequentes

**Por que usar `const` em vez de sempre `let`?**

`const` e `let` têm ambos âmbito de bloco, mas `const` impede reatribuição. Usar `const` por defeito comunica intenção: "este valor não vai ser reatribuído". Reservar `let` para variáveis que de facto mudam (contadores, estados booleanos) torna o código mais previsível e evita bugs por reatribuição acidental. `const` não significa imutável - um objeto `const` pode ter as suas propriedades alteradas. Em termos de performance não há diferença prática, mas quando o motor JavaScript sabe que uma variável não vai ser reatribuída pode aplicar otimizações de memória mais agressivas; com `let` essa garantia não existe.

**`typeof` devolve `"undefined"` para variáveis sem valor?**

Sim. `let desconto;` declara a variável mas não lhe atribui valor - o JavaScript atribui `undefined` por omissão. `typeof undefined === "undefined"`.

**`toFixed()` devolve uma string, não um número?**

Sim. `(89.99 * 1.23).toFixed(2)` devolve `"110.65"` (string). Se precisares de continuar operações matemáticas, converte de volta com `parseFloat()` ou `Number()`.

**`filter` vs loop com `if` e `push`?**

`filter` devolve um novo array sem modificar o original. Um loop com `push` faz o mesmo mas é mais verboso e obriga a gerir um array auxiliar. Usa `filter` quando o objetivo for obter um subconjunto de um array.

**`textContent` vs `innerHTML`?**

`textContent` trata o valor como texto simples, nunca interpreta HTML. `innerHTML` interpreta a string como HTML, o que pode ser um risco de segurança se o conteúdo vier do utilizador. Prefere `textContent` para dados e `innerHTML` apenas para HTML controlado.

## Para saber mais

- [const e let - javascript.info](https://javascript.info/variables)
- [Array.prototype.filter() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Node.textContent - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
- [Introdução ao DOM - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
