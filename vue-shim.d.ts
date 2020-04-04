import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { NuxtCookies } from 'cookie-universal-nuxt'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: NuxtAxiosInstance,
    $cookies: NuxtCookies
  }
}
