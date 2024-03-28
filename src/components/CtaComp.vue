<template >
    <ion-modal :initial-breakpoint="0.1" :backdrop-dismiss="false" :backdrop-breakpoint="0.6" :breakpoints="[0.1, 0.3, 0.6, 0.75]" :is-open="isOpen" :can-dismiss="!isOpen">
        <ion-content>
            <div class="cta_header">
                <button @click="$router.push(`/${r_p}`)" class="cta_inpt">
                    Quelle est votre question?
                </button>
            </div>
            <div class="utils">
                <div class="util" >
                    <button @click="$router.push(`/${r_p}?pre=cam`)" class="util_but" :style="{
                        backgroundColor : color + '21',
                        color 
                    }" >
                        <ion-icon :icon="camera"  />
                    </button>
                    <div class="util_text" >
                        Camera
                    </div>
                </div>
                <div class="util" >
                    <button @click="$router.push(`/${r_p}?pre=img`)" class="util_but" :style="{
                        backgroundColor : color + '21',
                        color 
                    }" >
                        <ion-icon :icon="image"  />
                    </button>
                    <div class="util_text" >
                        Image
                    </div>
                </div>
                <div  class="util" >
                    <button @click="$router.push(`/${r_p}?pre=vid`)" class="util_but" :style="{
                        backgroundColor : color + '21',
                        color 
                    }" >
                        <ion-icon :icon="videocam"  />
                    </button>
                    <div class="util_text" >
                        Video
                    </div>
                </div>
                <div class="util" >
                    <button @click="$router.push(`/${r_p}?pre=aud`)" class="util_but" :style="{
                        backgroundColor : color + '21',
                        color 
                    }" >
                        <ion-icon :icon="mic"  />
                    </button>
                    <div class="util_text" >
                        Microphone
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-modal>
</template>

<style scoped >
.util_text {
    font-size: .8rem;
    margin-top: .3rem;
}

.util_but:active {
    transform: scale(1.2);
}

.util_but {
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    font-size: 1.4rem;
    transition: all .2s ease-in-out;
}
.util {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.utils {
    padding: 0vh 4vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-family: 'PT Serif';
}

ion-modal {
    --border-radius: 10px;
    --background: rgb(150, 150, 150);
}

.cta_inpt {
    width: 100%;
    height: 2.8rem;
    font-size: 1.1rem;
    padding: .5vh 4vw;
    border-radius: 15px;
    border-width: 1px;
    border-color: #481c4b;
    border-style: solid;
    background-color: transparent;
    text-align: left;
    color: #919191;
}

.cta_header {
    padding: 3vh 4vw;
}
</style>

<script setup lang="ts" >
import { IonModal, IonContent, IonIcon } from "@ionic/vue"
import { camera, image, mic, videocam } from "ionicons/icons";
import { computed } from "vue";

const props = defineProps({
    isOpen : Boolean,
    color: String,
    isCons : Boolean
})

const r_p = computed(() => {
    return props.isCons ? 'cask' : 'ask'
})

</script>
