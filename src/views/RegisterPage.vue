<template >
    <ion-page>
        <ion-content>
            <div>
                <div class="header" style="margin-top: .6rem;">
                    <div class="buts">
                        <button @click="router.back()" class="but ion-activatable ripple-parent  ">
                            <ion-ripple-effect></ion-ripple-effect>
                            <ion-icon :icon="arrowBack" />
                        </button>
                    </div>
                    <img :src="'../../imgs/logo_bg.png'" style="width: 36vw;" />
                </div>
                <div class="r_title serif">
                    Inscrivez-vous
                </div>
                <div class="r_title_d serif">
                    Prenez une minute pour vous inscrire
                </div>
                <form @submit.prevent="register_user()" >
                    <div class="r_form serif">
                        <input class="my_input" placeholder="Prénom" required v-model="prenom" />
                        <input class="my_input" type="email" placeholder="Email" v-model="email" required />
                        <input class="my_input" placeholder="Mot de passe" type="password" v-model="password" required />
                        <button @click="pOpen = true" type="button" class="my_input is_spec">
                            <div class="txt_spec">
                                {{ annee_name }}
                            </div>
                            <div style="font-size: 1.2rem;">
                                <ion-icon :icon="chevronExpand" />
                            </div>
                        </button>
                    </div>
                    <div class="quests_cta serif">
                        <button class="qcta">
                            <div style="margin-right: .3rem; color: white;">
                                S'Inscrire
                            </div>
                            <div style="color: white;">
                                <ion-icon :icon="arrowForward"
                                    style="font-size: 1.4rem; position: relative; top: .12rem; " />
                            </div>
                        </button>
                    </div>
                </form>

            </div>
            <ion-modal :isOpen="pOpen" @didDismiss="pOpen = false">
                <app-typeahead class="ion-page" title="Veuillez choisir" :items="annees" :selectedItems="annee"
                    @selection-change="(e: any) => (annee = e, pOpen = false)" @selection-cancel="pOpen = false"></app-typeahead>
            </ion-modal>
        </ion-content>
    </ion-page>
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

.txt_spec {
    color: #686868;
}

.is_spec:active {
    background-color: #d8d8d8;
}

.is_spec {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

*:focus {
    outline: none;
}

.my_input {
    width: 100%;
    padding: .9rem 5vw;
    background-color: rgb(238, 238, 238);
    border-radius: 10px;
    border: none;
    font-size: 1.1rem;
    margin: .7rem 0vw;

}

.r_form {
    padding: 2rem 5vw;
    flex-grow: 1;
}

.r_title_d {
    color: #757575;
    padding: .1rem 5vw;
    margin-top: -.4rem;
}

.r_title {
    padding: .9rem 5vw;
    font-weight: bold;
    font-size: 1.8rem;
    margin-top: 1rem
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
import AppTypeahead from "@/components/AppTypeahead.vue";
import { showLoading, show_alert, store_obj } from "@/global/utils";
import { IonPage, IonContent, IonIcon, IonModal } from "@ionic/vue"
import { arrowBack, arrowForward, chevronExpand, search } from "ionicons/icons";
import { computed, ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router";

const pOpen = ref(false)
const prenom = ref("")
const email = ref("")
const password = ref("")
const annee = ref("")
const annee_name = computed(() => {
    return (annees.value.find(e => e.slug == annee.value) !== undefined) ? annees.value.find(e => e.slug == annee.value)?.name : 'Année d\'étude'
})

const annees = ref<{ name: string, slug: string }[]>([])

const get_annees = async () => {
    const load = await showLoading('Patientez...')
    try {
        const resp = await axios.get('api/get_annees/')
        if (resp.data['done']) annees.value = resp.data['result']
    } catch (e) {
        console.log(e)
    }
    load.dismiss()

}

get_annees()
const router = useRouter()

const connect = async () => {
    const load = await showLoading('Connexion...')
    try {
        const resp = await axios.post('token/', {
            email: email.value,
            password: password.value
        })
        const idents =  {
            email: email.value,
            password: password.value
        }
        await store_obj("tokens", JSON.stringify(resp.data))
        await store_obj('ksjfniusfgiunsfjnfsin', JSON.stringify(idents))
        load.dismiss()
        router.replace('/tabs/')
    } catch (e) {
        load.dismiss()
        show_alert('Connexion impossible', "Veuillez vérifier vos identifiants et reessayer.")
    }
}

const register_user = async () => {
    const load = await showLoading('Inscription...')
    if(annee.value == '') return show_alert('', "Veuillez choisir votre année d'étude avant de continuer.")

    try {
        const resp = await axios.post('api/register/', {
            prenom : prenom.value,
            email : email.value,
            password : password.value,
            annee : annee.value
        })
        if (!resp.data['done']) {
            load.dismiss() 
            await show_alert('', 'Cet email est déjà utilisé. Utiliser un autre ou connectez-vous.')
        } else {
            load.dismiss()
            connect()
        }
    } catch(e) {
        await show_alert('', "Une erreur est survenue, verifiez votre connexion et reéssayer.")
        load.dismiss()
    }
}

</script>
