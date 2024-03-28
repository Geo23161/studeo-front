<template >
    <ion-modal :isOpen="isOpen">
        <ion-content>
            <div class="body">
                <div class="sbody">
                    <div class="header">
                        <div class="menu" @click="close_()">
                            <ion-icon :icon="close" />
                        </div>
                        <div>
                            <div style="font-weight: bold; font-size: 1.1rem">
                                Nouveau forfait
                            </div>
                        </div>
                    </div>
                    <div>

                        <div v-if="abons.length" class="mbody">
                            <div class="mtitle">
                                Choississez le forfait qui vous convient
                            </div>
                            <div v-for="abn in abons" :key="abn.name" class="abon">
                                <div class="atitle">
                                    <span style="font-weight: bold; font-size: 2.8vh ; position: relative; top: .1vh;">{{ abn.name }}</span>
                                </div>
                                <div class="price">
                                    <div class="rprice">
                                        {{ abn.amount }}F
                                    </div>
                                    <div class="nmo">
                                        par mois
                                    </div>
                                </div>
                                <div style="padding: 0.6vh 1vh;">
                                    <button @click="opne_kki_(abn)" class="activate" :class="['silver']">
                                        Activer
                                    </button>
                                </div>
                                <div class="features">
                                    <div class="ftitle">
                                        Avantages
                                    </div>
                                    <div v-for="key in abn.features" :key="key" class="feats">
                                        <ion-icon :icon="checkmark" :color="'primary'"></ion-icon> {{ key }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="global_spinner">
                                <div>
                                    <ion-spinner name="crescent">

                                    </ion-spinner>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </ion-content>
    </ion-modal>
</template>

<style scoped >
.mbut {
    padding: 0.7rem;
    font-size: 2.5vh;
    text-align: center;
    width: 100%;
    border-radius: 25px;
    background-image: linear-gradient(to right, #fb4073 90%, #fa84a3);
    color: white;
    font-weight: bold;
}

.butt {
    padding-top: 5vh;
}

.rinput {
    border: none;
    font-size: 1rem;
    color: rgb(44, 44, 44);
    background-color: transparent;
    flex-grow: 1;
}

* :focus {
    outline: none;
}

.icon_f {
    font-size: 1.2rem;
    margin-right: 1.2rem;
    color: rgb(54, 54, 54);
}

.minput {
    padding: 1.2rem 0.4rem;
    display: flex;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: rgb(179, 179, 179);
    border-bottom-style: solid;
}

.forms {
    padding-top: 4vh;
}

.no_img {
    padding-top: 1vh;
    display: flex;
    justify-content: space-around;
}

.tbody {
    padding: 1.2vh 0.2vh;
}

.silver_plus {
    background-color: #fc9e32;
    color: white;
}

.global_spinner {
    padding-top: 46vh;
    display: flex;
    justify-content: space-around;
}

.feats {
    padding-top: 1.5vh;
}

.ftitle {
    font-weight: bold;
    font-size: 2vh;

}

.features {
    padding-top: 3vh;
}

.vip:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.527), transparent);
    background-color: #fc1955;
}

.vip {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: #edfc19 !important;
    color: black;
}

.golden {
    background: linear-gradient(to left, #c09433, #faf298, #c09433);
}

.silver:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.651), transparent);
    background-color: #5d28f0;
}

.silver {
    background-color: #5d28f0;
    color: white;
}

.free:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.651), transparent);
    background-color: red;
}

.free {
    background-color: red;
    color: white;
}

.activate {
    width: 100%;
    padding: 1vh 2vh;
    font-size: 2.6vh;
    font-weight: bold;
    border-radius: 10px;
}

.nmo {
    color: rgb(105, 105, 105);
    display: inline-block;
    margin-left: 0.6rem;
}

.rprice {
    font-weight: bolder;
    font-size: 3.8vh;
    display: inline-block;
}

.price {
    margin-top: 4vh;

}

.atitle {
    font-size: 2.5vh;
}

.abon {
    padding: 3vh 2vh;
    border-radius: 15px;
    background-color: white;
    margin-bottom: 3vh;
}

.mtitle {
    font-size: 2.2vh;
    font-weight: bold;
    text-align: center;
    padding: 1rem;
}

.mbody {
    padding-top: 1vh;
}

.menu:active,
.menu_:active {
    box-shadow: none;
    background: white;
    color: #fb4073;
}

.menu {
    padding-top: 0.4rem;
    padding-bottom: 0.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: #fb4073;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0 10px 15px -3px #ff595965, 0 4px 6px -2px #17a74929;
}

.header {
    padding-bottom: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sbody {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
}

.body {
    min-height: 100vh;
    width: 100%;
    padding: 10px;
    background-image: linear-gradient(to right, #f5f3fd, #e9e4ff 60%, #f5f3fd);
    font-family: "Poppins";
    overflow: scroll;
}
</style>

<script setup lang="ts" >
import { IonModal, IonContent, IonIcon, IonSegment, IonSegmentButton, IonLabel, IonToast, ToastButton } from "@ionic/vue"
import { checkmark, close, personAdd, refresh } from "ionicons/icons";
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import { access_tok, get_obj, show_alert, store_obj, showLoading } from "@/global/utils";
import { addKkiapayListener, openKkiapayWidget } from "kkiapay"
import { useUserStore } from "@/global/pinia"
import { storeToRefs } from "pinia";


const props = defineProps({
    isOpen: Boolean,
})

const emit = defineEmits(['close'])

const close_ = () => {
    emit('close')
}

const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)
const { user } = userStore

const abons = ref<any[]>([])
const api = ref("")
const is_dev = ref(true)

const get_abons = async () => {
    const load = await showLoading('Loading...')
    try {
        const resp = await axios.get('api/get_abons/', {
            headers: {
                Authorization: `Bearer ${await access_tok(router, load)}`
            }
        })
        if (resp.data['done']) {
            abons.value = resp.data['result']
            api.value = resp.data['other'][0]
            is_dev.value = resp.data['other'][1]
        }
    } catch(e) {
        await show_alert('', 'Une erreur est survenue lors de la recuperation des données, veuillez verifier votre connexion et reéssayer')
    }
    load.dismiss()
}

get_abons()

const opne_kki_ = async (abn : any) => {
    const load = await showLoading('Paientez...')
    setTimeout(() => {
        load.dismiss()
    }, 2400)
    openKkiapayWidget({
        amount: abn.amount,
        api_key: api.value,
        sandbox: is_dev.value,
    })

    addKkiapayListener('success', (resp : any)  => {

        activ_abon(abn, abn.amount, resp.transactionId)
        
    })
}

const activ_abon = async (typ : any, amount : any, transactionId : any) => {
    const load = await showLoading('Activation...')
    
    try {
        const resp = await axios.post('api/activ_abon/', {
            typ : JSON.stringify(typ),
            transactionId,
            amount
        }, {
            headers : {
                Authorization :  `Bearer ${await access_tok(router, load)}`
            }
        })
        if(resp.data['done']) {
            user.value.cur_abn = resp.data['result']
            close_()
        }
    } catch(e) {
        await show_alert('', 'Une erreur est survenue, vérifiez votre connexion et reéssayer.')
    }
    load.dismiss()
}



</script>
