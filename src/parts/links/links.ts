import {Part, PartElement} from '../../core'
import template from './links.html?raw'
import styles from './links.css?raw'

const selector = 'links-part'

@Part({selector, template, styles})
export class LinksPartElement extends PartElement {}
