import {Page, PageElement, Part, PartElement} from '../../core'
import {Product, ProductResponse} from './interfaces'
import template from './template.html?raw'

const currency = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

@Part({
  selector: 'product-item',
  template: `<section> </section>`,
})
export class ProductItemElement extends PartElement {
  constructor(readonly product: Product) {
    super()
  }

  connectedCallback() {
    if (this.product) {
      const {title, price} = this.product
      const children = [
        new Text(currency.format(price)),
        new Text(' - '),
        new Text(title),
      ]
      this.getShadow().append(...children)
    }
  }
}

@Page({template})
export class ProductsPageElement extends PageElement {
  constructor(protected data: ProductResponse) {
    super()
  }

  connectedCallback() {
    for (const product of this.data.products) {
      const item = new ProductItemElement(product)
      this.getShadow().append(item)
    }
  }
}
