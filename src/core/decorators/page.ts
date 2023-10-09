import {
  createCustomElement,
  CustomElementOptions,
  normalizePageName,
} from './utilities'

interface PageOptions extends Partial<CustomElementOptions> {
  template: string
  selector?: string
}

export function Page(options: PageOptions) {
  return <T extends CustomElementConstructor>(target: T) => {
    const selector = normalizePageName(target.name)

    createCustomElement(target, {...options, selector})
  }
}
