<template>
  <transition>
  <v-layout
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      style="text-align:center"
    >
      <h1 class="headline mt-3" style="text-align:center;font-weight: 700">
        おえかき
      </h1>
      <h1 class="display-2 mb-1" style="text-align:center;font-weight: 700">
        伝言ゲーム
      </h1>
      <h3 class="overline mb-8" style="text-align:center;font-size: 17px!important">
        online
      </h3>
      <v-btn large rounded color="primary" href="/app/auth/twitter">
        <v-icon dark class="mr-2">mdi-twitter</v-icon>
        Twitterでログイン
      </v-btn>
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
class Index extends Vue {
}
export default Index
</script>
