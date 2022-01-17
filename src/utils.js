import { passiveSupported } from 'passive-events-support/src/utils'

export function initMaterializeHelper(customOptions) {
  const options = {
    debug: false,
    selectOptions: true,
    selectTriggers: true,
    autocompletedInputLabels: true,
    ...customOptions
  }

  if (options.selectOptions)
    fixSelectOptions(options.debug)
  if (options.selectTriggers)
    fixSelectTriggers(options.debug)
  if (options.autocompletedInputLabels)
    fixAutocompletedInputLabels(options.debug)
}

/**
 * Issue: Select element is misbehaving on iOS.
 * When clicking one option, other one is being selected...
 */
export function fixSelectOptions(debug) {
  setTimeout(() => { // To be called after M.FormSelect.init()
    let dragging = false
    const opts = passiveSupported() ? { passive: true } : false
    const options = document.querySelectorAll('.select-wrapper ul.select-dropdown li')
  
    if (options.length && debug) {
      console.info('[Materialize Helper] Fixed select options', { options })
    }
  
    for (const option of options) {
      option.addEventListener('touchmove', () => { dragging = true }, opts)
      option.addEventListener('touchstart', () => { dragging = false }, opts)
      option.addEventListener('touchend', (e) => {
        if (dragging) return
        else e.stopPropagation()
      }, opts)
    }
  }, 0)
}

/**
 * Issue: Select triggers are causing Lighthouse warnings.
 */
export function fixSelectTriggers(debug) {
  setTimeout(() => { // To be called after M.FormSelect.init()
    const triggers = document.querySelectorAll('input.select-dropdown.dropdown-trigger')

    for (const trigger of triggers) {
      const wrapper = trigger.closest('.select-wrapper')
      const select = wrapper.querySelector('select')
      const option = select.options[select.selectedIndex]
      trigger.placeholder = option.text
    }

    if (triggers.length && debug) {
      console.info('[Materialize Helper] Fixed select triggers', { triggers })
    }
  }, 0)
}

/**
 * Issue: Input label is covering an input when it's autocompleted.
 */
export function fixAutocompletedInputLabels(debug) {
  document.addEventListener('onautocomplete', function(e) {
    const input = e.target
    const label = input.parentNode.querySelector(`label[for="${input.id}"]`)
    const autocompleted = input.hasAttribute('autocompleted')
    
    if (autocompleted && label) {
      label.classList.add('active')
      input.classList.add('valid')

      if (debug) {
        console.info('[Materialize Helper] Fixed autocompleted input label', { input, label })
      }
    }
  })
}