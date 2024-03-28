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
                        Poser votre question
                    </div>
                </div>
                <div class="quests_cont">
                    <div @input="set_text" id="inptt" class="simul_inpt" contenteditable data-placeholder="Ecrivez ici...">

                    </div>
                    <div v-if="audio" class="audio_cont">
                        <audio-reader :size="audio.size.toString()" :url="audio.get_file" />
                    </div>
                    <div v-if="audio" class="add_fic  ">
                        <button @click="audio = undefined" class="is_excep"
                            style="font-size: 1.8rem; margin-right: .2rem; background-color: transparent; color: blue;">
                            <ion-icon :icon="trash" style="position: relative; top: .2rem;" />
                        </button>
                        <div @click="audio = undefined" class="is_excep" style="color: blue;">
                            Suppimer l'audio
                        </div>
                    </div>
                    <div v-if="images.length" class="img_cont">
                        <div v-for="img in images" :key="img.id" style="position: relative;">
                            <button class="g_ac" @click="images = images.filter(e => e.id != img.id)"
                                style="width: 2rem; height: 2rem; background-color: red; border-radius: 100%; position: absolute; top: 1.2rem; right: .7rem;">
                                <ion-icon :icon="close" style="color: white; font-size: 1.2rem;" />
                            </button>
                            <img :src="img.get_file" class="qimg" style="width: 100%;" />
                        </div>
                    </div>
                    <div v-if="videos.length" class="img_cont">
                        <div v-for="img in videos" :key="img.id" style="position: relative;">
                            <button class="g_ac" @click="videos = videos.filter(e => e.id != img.id)"
                                style="width: 2rem; height: 2rem; background-color: red; border-radius: 100%; position: absolute; top: 1.2rem; right: .7rem;">
                                <ion-icon :icon="close" style="color: white; font-size: 1.2rem;" />
                            </button>
                            <button @click="cur_vid = img, vOpen = true" class="play_but">
                                <ion-icon :icon="play" />
                            </button>
                            <img :src="img.get_preview" class="qimg" style="width: 100%;" />
                        </div>
                    </div>
                </div>
                <div class="quests_cta">
                    <button @click="fOpen = true" class="qcta">
                        <div style="margin-right: .3rem; color: white;">
                            Résoudre
                        </div>
                        <div style="color: white;">
                            <ion-icon :icon="arrowForward" style="font-size: 1.4rem; position: relative; top: .12rem; " />
                        </div>
                    </button>
                </div>
                <div class="quests_bot">
                    <div @click="click_id('cam')" class="sp_r quests_util">
                        <ion-icon :icon="camera" />
                    </div>
                    <div @click="click_id('img')" class="sp_r quests_util">
                        <ion-icon :icon="image" />
                    </div>
                    <div @click="click_id('vid')" class="sp_r quests_util">
                        <ion-icon :icon="videocam" />
                    </div>
                    <div @click="rOpen = true" class="sp_r quests_util">
                        <ion-icon :icon="mic" />
                    </div>
                </div>
            </div>
            <video-player v-if="cur_vid" :is-open="vOpen" :url-p="cur_vid.get_file" @close="vOpen = false" />
            <filter-comp :is-open="fOpen" :typ-o="'conseil'" :is-ent="true" :filt-obj="filtObj" @filt="e => (filtObj as any)[e.typ] = e.val"
                @all_done="e => send_quest()" @close="fOpen = false"></filter-comp>
            <choose-comp :is-open="cOpen" @close="cOpen = false" />
            <recorder-comp :is-open="rOpen" @close="rOpen = false"
                @done="(e: any) => (audio = undefined ,typ_file = 'aud', size = e.size, rOpen = false, charg_file(undefined, e.blob))" />
            <div style="display: none;">
                <input id="cam" type="file" accept="image/*" capture @change="e => (typ_file = 'img', charg_file(e))"
                    multiple />
                <input id="img" type="file" accept="image/*" @change="e => (typ_file = 'img', charg_file(e))" />
                <input id="vid" type="file" accept="video/*" @change="e => (typ_file = 'vid', set_previews(e))" />
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
import { IonPage, IonContent, IonIcon, onIonViewDidEnter } from "@ionic/vue"
import { arrowBack, arrowForward, camera, close, image, mic, play, trash, videocam } from "ionicons/icons";
import VideoPlayer from "@/components/VideoPlayer.vue"
import { computed, ref } from "vue";
import FilterComp from "@/components/FilterComp.vue";
import ChooseComp from "@/components/ChooseComp.vue";
import { extract_frames, access_tok, show_alert } from "@/global/utils"
import { showLoading } from "@/global/utils";
import axios from "axios";
import router from "@/router";
import RecorderComp from "@/components/RecorderComp.vue";
import { useRoute } from "vue-router";


const vOpen = ref(false)
const cOpen = ref(false)
const fOpen = ref(false)
const rOpen = ref(false)

const text = ref('')
const images = ref<any[]>([])
const videos = ref<any[]>([])
const audio = ref()

const set_text = (e: any) => {
    text.value = e.target.innerHTML;
}

const cur_vid = ref()
const typ_file = ref('')
const size = ref(0)

const click_id = (id: string) => {
    document.getElementById(id)?.click()
}

const charg_file = async (e: any, fil?: any) => {
    const files = [] as any[]
    
    if (!e) {
        files.push(fil)
    } else
    
    for ( const f of e.target.files ) {
    	files.push(f)
    }

    const form = new FormData()
    for (let i = 0; i < files.length; i++) {
        form.append('file' + i, files[i])
    }
    form.append('typ', typ_file.value)
    form.append('total', files.length.toString())

    if (typ_file.value == 'aud') {
        form.append('size', size.value.toString())
    }
    if (typ_file.value == 'vid') {
        for (let i = 0; i < previews.value.length; i++) {
            form.append('preview' + i, previews.value[i])
        }
    }

    const load = await showLoading('Enregistrement...')
    try {
        const resp = await axios.post('api/charg_file/', form, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`,
                "Content-Type" : "multipart/form-data"
            }
        })
        if (resp.data['done']) {
            if (typ_file.value == 'img') images.value = images.value.concat(resp.data['result'])
            else if (typ_file.value == 'vid') videos.value = videos.value.concat(resp.data['result'])
            else audio.value = resp.data['result'][0]
        }
    } catch (e) {
        await show_alert('Impossible de continuer', "Une erreur est survenue lors de l'enregistrement, veuillez vérifier votre connexion internet.")
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
        audio: 0,
        images: [] as any[],
        videos: [] as any[]
    }

    if (audio.value) med.audio = audio.value.id
    images.value.forEach((element: any) => {
        med.images.push(element.id)
    });

    videos.value.forEach((element: any) => {
        med.videos.push(element.id)
    });

    return med
})

const previews = ref<Blob[]>([])

const set_previews = (e : any) => {
	const files = [] as any[]
    
	    for ( const f of e.target.files ) {
	    	files.push(f)
	    }
	for (let i = 0; i < files.length; i++) {
            extract_frames(files[i], (b) => {
            	previews.value.push(b as Blob)
            	charg_file(e)
            })
            
        }
        
            	
        
}

const send_quest = async () => {
    if (text.value.length < 5) return await show_alert('Description vide', "Veuillez au moins ajouter une petite description écrite de votre problème. ");
    
    if ( filtObj.value.annee == '' ||  filtObj.value.typefic == '' ) return await show_alert('', "Vous devez forcément choisir l'année d'étude, et le type de conseil demandé.");
    
    const load = await showLoading('Envoi...')

    try {
        const resp = await axios.post('api/create_conseils/' + (id_epr.value ? '?epr=' + id_epr.value  : ''), {
            filt: JSON.stringify(filtObj.value),
            text: text.value,
            audio: JSON.stringify(medias.value.audio),
            images: JSON.stringify(medias.value.images),
            videos: JSON.stringify(medias.value.videos)
        }, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`
            }
        })
        if (resp.data['done']) {
            load.dismiss()
            fOpen.value = false
            router.replace('/cquest/' + resp.data['result'] + '/')
        }
    } catch(e) {
        load.dismiss()
        await show_alert('', "Une erreur est survenue lors de l'envoi, veuillez vérifier votre connexion et reéssayer.")
    }

}

const route = useRoute()
const id_epr= ref(0)

onIonViewDidEnter(() => {
    const pre = route.query['pre'] as string

    setTimeout(() => {
        if (pre ) {
        if(pre != 'aud') click_id(pre)
        else rOpen.value = true
    }
    document.getElementById('inptt')?.focus()
    }, 500)

    const epr =  route.query['epr'] as string
    if(epr) id_epr.value = parseInt(epr)
    
    

})


</script>
