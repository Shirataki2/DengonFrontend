const inBrowser = typeof window !== 'undefined'

export const state = () => {
  return {
    user: null,
    loggedIn: false,
    token: null
  }
}

export const getters = {}

export const mutations = {
  setUser (state, { user }) {
    state.user = user
    state.loggedIn = Boolean(user)
  },

  setToken (state, { token }) {
    state.token = token

    // Store token in cookies
    if (inBrowser) {
      if (token) {
        this.$cookies.set('token', token)
      } else {
        this.$cookies.remove('token')
      }
    }
  }
}

export const actions = {
  nuxtServerInit ({ dispatch }, { error }) {
    const token = this.$cookies.get('token')
    if (!token) {
      return Promise.resolve()
    }

    return dispatch('fetchUserByAccessToken', token).catch(e => {
      return dispatch('logout', { token }).catch(e => {
        error({ message: e.message, statusCode: e.statusCode })
      })
    })
  },
  nuxtClientInit ({ dispatch }, { error }) {
    const token = this.$cookies.get('token')
    if (!token) {
      return Promise.resolve()
    }
    return dispatch('fetchUserByAccessToken', token).catch(e => {
      return dispatch('logout', { token }).catch(e => {
        error({ message: e.message, statusCode: e.statusCode })
      })
    })
  },
  fetchUserByAccessToken ({ commit }, token) {
    commit('setToken', { token })

    return this.$axios.$get(
      'http://127.0.0.1:3000/api/user/',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(user => {
      commit('setUser', { user })
    })
  },

  logout ({ commit }, token) {
    commit('setUser', { user: null })

    // Revoke access token
    const params = new URLSearchParams()
    params.append('client_id', process.env['DJANGO_API_KEY'])
    params.append('client_secret', process.env['DJANGO_API_SECRET'])
    params.append('token', token)
    return this.$axios.$post(
      'http://127.0.0.1:3000/api/auth/o/revoke-token', params
    ).then(() => {
      commit('setToken', { token: null })
    }).catch(e => {
      commit('setToken', { token: null })
    })
  }
}
