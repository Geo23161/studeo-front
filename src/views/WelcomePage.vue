<template >
    <ion-page>
        <ion-content :scroll-y="false" >
            <div style="display: flex; flex-direction: column; height: 100%;" >
                <div class="header" style="justify-content: space-around !important; margin-top: 1rem;">
                    <img :src="'../../imgs/logo_bg.png'" style="width: 60vw;" />
                </div>
                <div class="middle_img">
                    <img :src="'../../imgs/wel1.svg'" style="width: 75vw;" />
                </div>
                <div class="title serif">
                    La super app des étudiants
                </div>
                <div class="accroc serif">
                    L'outil tout-en-1 pour vous aider à réussir brillamment.
                </div>

                <div class="wbuttons serif">
                    <button @click="router.push('/login')" class="wbut is_login g_ac sp_r">
                        Connexion
                    </button>
                    <button @click="router.push('/register')" class="wbut not_log g_ac">
                        S'Inscrire
                    </button>
                </div>
            </div>

        </ion-content>
    </ion-page>
</template>

<style scoped>
.not_log {
    background-color: #E01D5B;
    color: white;
    flex-grow: 1;
}

.is_login {
    border-color: #481c4b;
    border-width: 1px;
    border-style: solid;
    background-color: transparent;
    color: #481c4b;
}

.wbut {
    padding: .7rem 1rem;
    width: 100%;
    font-size: 1.1rem;
    border-radius: 5px;
    font-weight: bold;
}

.wbuttons {
    padding: 1.2rem 6vw;
    display: flex;
    align-items: center;
    justify-content: center;
}

.accroc {
    padding: .7rem 6vw;
    text-align: center;
    font-size: 1.1rem;
}

.title {
    padding: .1rem 6vw;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
}

.mimg {
    height: 12rem;

}

.middle_img {
    padding: 3rem 5vw;
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
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
}</style>

<script setup lang="ts" >
import { IonPage, IonContent } from "@ionic/vue"
import { useRouter } from "vue-router";

const router = useRouter()


</script>
