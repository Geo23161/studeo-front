import { createApp, markRaw } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'
import "zoomist/css"
import axios from "axios"
import vue3PhotoPreview from 'vue3-photo-preview'

import { IonicVue } from '@ionic/vue';
//const base_url = "http://192.168.44.4:8080/"
//const base_url = "http://localhost:8080/"
const base_url = "https://studeo-0zye.onrender.com/"
axios.defaults.baseURL = base_url

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import 'vue3-photo-preview/dist/index.css';
import 'plyr/dist/plyr.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const pinia = createPinia()
pinia.use(({store}) => {
  store.$router = markRaw(router)
})

const app = createApp(App)
  .use(IonicVue)
  .use(vue3PhotoPreview)
  .use(pinia)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});
