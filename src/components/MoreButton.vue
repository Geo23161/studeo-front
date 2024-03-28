<template>
    <div class="serif " style="display: flex; justify-content: space-around; padding: 1rem;" >

        <button v-if="state == 'show'" class="ion-activatable ripple-parent " @click="click()" style="padding: .6rem 1rem; background-color: #481c4b38; border-radius: 15px; padding-bottom: .8rem !important; " >
        	<ion-ripple-effect></ion-ripple-effect>
            Voir plus <ion-icon :icon="add" style="font-size: 1rem; position: relative; top: .2rem;" ></ion-icon>
        </button>
        
        <div v-if="state == 'load'" >
        	<ion-spinner :name="'crescent'" ></ion-spinner>
        </div>

    </div>
</template>

<script setup lang="ts" >
import { IonIcon, IonRippleEffect, IonSpinner } from "@ionic/vue"
import { add } from "ionicons/icons";

const props = defineProps({
	state : String
})

const emit = defineEmits(['clicked'])

const click = () => {
    emit('clicked')
}

</script>
