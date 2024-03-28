<template >
    <ion-modal :is-open="isOpen">
        <ion-content :scroll-y="false">
            <div style="height: 100%; display: flex; flex-direction: column;">
                <div class="header serif">

                    <div class="buts">
                        <button @click="clos()" class="but ion-activatable ripple-parent  ">
                            <ion-ripple-effect></ion-ripple-effect>
                            <ion-icon :icon="arrowBack" />
                        </button>
                    </div>
                    <div class="tit">
                        Choix de réponse
                    </div>
                </div>
                <div class="ch_cont serif">
                    <div>
                        <div style="display: flex; justify-content: space-around; padding: 1.5rem;" >
                            <img :src="'../../imgs/teacher.svg'" style="width: 50vw;" />
                        </div>
                        <div class="title_ch">
                            A qui souhaitiez-vous présenter le problème?
                        </div>
                        
                        <div class="choo_cont">
                            <div class="choo ">
                                <div class="img_choo img_all sp_r" :style="{
                                    backgroundImage: `url('${'../../imgs/expert.png'}')`
                                }">

                                </div>
                                <div class="">
                                    <div style="font-size: 1.2rem; font-weight: bold;">
                                        Expert studeo
                                    </div>
                                    <div style="padding-top: .3rem; font-size: 1.02rem; ">
                                        Réponse en moins de 30min
                                    </div>
                                </div>
                            </div>
                            <div class="choo" style="margin-top: 1.3rem;">
                                <button class="img_choo img_all sp_r is_icon" >
                                    <ion-icon :icon="people" />
                                </button>
                                <div class="">
                                    <div style="font-size: 1.2rem; font-weight: bold;">
                                        Communauté studeo
                                    </div>
                                    <div style="padding-top: .3rem; font-size: 1rem; ">
                                        Réponse d'autres utilisateurs
                                    </div>
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
.is_icon {
    background-color: #2DCF4249;
    font-size: 2.2rem;
    color: #2DCF42;
}
.img_choo {
    width: 4rem;
    min-width: 4rem;
    height: 4rem;
    border-radius: 10px;
}

.choo {
    box-shadow: 0 10px 15px -3px #481c4b65, 0 4px 6px -2px #17a74929;
    padding: .5rem 2vw;
    border-radius: 10px;
    display: flex;
    align-items: center;

}

.choo_cont {
    padding: .6rem 6vw;
}

.title_ch {
    font-size: 1.4rem;
    font-weight: bold;
    padding: .8rem 6vw;
    text-align: center;
}

.ch_cont {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.tit {
    font-size: 1.3rem;
    font-weight: bold;
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
import { IonModal, IonContent, IonIcon } from "@ionic/vue"
import { arrowBack, people } from "ionicons/icons";

const props = defineProps({
    isOpen: Boolean
})
const emit = defineEmits(['close'])

const clos = () => {
    emit('close')
}

</script>