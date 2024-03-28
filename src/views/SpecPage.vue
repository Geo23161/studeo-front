<template >
    <ion-page>
        <ion-content>
            <div class="header">
                <img :src="'../../imgs/logo_bg.png'" style="width: 36vw;" />
                <div class="buts">
                    <button class="but ion-activatable ripple-parent  ">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-icon :icon="search" />
                    </button>
                </div>
            </div>
            <div class="divid">

            </div>
            <div class="header">

                <div class="buts">
                    <button class="but ion-activatable ripple-parent  ">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-icon :icon="arrowBack" />
                    </button>
                </div>
                <div class="h_text" style="margin-top: .1rem;">
                    Services demandés
                </div>
            </div>
            <div class="divid">

            </div>
            <div v-if="false" class="serif" >
                <div class="empty">
                    <img :src="'../../imgs/no_data.svg'" style="height: 12rem;" />
                </div>
                <div style="margin-top: .5rem; text-align: center; padding: .5rem 5vw ; font-weight: bold; " >
                    Vous n'avez encore demandés aucun services particuliers. Retournez à la page d'acceuil pour choisir un service
                </div>
            </div>
            <div  v-else >
                <div class="serv_cont serif" >
                    <div class="serv" >
                        <div style=" padding-bottom: .5rem;" >
                            <button class="serv_status is_over" >
                                En cours
                            </button>
                        </div>
                        <div class="serv_title" >
                            Aide à la préparation d'un examen
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped >
.not_over {

}
.is_over {
    background-color: #74eff3;
    color: black;
}
.serv_status {
    padding: .5rem;
    border-radius: 5px;
    
}
.serv_title {
    font-size: 1.2rem;
    font-weight: bold;
}
.serv {
    padding: .8rem 5vw;
    border-radius: 15px;
    background-color: rgb(241, 241, 241);
}
.serv_cont {
    padding: 1rem 3vw;


}
.empty {
    display: flex;
    justify-content: space-around;
    padding-top: 18vh;
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
import { IonPage, IonContent } from "@ionic/vue"
import { arrowBack, search } from "ionicons/icons";
</script>