import {Page, PageElement} from '../../core'
import {ProductResponse} from './interfaces'
import template from './products.html?raw'
import {ProductElement} from './product'

@Page({template})
export class ProductsPageElement extends PageElement {
  constructor(protected data: ProductResponse) {
    super()
  }

  connectedCallback() {
    for (const product of this.data.products) {
      this.getShadow().append(new ProductElement(product))
    }
  }
}
