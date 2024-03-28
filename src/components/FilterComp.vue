<template >
    <ion-modal :isOpen="isOpen" :initial-breakpoint="0.5" :breakpoints="[0, 0.4, 0.5, 0.75]" @didDismiss="clos()">
        <ion-content class="ion-padding">
            <div v-if="!isEnt" class="f_header">
                Filtrer selon...
            </div>
            <div v-else class="f_header" >
                Categorie 
            </div>
            <div class="">
                <div class="filter_cont is_up">

                    <div @click="pOpen = true, typ = 'annee'" class="filter ion-activatable ripple-parent">
                        <ion-ripple-effect></ion-ripple-effect>
                        <div>
                            {{ name_of('annee') }}
                        </div>
                        <div style="font-size: 1.5rem;">
                            <ion-icon :icon="chevronExpand" />
                        </div>
                    </div>
                </div>
                <div class="filter_cont">

                    <div @click="pOpen = true, typ = 'matiere'" class="filter ion-activatable ripple-parent">
                        <ion-ripple-effect></ion-ripple-effect>
                        <div>
                            {{ name_of('matiere') }}
                        </div>
                        <div style="font-size: 1.5rem;">
                            <ion-icon :icon="chevronExpand" />
                        </div>
                    </div>
                </div>
                <div v-if="typO != 'aide'" class="filter_cont">

                    <div @click="pOpen = true, typ = 'typefic'" class="filter ion-activatable ripple-parent">
                        <ion-ripple-effect></ion-ripple-effect>
                        <div>
                            {{ name_of('typefic') }}
                        </div>
                        <div style="font-size: 1.5rem;">
                            <ion-icon :icon="chevronExpand" />
                        </div>
                    </div>
                </div>

                <div class="quests_cta">
                    <button @click="all_dona_w()" class="qcta">
                        <div style="margin-right: .3rem; color: white;">
                            Terminer
                        </div>
                    </button>
                </div>
            </div>


        </ion-content>
    </ion-modal>
    <ion-modal :isOpen="pOpen" @didDismiss="pOpen = false">
        <app-typeahead class="ion-page" title="Veuillez choisir" :items="items" :selectedItems="(filtObj as any)[typ]"
            @selection-change="(e : any) => (send_filt(e), pOpen = false)" @selection-cancel="pOpen = false"></app-typeahead>
    </ion-modal>
</template>

<style scoped>
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
.is_up {
    margin-top: .6rem;
}

.filter {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: .4rem 3vw;
    font-size: 1.2rem;
    font-family: 'PT Serif';
    border-radius: 10px;
    background-color: #491d4d1f;
}

.filter_cont {
    padding: .5rem 5vw;
}

.f_header {
    padding: .6rem;
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
}
</style>

<script setup lang="ts" >

import { IonModal, IonContent, } from "@ionic/vue"
import { chevronExpand } from "ionicons/icons";
import { computed, ref } from "vue";
import { FilterElt } from "@/global/types"
import AppTypeahead from "./AppTypeahead.vue"
import axios from "axios";
import { access_tok, show_alert } from "@/global/utils";
import { useRouter } from "vue-router";

const router = useRouter()

const props = defineProps({
    isOpen: Boolean,
    isepr: Boolean,
    isEnt : Boolean,
    isCons : Boolean,
    filtObj : Object,
    typO : String
})

const annees = ref<FilterElt[]>([])
const matiers = ref<FilterElt[]>([])
const typefics = ref<FilterElt[]>([])


const get_filters = async () => {
    try {
        const resp = await axios.get('api/get_filters/?typ=' + props.typO, {
            headers : {
                Authorization : `Bearer ${await access_tok(router, undefined)}`
            }
        })
        if(resp.data['done']) {
            const res = resp.data['result']
            annees.value = res.annees
            matiers.value = res.matieres
            typefics.value = res.typefics
        }
    } catch(e) {
        await show_alert('', "Une erreur est survenue lors de la récupération des éléments du filtre.")

    }
}

get_filters()

const emit = defineEmits(['close', 'filt', 'all_done'])
const clos = () => {
    emit("close")
}

const send_filt = (slug : string) => {
    emit('filt', {typ : typ.value, val : slug})
}

const all_dona_w = () => {
    let annee_n = ""
    let matiere_n = ""
    let typefic_n = ""
    let global_n = ""
    if (get_elt('annee')) {
        annee_n = name_of('annee')
    }
    if (get_elt('matiere')) {
        matiere_n = name_of('matiere')
    } 
    if(get_elt('typefic')) {
        typefic_n = name_of('typefic')
    }
    if (annee_n == "" && matiere_n == "" && typefic_n == "") global_n = "Filtrer"
    for(const _n of [annee_n, matiere_n, typefic_n]) global_n += ( ( global_n != '' ? ' / ' : '') + _n)

    emit('all_done', global_n)
}

const pOpen = ref(false)

const typ = ref('annee')

const items = computed(() => {
    if(typ.value == 'annee') return annees.value
    else if (typ.value == 'matiere') return matiers.value
    else return typefics.value
})

const default_names = {
    annee : "Année d'étude",
    matiere : "Matière",
    typefic : "Type"
}

const get_elt = (typp : string) => {
    return (typp == 'annee' ? annees : (typp == 'matiere' ? matiers : typefics)).value.find(el => el.slug == (props.filtObj as any)[typp])
}

const name_of = ( typp : string ) => {
    const elt = (typp == 'annee' ? annees : (typp == 'matiere' ? matiers : typefics)).value.find(el => el.slug == (props.filtObj as any)[typp])
    return elt ? elt.name : (default_names as any)[typp]
}

</script>
