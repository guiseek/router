interface Window {
  readonly navigation: Navigation;
}

interface NavigationEventMap<T = unknown> {
  navigate: NavigateEvent<T>;
  navigatesuccess: Event;
  navigateerror: ErrorEvent;
  currententrychange: NavigationCurrentEntryChangeEvent;
}

interface NavigationResult {
  committed: Promise<NavigationHistoryEntry>;
  finished: Promise<NavigationHistoryEntry>;
}

declare class Navigation<T = unknown> extends EventTarget {
  entries(): NavigationHistoryEntry<T>[];
  readonly currentEntry: NavigationHistoryEntry<T> | null;
  updateCurrentEntry(options: NavigationUpdateCurrentEntryOptions<T>): void;
  readonly transition: NavigationTransition | null;

  readonly canGoBack: boolean;
  readonly canGoForward: boolean;

  navigate(
    url: string,
    options?: NavigationNavigateOptions<T>
  ): NavigationResult;
  reload(options?: NavigationReloadOptions<T>): NavigationResult;

  traverseTo(key: string, options?: NavigationOptions<T>): NavigationResult;
  back(options?: NavigationOptions<T>): NavigationResult;
  forward(options?: NavigationOptions<T>): NavigationResult;

  onnavigate: ((this: Navigation, ev: NavigateEvent<T>) => any) | null;
  onnavigatesuccess: ((this: Navigation, ev: Event) => any) | null;
  onnavigateerror: ((this: Navigation, ev: ErrorEvent) => any) | null;
  oncurrententrychange:
    | ((this: Navigation, ev: NavigationCurrentEntryChangeEvent) => any)
    | null;

  addEventListener<K extends keyof NavigationEventMap>(
    type: K,
    listener: (this: Navigation, ev: NavigationEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof NavigationEventMap>(
    type: K,
    listener: (this: Navigation, ev: NavigationEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

declare class NavigationTransition {
  readonly navigationType: NavigationType;
  readonly from: NavigationHistoryEntry;
  readonly finished: Promise<void>;
}

interface NavigationHistoryEntryEventMap {
  dispose: Event;
}

declare class NavigationHistoryEntry<T = unknown> extends EventTarget {
  readonly key: string;
  readonly id: string;
  readonly url: string | null;
  readonly index: number;
  readonly sameDocument: boolean;

  getState(): T;

  ondispose: ((this: NavigationHistoryEntry<T>, ev: Event) => any) | null;

  addEventListener<K extends keyof NavigationHistoryEntryEventMap>(
    type: K,
    listener: (
      this: NavigationHistoryEntry<T>,
      ev: NavigationHistoryEntryEventMap[K]
    ) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof NavigationHistoryEntryEventMap>(
    type: K,
    listener: (
      this: NavigationHistoryEntry<T>,
      ev: NavigationHistoryEntryEventMap[K]
    ) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

type NavigationType = "reload" | "push" | "replace" | "traverse";

interface NavigationUpdateCurrentEntryOptions<T = unknown> {
  state: T;
}

interface NavigationOptions<T = unknown> {
  info?: T;
}

interface NavigationNavigateOptions<T = unknown> extends NavigationOptions {
  state?: T;
  history?: "auto" | "push" | "replace";
}

interface NavigationReloadOptions<T = unknown> extends NavigationOptions {
  state?: T;
}

declare class NavigationCurrentEntryChangeEvent extends Event {
  constructor(type: string, eventInit?: NavigationCurrentEntryChangeEventInit);

  readonly navigationType: NavigationType | null;
  readonly from: NavigationHistoryEntry;
}

interface NavigationCurrentEntryChangeEventInit extends EventInit {
  navigationType?: NavigationType | null;
  from: NavigationHistoryEntry;
}

declare class NavigateEvent<T = unknown> extends Event {
  constructor(type: string, eventInit?: NavigateEventInit);

  readonly navigationType: NavigationType;
  readonly canIntercept: boolean;
  readonly userInitiated: boolean;
  readonly hashChange: boolean;
  readonly destination: NavigationDestination<T>;
  readonly signal: AbortSignal;
  readonly formData: FormData | null;
  readonly downloadRequest: string | null;
  readonly info?: T;

  intercept(options?: NavigationInterceptOptions): void;
  scroll(): void;
}

interface NavigateEventInit<T = unknown> extends EventInit {
  navigationType?: NavigationType;
  canIntercept?: boolean;
  userInitiated?: boolean;
  hashChange?: boolean;
  destination: NavigationDestination<T>;
  signal: AbortSignal;
  formData?: FormData | null;
  downloadRequest?: string | null;
  info?: T;
}

interface NavigationInterceptOptions {
  handler?: () => Promise<void>;
  focusReset?: "after-transition" | "manual";
  scroll?: "after-transition" | "manual";
}

declare class NavigationDestination<T = unknown> {
  readonly url: string;
  readonly key: string | null;
  readonly id: string | null;
  readonly index: number;
  readonly sameDocument: boolean;

  getState(): T;
}
