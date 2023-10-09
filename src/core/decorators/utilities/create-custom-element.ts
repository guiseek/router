import {createElementTree} from './create-element-tree'

export interface CustomElementOptions extends Partial<ShadowRootInit> {
  selector: string
  template?: string
  styles?: string
}

export function createCustomElement<
  T extends CustomElementConstructor,
  O extends CustomElementOptions
>(target: T, options: O) {
  const originalCtor = target.prototype.connectedCallback
  const ctor = target.prototype.constructor

  target.prototype.constructor = (...params: unknown[]) => {
    console.log('ctor')
    ctor(...params)
  }
  target.prototype.connectedCallback = function <T extends HTMLElement>(
    this: T
  ) {
    if (options.template) {
      const {template, ...init} = options
      const props = {innerHTML: template}
      const fragment = createElementTree('template', props)

      const shadowInit = {...init, mode: init.mode ?? 'open'}
      const shadow = this.attachShadow(shadowInit)

      const element = fragment.content.cloneNode(true)
      if (options.styles) {
        const style = createElementTree('style', {innerHTML: options.styles})
        element.appendChild(style)
      }

      shadow.append(element)
    }

    if (originalCtor) originalCtor.call(this)
  }

  customElements.define(options.selector, target)

  return target
}
