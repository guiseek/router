import {Part, PartElement} from '../../core'
import {currency} from '../../utilities'
import {Product} from './interfaces'

@Part({
  selector: 'product-item',
  template: `<section></section>`,
})
export class ProductElement extends PartElement {
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
      const section = this.getSection()
      if (section) section.append(...children)
    }
  }

  getSection() {
    const shadow = this.getShadow()
    return shadow.querySelector('section')
  }
}
