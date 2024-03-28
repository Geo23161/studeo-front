<template>
  <ion-page>
    <ion-content :fullscreen="true" :scroll-y="false">
      <div class="header">
        <img :src="'../../imgs/logo_bg.png'" style="width: 36vw;" />
        <div class="buts">
          <button @click="router.push('/search')" class="but ion-activatable ripple-parent  ">
            <ion-ripple-effect></ion-ripple-effect>
            <ion-icon :icon="search" />
          </button>
        </div>
      </div>
      <div class="serif" style="max-height: 100%; overflow-y: scroll; padding-bottom: 5rem;">
        <div class="profil_ac serif">
          <img :src="'../../imgs/man.svg'" style="height: 4rem; margin-right: 1.2rem; " />
          <div style="padding-top: .5rem;">
            <div style="font-size: 1.3rem; font-weight: bold; ">
              {{ user?.prenom }}
            </div>
            <div style="font-size: 1rem;">
              {{ user?.get_annee.name }}
            </div>
          </div>
        </div>
        <div class="wallet_cont serif">
          <div class="wallet">
            <div class="w_title">
              Mon forfait
            </div>
            <div style="font-size: 1.4rem; margin-top: .5rem;">
             Forfait {{ user?.cur_abn.get_typ.name }} - <span v-if="user?.cur_abn.state" style="color: #2DCF42;" > En cours</span> <span v-else style="color: #E01D5B;" > Expiré</span>
            </div>
            <button @click="pOpen = true" class="serv_status is_over">
              {{ user?.cur_abn.state ? 'Changer' : 'Activer' }}
            </button>
          </div>
        </div>

        <div>
          <div class="serif"
            style="font-size: 1.2rem; text-align: center; padding: .3rem; margin-top: .5rem; font-weight: bold;">
            Mes demandes
          </div>

          <div class="menu_cont ">
            <div @click="router.push('/mes_aide')" class="hc_but serif ripple-parent ion-activatable">
              <ion-ripple-effect ></ion-ripple-effect>
              <div style="display: flex; align-items: center;">
                <button class="profil_d sp_r" style="background-color: #2dcf434b;">
                  <ion-icon :icon="helpCircle" style="font-size: 1.4rem; color: #2DCF42;" />
                </button>
                <div class="hc_but_text">
                  Aides cours/exercices
                </div>
              </div>
              <button style="font-size: 1.9rem; background-color: transparent ; position: relative; top: .1.3rem;">
                <ion-icon :icon="chevronForward" />
              </button>
            </div>
          </div>
          <div class="menu_cont">
            <div @click="router.push('/mes_conseil')" class="hc_but serif ripple-parent ion-activatable">
              <ion-ripple-effect ></ion-ripple-effect>
              <div style="display: flex; align-items: center;">
                <button class="profil_d sp_r" style="background-color: #EFD1094b;">
                  <ion-icon :icon="compass" style="font-size: 1.5rem; color: #EFD109;" />
                </button>
                <div class="hc_but_text">
                  Conseils et Opportunités
                </div>
              </div>
              <button style="font-size: 1.9rem; background-color: transparent ; position: relative; top: .1.3rem;">
                <ion-icon :icon="chevronForward" />
              </button>
            </div>
          </div>
        </div>

        <div style="margin-top: 1rem;">
          <div class="serif"
            style="font-size: 1.2rem; text-align: center; padding: .3rem; margin-top: .5rem; font-weight: bold;">
            Mes contributions
          </div>

          <div class="menu_cont">
            <div @click="router.push('/mes_fiche')" class="hc_but serif ripple-parent ion-activatable">
              <ion-ripple-effect ></ion-ripple-effect>
              <div style="display: flex; align-items: center;">
                <button class="profil_d sp_r" style="background-color: #E01D5B4b;">
                  <ion-icon :icon="book" style="font-size: 1.1rem; color: #E01D5B; position: relative; top: .1rem;" />
                </button>
                <div class="hc_but_text">
                  Epreuves/fiches ajoutés
                </div>
              </div>
              <button style="font-size: 1.9rem; background-color: transparent ; position: relative; top: .1.3rem;">
                <ion-icon :icon="chevronForward" />
              </button>
            </div>
          </div>

          <div v-if="contact?.is_staff" class="menu_cont">
            <div @click="router.push('/add')" class="hc_but serif ripple-parent ion-activatable">
              <ion-ripple-effect ></ion-ripple-effect>
              <div style="display: flex; align-items: center;">
                <button class="profil_d sp_r" style="background-color: #E01D5B4b;">
                  <ion-icon :icon="addCircle" style="font-size: 1.1rem; color: #E01D5B; position: relative; top: .1rem;" />
                </button>
                <div class="hc_but_text">
                  Ajouter des ressources
                </div>
              </div>
              <button style="font-size: 1.9rem; background-color: transparent ; position: relative; top: .1.3rem;">
                <ion-icon :icon="chevronForward" />
              </button>
            </div>
          </div>
          <div v-if="contact?.is_staff" class="menu_cont">
            <div @click="router.push('/staff')" class="hc_but serif ripple-parent ion-activatable">
              <ion-ripple-effect ></ion-ripple-effect>
              <div style="display: flex; align-items: center;">
                <button class="profil_d sp_r" style="background-color: rgba(0, 0, 0, 0.199);">
                  <ion-icon :icon="eye" style="font-size: 1.1rem; color: black; position: relative; top: .1rem;" />
                </button>
                <div class="hc_but_text">
                  Dernières demandes
                </div>
              </div>
              <button style="font-size: 1.9rem; background-color: transparent ; position: relative; top: .1.3rem;">
                <ion-icon :icon="chevronForward" />
              </button>
            </div>
          </div>

          <!---- <div class="menu_cont">
            <div @click="router.push('/aides_answers')" class="hc_but serif ripple-parent ion-activatable">
              <ion-ripple-effect ></ion-ripple-effect>
              <div style="display: flex; align-items: center;">
                <button class="profil_d sp_r" style="background-color: #2dcf434b;">
                  <ion-icon :icon="helpCircle" style="font-size: 1.4rem; color: #2DCF42;" />
                </button>
                <div class="hc_but_text">
                  Reponse aux aides
                </div>
              </div>
              <button style="font-size: 1.9rem; background-color: transparent ; position: relative; top: .1.3rem;">
                <ion-icon :icon="chevronForward" />
              </button>
            </div>
          </div> 
          <div class="menu_cont">
            <div @click="router.push('/conseils_answers')" class="hc_but serif ripple-parent ion-activatable">
              <ion-ripple-effect ></ion-ripple-effect>
              <div style="display: flex; align-items: center;">
                <button class="profil_d sp_r" style="background-color: #EFD1094b;">
                  <ion-icon :icon="compass" style="font-size: 1.5rem; color: #EFD109;" />
                </button>
                <div class="hc_but_text">
                  Conseils donnés
                </div>
              </div>
              <button style="font-size: 1.9rem; background-color: transparent ; position: relative; top: .1.3rem;">
                <ion-icon :icon="chevronForward" />
              </button>
            </div>
          </div>  ---->

        </div>

        <div style="margin-top: 1rem;">
          <div class="serif"
            style="font-size: 1.2rem; text-align: center; padding: .3rem; margin-top: .5rem; font-weight: bold;">
            Autres options
          </div>

          <div class="menu_cont">
            <div  class="hc_but serif ripple-parent ion-activatable" @click="hOpen = true" >
              <ion-ripple-effect ></ion-ripple-effect>
              <div style="display: flex; align-items: center;">
                <button class="profil_d sp_r" style="background-color: #9c2dcf4b;">
                  <ion-icon :icon="wallet" style="font-size: 1.2rem; color: #9c2dcf;" />
                </button>
                <div class="hc_but_text">
                  Historiques de paiement
                </div>
              </div>
              <button style="font-size: 1.9rem; background-color: transparent ; position: relative; top: .1.3rem;">
                <ion-icon :icon="chevronForward" />
              </button>
            </div>
          </div>
          
          <div v-if="contact" class="menu_cont">
            <div  class="hc_but serif ripple-parent ion-activatable" @click="open_norm_lnk(contact.whatsapp)" >
              <ion-ripple-effect ></ion-ripple-effect>
              <div style="display: flex; align-items: center;">
                <button class="profil_d sp_r" style="background-color: #0fa80a4b;">
                  <ion-icon :icon="logoWhatsapp" style="font-size: 1.2rem; color: #0fa80a;" />
                </button>
                <div class="hc_but_text">
                  Contactez-nous sur whatsapp
                </div>
              </div>
              <button style="font-size: 1.9rem; background-color: transparent ; position: relative; top: .1.3rem;">
                <ion-icon :icon="chevronForward" />
              </button>
            </div>
          </div>
          <div v-if="contact" class="menu_cont">
            <div  class="hc_but serif ripple-parent ion-activatable" @click="open_norm_lnk(contact.privacy)" >
              <ion-ripple-effect ></ion-ripple-effect>
              <div style="display: flex; align-items: center;">
                <button class="profil_d sp_r" style="background-color: #d118184b;">
                  <ion-icon :icon="informationCircle" style="font-size: 1.2rem; color: #d11818;" />
                </button>
                <div class="hc_but_text">
                  Politique de confidentialité
                </div>
              </div>
              <button style="font-size: 1.9rem; background-color: transparent ; position: relative; top: .1.3rem;">
                <ion-icon :icon="chevronForward" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <abon-comp :is-open="pOpen" @close="pOpen = false" />
      <pay-history :is-open="hOpen" @close="hOpen = false" />
    </ion-content>
  </ion-page>
</template>

<style scoped >
.menu_cont {
  padding: .4rem 6vw;
}

.hc_but_text {
  font-size: 1.1rem;
  font-weight: bold;
}

.profil_d {
  width: 2.1rem;
  height: 2.1rem;

  border-radius: 10px;
}

.hc_but {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .3rem 2vw;
  border-radius: 15px;
  margin-top: -.2rem;
  border-style: solid;
  border-color: #481c4b81;
  border-width: 1px;
}

.is_over {
  background-color: #74eff3;
  color: black;
}

.serv_status {
  padding: .5rem;
  border-radius: 5px;
  margin-top: .5rem;
  font-size: 1.1rem;
}

.w_title {
  font-size: 1rem;
  font-weight: bold;
}

.wallet {
  padding: .9rem 5vw;
  border-radius: 15px;
  width: 100%;
  background-color: #eeeeee;

}

.wallet_cont {
  padding: .8rem 6vw;
}

.profil_ac {
  display: flex;
  align-items: center;
  padding: 1rem 6vw;
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

<script setup lang="ts">
import { IonPage, IonContent, IonRippleEffect } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { book, chevronForward, compass, helpCircle, journal, person, search, settings, wallet, logoWhatsapp, informationCircle, addCircle, eye } from 'ionicons/icons';
import PayComp from "@/components/PayComp.vue"
import { ref } from 'vue';
import PayHistory from "@/components/PayHistory.vue"
import { useUserStore } from '@/global/pinia';
import { storeToRefs } from 'pinia';
import AbonComp from '@/components/AbonComp.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { access_tok, showLoading, show_alert } from '@/global/utils';

const pOpen = ref(false)
const hOpen = ref(false)

const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)
const { user, notifs } = userStore


const router = useRouter()

const open_norm_lnk = (lnk: string) => {
  window.location.href = lnk;
};

const contact = ref()

const get_contact = async () => {

  const resp= await axios.get('api/get_contact/', {
    headers : {
      Authorization : `Bearer ${ await access_tok(router, undefined)}`
    }
  })

  if(resp.data['done']) {
    contact.value = resp.data['result']
  }
}

get_contact()
</script>
