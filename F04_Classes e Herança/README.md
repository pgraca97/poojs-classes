# Ficha 04 - Classes e Herança

Classes em JavaScript: encapsulamento com campos privados, getters e setters, métodos estáticos e herança com `extends` e `super`. O cenário SoundBase é reescrito de objetos literais para classes.

## Exercícios

- Ex. 1-3: classe `Track`, constructor, instâncias, métodos `play`, `like`, `getInfo`
- Ex. 4-5: campos privados com `#`, getters para leitura externa, setter com validação
- Ex. 6-7: métodos estáticos `Track.compare` e `Track.fromObject`
- Ex. 8-10: classe `Playlist` com `#tracks` privado, métodos `add`, `remove`, `getMostPlayed`, `printAll`, getter `size`
- Ex. 11-13: herança - `PodcastEpisode extends Track`, `super()`, override de `getInfo()`
- Ex. 14-15 (desafios): campo estático privado `#count` para contar instâncias; `getByGenre`

## Dúvidas frequentes

**O que são campos privados com `#` e em que diferem de `_`?**

`#` é encapsulamento real: a linguagem impede o acesso fora da classe onde o campo foi declarado - uma tentativa de leitura fora lança `SyntaxError`. `_property` é apenas uma convenção entre programadores que sinaliza "uso interno"; nada impede o acesso externo. Para encapsulamento com garantia da linguagem, usar `#`.

**Diferença entre declarar um campo fora do constructor e inicializar dentro?**

Declarar `#plays;` no corpo da classe é uma declaração de campo sem valor inicial (`undefined`). Escrever `#plays = 0;` é equivalente a inicializar `this.#plays = 0` como primeira coisa no constructor. Quando o valor por defeito é fixo, pode-se declarar e inicializar fora; quando depende de um argumento, inicializa-se dentro.

Os dois padrões podem coexistir: se um campo tem um valor por defeito sensato mas pode ser sobrescrito pelo constructor, declara-se com valor no corpo da classe e reatribui-se no constructor quando necessário. Exemplo:

```js
class Track {
  #plays = 0;  // valor por defeito no corpo da classe

  constructor(title, plays = 0) {
    this.title = title;
    this.#plays = plays;  // sobrescreve se passado como argumento
  }
}
```

A declaração no corpo da classe serve também para deixar a estrutura visível de imediato, antes de ler o constructor.

**Para que servem getters e setters? Quando usar métodos normais em vez?**

Getters e setters permitem que o código exterior aceda a uma propriedade como se fosse pública (`track.plays`), mantendo a lógica dentro da classe. Um setter é útil para validar ou transformar o valor antes de o guardar - como o setter `set plays(value)` que rejeita valores negativos.

A distinção prática: se a operação parece uma leitura ou escrita de propriedade, getter/setter é a escolha natural. Se tem argumentos próprios, side effects secundários, ou não é conceitualmente uma propriedade, um método normal é mais claro - por isso `play()` é um método e não um setter.

**Quando deve um método ser estático?**

Quando não precisa de aceder ao estado de uma instância específica. `Track.compare(a, b)` recebe os dois objetos como argumentos e não usa `this`. `Track.fromObject(obj)` cria uma nova instância a partir de um objeto literal - também não precisa de uma instância existente. Fábricas e utilitários de comparação são casos típicos. Se o método usa `this` para aceder a propriedades da instância, não pode ser estático.

**O que é herança com `extends` e o que é herdado?**

`PodcastEpisode extends Track` significa que `PodcastEpisode` herda os campos e métodos de `Track`. Uma instância de `PodcastEpisode` tem `title`, `artist`, `duration`, `genre`, e os métodos `play()`, `like()`, `getInfo()` da classe pai - sem os ter de redefinir. O override de `getInfo()` em `PodcastEpisode` substitui a versão herdada apenas para instâncias dessa subclasse; as instâncias de `Track` continuam a usar a versão original.

Nota: campos privados com `#` são declarados na classe onde foram definidos e não são diretamente acessíveis na subclasse - mas os métodos herdados que os usam continuam a funcionar normalmente.

**Por que é que `super()` tem de ser chamado antes de `this` no constructor?**

Quando uma subclasse é instanciada, o JavaScript não cria o objeto `this` antes de a classe pai ter completado a sua inicialização. `super()` chama o constructor da classe pai e é esse processo que cria o objeto. Tentar usar `this` antes de `super()` lança `ReferenceError: Must call super constructor in derived class before accessing 'this'` - o objeto ainda não existe. Concluído o `super()`, o `this` fica disponível com todas as propriedades que a classe pai definiu.

## Para saber mais

- [Classes - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Private class features - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
- [Propriedades e métodos estáticos - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)
- [Herança de classes - javascript.info](https://javascript.info/class-inheritance)
- [Propriedades e métodos privados e protegidos - javascript.info](https://javascript.info/private-protected-properties-methods)
