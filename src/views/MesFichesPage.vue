<template >
    <ion-page>
        <ion-content :scroll-y="false">
            <div class="header">
                <img :src="'../../imgs/logo_bg.png'" style="width: 36vw;" />
                <div class="buts">
                    <button @click="$router.push('/search')" class="but ion-activatable ripple-parent  ">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-icon :icon="search" />
                    </button>
                </div>
            </div>
            <div class="divid">
		
            </div>
            <div class="header">

                <div class="buts sp_r">
                    <button @click="router.back()" class="but ion-activatable ripple-parent  ">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-icon :icon="arrowBack" />
                    </button>
                </div>
                <div class="h_text" style="margin-top: .1rem;">
                    Mes fiches/exercices...
                </div>
            </div>
            <div class="divid">

            </div>



            <div class="serif" style="max-height: 100%; overflow-y: scroll; padding-bottom: 12rem;">
                <div class="cta_cont">
                    <div class="cta">
                        <div class="sp_r">
                            <img :src="'../../imgs/fiche.svg'" style="height: 4.5rem;" />
                        </div>
                        <div>
                            <div style="font-weight: bold; font-size: .9rem;">
                                Decouvrez des epreuves, des exercices, des fiches de révision...
                            </div>
                            <div style="font-size: .8rem; line-height: .9rem; padding-top: .2rem;">
                                Toutes les ressources dont vous avez besoin se retrouvent ici, cliquez pour voir.
                            </div>
                        </div>
                    </div>
                </div>
                <div @click="fOpen = true" class="filter_cont ">
                    <div class="filter ion-activatable ripple-parent">
                        <ion-ripple-effect></ion-ripple-effect>
                        <div>
                            {{ filter_name }}
                        </div>
                        <div style="font-size: 1.2rem;">
                            <ion-icon :icon="chevronExpand" />
                        </div>
                    </div>
                </div>
                <div v-for="aide in fiches" :key="aide.id" class="res_cont">
                    <div  @click="router.push('/fiche/' + aide.id)"
                        class="question_h sp_r">
                        <div class="question_cat">
                            {{ aide.typefic[0].name }}
                        </div>
                        <div class="qh_text" v-html="aide.text" >
                            
                        </div>
                        <div v-if="aide.image.length || aide.audio.length || aide.video.length" class="sup_file">
                            <div v-if="aide.image.length" class="qh_img img_all" :style="{
                                backgroundImage: `url('${aide.image[0].get_file}')`
                            }">
                            </div>

                            <div v-else-if="aide.video.length" class="qh_img img_all" :style="{
                                backgroundImage: `url('${aide.video[0].get_file}')`
                            }">
                                <button class="play_but">
                                    <ion-icon :icon="play" />
                                </button>
                            </div>

                            <div v-else-if="aide.audio.length" @click.stop style="margin-top: -.7rem;">
                                <audio-reader :size="aide.audio[0].size" :url="aide.audio[0].get_file" />
                            </div>

                        </div>
                        <div class="qh_bottom">
                            <div class="qh_resp">

                                <div style="color: #25020e;">
                                    {{ aide.matiere[0].name }}
                                </div>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <img v-if="aide.price" :src="'../../imgs/couronne.png'" class="sp_r"
                                    style="height: 1rem; position: relative; bottom: .1rem;" />

                                <div v-if="aide.get_views" class="qh_resp">
                                    <div style="margin-right: .2rem;">
                                        <ion-icon :icon="eye" style="font-size: 1.2rem; position: relative; top: .1rem;" />
                                    </div>
                                    <div>
                                        {{ aide.get_views }}
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
                <more-button :state="get_state" @clicked="get_conseils()" ></more-button>

            </div>

            <filter-comp :is-open="fOpen" :typ-o="'fiche'" @close="fOpen = false" :filt-obj="filtObj"
                @filt="e => (filtObj as any)[e.typ] = e.val" @all_done="e => (filter_name = e, fOpen= false )" />
        </ion-content>
    </ion-page>
</template>

<style scoped>
.bot_pos {
    width: 100%;
    padding: .8rem 4vw;

}

.serif {
    font-family: 'PT Serif';
}

.filter {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: .4rem 3vw;
    font-size: 1rem;
    font-family: 'PT Serif';
    border-radius: 10px;
    background-color: #491d4d1f;
}

.filter_cont {
    padding: .5rem 5vw;
}

.play_but:active {
    background-color: #8d5b91;
}

.play_but {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
    background-color: #2DCF42;
    color: white;
    position: absolute;
    top: calc(50% - 1.2rem);
    right: calc(50% - 1.2rem);
    font-size: 1rem;
    box-shadow: 0 10px 15px -3px #481c4b65, 0 4px 6px -2px #17a74929;
}

.img_all {

    background-size: cover;
    background-position: top center;
}

.hc_but_text {
    font-size: 1.1rem;
    font-weight: bold;
}

.profil_d {
    width: 2.1rem;
    height: 2.1rem;

    border-radius: 10px;
}

.hc_but {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .3rem 2vw;
    border-radius: 15px;
    margin-top: -.2rem;
    border-style: solid;
    border-color: #481c4b81;
    border-width: 1px;
}

.qh_resp {
    font-size: 0.85rem;
    font-weight: bold;
    display: flex;
    align-items: center;
}

.qh_bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: .5rem;

}

.cont_wrapper {
    margin: -.3rem -3.3vw;
}

.sup_file {
    flex-grow: 100;
}

.qh_img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    position: relative;
    min-height: 4rem;
}

.qh_text {
    padding-top: 0.3rem;
    min-height: 0;
    padding-bottom: 0.6rem;
    flex-grow: 1;
    overflow: hidden;
}

.question_cat {
    font-size: .8rem;
    font-weight: bold;

}

.question_h {
    width: 100%;
    height: 12rem;
    display: flex;
    flex-direction: column;
    padding: .3rem 3.3vw;
    font-size: .9rem;
    border-radius: 10px;
    box-shadow: 0 10px 15px -3px #481c4b65, 0 4px 6px -2px #17a74929;
}

.res_cont {
    padding: .8rem 4vw;
}

.ancre:active {
    color: #95cc9d !important;
}

.cta {
    display: flex;
    align-items: center;
    padding: .6rem 3vw;
    border-radius: 15px;
    font-family: 'Poppins';
    border-style: solid;
    border-color: #481c4b;
    border-width: 1px;
}

.cta_cont {
    padding: 1rem 5vw;
}

.divid {
    width: 100%;
    height: .1rem;
    background-color: rgb(216, 216, 216);
}

.h_text {
    font-size: 1.2rem;
    font-weight: bold;
    font-family: 'PT Serif';
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
import DiviseComp from "@/components/DiviseComp.vue";
import { IonPage, IonContent, IonIcon, IonRippleEffect } from "@ionic/vue"
import { arrowBack, checkmarkCircle, chevronExpand, eye, play, search, time } from "ionicons/icons";
import { computed, ref, watch } from "vue";
import FilterComp from "@/components/FilterComp.vue"
import CtaComp from "@/components/CtaComp.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/global/pinia";
import { storeToRefs } from "pinia";
import { access_tok, showLoading, show_alert } from "@/global/utils";
import axios from "axios";
import MoreButton from "@/components/MoreButton.vue";

const fOpen = ref(false)

const router = useRouter()

const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)

const fiches = ref<any[]>([])

const { notifs } = userStore
const filter_name = ref("Filtrer")
watch(filter_name, (newf, oldf) => {
    fiches.value = [] as any[];
    get_conseils();
})

const filtObj = ref({
    annee: '',
    matiere: '',
    typefic: ''
})

const excep = computed(() => {
    const pks = [] as number[]

    for (const elt of fiches.value) {
        pks.push(elt.id)
    }

    return pks
})


const is_charging = ref(false)

const get_conseils = async () => {
    is_charging.value = true
    const load = await showLoading('Loading...')
    try {
        const resp = await axios.post('api/get_fichiers/', {
            filt: JSON.stringify(filtObj.value),
            excep : JSON.stringify(excep.value),
            is_me: 'yes' ,
        }, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`
            }
        })
        if (resp.data['done']) {
            fiches.value = fiches.value.concat(resp.data['result'])
            is_over.value = resp.data['result'].length == 0
            if(is_over.value) await show_alert("", "Plus de données disponibles.")
        }
    } catch (e) {
        await show_alert('', "Une erreur est survenue, veuillez reéssayer!")
    }
    load.dismiss()
    is_charging.value = false
}

get_conseils()
const is_over = ref(false)

const enable_reload = () => {
    const cont = document.getElementById("global_cont")
    if (cont) {
        cont.addEventListener('scroll', () => {
            if (cont.scrollTop - (cont.scrollHeight + cont.offsetHeight) < 15 && !is_over.value) {
                get_conseils()
            }
        })
    }
}

const get_state = computed(() => {
	if(is_charging.value) return 'load'
	
	else if(is_over.value) return ''
	
	else return 'show'
})
</script>
