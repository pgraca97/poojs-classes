# Ficha 06 - Modularização e Arquitetura MVC

Reorganização do projeto Soundbase numa estrutura de módulos ES com separação explícita de responsabilidades: dados, modelos, vista e controlador. Introduz `import`/`export`, a abordagem de callbacks para manter o Controller sem acesso ao DOM, e parâmetros de URL com `URLSearchParams` e `history.replaceState`.

## Exercícios

- Ex. 1 (data): mover `soundbase-dados.js` para `js/data/`; exportar todos os identificadores com named exports
- Ex. 2-3 (models): separar `Track` e `Playlist` em ficheiros próprios; `export default`; eliminar `soundbase-classes.js`
- Ex. 4-6 (view): criar `soundbase-view.js` com todas as funções de renderização; `renderEmptyState`; `setActiveButton`
- Ex. 7-11 (controller): criar `soundbase-controller.js`; estado da aplicação; event listeners; função `init()` como única exportação
- Ex. 12 (app.js): ponto de entrada; único `<script type="module">` no HTML
- Ex. 13-17 (pesquisa): campo de pesquisa; `getFilteredTracks()`; `renderEmptyState` quando resultado vazio
- Desafio 1: parâmetros de URL com `URLSearchParams`, `history.replaceState` e leitura no `init`
- Desafio 2: lista "Recently Played" com as últimas 5 faixas reproduzidas, sem duplicados consecutivos

## Dúvidas frequentes

**O que faz cada camada - Model, View, Controller?**

Cada camada tem uma responsabilidade única e não entra no território das outras:

| Camada | Responsabilidade | O que não faz |
|--------|-----------------|---------------|
| **Model** (`Track`, `Playlist`) | dados e lógica de negócio | não toca no DOM, não sabe que a View existe |
| **View** (`soundbase-view.js`) | gera HTML, manipula o DOM | não tem estado, não toma decisões |
| **Controller** (`soundbase-controller.js`) | mantém estado, liga Model e View | não gera HTML, não faz `querySelector` |
| **Data** (`soundbase-dados.js`) | dados em bruto e utilitários | não importa nenhum outro módulo do projeto |
| **app.js** | ponto de entrada | sem lógica, só chama `init()` |

A regra prática: se estás a escrever `innerHTML` no Controller, está no sítio errado - vai para a View. Se estás a aceder a `currentFilter` na View, está no sítio errado - vai para o Controller.

**`export default` vs named exports - quando usar cada um?**

`export default` é usado quando o ficheiro define uma única entidade principal - por exemplo, uma classe. Quem importa escolhe o nome da variável livremente:

```js
// Track.js
export default Track;

// noutro ficheiro - o nome "Track" é convenção, não obrigação
import Track from "../models/Track.js";
import MinhaTrack from "../models/Track.js"; // também funciona
```

Named exports são usados quando o ficheiro exporta vários identificadores. A sintaxe de importação usa chavetas e o nome tem de corresponder exactamente:

```js
// soundbase-dados.js
export const formatDuration = ...
export const catalogue = [...];
export const GENRES = [...];

// noutro ficheiro
import { formatDuration, catalogue, GENRES } from "../data/soundbase-dados.js";
```

O ficheiro pode misturar os dois tipos, mas por clareza o padrão neste projecto é: um `export default` por ficheiro de modelo e named exports para tudo o resto.

**`type="module"` no `<script>` - porquê é obrigatório?**

Sem `type="module"`, o browser trata o ficheiro como script clássico e `import`/`export` causam erro de sintaxe. Com `type="module"`:

- `import`/`export` funcionam
- o script corre em modo strict automaticamente
- as variáveis declaradas no módulo não ficam expostas no objecto global `window`
- o browser espera que o HTML esteja carregado antes de executar (comportamento equivalente a `defer`)

```html
<script type="module" src="js/app.js"></script>
```

**Porquê é preciso `.js` no final dos imports?**

Sem bundler (Vite, Webpack, etc.), o browser faz um pedido HTTP para cada módulo. O URL tem de corresponder exactamente ao ficheiro no servidor - incluindo a extensão. Sem `.js`, o browser pede `../models/Track` e recebe um erro 404.

```js
// correto
import Track from "../models/Track.js";

// erro no browser sem bundler: 404 Not Found
import Track from "../models/Track";
```

Com Vite ou Webpack, a extensão é opcional porque o bundler resolve os caminhos antes de chegar ao browser. Neste projeto o browser carrega os módulos diretamente - a extensão é obrigatória.

**O padrão de callbacks dos `bind*` - porquê o Controller não toca no DOM?**

A View não deve conhecer o estado da aplicação - não sabe o que é `currentFilter` nem o que fazer quando um botão é clicado. O Controller passa a sua própria lógica como callback: a View regista o evento, extrai um valor limpo do DOM, e invoca o callback com esse valor. Toda a decisão fica no Controller:

```js
// View: regista o evento e devolve um valor limpo
export const bindFilterChange = (handler) => {
  filterControls.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn-filter")) return;
    setActiveButton(filterControls, e.target);
    handler(e.target.dataset.genre); // só o género - sem lógica
  });
};

// Controller: passa a lógica como callback
bindFilterChange((genre) => {
  currentFilter = genre; // estado
  syncURL();             // URL
  render();              // re-renderização
});
```

A View nunca importa variáveis de estado. O Controller nunca toca em `querySelector`, `innerHTML` ou classes CSS.

**`URLSearchParams` - como funciona `set`, `get` e `has`?**

`URLSearchParams` representa a query string de um URL (a parte após `?`). Os métodos principais:

```js
const params = new URLSearchParams();

params.set("genre", "Pop");       // adiciona ou substitui ?genre=Pop
params.set("view", "table");      // ?genre=Pop&view=table

params.get("genre");              // "Pop"
params.get("q");                  // null (não existe)
params.has("q");                  // false

params.toString();                // "genre=Pop&view=table"
```

`history.replaceState(null, "", "?" + params.toString())` actualiza o URL no browser sem recarregar a página e sem adicionar entrada ao histórico (o botão "back" não fica afectado).

Na função `readURL`, o padrão é: ler cada parâmetro com `get`, validar contra os valores conhecidos e só então actualizar o estado. Valores inválidos no URL são ignorados - o estado mantém o valor por defeito:

```js
const genre = params.get("genre");
if (genre && GENRES.includes(genre)) currentFilter = genre;
// se genre for null ou um valor não reconhecido, currentFilter mantém "all"
```

**`app.js` importa `init` - porquê named import e não default?**

O Controller exporta `init` como named export (`export const init`): é uma função com um nome fixo, não uma entidade única como uma classe. `app.js` importa com chavetas e chama `init()` - é o único ponto de contacto entre o ponto de entrada e o Controller:

```js
// app.js
import { init } from './controllers/soundbase-controller.js';
init();
```

`app.js` não contém lógica - só arranca a aplicação. Toda a inicialização (instâncias, event listeners, renderização inicial) está encapsulada no `init` do Controller.

## Para saber mais

- [JavaScript modules - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [import / export - javascript.info](https://javascript.info/import-export)
- [URLSearchParams - MDN](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [history.replaceState() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState)
- [Módulos, introdução - javascript.info](https://javascript.info/modules-intro)
