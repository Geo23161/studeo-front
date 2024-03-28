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
                <div v-if="my_work && is_owner && !is_satisfied" class="serif" style="font-size: 1.1rem;  ">
                    <div v-if="!is_prem">
                        <span
                            v-if="my_work.get_expert && (is_online(my_work.expert_in, 1) || is_online(my_work.expert_write, 1))"
                            class="green">
                            <div style="display: inline-block; width: .7rem; height: .7rem; border-radius: 100%; min-width: .7rem;  position: relative; bottom: .05rem; right: .1rem; "
                                :class="{
                                    green_bg: cpt % 2,
                                    gray_bg: !(cpt % 2)
                                }"></div> Un expert en ligne
                        </span>
                        <span v-else :class="{
                            gray_l: cpt % 2,
                            gray: !(cpt % 2)
                        }"> Recherche d'expert... </span>

                    </div>
                    <div v-else>
                        <span v-if="is_online(my_work.expert_in, 1)" class="green">
                            En ligne
                        </span>
                    </div>
                </div>

                <div v-else>
                    <div v-if="aide?.satisfied" class="qh_resp">
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
                </div>
                <div class="buts">
                    <button @click="start_share()" class="but ion-activatable ripple-parent  ">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-icon :icon="shareSocial" />
                    </button>
                </div>
            </div>
            <div v-if="aide" class="serif" style="max-height: 100%; overflow-y: scroll; padding-bottom: 18rem;">
                <div class="quest_cont serif">
                    <img class="q_user sp_r" :src="'../../imgs/man.svg'" />
                    <div style="margin-top: -1rem; min-width: 0; ">
                        <div class="quests">
                            <div style="font-size: 1rem; font-weight: bold;">
                                Questions
                            </div>
                            <div style="margin-top: .5rem; font-size: .9rem;" v-html="aide.text" >
                                
                            </div>
                            <div v-if="aide.audio.length" class="audio_cont">
                                <audio-reader :size="aide.audio[0].size.toString()" :url="aide.audio[0].get_file" />
                            </div>
                            <div v-if="aide.image.length == 1" class="img_cont">
                                <div style="position: relative;">
                                    <img @click="click_id(aide.image[0].id + ':img')" :src="aide.image[0].get_file"
                                        class="qimg" style="width: 100%;" />
                                </div>
                            </div>
                            <div v-else-if="aide.image.length > 1" class="img_cont">
                                <div style="position: relative; display: flex; overflow-x: scroll;">
                                    <img v-for="img in aide.image" :key="img.id" @click="click_id(img.id + ':img')"
                                        :src="img.get_file" class="qimg" />
                                </div>
                            </div>
                            <div v-if="aide.video.length" class="img_cont">
                                <div style="position: relative; display: flex; overflow-x: scroll;">
                                    <div v-for="img in aide.video" :key="img.id" style="position: relative;">
                                        <button @click="cur_vid = img, vOpen = true" class="play_but">
                                            <ion-icon :icon="play" />
                                        </button>
                                        <img :src="img.get_preview" class="qimg" :class="{
                                            w_full: aide.video.length == 1
                                        }" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 100%; padding-top: 1rem; position: relative;  width: 100%;">
                    <div v-if="!is_authorized && answers.length"
                        style="position: absolute; top: 5rem; width: 100%; height: 100%; backdrop-filter: blur(20px); z-index: 100;">
                        <div class="box_pay">
                            <div class="bpay">
                                <div style="font-size: 1.2rem; font-weight: bold; text-align: center; ">
                                    <img :src="'../../imgs/couronne.png'" class="sp_r"
                                        style="height: 1.5rem; position: relative; top: .15rem; right: -.1rem; display: inline;" />
                                    Contenu inaccessible
                                </div>
                                <div style="margin-top: .3rem; text-align: center; font-size: 0.9rem; ">
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
                    <div v-for="ans in r_answers" :key="ans.id" class="quest_cont serif" :class="{
                        is_new: new_ans.filter(e => e == ans.id)[0]
                    }">


                        <img class="q_user sp_r"
                            :src="ans.type_of == 'question' ? '../../imgs/man.svg' : '../../imgs/expert.png'" />

                        <div style="margin-top: -1rem; min-width: 0; width: 100%;">
                            <div style="font-size: .8rem; font-weight: bold; margin-left: 1rem;">
                                {{ ans.type_of == 'question' ? ans.user.prenom : 'Expert studeo' }}
                            </div>
                            <div class="quests">
                                <div style="font-size: 1rem; font-weight: bold; color: #2DCF42;">
                                    {{ ans.type_of == 'solved' ? 'Réponse vérifiée' : (ans.type_of == 'question' ?
                                        'Question' : 'Réponse en cours...') }}
                                </div>
                                <div style="margin-top: .5rem; font-size: .9rem;" v-html="aide.text" >
                                    
                                </div>
                                <div v-if="ans.audio.length" class="audio_cont">
                                    <audio-reader :size="ans.audio[0].size.toString()" :url="ans.audio[0].get_file" />
                                </div>
                                <div v-if="ans.image.length == 1" class="img_cont">
                                    <div style="position: relative;">
                                        <img :src="ans.image[0].get_file" @click="click_id(ans.image[0].id + ':img')"
                                            class="qimg" style="width: 100%;" />
                                    </div>
                                </div>
                                <div v-else-if="ans.image.length > 1" class="img_cont">
                                    <div style="position: relative; display: flex; overflow-x: scroll;">
                                        <img v-for="img in ans.image" :key="img.id" @click="click_id(img.id + ':img')"
                                            :src="img.get_file" class="qimg" />
                                    </div>
                                </div>
                                <div v-if="ans.video.length" class="img_cont">
                                    <div style="position: relative; display: flex; overflow-x: scroll;">
                                        <div v-for="img in ans.video" :key="img.id" style="position: relative;">
                                            <button @click="cur_vid = img, vOpen = true" class="play_but">
                                                <ion-icon :icon="play" />
                                            </button>
                                            <img :src="img.get_preview" class="qimg" :class="{
                                                w_full: aide.video.length == 1
                                            }" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="my_work" style="width: 100%;">
                        <div v-if="is_online(my_work.user_write, 5/60) && is_prem" class="quest_cont serif">
                            <img class="q_user sp_r" :src="'../../imgs/man.svg'" />
			    <div style="margin-top: -1rem; min-width: 0; width: 100%;">
                            <div style="font-size: .8rem; font-weight: bold; margin-left: 1rem;">
                                {{ 'Etudiant' }}
                            </div>
                            <div class="quests">
                                <div style="font-size: 1rem; font-weight: bold; color: #2DCF42;">
                                    {{ 'Ecrit...' }}
                                </div>
                                <div style="margin-top: .5rem; font-size: .9rem;">
                                    <ion-spinner :name="'dots'"></ion-spinner>
                                </div>
                            </div>
                            </div >
                        </div>
                        <div v-if="is_online(my_work.expert_write, 5/60) && !is_prem" class="quest_cont serif">
                            <img class="q_user sp_r" :src="'../../imgs/expert.png'" />

                            <div style="margin-top: -1rem; min-width: 0; width: 100%;">
                            <div style="font-size: .8rem; font-weight: bold; margin-left: 1rem;">
                                 {{ 'Expert Studeo' }}
                            </div>
                            <div class="quests">
                                <div style="font-size: 1rem; font-weight: bold; color: #2DCF42;">
                                    {{ 'Répond...' }}
                                </div>
                                <div style="margin-top: .5rem; font-size: .9rem;">
                                    <ion-spinner :name="'dots'"></ion-spinner>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="padding: 2rem; display: flex; justify-content: space-around;  ">
                    
                </div>
            </div>
            <div v-if="!is_prem && is_owner && !is_satisfied" class="next_util serif ">
                <div class="util">
                    Que voulez-vous faire ensuite?
                </div>
                <div class="u_buts">
                    <button @click="router.push('/canswer/' + id + '/?pre=' + (is_prem ? 'yes' : 'no'))"
                        style="width: 100%; padding: .4rem; font-size: .9rem;  border-radius: 10px; padding-bottom: .6rem !important; font-weight: bold; display: flex; align-items: center; justify-content: center; border-style: solid; border-width: 1px; background-color: transparent; margin-top: .7rem; ">
                        <div style="font-size: 1.1rem; margin-right: .4rem; ">
                            <ion-icon :icon="chatbox" />
                        </div>
                        <div>
                            {{ is_prem ? 'Répondre' : 'Poser une autre question' }}
                        </div>
                    </button>
                </div>
            </div>
            <div v-else-if="staff_w.working == 0 && is_prem" class="next_util serif ">
                <div class="util">
                    Cliquez ici pour y répondre
                </div>
                <div class="u_buts">
                    <button @click="set_working()"
                        style="width: 100%; padding: .4rem; font-size: .9rem;  border-radius: 10px; padding-bottom: .6rem !important; font-weight: bold; display: flex; align-items: center; justify-content: center; border-style: solid; border-width: 1px; background-color: transparent; margin-top: .7rem; ">
                        <div style="font-size: 1.1rem; margin-right: .4rem; ">
                            <ion-icon :icon="chatbox" />
                        </div>
                        <div>
                            {{ 'Répondre' }}
                        </div>
                    </button>
                </div>
            </div>
            <div v-else-if="staff_w.working == user?.id && is_prem" class="next_util serif ">
                <div class="util">
                    Vous êtes entrain de répondre...
                </div>
                <div class="u_buts">
                    <button @click="router.push('/answer/' + id + '/?pre=' + (is_prem ? 'yes' : 'no'))"
                        style="width: 100%; padding: .4rem; font-size: .9rem;  border-radius: 10px; padding-bottom: .6rem !important; font-weight: bold; display: flex; align-items: center; justify-content: center; border-style: solid; border-width: 1px; background-color: transparent; margin-top: .7rem; ">

                        <div>
                            {{ 'Continuer à répondre' }}
                        </div>
                    </button>
                    <button @click="set_satisfied()"
                        style="width: 100%; padding: .4rem; font-size: .9rem;  border-radius: 10px; padding-bottom: .6rem !important; font-weight: bold; display: flex; align-items: center; justify-content: center; border-style: solid; border-width: 1px; background-color: transparent; margin-top: .7rem; ">

                        <div style="color: #2DCF42;" >
                            {{ 'Marquer comme satisfait' }}
                        </div>
                    </button>
                </div>
            </div>
            <div v-else-if="staff_w.working != user?.id && is_prem" class="next_util serif ">
                <div class="util">
                    Réponse en cours...
                </div>
            </div>
            <div v-show="false">
                <photo-provider>
                    <photo-consumer v-for="img in all_images" :key="img.id" :intro="'Studeo'" :src="img.get_file">
                        <img :src="img.get_file" :id="img.id + ':img'" style="width: 40vw:" class="view-box" />

                    </photo-consumer>
                </photo-provider>
            </div>
            <video-player v-if="cur_vid" :is-open="vOpen" :url-p="cur_vid.get_file" @close="vOpen = false" />
            <abon-comp :is-open="aOpen" @close="aOpen = false, get_authorized()" />
        </ion-content>
    </ion-page>
</template>

<style scoped>
.qh_resp {
  font-size: 0.85rem;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.gray_bg {
    background-color: #2DCF4240;
}

.green_bg {
    background-color: #2DCF42;
}

.gray_l {
    color: #281f2910;
}

.gray {
    color: #281f29;
}

.green {
    color: #2DCF42;
}

.is_new {
    background-color: #481c4b25;
}

.w_full {
    width: 100% !important;
}

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
    background-color: white;
    padding: .6rem 5vw;
}

.box_pay {
    width: 100%;
    padding: 1rem;
    margin-top: 3rem;
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
    width: 100%;
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
import AudioReader from "@/components/AudioReader.vue";
import { IonPage, IonContent, IonRippleEffect, onIonViewDidEnter, IonSpinner, onIonViewDidLeave } from "@ionic/vue"
import { arrowBack, chatbox, checkmarkCircle, lockOpen, paperPlane, person, play, save, search, shareSocial, time } from "ionicons/icons";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Share, ShareOptions } from "@capacitor/share"
import { access_tok, showLoading, show_alert, show_warn, is_online } from "@/global/utils";
import axios from "axios";
import VideoPlayer from "@/components/VideoPlayer.vue";
import { useUserStore } from "@/global/pinia";
import { storeToRefs } from "pinia";
import AbonComp from "@/components/AbonComp.vue";

const router = useRouter()

const aOpen = ref(false)
const id = ref<number>(0)
const aide = ref()
const vOpen = ref(false)
const cur_vid = ref()
const is_prem = ref(false)

const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)

const { user, a_answers, c_answers, worko } = userStore
const { send } = userStore_

const my_work = computed(() => {
    return worko.value['conseil' + id.value]
})



const new_ans = ref<number[]>([])

watch(a_answers, (newa, olda) => {
    if (newa.length) {
        newa.forEach(element => {
            new_ans.value.push(element.id)
        });
        setTimeout(() => {
            new_ans.value = [] as any[]
        }, 4000)
        answers.value = answers.value.concat(newa)
        a_answers.value = [] as any[]
    }
}, { deep: true })

const cpt = ref(0)
const interv = ref()


const start_share = async () => {
    await Share.share({
        title: "Studeo - Aides pour cours/exercices",
        text: aide.value ? aide.value.text : "",
    })
}

const get_aide = async () => {

    const load = await showLoading('Patientez...')

    try {
        const resp = await axios.get('api/get_conseil/' + id.value + '/', {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`
            }
        })

        if (resp.data['done']) {
            aide.value = resp.data['result']
            if(is_owner.value) interv.value = setInterval(() => {
            cpt.value++;
            if (!(cpt.value % 100)) signal_me();
        }, 600)
            await get_answer()
        }
    } catch (e) {
        await show_alert('', "Une erreur est survenue, vérifiez votre connexion internet et reéssayer")
    }
    load.dismiss()
}

const route = useRoute()

const is_authorized = ref(true)

const staff_w = ref({
    staff: 0,
    working: 0
})

const get_authorized = async () => {

    const resp = await axios.post('api/is_authorized/', {
        id: `${id.value}`,
        typ: 'conseil'
    }, {
        headers: {
            Authorization: `Bearer ${await access_tok(router, undefined)}`
        }
    })

    if (resp.data['done']) {
        is_authorized.value = resp.data['result']
        staff_w.value = resp.data['other']
    }
}

const set_working = async () => {

    const load = await showLoading('Synchronisation...')
    try {
        const resp = await axios.post('api/set_working/', {
            id: '' + staff_w.value.staff
        }, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, undefined)}`
            }
        })
        if (resp.data['done']) {
            staff_w.value = resp.data['result']
        }
        load.dismiss()
        if (staff_w.value.working == user.value.id) router.push('/canswer/' + id.value + '/?pre=' + (is_prem.value ? 'yes' : 'no'))

    } catch (e) {
        await show_alert('', 'Une erreur est survenue, veuillez reéssayer.')
        load.dismiss()
    }
}

const signal_me = () => {
    if (!is_prem.value) {
        send(JSON.stringify({
            type: 'inbox',
            result: {
                'typO': 'conseil',
                'pk': id.value
            }
        }))
    }
    else {
        if (my_work.value) if (my_work.value.get_expert == user.value?.id) send(JSON.stringify({
            type: 'inbox',
            result: {
                'typO': 'conseil',
                'pk': id.value
            }
        }))
    }
}

onIonViewDidEnter(() => {
    id.value = parseInt(route.params['id'] as string)
    get_aide()
    send(JSON.stringify({
        type: 'o_conseil',
        result: id.value
    }))
    setTimeout(() => {

        get_authorized()
        signal_me()
        
    }, 20)
})

onIonViewDidLeave(() => {
    if(interv.value) clearInterval(interv.value)
})

const answers = ref([] as any[])

const get_answer = async () => {
    const resp = await axios.get('api/get_answer/' + id.value + '/?typ=conseil', {
        headers: {
            Authorization: `Bearer ${await access_tok(router, undefined)}`
        }
    })

    if (resp.data['done']) {
        answers.value = resp.data['result'].reverse()
        is_prem.value = resp.data['is_prem']
    }

}

const all_images = computed(() => {
    let imgs = [] as any[]

    if (aide.value) imgs = imgs.concat(aide.value.image)

    for (const ans of answers.value) {
        imgs = imgs.concat(ans.image)
    }

    return imgs


})


const click_id = (id: string) => {
    document.getElementById(id)?.click()
}

const r_answers = computed(() => {
    const anss = [] as any[]
    let cpt = 0;

    for (cpt = 0; cpt < answers.value.length; cpt++) {
        if (answers.value[cpt].type_of == 'waiter') {
            if (answers.value[cpt + 1]) if (answers.value[cpt + 1].type_of == 'solved') continue;

        }

        anss.push(answers.value[cpt]);

    }

    return anss;
})

const is_owner = computed(() => {
    return aide.value ? aide.value.user.id == user.value.id : false
})

const is_satisfied = computed(() => {
    return aide.value ? aide.value.satisfied : true
})

const set_satisfied = async () => {
    const load = await showLoading('Loading...')

    try {
        const resp = await axios.get('api/set_satisfied/' + aide.value?.id + '/?typ=conseil', {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`
            }
        })

        if (resp.data['done'] && aide.value) {
            aide.value.satisfied = resp.data['result']
        }
    } catch (e) {
        await show_alert('', 'Une erreur est survenue, veuillez reessayer.')
    }

    load.dismiss()
}

</script>
