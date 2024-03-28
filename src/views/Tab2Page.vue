<template>
  <ion-page>
    <ion-content :fullscreen="true" :scroll-y="false">
      <div class="header" style="justify-content: space-around !important; ">
        <img :src="'../../imgs/logo_bg.png'" style="width: 36vw;" />
      </div>
      <div id="news_cont" class="serif" style="max-height: 100%; overflow-y: scroll; padding-bottom: 5rem;">
        <div v-for="ne in news" :key="ne.id" @click="router.push('/news/' + ne.id)" class="ripple-parent ion-activatable">
          <ion-ripple-effect></ion-ripple-effect>
          <div class="news_cont">
            <div>
              <div class="news_img img_all " :style="{
                backgroundImage: `url('${ne.get_image}')`
              }">

              </div>
              <div class="news_text">
                {{ ne.title }}
              </div>
            </div>
          </div>
          <div class="divid">

          </div>
        </div>
        <more-button :state="get_state" @clicked="get_news()"></more-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped >
.news_text {
  margin-top: 1rem;
  font-size: 1.3rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.news_img {
  width: 100%;
  height: 11rem;
  border-radius: 15px;

}

.divid {
  width: 100%;
  height: .1rem;
  background-color: rgb(216, 216, 216);
}

.news_cont {
  padding: 1rem 5vw;

}

.but {
  width: 11vw;
  height: 11vw;
  border-radius: 10px;
  font-size: 7vw;
  background-color: transparent;
  border: none;
  color: #481c4b;
}

.buts {
  display: flex;
  align-items: center;
  padding-top: .7vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .6rem .6rem;
}
</style>

<script setup lang="ts">
import { IonPage, IonContent, IonRippleEffect, IonSpinner } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { search } from 'ionicons/icons';
import { computed, ref } from 'vue';
import axios from 'axios';
import { access_tok, show_alert } from '@/global/utils';
import router from '@/router';
import MoreButton from '@/components/MoreButton.vue';

const news = ref<any[]>([])
const excep = computed(() => {
  const pks = [] as number[]

  for (const n of news.value) {
    pks.push(n.id)
  }
  return pks
})


const is_charging = ref(false)

const get_news = async () => {
  is_charging.value = true
  try {
    const resp = await axios.post('api/get_news/', {
      excep: JSON.stringify(excep.value)
    }, {
      headers: {
        Authorization: `Bearer ${await access_tok(router, undefined)}`
      }
    })
    if (resp.data['done']) {
      news.value = news.value.concat(resp.data['result'])
      is_over.value = resp.data['result'] == 0
      if (is_over.value) await show_alert("", "Plus de données disponibles.")
    }
  } catch (e) {
    await show_alert('', 'Une erreur est survenue, veuillez vérifier votre connexion et reéssayer.')
  }
  is_charging.value = false
}

get_news()

const is_over = ref(false)

const enable_reload = () => {
  const cont = document.getElementById("news_cont")
  if (cont) {
    cont.addEventListener('scroll', () => {
      if (cont.scrollTop - (cont.scrollHeight + cont.offsetHeight) < 50 && !is_over.value) {
        get_news()
      }
    })
  }
}

const get_state = computed(() => {
  if (is_charging.value) return 'load'

  else if (is_over.value) return ''

  else return 'show'
})

</script>
