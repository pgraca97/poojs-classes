# Ficha 05 - Renderização Dinâmica

Renderização dinâmica de HTML com template strings, a partir de instâncias das classes `Track` e `Playlist`. Introduz o padrão de separação entre funções de apresentação (que devolvem strings HTML) e funções de injeção (que escrevem no DOM), com filtros, ordenação e modal.

## Exercícios

- Ex. 1-2 (preparação): conversão do catálogo com `Track.fromObject()` e `map()`; instância de `Playlist`
- Ex. 3-5 (cards): `renderCard`, `renderCards`, renderização inicial do catálogo
- Ex. 6-7 (tabela): `renderRow`, `renderTable` com estrutura HTML completa gerada como string
- Ex. 8-9 (filtros): delegação de eventos em `#filter-controls`, classe `active`
- Ex. 10-12 (modal): `renderModal`, abertura com `btn-details`, encerramento com `btn-close` e clique no overlay
- Ex. 13 (integrador): troca de vistas com estado `currentFilter`
- Desafio 1: ordenação com `toSorted` e `localeCompare`; estado `currentSort`
- Desafio 2: `btn-add` com `myPlaylist.has()` e `renderPlaylist`

## Dúvidas frequentes

**`event.target` vs `event.currentTarget` - qual é qual?**

`event.target` é o elemento que recebeu o clique - pode estar aninhado a vários níveis dentro do contentor. `event.currentTarget` é o elemento onde o event listener está registado. Com delegação de eventos, o listener está no contentor mas o clique acontece num botão filho: nesse caso `target` é o botão e `currentTarget` é o contentor.

```js
filterControls.addEventListener("click", (e) => {
  // e.currentTarget → #filter-controls (onde o listener está registado)
  // e.target        → o botão clicado dentro desse contentor

  e.currentTarget.querySelector(".btn-filter.active")?.classList.remove("active");
  e.target.classList.add("active");
});
```

O modal usa esta distinção para distinguir um clique no overlay de um clique dentro do `modal-card`:

```js
modalOverlay.addEventListener("click", (e) => {
  if (e.target === e.currentTarget || e.target.classList.contains("btn-close")) {
    e.currentTarget.classList.add("hidden");
  }
});
```

Se o clique for dentro do `modal-card`, `e.target` é um elemento filho - diferente de `e.currentTarget` (o overlay) - e o modal não fecha.

**`localeCompare` para ordenar strings**

`a.localeCompare(b)` compara duas strings tendo em conta as regras do idioma local - incluindo acentos e capitalização. Devolve um número negativo se `a` vem antes de `b`, positivo se vem depois, zero se são equivalentes. É o substituto correto do operador `<` para comparação de strings num comparador de `sort`.

```js
// Sem localeCompare - pode ordenar mal strings com acentos:
tracks.toSorted((a, b) => a.title < b.title ? -1 : 1);

// Com localeCompare - comparação correta e sensível ao idioma:
tracks.toSorted((a, b) => a.title.localeCompare(b.title));
```

**O que deve devolver a função comparadora do `sort`/`toSorted`?**

A função comparadora recebe dois elementos (`a` e `b`) e deve devolver:
- um número **negativo** se `a` deve vir antes de `b`
- um número **positivo** se `a` deve vir depois de `b`
- **zero** se a ordem relativa entre os dois é indiferente

`return 0` não significa "são iguais" - significa "não alterar a ordem relativa destes dois". Num sort com vários critérios possíveis, `return 0` como caso por defeito preserva a ordem existente quando nenhum critério está ativo:

```js
filtered.toSorted((a, b) => {
  if (currentSort === "title-asc") return a.title.localeCompare(b.title);
  if (currentSort === "plays-desc") return b.plays - a.plays;
  return 0; // sem critério ativo: manter a ordem existente
});
```

**`toSorted` em vez de `sort`**

`sort()` reordena o array no lugar e modifica o original (ver [README](../F02_Métodos%20de%20Array/README.md) da ficha 02). `toSorted()` devolve um novo array ordenado e deixa o original intacto. Nesta ficha, o array `tracks` representa o catálogo completo e nunca deve ser modificado pelos filtros ou pela ordenação - por isso `toSorted` é a escolha certa.

**Porquê é que `getInfo()` devolve uma string em vez de alterar o DOM?**

A classe `Playlist` não sabe nada sobre o DOM - não tem acesso a `document`, não conhece `#playlist-info`. Esta separação é intencional: as classes tratam dos dados e da lógica; as funções de renderização tratam da apresentação. `getInfo()` devolve uma string pronta a usar, e quem decide onde e como a colocar é o código externo:

```js
// A classe devolve a string - não toca no DOM
getInfo() {
  return `${this.name} by ${this.createdBy} | ${this.#tracks.length} tracks | ...`;
}

// A função de renderização decide onde colocar
const renderPlaylist = (playlist) => {
  playlistInfo.innerHTML = playlist.getInfo();
};
```

O método `has()` segue a mesma lógica: sabe verificar se uma faixa existe na playlist, mas não toma decisões com base nessa informação. Essa responsabilidade fica no event listener:

```js
if (myPlaylist.has(track)) {
  shouldAdd = confirm(`"${track.title}" já está na playlist. Adicionar duplicado?`);
}
```

Numa aplicação real, o `confirm()` nativo seria substituído por um modal de UI mais cuidado - mas o padrão de verificar com `has()` antes de agir mantém-se.

## Para saber mais

- [Event.target - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)
- [Event.currentTarget - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget)
- [String.prototype.localeCompare() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
- [Array.prototype.toSorted() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
- [Delegação de eventos - javascript.info](https://javascript.info/event-delegation)
