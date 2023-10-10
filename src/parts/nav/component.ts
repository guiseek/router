import {Part, PartElement} from '../../core'
import template from './template.html?raw'
import styles from './stylesheet.css?raw'

const selector = 'nav-menu'

@Part({selector, template, styles})
export class NavPartElement extends PartElement {
  connectedCallback() {
    const links = this.getShadow().querySelectorAll('a')
    for (const link of links) {
      link.href = `${import.meta.env.APP_URL_BASE}/${link.dataset.path}`
      delete link.dataset.path
    }
  }
}
