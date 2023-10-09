export interface PartElement<D = unknown> extends HTMLElement {
  onInput?(data: D): void
  onOutput?(fn: (data: D) => void): void
}
export class PartElement<D = unknown> extends HTMLElement {
  getShadow() {
    return this.shadowRoot as ShadowRoot
  }
}
