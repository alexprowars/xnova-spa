import Vuex from 'vuex'
import Router, { RawLocation, RouteRecord } from 'vue-router'

type Dictionary < T > = { [key: string]: T }

interface Route {
  path: string
  name?: string | null
  hash: string
  query: Dictionary<string | (string | null)[]>
  params: Dictionary<string>
  fullPath: string
  matched: RouteRecord[]
  redirectedFrom?: string
  meta?: any
}

declare module 'vue/types/vue' {
	interface Vue {
		$bus: Vue
		$store: Vuex.Store<any>
		$route: Route
		$router: Router
	}
}

declare module '@nuxt/types/app' {
	interface NuxtAppOptions {
		store: Vuex.Store<any>
		router: Router
		localePath(route: RawLocation, locale?: string): string
	}
}
