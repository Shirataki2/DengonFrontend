import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = ({store, redirect}) => {
  if (store.state.user) {
    return redirect('/home')
  }
}

export default authMiddleware
