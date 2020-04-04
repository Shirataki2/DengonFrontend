<template>
  <transition>
  <v-layout
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
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
      <p class="headline">{{ user.first_name }} さん</p>
      <v-card
        style="cursor:pointer"
        color="red lighten-5"
        @click="$router.push('/new_dengon')"
      >
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-icon size="91" style="height:100%;margin: auto 0;">
                mdi-bulletin-board
              </v-icon>
            </v-col>
            <v-col
              cols="8"
              class="text-left pl-0"
            >
              <v-row
                class="flex-column ma-0 fill-height"
              >
                <div class="mt-n4 mr-n3 mb-n2">
                  <v-col class="px-0">
                    <p class="title">あたらしく伝言ゲームを開始する</p>
                  </v-col>
                </div>
                <v-col class="px-0 body-2 mb-n5 mt-n3">
                  <p>
                    新しく伝言ゲームを作ろう！
                  </p>
                  <p>
                    お題はゲーム作成後ランダムに出題されるぞ！
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-card
        style="cursor:pointer"
        class="mt-3"
        color="blue lighten-5"
      >
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-icon size="91" style="height:100%;margin: auto 0;">
                mdi-tooltip-image-outline
              </v-icon>
            </v-col>
            <v-col
              cols="8"
              class="text-left pl-0"
            >
              <v-row
                class="flex-column ma-0 fill-height"
              >
                <div class="mt-n4 mr-n3 mb-n2">
                  <v-col class="px-0">
                    <p class="title">ランダムに伝言を回す</p>
                  </v-col>
                </div>
                <v-col class="px-0 body-2 mb-n5 mt-n3">
                  <p>
                    前の人の絵を真似しよう！
                  </p>
                  <p>
                    回答者が正解すればポイントが入るぞ！
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-card
        style="cursor:pointer"
        color="green lighten-5"
        class="mt-3"
      >
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-icon size="91" style="height:100%;margin: auto 0;">
                mdi-chat-alert-outline
              </v-icon>
            </v-col>
            <v-col
              cols="8"
              class="text-left pl-0"
            >
              <v-row
                class="flex-column ma-0 fill-height"
              >
                <div class="mt-n4 mr-n3 mb-n2">
                  <v-col class="px-0">
                    <p class="title">伝言を回答する</p>
                  </v-col>
                </div>
                <v-col class="px-0 body-2 mb-n5 mt-n3">
                  <p>
                    全員回し切った伝言が何のお題であったかを当てよう！
                  </p>
                  <p>
                    責任重大なので正解すれば1.5倍のポイントが入るぞ！
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { User } from '@/types'
@Component({
  middleware: 'authenticated',
  transition (to, from) {
    if (!from) { return 'left' }
    return +to.query.page < +from.query.page ? 'right' : 'left'
  }
})
class Index extends Vue {
  user: User = this.$store.state.user
}
export default Index
</script>
