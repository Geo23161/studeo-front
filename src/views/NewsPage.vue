<template >
    <ion-page>
        <ion-content :scroll-y="false" >
            <div class="header">
                <div class="buts">
                    <button @click="router.back()" class="but ion-activatable ripple-parent  ">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-icon :icon="arrowBack" />
                    </button>
                </div>
                <img :src="'../../imgs/logo_bg.png'" style="width: 36vw;" />

            </div>
            <div v-if="neww" class="serif" style="max-height: 100%; overflow-y: scroll; padding-bottom: 3rem;">
                <div class="new_title serif">
                    {{ neww.title }}
                </div>
                <div class="new_img">
                    <img :src="neww.get_image" />
                </div>
                <div class="news_resume serif"
                    v-html="neww.text">

                </div>
            </div>

        </ion-content>
    </ion-page>
</template>

<style scoped >
.news_resume {
    padding: .8rem 5vw;
    font-size: 1.1rem;
}

.new_img {
    padding: .5rem 5vw;
}

.new_title {
    padding: 1rem 5vw;
    font-size: 1.3rem;
    font-weight: bold;
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

<script setup lang="ts" >
import { access_tok, showLoading, show_alert } from "@/global/utils";
import router from "@/router";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue"
import axios from "axios";
import { arrowBack } from "ionicons/icons";
import { ref } from "vue";
import { useRoute } from "vue-router";

const id=ref(0)
const route= useRoute()

const neww = ref()

const get_new = async (id : number) => {
    
    const load = await showLoading('Loading...')
    try {
        const resp = axios.post('api/get_new/', {
        id
    }, {
        headers : {
            Authorization : `Bearer ${await access_tok(router, load)}`
        }
    })
    if((await resp).data['done']) {
        neww.value = (await resp).data['result']
    }
    } catch(e) {
        await show_alert('', 'Une erreur est survenue lors du chargement, veuillez reéssayer.')
    }
    load.dismiss()
}

onIonViewDidEnter(() => {

    id.value = parseInt(route.params['id'] as string)

    get_new(id.value)
})

</script>