import {HomePageElement, ContactPageElement, ProductsPageElement} from './pages'
import {HttpClient, createRouter} from './core'
import './style.scss'
import './parts'

const http = new HttpClient()

const base = import.meta.env.APP_URL_BASE

const router = createRouter({
  routes: [
    {
      path: `${base}/`,
      component: HomePageElement,
    },
    {
      path: `${base}/products`,
      component: ProductsPageElement,
      async loader(params) {
        return http.get('https://dummyjson.com/products', {params})
      },
    },
    {
      path: `${base}/contact`,
      component: ContactPageElement,
    },
  ],
})

router.subscribe(({matchingRoute, navigationInProgress, data}) => {
  loading.hidden = !navigationInProgress
  if (matchingRoute?.component) {
    while (root.firstChild) root.firstChild.remove()
    root.append(new matchingRoute.component(data))
  }
})

// router.navigate("/");
