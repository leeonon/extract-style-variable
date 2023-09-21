# extract-style-variable

Translate variables from CSS and Less files using [PostCSS](https://github.com/postcss/postcss).

>  ⚠️ The tool is not perfect and is intended for learning and reference only. it is not recommended for use in projects.

## Usage

[demo](https://codesandbox.io/p/sandbox/ti-qu-cssbian-liang-vbic18)

```sh
npm install extract-style-variable
```

```ts
const path = require("path");
const { getStyleVariable } = require("extract-style-variable");

const src = path.resolve(__dirname, "styles/index.css");
const result = getStyleVariable({ path: src });
console.log("result", result);
```

Input:

```ts
:root {
  /* --color-red */
  --color-red: "red";
  --color-blue: "blue";
  --color-green: "green";
  --nvaHeight: 20rem;
}

body {
  color: aqua;
  /*body normal font size*/
  --fontSize: 12px;
}

#main {
  border: 1px solid black;
  /*
  * main color example
  */
  --main-color: "yellow";
}

.name,
.age {
  --age-color: #8855ff;
}

ul li {
  padding: 5px;
  --li-color: wheat;
}

:root {
  --themeColor: #6622dd;
  --aThemeColor: #8855ff;
}

```

Output Results:

```ts
[
  {
    key: ':root--color-red',
    prop: '--color-red',
    value: '"red"',
    comment: '--color-red'
  },
  {
    key: ':root--color-blue',
    prop: '--color-blue',
    value: '"blue"',
    comment: null
  },
  {
    key: ':root--color-green',
    prop: '--color-green',
    value: '"green"',
    comment: null
  },
  {
    key: ':root--nvaHeight',
    prop: '--nvaHeight',
    value: '20rem',
    comment: null
  },
  {
    key: 'body--fontSize',
    prop: '--fontSize',
    value: '12px',
    comment: 'body normal font size'
  },
  {
    key: '#main--main-color',
    prop: '--main-color',
    value: '"yellow"',
    comment: '* main color example'
  },
  {
    key: '.name.age--age-color',
    prop: '--age-color',
    value: '#8855ff',
    comment: null
  },
  {
    key: 'ul li--li-color',
    prop: '--li-color',
    value: 'wheat',
    comment: null
  },
  {
    key: ':root--themeColor',
    prop: '--themeColor',
    value: '#6622dd',
    comment: null
  },
  {
    key: ':root--aThemeColor',
    prop: '--aThemeColor',
    value: '#8855ff',
    comment: null
  }
]
``
