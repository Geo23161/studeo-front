<template >
    <ion-page>
        <ion-content :scroll-y="false">
            <div class="header" style="justify-content: space-around;">
                <img :src="'../../imgs/logo_bg.png'" style="width: 36vw;" />
            </div>
            <div class="header">
                <div class="buts">
                    <button @click="router.back()" class="but ion-activatable ripple-parent sp_r ">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-icon :icon="arrowBack" />
                    </button>
                </div>
                <input class="inpt" v-model="search_w" placeholder="Rechercher..." />
            </div>
            <ion-segment v-show="!is_charging" :mode="'md'" :value="typseg" @ionChange="e => typseg = e.detail.value as any" >
                <ion-segment-button value="aides">
                    <ion-label> Aides pour Cours/Exercices </ion-label>
                </ion-segment-button>
                <ion-segment-button value="conseils">
                    <ion-label> Conseils et Opportunités </ion-label>
                </ion-segment-button>
                <ion-segment-button value="fichiers">
                    <ion-label> Epreuves/Fiches... </ion-label>
                </ion-segment-button>
            </ion-segment>



            <div class="serif" id="aides_cont" v-show="typseg == 'aides'"
                style="max-height: 100%; overflow-y: scroll; padding-bottom: 12rem;">
                <div class="filter_cont ">

                    <div @click="fOpen = true" class="filter ion-activatable ripple-parent">
                        <ion-ripple-effect></ion-ripple-effect>
                        <div>
                            {{ filter_name }}
                        </div>
                        <div style="font-size: 1.5rem;">
                            <ion-icon :icon="chevronExpand" />
                        </div>
                    </div>
                </div>
                <div v-for="aide in aides" :key="aide.id" class="res_cont">
                    <div v-if="typseg == 'aides'" @click="router.push('/quest/' + aide.id)" class="question_h sp_r">
                        <div class="question_cat">
                            {{ aide.matiere[0].name }}
                        </div>
                        <div class="qh_text" v-html="aide.text" >
                            
                        </div>
                        <div v-if="aide.image.length || aide.audio.length || aide.video.length" class="sup_file">
                            <div v-if="aide.image.length" class="qh_img img_all" :style="{
                                backgroundImage: `url('${aide.image[0].get_file}')`
                            }">
                            </div>

                            <div v-else-if="aide.video.length" class="qh_img img_all" :style="{
                                backgroundImage: `url('${aide.video[0].get_preview}')`
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
                            <div v-if="aide.solved" class="qh_resp">
                                <div style="margin-right: .2rem;">
                                    <ion-icon :icon="checkmarkCircle" style="font-size: 1.4rem; color: #2DCF42;" />
                                </div>
                                <div>
                                    Résolue
                                </div>
                            </div>
                            <div v-else class="qh_resp">
                                <div style="margin-right: .2rem;">
                                    <ion-icon :icon="time"
                                        style="font-size: 1.4rem; color: #9b9b9b; position: relative; top: .1rem;" />
                                </div>
                                <div style="color: gray;">
                                    En attente
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
                
                <more-button :state="get_state" @clicked="get_aides()" ></more-button>
            </div>

            <div id="conseils_cont" class="serif" v-show="typseg == 'conseils'"
                style="max-height: 100%; overflow-y: scroll; padding-bottom: 12rem;">
                <div  class="filter_cont ">

                    <div @click="fOpen = true" class="filter ion-activatable ripple-parent">
                        <ion-ripple-effect></ion-ripple-effect>
                        <div>
                            {{ filter_name }}
                        </div>
                        <div style="font-size: 1.5rem;">
                            <ion-icon :icon="chevronExpand" />
                        </div>
                    </div>
                </div>
                <div v-for="aide in aides" :key="aide.id" class="res_cont">
                    <div v-if="typseg == 'conseils'" @click="router.push('/cquest/' + aide.id)" class="question_h sp_r">
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
                            <div v-if="aide.solved" class="qh_resp">
                                <div style="margin-right: .2rem;">
                                    <ion-icon :icon="checkmarkCircle" style="font-size: 1.4rem; color: #2DCF42;" />
                                </div>
                                <div>
                                    Résolue
                                </div>
                            </div>
                            <div v-else class="qh_resp">
                                <div style="margin-right: .2rem;">
                                    <ion-icon :icon="time"
                                        style="font-size: 1.4rem; color: #9b9b9b; position: relative; top: .1rem;" />
                                </div>
                                <div style="color: gray;">
                                    En attente
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
                <more-button :state="get_state" @clicked="get_aides()" ></more-button>
            </div>

            <div class="serif" id="fichiers_cont" v-show="typseg == 'fichiers'"
                style="max-height: 100%; overflow-y: scroll; padding-bottom: 12rem;">
                <div  class="filter_cont ">

                    <div @click="fOpen = true" class="filter ion-activatable ripple-parent">
                        <ion-ripple-effect></ion-ripple-effect>
                        <div>
                            {{ filter_name }}
                        </div>
                        <div style="font-size: 1.5rem;">
                            <ion-icon :icon="chevronExpand" />
                        </div>
                    </div>
                </div>
                <div v-for="aide in aides" :key="aide.id" class="res_cont">
                    <div v-if="typseg == 'fichiers'" @click="router.push('/fiche/' + aide.id)" class="question_h sp_r">
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
                                backgroundImage: `url('${aide.video[0].get_preview}')`
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
                <more-button :state="get_state" @clicked="get_aides()" ></more-button>
            </div>
            
            
            <filter-comp :is-open="fOpen" :typ-o="get_typo" @close="fOpen = false" :filt-obj="filtObj"
                @filt="e => (filtObj as any)[e.typ] = e.val" @all_done="e => (filter_name = e, fOpen = false)" />
        </ion-content>
    </ion-page>
</template>

<style scoped >
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
    margin-top: .6rem;
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
    height: 14rem;
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

*:focus {
    outline: none;
}

.inpt {
    flex-grow: 1;
    width: 100%;
    height: 2.4rem;
    border-width: 2px;
    border-style: solid;
    border-color: #481c4b;
    border-radius: 10px;
    padding: .2rem .8rem;
    font-size: 1.1rem;
    margin-top: .2rem;
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
import { IonPage, IonContent, IonSegment, IonSegmentButton, IonLabel, IonIcon, IonRippleEffect, IonSkeletonText } from "@ionic/vue"
import { arrowBack, checkmarkCircle, chevronExpand, eye, play, search, time } from "ionicons/icons";

import FilterComp from "@/components/FilterComp.vue"
import { computed, ref, watch } from "vue";

import { useRouter } from "vue-router";
import { useUserStore } from "@/global/pinia";
import { storeToRefs } from "pinia";
import { access_tok, showLoading, show_alert } from "@/global/utils";
import axios from "axios";
import AudioReader from "@/components/AudioReader.vue";

import MoreButton from "@/components/MoreButton.vue"

const fOpen = ref(false)

const router = useRouter()
const typseg = ref("aides")
watch(typseg, async (newt, oldt) => {
    if (newt != '') {
    	is_over.value = false
    	aides.value = [] as any[]
        filtObj.value = {
            annee: '',
            matiere: '',
            typefic: ''
        };
        filter_name.value = "Filtrer";
        get_aides()
    }
}, { deep: true })

const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)

const aides = ref<any[]>([])
const search_w = ref("")
watch(search_w, (news, olds) => {
    if (news != '') {
    	is_over.value = false
    	aides.value = [] as any[]
        get_aides()
    }
})

const { notifs } = userStore
const filter_name = ref("Filtrer")
watch(filter_name, (newf, oldf) => {
    if (newf != "Filtrer") is_over.value = false ,aides.value = [] ,get_aides()
})

const filtObj = ref({
    annee: '',
    matiere: '',
    typefic: ''
})

const excep = computed(() => {
    const pks = [] as number[]

    for (const elt of aides.value) {
        pks.push(elt.id)
    }

    return pks
})


const is_charging = ref(false)
const get_aides = async () => {
    is_charging.value = true
    try {
        const resp = await axios.post(`api/get_${typseg.value}/`, {
            filt: JSON.stringify(filtObj.value),
            excep : JSON.stringify(excep.value),
            search_w: search_w.value
        }, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, undefined)}`
            }
        })
        if (resp.data['done']) {
            aides.value = aides.value.concat(resp.data['result'])
            is_over.value = resp.data['result'].length == 0
            if(is_over.value) await show_alert("", "Plus de données disponibles.")
        }
    } catch (e) {
        await show_alert('', "Une erreur est survenue, veuillez reéssayer!")
    }
    is_charging.value = false
}

get_aides()
const is_over = ref(false)

const enable_reload = (id: string) => {
    const cont = document.getElementById(id)
    if (cont) {
        cont.addEventListener('scroll', () => {
            if (cont.scrollTop - (cont.scrollHeight + cont.offsetHeight) < 15 && !is_over.value) {
                get_aides()
            }
        })
    }
}

/* setTimeout(() => {
    enable_reload('aides_cont')
    enable_reload('conseils_cont')
    enable_reload('fichiers_cont')
}, 900) */

const get_typo = computed(() => {
	return typseg.value == 'aides' ? 'aide' : ( typseg.value == 'conseils' ? 'conseil' : 'fiche' );
})

const log = (a : any) => {
	console.log(typseg.value)
	console.log(a)
}

const get_state = computed(() => {
	if(is_charging.value) return 'load'
	
	else if(is_over.value) return ''
	
	else return 'show'
})
</script>
