# Materialize Helper

- [Introduction](#introduction)
- [Known Issues](#known-issues)
  - [Select element is misbehaving on iOS](#1-select-element-is-misbehaving-on-ios)
  - [Lighthouse warning for Select element](#2-lighthouse-warning-for-select-element)
  - [Input label is not marked as active on autocompletion](#3-input-label-is-not-marked-as-active-on-autocompletion)
  - [Materialize is adding non-passive event listeners](#4-materialize-is-adding-non-passive-event-listeners)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
  - [Option: debug](#option-debug)
  - [Option: selectOptions](#option-selectoptions)
  - [Option: selectTriggers](#option-selecttriggers)
  - [Option: autocompletedInputLabels](#option-autocompletedinputlabels)
- [Reporting Issues](#reporting-issues)

## Introduction

This package was introduced to collect and fix all common known issues of **Materialize** library without removing any features, but rather making them work as expected.

## Known Issues

Currently there are few commonly known issues caused by the **Materialize**:

### 1. Select element is misbehaving on iOS

On **iOS**, when clicking one select dropdown option, other one is being selected. This issue is caused by the dropdown animation. This package will fix the bug while keeping the dropdown animation.

### 2. Lighthouse warning for Select element

Select trigger input causes a **Lighthouse** warning for not having a label or placeholder:

> Form elements do not have associated labels

This package will dynamically add a placeholder depending on a selected option value.

### 3. Input label is not marked as active on autocompletion

When an input is autocompleted by the browser (i.e "username" and "password" fields), the `onchange` event for the input is not being triggered and that causes the label element to cover the input even tho it is autocompleted and filled in by the browser. This package will listen to `onautocomplete` event and assign `.active` class to the label forcing it to move up.

### 4. Materialize is adding non-passive event listeners

This is not fixed by this package. Use [passive-events-support](https://www.npmjs.com/package/passive-events-support) package to resolve it.

## Installation

```bash
yarn add materialize-css-helper
```

## Usage

By default, this package will automatically resolve all the in the [Known Issues](#known-issues) section mentioned issues. It's script will automatically be executed upon `DOMContentLoaded`.

Make sure this package is loaded **after** the **Materialize** script.

```js
// With JS
import 'materialize-css-helper'
// to pass the custom configuration
import { initMaterializeHelper } from 'materialize-css-helper/src/utils'
initMaterializeHelper({/*...*/})
```

```html
<!-- With HTML -->
<script>
  // if undefined will apply the default configuration
  window.materializeHelper = {/*...*/}
</script>
<script type="text/javascript" src="node_modules/materialize-css-helper/dist/main.js"></script>
```

## Configuration

Every issue fix is optional and has it's toggle option.

### Configurable Options

| Option | Type | Default |
| --- | --- | --- |
| `debug` | `boolean` | `false` |
| `selectOptions` | `boolean` | `true` |
| `selectTriggers` | `boolean` | `true` |
| `autocompletedInputLabels` | `boolean` | `true` |

### Option: `debug`

When enabled, fixed elements will be logged into console.

```js
{
  debug: true
}
```

Console output

```js
[Materialize Helper] Fixed select options
{ options: [
  0: Element
  1: Element
  2: Element
]}
// other logs...
```

### Option: `selectOptions`

Whether `M.Select` element behaviour for **iOS** should be fixed. See [the exact issue](#1-select-element-is-misbehaving-on-ios) to learn more.

```js
{
  selectOptions: true // default value
}
```

In case you prefer a css solution, you can disable the JavaScript fix by passing `false` and manually removing the select dropdown animation:

```css
.dropdown-content {
  transform: none !important;
}
```

### Option: `selectTriggers`

Whether select trigger input should have a placeholder assigned. See [the exact issue](#4-lighthouse-warning-for-select-element) to learn more.

```js
{
  selectTriggers: true // default value
}
```

### Option: `autocompletedInputLabels`

Whether label and input should be marked as filled in when autocompleted. See [the exact issue](#2-input-label-is-not-marked-as-active-on-autocompletion) to learn more.

```js
{
  autocompletedInputLabels: true // default value
}
```

## Reporting Issues

Please raise other **Materialize** caused issues and workarounds, so it could be added to this package.