# Materialize Helper

- [Introduction](#introduction)
- [Known Issues](#known-issues)
  - [Select element is misbehaving on iOS](#1-select-element-is-misbehaving-on-ios)
  - [Input label is not marked as active on autocompletion](#2-input-label-is-not-marked-as-active-on-autocompletion)
  - [Materialize is adding non-passive event listeners](#3-materialize-is-adding-non-passive-event-listeners)
  - [Lighthouse warning for Select element](#4-lighthouse-warning-for-select-element)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
  - [Option: debug](#option-debug)
  - [Option: selectOptions](#option-selectoptions)
  - [Option: autocompletedInputLabels](#option-autocompletedinputlabels)
  - [Option: nonPassiveListeners](#option-nonpassivelisteners)
  - [Option: selectTriggers](#option-selecttriggers)
- [Reporting Issues](#reporting-issues)

## Introduction

This package was introduced to collect and fix all common known issues of **Materialize** library without removing features, but rather making them work as expected.

## Known Issues

Currently there are **4** commonly known issues caused by the **Materialize** and fixed by this package:

### 1. Select element is misbehaving on iOS

On iOS, when clicking one select dropdown option, other one is being selected. This issue is caused by the dropdown animation. This package fixes the bug while keeping the dropdown animation.

### 2. Input label is not marked as active on autocompletion

When an input is autocompleted by the browser (i.e "username" or "password"), the `onchange` event for the input is not triggered and that causes the label element to cover the input even tho it is autocompleted. This package will listen to `onautocomplete` event and assign `.active` class to the label forcing it to move up.

### 3. Materialize is adding non-passive event listeners

Some **Materialize** components are adding event listeners without `passive` option, impacting [the scroll performance](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners), the **Lighthouse** score and causing the browser warning:

> [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as passive to make the page more responsive.

This package will check if `passive` option is supported by your browser and add it to all the event listeners defined by **Materialize**.

### 4. Lighthouse warning for Select element

Select trigger input causes a **Lighthouse** warning for not having a label or placeholder:

> Form elements do not have associated labels

This package will dynamically add a placeholder depending on a selected option value.

## Installation

```bash
yarn add materialize-css-helper
```

## Usage

By default, this package will automatically resolve all the in the [Known Issues](#known-issues) section mentioned issues. It's script will automatically be executed upon `DOMContentLoaded`.

Make sure this package is loaded before the **Materialize** script.

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
| `autocompletedInputLabels` | `boolean` | `true` |
| `nonPassiveListeners` | `boolean` | `true` |
| `selectTriggers` | `boolean` | `true` |

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

### Option: `autocompletedInputLabels`

Whether label and input should be marked as filled in when autocompleted. See [the exact issue](#2-input-label-is-not-marked-as-active-on-autocompletion) to learn more.

```js
{
  autocompletedInputLabels: true // default value
}
```

### Option: `nonPassiveListeners`

Whether non-passive event listeners should be fixed. See [the exact issue](#3-materialize-is-adding-non-passive-event-listeners)) to learn more.

```js
{
  nonPassiveListeners: true // default value
}
```

### Option: `selectTriggers`

Whether select trigger input should have a placeholder assigned. See [the exact issue](#4-lighthouse-warning-for-select-element) to learn more.

```js
{
  selectTriggers: true // default value
}
```

## Reporting Issues

Please raise other **Materialize** caused issues and workarounds, so it could be added to this package.