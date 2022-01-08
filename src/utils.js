import { passiveSupported, passiveSupport } from 'passive-events-support/src/utils'

/**
 * Issue: MaterializeCSS is adding non-passive event listeners.
 */
export function fixNonPassiveListeners(debug) {
  const events = ['touchstart', 'touchmove']
  passiveSupport(events)

  if (debug) {
    console.info('DEBUG: fixed non-passive event listeners', { events })
  }
}

/**
 * Issue: Select element is misbehaving on iOS.
 * When clicking one option, other one is being selected...
 */
export function fixSelectOptions(debug) {
  let dragging = false
  const opts = passiveSupported() ? { passive: true } : false
  const options = document.querySelectorAll('.select-wrapper ul.select-dropdown li')

  if (options.length && debug) {
    console.info('DEBUG: fixed select options', { options })
  }

  for (const option of options) {
    option.addEventListener('touchmove', () => { dragging = true }, opts)
    option.addEventListener('touchstart', () => { dragging = false }, opts)
    option.addEventListener('touchend', (e) => {
      if (dragging) return
      else e.stopPropagation()
    }, opts)
  }
}

/**
 * Issue: Select triggers are causing Lighthouse warnings.
 */
export function fixSelectTriggers(debug) {
  const triggers = document.querySelectorAll('input.select-dropdown.dropdown-trigger')

  for (const trigger of triggers) {
    const wrapper = trigger.closest('.select-wrapper')
    const select = wrapper.querySelector('select')
    const option = select.options[select.selectedIndex]
    trigger.placeholder = option.text
  }

  if (triggers.length && debug) {
    console.info('DEBUG: fixed select triggers', { triggers })
  }
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
        console.info('DEBUG: autocompleted input label', { input, label })
      }
    }
  })
}