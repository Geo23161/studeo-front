<template >
    <ion-page>
        <ion-content :scroll-y="false">
            <div class="header">
                <div class="buts">
                    <button @click="router.back()" class="but ion-activatable ripple-parent  ">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-icon :icon="arrowBack" />
                    </button>
                </div>
                <div class="buts">
                    <button @click="start_share()" class="but ion-activatable ripple-parent  ">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-icon :icon="shareSocial" />
                    </button>
                </div>
            </div>
            <div v-if="aide" class="serif" style="max-height: 100%; overflow-y: scroll; padding-bottom: 18rem; height: 100%;">

                <div style="width: 100%; position: relative; height: 100%;">
                    <div v-if="!is_authorized"
                        style="position: fixed; top: 7rem; width: 100%; height: 100%; backdrop-filter: blur(20px); z-index: 100;">
                        <div class="box_pay">
                            <div class="bpay">
                                <div style="font-size: 1.2rem; font-weight: bold; text-align: center; ">
                                    <img :src="'../../imgs/couronne.png'" class="sp_r"
                                        style="height: 1.8rem; position: relative; top: .15rem; right: -.1rem; display: inline;" />
                                    Contenu inaccessible 
                                </div>
                                <div style="margin-top: .3rem; text-align: center;">
                                    Passez à un forfait supérieur pour débloquer.
                                </div>
                                <button @click="aOpen = true"
                                    style="width: 100%; padding: .4rem; font-size: 1rem; color: white; background-color: #2DCF42; margin-top: .8rem; border-radius: 10px; padding-bottom: .6rem !important; font-weight: bold; display: flex; align-items: center; justify-content: center; ">
                                    <div style="font-size: 1.3rem; margin-right: .4rem; color: white;">
                                        <ion-icon :icon="lockOpen" />
                                    </div>
                                    <div style="color: white;">
                                        Débloquez
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-for="img in imgss" :key="img.id" style="width: 100%;">
                        
                                <img @click="click_id(img.id + ':img')" :src="img.get_file" style="width: 100%;" />
                    </div>
                </div>
            </div>
            <div class="next_util serif ">
                <div class="util">
                    Besoin d'aide?
                </div>
                <div class="u_buts">
                    <button @click="$router.push(`/ask?epr=${id}`)"
                        style="width: 100%; padding: .4rem; font-size: .9rem;  border-radius: 10px; padding-bottom: .6rem !important; font-weight: bold; display: flex; align-items: center; justify-content: center; border-style: solid; border-width: 1px; background-color: transparent; margin-top: .7rem; ">
                        <div style="font-size: 1rem; margin-right: .4rem; ">
                            <ion-icon :icon="chatbox" />
                        </div>
                        <div>
                            Poser une question
                        </div>
                    </button>
                </div>
            </div>
            	<div v-show="false">
                <photo-provider :download-method="(item: any) => 0" >
                    <photo-consumer v-for="img in imgss" :key="img.id" :intro="'Studeo'" :src="img.get_file">
                        <img :src="img.get_file" :id="img.id + ':img'" style="width: 40vw:" class="view-box" />

                    </photo-consumer>
                </photo-provider>
            </div>
            
            <abon-comp :is-open="aOpen" @close="aOpen = false, get_authorized()" />
        </ion-content>
    </ion-page>
</template>

<style scoped>
.u_buts {
    margin-top: .6rem;
}

.util {
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
}

.next_util {
    position: absolute;
    bottom: 0%;
    width: 100%;
    padding: 1rem 6vw;
    background-color: white;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    z-index: 100;
    background-color: rgb(245, 245, 245);
}

.bpay {
    width: 100%;
    border-radius: 10px;
    background-color: #ffffff;
    padding: .6rem 5vw;
}

.box_pay {
    width: 100%;
    padding: 1rem;
    margin-top: 5rem;
}

.play_but:active {
    background-color: #8d5b91;
}

.play_but {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
    background-color: #481c4b;
    color: white;
    position: absolute;
    top: calc(50% - 1.2rem);
    right: calc(50% - 1.2rem);
    font-size: 1rem;
    box-shadow: 0 10px 15px -3px #481c4b65, 0 4px 6px -2px #17a74929;
}

.qimg {
    margin-top: .5rem;
    border-radius: 10px;
    margin-right: .6rem;
    width: 50vw;
    min-width: 50vw;
}

.img_cont {
    margin-top: .7rem;
}

.qcta:active {
    background-color: #8d4b92;
}

.qcta {
    padding: .5rem;
    font-size: 1.1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #481c4b;
    color: white;
}

.quests_cta {
    padding: .8rem 5vw;
}

.audio_cont {
    margin-top: 1rem;
}

.quests {
    padding: .8rem 5vw;
    border-radius: 15px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(196, 196, 196);
    flex-grow: 1;
    margin-top: .4rem;
    min-width: 0;
}

.q_user {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
}

.quest_cont {
    padding: 1rem 4vw;
    display: flex;

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
import AbonComp from "@/components/AbonComp.vue";
import AudioReader from "@/components/AudioReader.vue";
import { useUserStore } from "@/global/pinia";
import { access_tok, showLoading, show_alert } from "@/global/utils";
import { Share } from "@capacitor/share";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue"
import axios from "axios";
import { arrowBack, chatbox, eye, lockOpen, paperPlane, person, play, search, shareSocial } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Zoomist from "zoomist"


const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)

const { user } = userStore
const aOpen = ref(false)


const router = useRouter()

const aide = ref()
const id = ref(0)
const route = useRoute()

onIonViewDidEnter(() => {
    id.value = parseInt(route.params['id'] as string)
    get_aide()
    get_authorized()
})

const is_authorized = ref(true)

const get_authorized = async () => {

    const resp = await axios.post('api/is_authorized/', {
        id: `${id.value}`,
        typ: 'fiche'
    }, {
        headers: {
            Authorization: `Bearer ${await access_tok(router, undefined)}`
        }
    })

    if (resp.data['done']) {
        is_authorized.value = resp.data['result']
    }
}

const get_aide = async () => {

    const load = await showLoading('Patientez...')
    try {
        const resp = await axios.get('api/get_fiche/' + id.value + '/', {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`
            }
        })

        if (resp.data['done']) {
            aide.value = resp.data['result']
        }
    } catch (e) {
        await show_alert('', "Une erreur est survenue, vérifiez votre connexion internet et reéssayer")
    }
    load.dismiss()
}

const start_share = async () => {
    await Share.share({
        title: "Studeo - Epreuves/Fiches et autres...",
        text: aide.value ? aide.value.text : "",
    })
}

const click_id = (id: string) => {
    document.getElementById(id)?.click()
}

const imgss = computed(() => {
	return aide.value ? aide.value.image : [] 
})

</script>
