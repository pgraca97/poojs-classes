# Ficha 01 - Funções e Objetos

Introdução a arrow functions e objetos literais em JavaScript, com base no cenário SoundBase. Cobre as diferentes sintaxes de arrow function, objetos com métodos, propriedades aninhadas e iteração sobre arrays de objetos.

## Exercícios

- Ex. 1-4: arrow functions - sintaxe completa, return implícito, parâmetro por defeito, rest parameters (`...titles`)
- Ex. 5-9: objetos literais com métodos, `this`, objeto aninhado (`album`), `for...in`
- Ex. 10-14: array `catalogue` - `getTrackInfo`, `forEach`, `for...of`, `push`/`shift`, `reduce`
- Ex. 15-17 (integrador): objeto `playlist` com métodos `addTrack`, `removeTrack`, `getTotalDuration`, `getMostPlayed`, `printAll`
- Ex. 18-19 (desafios): `getByGenre` no objeto `playlist`, `summarise` com rest parameters

## Dúvidas frequentes

**Qual a diferença entre arrow function e função normal?**

Arrow functions são mais concisas e têm return implícito quando o corpo é uma expressão simples. A diferença principal é o `this`: uma função normal tem o seu próprio `this` (determinado por como é chamada), uma arrow function herda o `this` do contexto envolvente.

**Por que não usar arrow functions para métodos de objetos?**

Dentro de um método definido como arrow function, `this` não aponta para o objeto - aponta para o contexto exterior (normalmente `window` no browser). Por isso os métodos (`play`, `like`, `getInfo`) são declarados com a sintaxe `nomeMétodo() { }`, não como arrow functions.

**Qual a diferença entre `for...in` e `for...of`?**

`for...in` itera sobre as chaves (nomes das propriedades) de um objeto. `for...of` itera sobre os valores de um iterável (array, string, etc.). 

**O que faz exatamente o `reduce`?**

`reduce` percorre um array e acumula um único valor. Recebe uma função com dois parâmetros: o acumulador e o elemento atual. O segundo argumento de `reduce` é o valor inicial do acumulador. Exemplo: `[1, 2, 3].reduce((acc, n) => acc + n, 0)` devolve `6`. O erro mais comum é escrever `return acc += n` em vez de `return acc + n` - funciona mas é confuso porque o return não deve ser uma atribuição.

## Para saber mais

- [Arrow functions - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Métodos de objetos e this - javascript.info](https://javascript.info/object-methods)
- [for...in - javascript.info](https://javascript.info/object#forin-loop)
- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Rest parameters - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
