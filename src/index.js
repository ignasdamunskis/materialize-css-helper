import {
  fixNonPassiveListeners,
  fixSelectOptions,
  fixSelectTriggers,
  fixAutocompletedInputLabels
} from './utils'

document.addEventListener('DOMContentLoaded', () => {
  const options = {
    debug: true,
    nonPassiveListeners: true,
    selectOptions: true,
    selectTriggers: true,
    autocompletedInputLabels: true,
    ...(window.materializeHelper || {})
  }

  if (options.nonPassiveListeners) {
    fixNonPassiveListeners(options.debug)
  }

  if (options.selectOptions) {
    fixSelectOptions(options.debug)
  }

  if (options.selectTriggers) {
    fixSelectTriggers(options.debug)
  }

  if (options.autocompletedInputLabels) {
    fixAutocompletedInputLabels(options.debug)
  }
})