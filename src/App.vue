<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<style>
.g_body {
  display: flex;
  flex-direction: column;
  height: 100%;

}
.img_all {

background-size: cover;
background-position: top center;
}
.g_ac {
  transition: all .2s ease-in-out;
}

.g_ac:active {
  transform: scale(1.2);
}

.question_h:active {
  box-shadow: none !important;
  background-color: #f3f3f3;
}
.serif {
  font-family: 'PT Serif';
}

div {
  color: #481c4b;
}

.sp_r {
  margin-right: .6rem;
}

.ripple-parent {
    position: relative;
    overflow: hidden;

  }

</style>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
