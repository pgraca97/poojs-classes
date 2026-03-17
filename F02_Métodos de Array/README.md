# Ficha 02 - Métodos de Array

Ficha complementar focada em `filter`, `map`, `find`, `findIndex` e `sort`, continuando o cenário SoundBase. O ficheiro `soundbase-dados.js` fornece o catálogo e as funções auxiliares (`formatDuration`, `formatPlays`, `getTrackInfo`) - ver Ficha 01, exercícios 1-11.

## Exercícios

- Ex. 1-3: `filter` - por género, por plays, função `getByGenre` reutilizável
- Ex. 4-6: `map` - extrair títulos, criar strings formatadas, objeto reduzido (`liteCatalogue`)
- Ex. 7-9: `find` e `findIndex` - por género, por título exato, atualizar plays por índice
- Ex. 10-12: `sort` - por plays, por título (A-Z), função `sortByDuration`
- Ex. 13-14 (integrador): `searchTracks` com `filter` + `toLowerCase`, `getTopTracks` com `filter` + `sort` + `slice`
- Ex. 15-16 (desafios): `reduce` para total de plays, encadeamento `filter` + `map` + `sort`

## Dúvidas frequentes

**`find` vs `filter` - quando usar cada um?**
`filter` devolve sempre um array (vazio se não houver resultados). `find` devolve o primeiro elemento que satisfaz o critério, ou `undefined`. Usa `find` quando procuras um elemento específico (por id, por título exato). Usa `filter` quando queres todos os que satisfazem uma condição.

**`sort` modifica o array original?**
Sim. `sort()` muta o array - reordena os elementos no lugar. Para ordenar sem modificar o original, cria uma cópia primeiro: `[...catalogue].sort(...)` ou `catalogue.toSorted(...)`.

**`map` devolve sempre um array com o mesmo número de elementos?**
Sim, sempre. `map` transforma cada elemento mas nunca filtra. Para transformar e filtrar ao mesmo tempo, usa `filter` seguido de `map`, ou `reduce`.

## Para saber mais

- [Métodos de array - javascript.info](https://javascript.info/array-methods)
- [Array.prototype.find() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [Array.prototype.map() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.sort() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [Array.prototype.toSorted() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
