# Ficha 03 - DOM e Eventos

Manipulação do DOM com JavaScript: selecionar e modificar elementos, reagir a eventos, trabalhar com formulários e renderizar conteúdo dinâmico. Continua o cenário SoundBase das fichas anteriores.

## Exercícios

- Ex. 1-3: seletores (`getElementById`, `querySelector`), `textContent`, `setAttribute`/`getAttribute`
- Ex. 4-5: renderização com `innerHTML` - `renderTrack` e `renderCatalogue`
- Ex. 6: event listener no input de pesquisa (`input`)
- Ex. 7-8: delegação de eventos no contentor de faixas - like e remover
- Ex. 9-11: formulário - `submit`, `preventDefault`, validação, adicionar ao catálogo
- Ex. 12 (integrador): pesquisa em tempo real com `filter`
- Ex. 13-14 (desafios): toggle de like com `dataset` e `classList`; filtros por género

## Dúvidas frequentes

**Quando é que tenho de declarar o argumento `event`?**

Quando o handler precisa de aceder a informação sobre o evento: o elemento que foi clicado (`event.target`), o valor atual de um input (`event.target.value`), ou para cancelar o comportamento por defeito (`event.preventDefault()`). Se o handler não usa nenhuma dessas coisas, o argumento pode ser omitido.

**Diferença entre `getElementById` e `querySelector`?**

`getElementById` recebe só o nome do id, sem `#`, e devolve o elemento ou `null`. `querySelector` usa seletores CSS - `#id`, `.classe`, `tag` - o que o torna mais flexível. `querySelectorAll` devolve uma `NodeList` com todos os elementos que correspondem ao seletor (mesmo que seja zero).

**Para que serve `setAttribute`?**

Define qualquer atributo HTML num elemento; `getAttribute` lê-o. Para atributos que têm propriedade JS direta - como `textContent`, `value` ou `className` - é mais direto usar a propriedade. `setAttribute` é útil para atributos sem equivalente direto, ou quando o nome do atributo é dinâmico.

**O que faz `classList.toggle`?**

Adiciona a classe se não existir no elemento, remove-a se já existir. Com segundo argumento booleano, força o estado: `toggle("active", true)` sempre adiciona, `toggle("active", false)` sempre remove - útil quando o estado vem de uma variável.

**O que é `dataset`?**

Interface para ler e escrever atributos `data-*` diretamente em JavaScript. `element.dataset.title` lê o atributo `data-title` do HTML. Os valores são sempre strings - `btn.dataset.liked === "true"` (não `=== true`).

**Porquê `createElement` em vez de `innerHTML` com input do utilizador?**

`innerHTML` interpreta o valor como HTML. Se um utilizador submeter `<img src=x onerror="alert(1)">` como título de uma faixa, o browser executa esse JavaScript - isto chama-se XSS (Cross-Site Scripting). `createElement` com `textContent` trata o valor como texto simples e nunca como HTML, eliminando o problema. Para projetos que não podem evitar `innerHTML`, a abordagem padrão é usar uma biblioteca de sanitização como [DOMPurify](https://github.com/cure53/DOMPurify) antes de atribuir ao `innerHTML`.

## Para saber mais

- [Introdução a eventos - MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events)
- [addEventListener() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [Element.classList - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
- [HTMLElement.dataset - MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
- [Cross-Site Scripting (XSS) - MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS)
