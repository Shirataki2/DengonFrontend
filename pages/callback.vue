<template>
  <transition>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <p class="mt-10 mb-4">
        認証中です......
      </p>
      <nuxt-link to="/">ホームへ戻る</nuxt-link>
    </v-flex>
  </v-layout>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  middleware: 'not_authenticated',
  transition (to, from) {
    if (!from) { return 'left' }
    return +to.query.page < +from.query.page ? 'right' : 'left'
  }
})
export default class Index extends Vue {
  resp: any = ''
  error: any = ''
  async mounted() {
    const auth_response = await this.$axios.get('app/auth/twitter/callback', {
      params: this.$route.query,
    })
    const oauth_access_token = auth_response.data.user.access_token
    const oauth_token_secret = auth_response.data.user.token_secret
    const server_response = await this.$axios.post('api/auth/o/convert-token', {
      grant_type: 'convert_token',
      client_id: process.env['DJANGO_API_KEY'],
      client_secret: process.env['DJANGO_API_SECRET'],
      backend: 'twitter',
      token: `oauth_token=${oauth_access_token}&oauth_token_secret=${oauth_token_secret}`,
    })
    const access_token = server_response.data['access_token']
    const refresh_token = server_response.data['refresh_token']
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    await this.$store.dispatch('fetchUserByAccessToken', access_token)
    this.$router.push('/home')
  }
}
</script>
