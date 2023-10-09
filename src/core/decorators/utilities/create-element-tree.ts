export function createElementTree<K extends keyof HTMLElementTagNameMap>(
  name: K,
  attributes: Partial<HTMLElementTagNameMap[K]> = {},
  ...children: (Element | Node | Text)[]
): HTMLElementTagNameMap[K] {
  const element = Object.assign(document.createElement(name), attributes)
  element.append(...children)
  return element
}
