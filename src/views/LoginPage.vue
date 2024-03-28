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
                    Connexion
                </div>
                <div class="r_title_d serif">
                    Ravi de vous revoir
                </div>
                <form style="flex-grow: 1;" @submit.prevent="connect()" >
                    <div class="r_form serif">
                        <input class="my_input" type="email" placeholder="Email" v-model="email" required />
                        <input class="my_input" placeholder="Mot de passe" type="password" v-model="password" required />

                    </div>
                    <div class="quests_cta serif">
                        <button type="submit" class="qcta">
                            <div style="margin-right: .3rem; color: white;">
                                Se connecter
                            </div>
                            <div style="color: white;">
                                <ion-icon :icon="arrowForward"
                                    style="font-size: 1.4rem; position: relative; top: .12rem; " />
                            </div>
                        </button>
                    </div>
                </form>

            </div>
            
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
    color: #525252;
    padding: 0rem 5vw;
    margin-top: -.4rem;
    font-size: 1.2rem;
}

.r_title {
    padding: .5rem 5vw;
    font-weight: bold;
    font-size: 1.8rem;
    margin-top: 5rem
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
import { IonPage, IonContent, IonIcon } from "@ionic/vue"
import { arrowBack, arrowForward, chevronExpand, search } from "ionicons/icons";
import { ref } from "vue";
import { showLoading, show_alert, store_obj } from "@/global/utils"
import axios from "axios"
import router from "@/router";

const email = ref("")
const password = ref("")
const idents = ref<{
    email: string,
    password: string
}>()

const connect = async () => {
    const load = await showLoading('Connexion...')
    try {
        const resp = await axios.post('token/', {
            email: email.value,
            password: password.value
        })
        idents.value = {
            email: email.value,
            password: password.value
        }
        await store_obj("tokens", JSON.stringify(resp.data))
        await store_obj('ksjfniusfgiunsfjnfsin', JSON.stringify(idents.value))
        load.dismiss()
        router.replace('/tabs/')
    } catch (e) {
        load.dismiss()
        show_alert('Connexion impossible', "Veuillez vérifier vos identifiants")
    }
}

</script>
