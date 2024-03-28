<template >
    <ion-page >
        <ion-content >
            <div class="body_all" >
                <div style="display: flex; justify-content: space-around; " >
                    <div >
                        <ion-spinner :name="'crescent'" />
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped >
.body_all {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>

<script setup lang="ts" >
import { IonPage, IonContent, IonSpinner } from "@ionic/vue"
import { get_obj } from "@/global/utils"
import { useRouter } from "vue-router";

const router = useRouter()

const check_connect = async () => {
    const cred = await get_obj('ksjfniusfgiunsfjnfsin')
    if(cred)  router.replace('/tabs')
    else router.push('/welcome')
}

check_connect()
</script>
