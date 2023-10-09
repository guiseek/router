import {PageElement} from '../elements'

interface NavigationEventInfo {
  forceNavigate?: boolean
}

declare class Page<T = HTMLElement> extends Function {
  new(...params: unknown[]): T
}

type Route = {
  path: string
  component: typeof PageElement | typeof Page | any
  loader?: (params: URLSearchParams) => Promise<any> | any
}

export type Routes = Route[]

const noop = () => undefined

// Code from https://developer.chrome.com/docs/web-platform/navigation-api/#deciding-how-to-handle-a-navigation
function shouldNotIntercept(navigationEvent: NavigateEvent) {
  return (
    !navigationEvent.canIntercept ||
    /**
     * Se for apenas um hashChange, deixe o navegador
     * manipular a rolagem até o conteúdo.
     */
    navigationEvent.hashChange ||
    /**
     * Se for um download, deixe o navegador realizar o download.
     */
    navigationEvent.downloadRequest ||
    /**
     * Se este for um envio de formulário,
     * deixe-o ir para o servidor.
     */
    navigationEvent.formData
  )
}

export type RouterState<T = unknown> = {
  /**
   * Parâmetros dinâmicos, mas não manipulados
   * neste exemplo de implementação.
   */
  pathname: string
  matchingRoute: Route | null
  data: T
  initialized: boolean
  navigationInProgress: boolean
}

type RouterStateSubscriber = (newState: RouterState) => void

function getMatchingRoute(routes: Routes, pathname: string) {
  return routes.find((route) => route.path === pathname) ?? null
}

/**
 * Esta função criará o estado do roteador do navegador.
 * Ela deve ser chamada fora de qualquer componente.
 */
export function createRouter({routes}: {routes: Routes}) {
  const initialPathname = window.location.pathname
  let subscribers: RouterStateSubscriber[] = []

  /**
   * Método de correspondência mais simples.
   * Isso não trata roteamento aninhado
   */
  const initialMatchingRoute = getMatchingRoute(routes, initialPathname)

  const subscribe = (subscriber: RouterStateSubscriber) => {
    subscribers.push(subscriber)

    // unsubscribe callback
    return () => {
      subscribers = subscribers.filter((sub) => sub !== subscriber)
    }
  }

  let state: RouterState = {
    pathname: initialPathname,
    matchingRoute: initialMatchingRoute,
    data: undefined,
    initialized: !initialMatchingRoute?.loader,
    navigationInProgress: false,
  }

  const updateState = (newState: Partial<RouterState>) => {
    state = {...state, ...newState}

    // Notifica assinantes sobre alterações
    subscribers.forEach((subscriber) => subscriber(state))
  }

  const completeNavigation = async (url: string) => {
    const currentUrl = new URL(url)
    const {pathname, searchParams} = currentUrl

    const newMatchingRoute = getMatchingRoute(routes, pathname)
    const data = (await newMatchingRoute?.loader?.(searchParams)) ?? noop()

    updateState({
      pathname,
      data: data,
      matchingRoute: newMatchingRoute,
      initialized: true,
      navigationInProgress: false,
    })
  }

  const listener = <T = unknown>(event: NavigateEvent<T>) => {
    if (shouldNotIntercept(event)) {
      return
    }

    event.intercept({
      async handler() {
        updateState({
          navigationInProgress: true,
        })

        await completeNavigation(event.destination.url)
      },
    })
  }

  // Adicione nosso interceptador
  window.navigation.addEventListener('navigate', listener)

  // Simula navegação da primeira rota
  completeNavigation(window.location.href)

  const navigate = <T = unknown>(
    url: string,
    {replaceMode = false, info}: {replaceMode?: boolean; info?: T} = {}
  ) => {
    window.navigation.navigate(url, {
      history: replaceMode ? 'replace' : 'push',
      info,
    })
  }

  const registerBlockingRoute = ({
    shouldPrompt,
    customPromptBeforeLeaveModal,
    message = 'Are you sure you want to leave? You will lose unsaved changes',
  }: {
    shouldPrompt: () => boolean
    customPromptBeforeLeaveModal: () => Promise<boolean>
    message?: string
  }) => {
    const insideAppListener = async <T = unknown>(event: NavigateEvent<T>) => {
      /**
       * Não interceptamos a navegação se:
       * - nós não deveriamos
       * - se a navegação já foi capturada `forceNavigate` no `info`
       * - não devemos avisar
       */
      const info = event.info as NavigationEventInfo
      if (
        !shouldNotIntercept(event) &&
        !info?.forceNavigate &&
        shouldPrompt()
      ) {
        event.preventDefault()
        const shouldContinue = await customPromptBeforeLeaveModal()

        /**
         * Se o usuário quiser continuar a navegação e consequentemente
         * perder os dados do formulário vamos fazer assim
         */
        if (shouldContinue) {
          window.navigation.navigate(event.destination.url, {
            history: 'push',
            state: event.destination.getState(),
            // state: event.destination.state,
            info: {forceNavigate: true, ...event.info},
          })
        }
      }
    }

    window.navigation.addEventListener('navigate', insideAppListener)

    const outsideAppListener = (event: BeforeUnloadEvent) => {
      if (shouldPrompt()) {
        event.preventDefault()
        return (event.returnValue = message)
      }
    }

    /**
     * Adicione ouvinte de evento, para:
      - recarregar a página
      - indo para outra origem
      - guia de fechamento
     */
    window.addEventListener('beforeunload', outsideAppListener)

    // Retorna chamada de cancelamento
    return () => {
      window.navigation.removeEventListener('navigate', insideAppListener)
      window.removeEventListener('beforeunload', outsideAppListener)
    }
  }

  return {
    get state() {
      return state
    },
    subscribe,
    navigate,
    registerBlockingRoute,
  }
}
