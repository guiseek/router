import {CustomElementOptions, createCustomElement} from './utilities'

interface PartOptions extends CustomElementOptions {
  template: string
  styles?: string
}

export function Part(options: PartOptions) {
  return <T extends CustomElementConstructor>(target: T) => {
    createCustomElement(target, options)
  }
}
