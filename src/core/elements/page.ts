export class PageElement<D = unknown> extends HTMLElement {
  onLoad?(data: D): void

  getShadow() {
    return this.shadowRoot as ShadowRoot
  }
}
