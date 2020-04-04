<template>
  <v-app>
    <v-app-bar
      fixed
      flat
      color="orange lighten-2"
      app
      dark
    >
      <v-toolbar-title style="font-weight: 900">
        Vuetify.js
      </v-toolbar-title>
      <v-spacer />
      <v-btn text v-if="$store.state.loggedIn" @click="logout">Log Out</v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      fixed
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
})
class Index extends Vue {
  async logout () {
    await this.$store.dispatch('logout')
    this.$router.push('/')
  }
}
export default Index
</script>
