# Materialize Helper

## Introduction

This package was solely introduced to collect and fix all common known issues of **MaterializeCSS** library without removing features, but rather making them work as expected.

## Know Issues

Currently there are **4** commonly known issues fixed by this package using **Javascript**:

1. **MaterializeCSS is adding non-passive event listeners, that impacts scrolling performance and cause `Google Chrome` and `Lighthouse` throw warnings.** This package will check if `passive` option is supported by your browser and add it improving performance, increasing your Lighthouse score and hiding the warnings.
2. **Select element is misbehaving on `iOS`. When clicking one option, other one is being selected.** This can be fixed with css by removing animation from dropdown container `.dropdown-content { transform: none !important; }`, but if you want to keep the animation and fix the issue this package will do exactly that!
3. **Select trigger input causes a `Lighthouse` warnings for not having a label or placeholder.** This package will dynamically add a placeholder depending on a selected option value.
4. **Input label is still covering an input when it's autocompleted.** This package will listen to `onautocomplete` event and assign `.active` class to the label forcing it move up and not cover the input.

## Installation

```bash
yarn add materialize-css-helper
```

## Usage

By default, this package will automatically resolve all the in the introduction mentioned issues. It's script will automatically be executed on `DOMContentLoaded`.

### HTML

```html
<script type="text/javascript" src="node_modules/materialize-css-helper/dist/main.js"></script>
```

### JS

```js
require 'materialize-css-helper'
// or
import 'materialize-css-helper'
```

In case you use a js framework like `React`, `Vue` or other, you can import and execute it wherever it fits you

```js
import { initMaterializeHelper } from 'materialize-css-helper/src/utils'

// ...

componentDidMount() {
  const options = {/*...*/} 
  initMaterializeHelper(options)
}
```

> **Warning!** In case you delay loading **Materialize** or initializing it's components such as `M.FormSelect`, please manually initialize this package afterwards. Same way it was done in the example for frameworks above.

## Customization

Every issue fix is optional and has it's toggle option.

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| debug | If enabled, fixed elements will be logged into console. | `boolean` | `true` |
| nonPassiveListeners | Whether non-passive event listeners should be fixed. | `boolean` | `true` |
| selectOptions | Whether `M.Select` element behaviour for **iOS** should be fixed. | `boolean` | `true` |
| selectTriggers | Whether select trigger input should have a placeholder assigned. | `boolean` | `true` |
| autocompletedInputLabels | Whether label and input should be marked as filled in when autocompleted. | `boolean` | `true` |

Feel free to pass custom options to toggle fixes or debug mode.

### JS

```js
import { initMaterializeHelper } from 'materialize-css-helper/src/utils'

const options = { debug: false, nonPassiveListeners: false, /*...*/ }
initMaterializeHelper(options)
```

### HTML

```html
<script>
  window.materializeHelper = { debug: false, nonPassiveListeners: false, /*...*/ }
</script>
<script type="text/javascript" src="node_modules/materialize-css-helper/dist/main.js"></script>
```

> **Note.** Feel free to report other commonly known **MaterializeCSS** issues, so they coud be fixed and added into this package.