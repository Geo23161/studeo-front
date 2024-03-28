<template >
    <ion-page>
        <ion-content :scroll-y="false">
            <div class="all_cont serif">
                <div class="header">

                    <div class="buts">
                        <button @click="router.back()" class="but ion-activatable ripple-parent  ">
                            <ion-ripple-effect></ion-ripple-effect>
                            <ion-icon :icon="close" />
                        </button>
                    </div>
                    <div class="h_text sp_r" style="margin-top: .1rem;">
                        Ajouter votre fichier
                    </div>
                </div>
                <div class="quests_cont">
                    <div class="simul_inpt" @input="set_text" contenteditable data-placeholder="Description du fichier...">

                    </div>
                    <div class="add_fic">
                        <button @click="click_id('file')" class="is_excep"
                            style="font-size: 1.8rem; margin-right: .2rem; background-color: transparent; color: blue;">
                            <ion-icon :icon="addCircle" style="position: relative; top: .2rem;" />
                        </button>
                        <div @click="click_id('file')" class="is_excep" style="color: blue;">
                            Ajouter ici
                        </div>
                    </div>
                    <div v-if="images.length" class="img_cont">
                        <div v-for="img in images" :key="img.id" style="position: relative;">
                            <button @click="images = images.filter(e => e.id != img.id)" class="g_ac"
                                style="width: 2rem; height: 2rem; background-color: red; border-radius: 100%; position: absolute; top: 1.2rem; right: .7rem;">
                                <ion-icon :icon="close" style="color: white; font-size: 1.2rem;" />
                            </button>
                            <img :src="img.get_file" class="qimg" style="width: 100%;" />
                        </div>
                    </div>
                </div>
                <div class="quests_cta">
                    <button @click="fOpen = true" class="qcta">
                        <div style="margin-right: .3rem; color: white;">
                            Ajouter
                        </div>
                        <div style="color: white;">
                            <ion-icon :icon="arrowForward" style="font-size: 1.4rem; position: relative; top: .12rem; " />
                        </div>
                    </button>
                </div>
            </div>
            <video-player :is-open="vOpen" :url-p="'../../imgs/a.mkv'" @close="vOpen = false" />
            <filter-comp :is-open="fOpen" :typ-o="'fiche'" :is-ent="true" :filt-obj="filtObj" @filt="e => (filtObj as any)[e.typ] = e.val"
                @all_done="e => send_quest()" @close="fOpen = false"></filter-comp>
            <div v-show="false">
                <input id="file" type="file" @change="charg_fiche" accept=".pdf,image/*" />
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped >
.is_excep:active {
    color: rgb(135, 135, 255) !important;
}

.add_fic {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    color: blue;
    padding: .5rem 1vw;
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

*:focus {
    outline: none;
}

.simul_inpt:empty::before {
    content: attr(data-placeholder);
    color: rgba(29, 29, 29, 0.616);
}

.simul_inpt {
    width: 100%;
    min-height: 1.5rem;
    padding: .1rem 2vw;

}

.quests_util:active {
    color: rgb(94, 94, 94);
}

.quests_util {
    font-size: 1.8rem;

}

.quests_bot {
    padding: .5rem 4vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(219, 219, 219);
}

.quests_cont {
    flex-grow: 1;
    height: 100%;
    min-height: 0%;
    padding: 1rem 4vw;
    overflow-y: scroll;
}

.all_cont {
    display: flex;
    flex-direction: column;
    height: 100%;
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
import AudioReader from "@/components/AudioReader.vue";
import { IonPage, IonContent, IonIcon } from "@ionic/vue"
import { addCircle, arrowBack, arrowForward, camera, close, image, mic, play, videocam } from "ionicons/icons";
import VideoPlayer from "@/components/VideoPlayer.vue"
import { computed, ref } from "vue";
import FilterComp from "@/components/FilterComp.vue";
import { access_tok, showLoading, show_alert } from "@/global/utils";
import axios from "axios";
import { useRouter } from "vue-router";

const vOpen = ref(false)

const fOpen = ref(false)

const text = ref("")
const set_text = (e: any) => {
    text.value = e.target.innerHTML;
}

const images = ref<any[]>([])

const click_id = (id: string) => {
    document.getElementById(id)?.click()
}

const router = useRouter()

const charg_fiche = async (e: any) => {
    const load = await showLoading('Enregistrement...')

    const form = new FormData()
    form.append('total', e.target.files.length.toString())

    for (let i = 0; i < e.target.files.length; i++) {
        form.append('file' + i, e.target.files[0])
    }

    try {
        const resp = await axios.post('api/charg_fiche/', form, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`,
                "Content-Type": "multipart/form-data"
            }
        })

        if (resp.data['done']) {
            images.value = images.value.concat(resp.data['result'])
        }
    } catch(e) {
        await show_alert('', 'Une erreur est survenue, veuillez verifier votre connexion et reessayer!')
    }

    load.dismiss()
}

const filtObj = ref({
    annee: '',
    matiere: '',
    typefic: ''
})

const medias = computed(() => {
    const med = {
        images: [] as any[]
    }

    images.value.forEach((element: any) => {
        med.images.push(element.id)
    });


    return med
})

const send_quest = async () => {
    if (text.value.length < 5) return await show_alert('Description vide', "Veuillez au moins ajouter une petite description écrite de votre problème. ");
    
    if ( filtObj.value.annee == '' || filtObj.value.matiere == '' || filtObj.value.typefic == '' ) return await show_alert('', " Vous devez forcément choisir l'année d'étude, la matiere et le type de fichier. ");

    const load = await showLoading('Envoi...')

    try {
        const resp = await axios.post('api/create_fiches/', {
            filt: JSON.stringify(filtObj.value),
            text: text.value,
            images: JSON.stringify(medias.value.images),
        }, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`
            }
        })
        if (resp.data['done']) {
            load.dismiss()
            fOpen.value = false
            router.push('/fiche/' + resp.data['result'] + '/')
        }
    } catch(e) {
        load.dismiss()
        await show_alert('', "Une erreur est survenue lors de l'envoi, veuillez vérifier votre connexion et reéssayer.")
    }

}

</script>
