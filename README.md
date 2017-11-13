# React Shop

## Introducción

### Objetivos

El objetivo final de este proyecto es crear un catalogo de Productos el cual podamos filtrar por categorias, agregar nuevos productos, tener la vista individual de cada uno de los productos y agregar a un carrito de compras.

Para esto vamos a ir paso a paso viendo todas las caracteristicas de React, yendo de conceptos y ejercicios mas simples, a complejisar nuestra aplicación con conceptos mas avanzados.

### Estructura del trabajo

El Proyecto va estar separado en X Partes estas serán:

## Parte 1: Empezando de Cero

### Iniciando un Proyecto de React

Lo primero que vamos a hacer es crear el boilerplate para nuestro proyecto. Para esto necesitamos un `index.html` para mostrar nuestra aplicación, una configuración de `webpack`que bundlee nuestro código a un solo archivo que usemos en nuestro index.html, y finalmente nuestra configuración básica de React.ç

Antes de arrancar a escribir archivos iniciemos nuestro proyecto. `npm init` para crear un package.json e instalemos nuestras dependencias. 

Las de desarrollador:

```sh
$ npm install --save-dev  webpack babel-preset-env babel-preset-stage-0
```

Y las dependencias de produccion:

```sh
$ npm install --save react react-dom
```

### index.html

Crea el archivo `index.html`. Recuerda las carácteristicas mas importantes que tiene que tener este: Un `div` con un id específico en el cual vamos a renderizar nuestra app,  y un `script` que requerirá nuestro `bundle.js`.

### webpack

Para nuestra configuración de webpack vamos a necesitar crear el archivo `webpack.config.js`. En este vamos a necesitar varias cosas:

```js
module.exports = {
  entry:'./src/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: { presets: [ 'env', 'stage-0' 'react'] },
      },
    ],
  },
};
```

En entry le decimos donde es el punto de inicio de nuestra app. En output decimos donde y como se va a generar nuestro archivo bundle **Recorda que este tiene que ser igual al que esta usando `index.html`**. Agregamos el devtool `source-map` para tener errores mas descriptivos.El `resolve` nos va a permitir escribir archivos con extensiones tanto `.js` como `.jsx. Finalmente el loader de babel esta usando tres presets `env` `stage-0` y `react`. Los dos primeros nos permitirán usar los features mas nuevos de JavaScript. El segundo `react` va a transpilar nuestro código JSX a JS.


Ahora en tu `package.json` crea el comando `"build"` dentro de tus scripts que ejecute `"webpack -w"`. Ahora cuando corras `npm run build` en tu consola vas a buildear tu aplicación y webpack se va a quedar observando por cambios gracias al flag `-w`.

### index.js

Ahora crea tu archivo de entrada. Este recuerda que va tener q importar `Rect` de `react` y `render` de `react-dom`.

Usa render y muestra un  div con el texto _'hello world'_ dentro del `div#app` que creamos para mostrar nuestra aplicación.

Ahora corre en la terminal el nuestro comando que habíamos creado antes `npm run build` y abrí tu index.html en el browser. Si ves el 'Hello World' mostrandose en la ventana del browser y no tenes ningun error en la consola ni la terminal, seguramente hicimos todo bien.

Una vez que tengas todo esto funcionando ya estamos para ponernos a laburar en nuestra aplicación!

### flow

Por ultimo vamos a inicializar flow en nuestro proyecto para poder tiparlo. Si todavia no instalaste flow corre: `npm install -g flow-bin`. Luego corré:

`
$ flow init
`

Esto va a crear nuestro archivo `.flowconfig` que nos permita usar flow en nuestra aplicación. Recordá que para poder chequear los tipos en un archivo necesitas agregar `/* @flow */` al principio de cada archivo el cual quieras incluir.

Ahora cada vez que quieras chequear el estado de tu archivo podés correr el comando `flow check.

También para un desarrollo más fácil recomendamos integrar los errores de flowtype a tu IDE. Para eso hay dos recomendaciones, usar el linter propio de flow agregando esto a nuestro `.flowconfig`:

```
[lints]
all=warn

[options]
include_warnings=true
```

o integrarlo a eslint usando el paquete [eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype).

Ademas instala `flow-bin` en tu proyecto y `flow-typed` globalmente.

```sh
$ npm install -g flow-typed
$ npm install --save-dev flow-bin
```

Ahora ejecuta `flow-typed install` para instalar las definiciones de las dependencias en tu proyecto, y recuerda de instalar cada dependencia que vayas agregando.

## Parte 2: Catalogo de Productos

### Componentes Contenedores y Presentacionales

Nuestros componentes van a estar divididos en dos tipos, contenedores y presentacionales, normalmente estos se suelen dividir en dos carpetas distintas donde vamos a tener a los `containers` y los `components`.

Los contenedores van a ser esos componentes que tengan un estado. Estos normalmente los escribiremos como clases:

```JSX
class App extends React.Component {
  this.state = {
    name: 'Guille';
  } 

  render() {
    <div>
      <Profile name={this.state.name} />
    <div>
  }
} 
```

Mientras que los presentacionales no tienen estado (statless), y como dice su nombre solo muestran una vista dependiendo los props que reciben. Los escribimos normalmente como funciones puras:

```JSX
const Profile = ({ name }) => {
  <div>
    {name}
  </div>
}
```

### Creando nuestro Catalogo

Ahora que diferenciamos los componentes contenedores y presentacionales. Definamos que va a necesitar nuestra aplicación.

1. Un Contenedor de nuestra `App` que maneje el estado, este sería un arreglo de todos los productos.
1. Un `Grid` de Productos que itere sobre cada producto y cree...
1. Un `Item` de un Producto en si.

Por lo que vemos tenemos un contenedor y dos componentes presentacionales. Crea la carpeta `containers` y `components`. Define `App`, dentro de `contiainers`, que tenga un arreglo de productos en su estado, por ahora podes usar este arreglo, más adelante se lo pediremos a una API.

 ```js
[
  {
    "id": 1,
    "name": "Licensed Frozen Sausages",
    "price": "39.00",
    "image": "http://lorempixel.com/640/480/food",
  },
  {
    "id": 5,
    "name": "Unbranded Soft Fish",
    "price": "228.00",
    "image": "http://lorempixel.com/640/480/sports",
  },
  {
    "id": 9,
    "name": "Refined Cotton Salad",
    "price": "531.00",
    "image": "http://lorempixel.com/640/480/transport",
  },
];
 ```

 Pasá como prop el arreglo de productos a el componente `Grid` que tenes que definir dentro de `components`, y dentro del `Grid` itera sobre cada Producto y pasaselo a un nuevo componente `Item` que renderizará la información del producto en si. 
 
> No te olvides que dentro del iterador el componente tiene que recibir un `key` único, aprovechemos que tenemos el id de cada producto!


> **NO TE OLVIDES DE FLOW** Hay muchas cosas aca que podemos typar por ejemplo podemos crear una type para cada producto, tambien podemos typear el estado y las props de cada componente!

 ### LifeCycle Hooks

 Todo muy lindo, pero no nos sirve de nada nuestros productos harcodeados vayamos a la API a buscarlo! Pero aca surge una gran pregunta, donde deberíamos poner el request? Por ahi te surgen dos opciones inmediatas. La primera puede ser en el `constructor` de la clase, pero el constructor puede ser llamado sin que sea renderizado el elemento, por lo que estaríamos haciendo un request por un componente que quizas nunca se muestre. Otra opción que podría surgir es hacerlo dentro del `render`. Pero recordemos que el `render` es llamado cada vez que el componente se actualiza tanto sus props como su estado. Por lo que hacer un request que actualice el estado, haría correr el render, que volvería a hacer el request, que volvería hacer el render y así.

 Para mucho de este tipo de problemas React nos da varíos lifecycle hooks en los cuales podemos hacer acciones dependiento el momento del ciclo de vida del componente estos son (en orden de ejecución):

#### Mounting

 - [`constructor`](https://reactjs.org/docs/react-component.html#constructor)
 - [`componentWillMount`](https://reactjs.org/docs/react-component.html#componentwillmount)
 - [`render`](https://reactjs.org/docs/react-component.html#render)
 - [`componentDidMount`](https://reactjs.org/docs/react-component.html#componentdidmount)

#### Updating

 - [`componentWillRecieveProps`](https://reactjs.org/docs/react-component.html#componentwillreceiveprops)
 - [`shouldComponentUpdate`](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)
 - [`componentWillUpdate`](https://reactjs.org/docs/react-component.html#componentwillupdate)
 - [`render`](https://reactjs.org/docs/react-component.html#render)
 - [`componentDidUpdate`](https://reactjs.org/docs/react-component.html#componentdidupdate)

#### Unmounting

- [`componentWillUnmount`](https://reactjs.org/docs/react-component.html#componentwillunmount)


### Haciendo el Request

Viendo las opciones la ideal para nuestro problema va a ser `componentDidMount` ya que nos aseguramos que vamos a cambiar el estado de un componente que ya esta montado en el DOM.

Ahora solo haz un request a `/products` usando la librería de tu preferencia `fetch`, `axios`, etc... y una vez que tengas los resultados actualiza el estado del componente con el nuevo arreglo de productos usando el método `this.setState`.

También no te olvides de cambiar la inicialización de tu estado con un arreglo de productos vacío.

Agrega un mensaje de Loading mientras los productos estan siendo fetcheados que desaparezca cuando los productos hayan llegado.

Genial! Ya tenemos nuestra grilla de productos funcionando ahora vayamos a la 3 Parte del proyecto

## Parte 3: Categorias

### Filtrando Por Categorias

Lo que vamos a hacer ahora es tener un sidebar el cual nos muestre las categorías, que podamos seleccionar y filtrar los productos. Este componente debería tambien estar dentro de `App`.

Vas a necesitar un sidebar que muestre una lista de todas las categorías (estas las podes conseguir en la API en `/categories`). Tu lista debería incluir la opcion de mostrar todos y por debajo deberían estar las categorías de la API 

Una vez que estes mostrando la lista vamos a tener que pasar a lo dificil, ¿Cómo vamos a hacer para filtrar los productos por una categoría específica cuando hagamos click en una de ellas?

### Click Handlers

Lo primero que tenemos que definir es la función que vamos a correr cuando el usuario haga click. En este caso deberíamos recibir el `id`de la categoría y guardar en el estado que categoría fue elegida. 

Como cualquier click handler vamos a recibir información del evento como argumento por lo que nosotros podemos usar el `event.target` para saber que categoría fue clickeada. Otra posibilidad es definir la función por cada categoría y pasarle el id dentro de la función por ejemplo estas son las dos posibilidades:

```JSX
// Usando el event object con event.target.id
<li id={category.id} onClick={switchCategory}>{category.name}</li>

// pasando el id de la categoria
<li onClick={() => switchCategory(category.id)}>{category.name}</li>
```

Ambos approach tienen sus ventajas y desventajas. En la primera estamos agregando información que necesitamos en nuestro controlador a la vista lo cual puede no quedar muy prolijo, pero es una estrategia común para los que vienen de otras librerias como `jquery`. Pero en el segundo caso estamos definiendo una nueva función para cada elemento lo cual puede ser un poco innecesario y lento. Elige el que mas haga sentido para vos y continuá.

Ahora una vez que sabemos cual categoría esta seleccionada (si la hay), podemos decidir filtrar o no filtrar los productos. Simplemente en el lugar donde estamos iterando los productos agrega un `filter` que decida que productos se renderizan y cuales no.

Ademas no te olvides de que ahora el mensaje de Loading tiene que aparecer hasta que tanto los productos y las categorias hayan sido recibidos por la página.


## Parte 4: Dandole Estilo a nuestra Página

### CSS Modules

Para dar estilos a nuestros componentes vamos a usar un _pattern_ llamado __CSS MODULES__. La idea atrás de _css modules_es tener estilos scopeados de manera local, es decir, por cada componente.
Como sabemos, CSS está hecho para trabajar con estilos globales, por lo tanto vamos a tener que usar algún tipo de convención de nombres para logarr tener estilos locales.
Justamente, vamos a usar webpack, para preprocesar nuestros archivos `.css`, extrayendo los nombres de las clases que hayamos elegidos y crear nombres locales, usando hashes.

Básicamente, vamos a codear nuestros estilos como haciamos siempre en un archivo separado, que generalmente tiene el mismo nombre que el componente, por ejemplo: `Button.css`.

```css
/* Button.css */
.className {
  color: green;
}
```

Ahora, en nuestro Componente, vamos a importar este archivo CSS (podemos importarlo gracias a un loader de webpack que instalaremos), lo que importamos es un objeto donde cada propiedad es una clase del archivo css. Cada valor de esta propiedad es el string con el nombre de la clase cambiado para que sea único:

```javascript
import styles from "./Button.css";
// import { className } from "./Button.css";

element.innerHTML = '<div class="' + styles.className + '">';
```

#### Webpack

Para lograr este comportamiento vamos a agregar el siguiente Loader en webpack:

```javascript
const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    ignore: '/node_modules/',
  },
};
// agregar a la lista de loaders:
...
  {
    test: /\.css$/,
    use: [
      'style-loader',
      cssLoader,
    ],
  }
...
```

> Vamos a tener que instalar los loaders: `css-loader` y `style-loader`.
```bash
  $ npm install --save-dev css-loader style-loader
```

#### CSS Preprocessors

También podemos usar el _pattern_ de CSS modules usando un CSS preprocessor. Para eso vamos a tener que instalar el loader específico de ese preprocessor (además del preprocessor en sí).

```bash
$ npm install --save-dev stylus-loader stylus
$ npm install --save-dev sass-loader node-sass
```

Ahora agregamos el nuevo loader a la lista de loaders con la extensión que queremos que matchee:

```javascript
// ejemplo para stylus
...
  {
    test: /\.styl$/,
    use: [
      'style-loader',
      cssLoader,
      'stylus-loader',
    ],
  }
```

> La parte de importar las clases en un objeto se mantiene igual!


Listo, ahora ya podemos empezar a usar este patrón!

Ahora vamos a comenzar a agregar estilos a nuestros componentes: Grid, Item y Sidebar. De tal forma, que creemos un layout de dos columnas, en la columna izquierda estará el Sidebar y en la derecha el Grid.
Dentro del Grid vamos a posicionar cada Item para que entren uno al lado del otro y se posicionen automáticamente en otra línea cuando no entran mǻs, de tal forma que el Grid sea responsive.

> No te olvides que en javascript la palabra `class` es un keyword reservado, por lo que para agregar una clase a un elemento vamos a usar la propiedad `className` en cambio


