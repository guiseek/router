import {Part, PartElement} from '../../core'
import template from './template.html?raw'
import styles from './stylesheet.css?raw'

const selector = 'nav-menu'

@Part({selector, template, styles})
export class NavPartElement extends PartElement {}
