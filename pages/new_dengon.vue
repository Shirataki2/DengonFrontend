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
      <div style="text-align:left">
        <v-btn text class="mt-2 mb-2" style="cursor: pointer;" @click="$router.push('/home')">
          <v-icon>
            mdi-chevron-left
          </v-icon>
          戻る
        </v-btn>
      </div>
      <h1 class="display-2 mb-7" style="font-weight: 700">
        新規作成
      </h1>
      <v-stepper
        v-model="e1"
        vertical
      >
        <v-stepper-step
          :complete="e1 > 1"
          :step="1"
        >
          回す人数を指定しよう！
        </v-stepper-step>
        <v-stepper-content :step="1">
          <v-card round>
            <v-list>
              <v-list-item-group v-model="idx1" color="indigo">
                <v-list-item v-for="item in nums" :key="item.man">
                  <v-list-item-content>
                    {{ item.man }}人
                  </v-list-item-content>
                  <v-list-item-action class="red--text">
                    {{ item.point }}点
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
          <v-btn
            color="primary"
            class="ma-5"
            @click="() => e1++"
          >
            次へ
          </v-btn>
        </v-stepper-content>
        <v-stepper-step
          :complete="e1 > 2"
          :step="2"
        >
          制限時間を指定しよう！
        </v-stepper-step>
        <v-stepper-content :step="2">
          <v-card round>
            <v-list>
              <v-list-item-group v-model="idx2" color="indigo">
                <v-list-item v-for="item in time" :key="item.man">
                  <v-list-item-content>
                    {{ item.man }}秒
                  </v-list-item-content>
                  <v-list-item-action class="red--text">
                    {{ item.point }}点
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
          <v-btn
            color="secondary"
            class="ma-5"
            @click="() => e1--"
          >
            前へ
          </v-btn>
          <v-btn
            color="primary"
            class="ma-5"
            @click="() => e1++"
          >
            次へ
          </v-btn>
        </v-stepper-content>
        <v-stepper-step
          :complete="e1 > 3"
          :step="3"
        >
          カテゴリを指定しよう！
        </v-stepper-step>
        <v-stepper-content :step="3">
          <p class="body-2">お題はカテゴリ内からランダムに選ばれます．</p>
          <p class="body-2">お題ごとに得点が決まっており20点から50点まで様々です．</p>
          <v-select
            label="カテゴリ"
            v-model="selectedCategory"
            :items="categories"
          />
          <v-btn
            color="secondary"
            class="ma-5"
            @click="() => e1--"
          >
            前へ
          </v-btn>
          <v-btn
            color="primary"
            class="ma-5"
            @click="() => e1++"
          >
            次へ
          </v-btn>
        </v-stepper-content>
        <v-stepper-step
          :complete="e1 > 4"
          :step="4"
        >
          内容の確認
        </v-stepper-step>
        <v-stepper-content :step="4">
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>回す人数</td>
                  <td>{{ nums[idx1].man }}人({{ nums[idx1].point }}点)</td>
                </tr>
                <tr>
                  <td>制限時間</td>
                  <td>{{ time[idx2].man }}秒({{ time[idx2].point }}点)</td>
                </tr>
                <tr>
                  <td>カテゴリ</td>
                  <td>{{ selectedCategory}}(20 - 50点)</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-btn
            color="secondary"
            class="ma-5"
            @click="() => e1--"
          >
            前へ
          </v-btn>
          <v-btn
            color="primary"
            class="ma-5"
            @click="submit"
          >
            作成！
          </v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-flex>
  </v-layout>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  middleware: 'authenticated',
  transition (to, from) {
    if (!from) { return 'left' }
    return +to.query.page < +from.query.page ? 'right' : 'left'
  }
})
class Index extends Vue {
  idx1: number = 0
  idx2: number = 1
  e1 = 1
  anyCategory = '何でも！'
  selectedCategory = this.anyCategory
  nums = [
    { man: 5, point: 3 },
    { man: 10, point: 10 },
    { man: 20, point: 30 },
    { man: 30, point: 50 },
    { man: 50, point: 100 }
  ]
  time = [
    { man: 180, point: 0 },
    { man: 60, point: 5 },
    { man: 30, point: 10 },
    { man: 20, point: 20 },
    { man: 10, point: 40 },
    { man: 5, point: 100 }
  ]
  categories = [this.anyCategory]

  async mounted () {
    const { data } = await this.$axios.get('api/theme/categories/')
    data.forEach((cat: string) => {
      this.categories.push(cat)
    });
  }

  submit () {
  }
}
export default Index
</script>
