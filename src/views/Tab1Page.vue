<template>
  <ion-page>
    <ion-content :fullscreen="true" :scroll-y="false">
      <div class="header">
        <img :src="'../../imgs/logo_bg.png'" style="width: 36vw;" />
        <div class="buts">
          <button @click="router.push('/search')" class="but ion-activatable ripple-parent ">
            <ion-ripple-effect></ion-ripple-effect>
            <ion-icon :icon="search" />
          </button>
        </div>
      </div>

      <div style="overflow-y: scroll; max-height: 100%; padding-bottom: 8vh;">
        <div class="poster_body" id="cont">
          <div class="poster">
            <div class="in_circles first_circles">

            </div>
            <div class="in_circles second_circles">
              
            </div>
            <img :src="'../../imgs/poster.svg'"
              style="height: 7rem;  position: absolute; right: 0rem; bottom: -0.2rem;" />
            <div class="poster_text">
              La super app des étudiants.
            </div>
          </div>
        </div>

        <div class="home_comp">
          <div class="hc_header">
            <div class="hc_text">
              <div style="display: flex; align-items: center;">
                <div style=" margin-right: .3rem;">
                  <ion-icon :icon="helpCircle"
                    style="font-size: 2.2rem; color: #2DCF42; position: relative; top: .1rem; " />
                </div>
                <div class="hc_text">
                  Aides pour cours/devoirs
                </div>
              </div>
            </div>
            <button @click="actual = '/aide', aOpen = true" class="post_menu ion-activatable ripple-parent">
              <ion-ripple-effect></ion-ripple-effect>
              <ion-icon :icon="ellipsisVerticalOutline" />
            </button>
          </div>
          <div class="wrapper">
            <div v-if="aides.length" class="question_cont">
              <div v-for="aide in aides" :key="aide.id" @click="router.push('/quest/' + aide.id)"
                class="question_h sp_r">
                <div class="question_cat">
                  {{ aide.matiere[0].name }}
                </div>
                <div class="qh_text" v-html="aide.text" >
                  
                </div>
                <div v-if="aide.image.length || aide.audio.length || aide.video.length" class="sup_file">
                  <div v-if="aide.image.length" class="qh_img img_all" :style="{
                    backgroundImage: `url('${aide.image[0].get_file}')`
                  }">
                  </div>

                  <div v-if="aide.video.length" class="qh_img img_all" :style="{
                    backgroundImage: `url('${aide.video[0].get_preview}')`
                  }">
                    <button class="play_but">
                      <ion-icon :icon="play" />
                    </button>
                  </div>

                  <div v-if="aide.audio.length" @click.stop style="margin-top: -.7rem;">
                    <audio-reader :size="aide.audio[0].size" :url="aide.audio[0].get_file" />
                  </div>

                </div>
                <div class="qh_bottom">
                  <div v-if="aide.solved" class="qh_resp">
                    <div style="margin-right: .2rem;">
                      <ion-icon :icon="checkmarkCircle" style="font-size: 1.4rem; color: #2DCF42;" />
                    </div>
                    <div>
                      Résolue
                    </div>
                  </div>
                  <div v-else class="qh_resp">
                    <div style="margin-right: .2rem;">
                      <ion-icon :icon="time" style="font-size: 1.4rem; color: #9b9b9b; position: relative; top: .1rem;" />
                    </div>
                    <div style="color: gray;">
                      En attente
                    </div>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <img v-if="aide.price" :src="'../../imgs/couronne.png'" class="sp_r"
                      style="height: 1rem; position: relative; bottom: .1rem;" />

                    <div v-if="aide.get_views" class="qh_resp">
                      <div style="margin-right: .2rem;">
                        <ion-icon :icon="eye" style="font-size: 1.2rem; position: relative; top: .1rem;" />
                      </div>
                      <div>
                        {{ aide.get_views }}
                      </div>
                    </div>

                  </div>


                </div>
              </div>
              <div @click="router.push('/aide')" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <button class="g_ac more_but">
                  <ion-icon :icon="chevronForward" />
                </button>
                <div style="padding-top: .6rem; font-size: 1.1rem; ">
                  Tout voir
                </div>
              </div>
            </div>
            <div v-else class="question_cont">
              <ion-skeleton-text :animated="true"
                style="width: 75vw; min-width: 75vw; height: 12rem; margin-right: .6rem; border-radius: 15px;"></ion-skeleton-text>
              <ion-skeleton-text :animated="true"
                style="width: 75vw; min-width: 75vw; height: 12rem; margin-right: .6rem; border-radius: 15px;"></ion-skeleton-text>
              <ion-skeleton-text :animated="true"
                style="width: 75vw; min-width: 75vw; height: 12rem; margin-right: .6rem; border-radius: 15px; "></ion-skeleton-text>
            </div>
          </div>
          <div @click="router.push('/ask')" class="hc_but ion-activatable ripple-parent ">
            <ion-ripple-effect></ion-ripple-effect>
            <div style="display: flex; align-items: center;">
              <button class="profil_d sp_r" style="background-color: #2dcf434b;">
                <ion-icon :icon="person" style="font-size: 1rem; color: #2DCF42;" />
              </button>
              <div class="hc_but_text">
                Poser votre question
              </div>
            </div>
            <button style="font-size: 1.9rem; background-color: transparent ; position: relative; top: .1.3rem;">
              <ion-icon :icon="chevronForward" />
            </button>
          </div>
        </div>

        <divise-comp></divise-comp>

        <div class="home_comp">
          <div class="hc_header">
            <div class="hc_text">
              <div style="display: flex; align-items: center;">
                <div style=" margin-right: .5rem;">
                  <ion-icon :icon="book" style="font-size: 1.8rem; color: #E01D5B; position: relative; top: .2rem; " />
                </div>
                <div class="hc_text">
                  Exercices/fiches et autres
                </div>
              </div>
            </div>
            <button @click="actual = '/fiche', aOpen = true" class="post_menu ion-activatable ripple-parent">
              <ion-ripple-effect></ion-ripple-effect>
              <ion-icon :icon="ellipsisVerticalOutline" />
            </button>
          </div>
          <div class="wrapper">
            <div v-if="fichiers.length" class="question_cont">
              <div v-for="aide in fichiers" :key="aide.id" @click="router.push('/fiche/' + aide.id)" class="question_h sp_r">
                <div class="question_cat">
                  {{ aide.typefic[0].name }}
                </div>
                <div class="qh_text" v-html="aide.text" >
                  
                </div>
                <div v-if="aide.image.length || aide.audio.length || aide.video.length" class="sup_file">
                  <div v-if="aide.image.length" class="qh_img img_all" :style="{
                    backgroundImage: `url('${aide.image[0].get_file}')`
                  }">
                  </div>

                  <div v-if="aide.video.length" class="qh_img img_all" :style="{
                    backgroundImage: `url('${aide.video[0].get_preview}')`
                  }">
                    <button class="play_but">
                      <ion-icon :icon="play" />
                    </button>
                  </div>

                  <div v-if="aide.audio.length" @click.stop style="margin-top: -.7rem;">
                    <audio-reader :size="aide.audio[0].size" :url="aide.audio[0].get_file" />
                  </div>

                </div>
                <div class="qh_bottom">
                  <div class="qh_resp">

                    <div style="color: #25020e;">
                      {{ aide.matiere[0].name }}
                    </div>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <img v-if="aide.price" :src="'../../imgs/couronne.png'" class="sp_r"
                      style="height: 1rem; position: relative; bottom: .1rem;" />

                    <div v-if="aide.get_views" class="qh_resp">
                      <div style="margin-right: .2rem;">
                        <ion-icon :icon="eye" style="font-size: 1.2rem; position: relative; top: .1rem;" />
                      </div>
                      <div>
                        {{ aide.get_views }}
                      </div>
                    </div>

                  </div>


                </div>
              </div>

              <div @click="router.push('/fiche')" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <button class="g_ac more_but">
                  <ion-icon :icon="chevronForward" />
                </button>
                <div style="padding-top: .6rem; font-size: 1.1rem; ">
                  Tout voir
                </div>
              </div>
            </div>
            <div v-else class="question_cont">
              <ion-skeleton-text :animated="true"
                style="width: 75vw; min-width: 75vw; height: 12rem; margin-right: .6rem; border-radius: 15px;"></ion-skeleton-text>
              <ion-skeleton-text :animated="true"
                style="width: 75vw; min-width: 75vw; height: 12rem; margin-right: .6rem; border-radius: 15px;"></ion-skeleton-text>
              <ion-skeleton-text :animated="true"
                style="width: 75vw; min-width: 75vw; height: 12rem; margin-right: .6rem; border-radius: 15px; "></ion-skeleton-text>
            </div>
          </div>
          <div @click="router.push('/fiche')" class="hc_but ion-activatable ripple-parent ">
            <ion-ripple-effect ></ion-ripple-effect>
            <div style="display: flex; align-items: center;">
              <button class="profil_d sp_r" style="background-color: #e01d5b46;">
                <ion-icon :icon="person" style="font-size: 1rem; color: #E01D5B;" />
              </button>
              <div class="hc_but_text">
                Voir tout
              </div>
            </div>
            <button style="font-size: 1.9rem; background-color: transparent ; position: relative; top: .1.3rem;">
              <ion-icon :icon="chevronForward" />
            </button>
          </div>
        </div>

        <divise-comp></divise-comp>

        <div class="home_comp">
          <div class="hc_header">
            <div class="hc_text">
              <div style="display: flex; align-items: center;">
                <div style=" margin-right: .3rem;">
                  <ion-icon :icon="compass" style="font-size: 2.2rem; color: #EFD109; position: relative; top: .1rem; " />
                </div>
                <div class="hc_text">
                  Conseils et Opportunités
                </div>
              </div>
            </div>
            <button @click="aOpen = true, actual = '/conseil'" class="post_menu ion-activatable ripple-parent">
              <ion-ripple-effect></ion-ripple-effect>
              <ion-icon :icon="ellipsisVerticalOutline" />
            </button>
          </div>
          <div class="wrapper">
            <div v-if="conseils.length" class="question_cont">
              <div v-for="aide in conseils" :key="aide.id" @click="router.push('/cquest/' + aide.id)" class="question_h sp_r">
                <div class="question_cat">
                  {{ aide.typefic[0].name }}
                </div>
                <div class="qh_text" v-html="aide.text" >
                  
                </div>
                <div v-if="aide.image.length || aide.audio.length || aide.video.length" class="sup_file">
                  <div v-if="aide.image.length" class="qh_img img_all" :style="{
                    backgroundImage: `url('${aide.image[0].get_file}')`
                  }">
                  </div>

                  <div v-if="aide.video.length" class="qh_img img_all" :style="{
                    backgroundImage: `url('${aide.video[0].get_preview}')`
                  }">
                    <button class="play_but">
                      <ion-icon :icon="play" />
                    </button>
                  </div>

                  <div v-if="aide.audio.length" @click.stop style="margin-top: -.7rem;">
                    <audio-reader :size="aide.audio[0].size" :url="aide.audio[0].get_file" />
                  </div>

                </div>
                <div class="qh_bottom">
                  <div v-if="aide.solved" class="qh_resp">
                    <div style="margin-right: .2rem;">
                      <ion-icon :icon="checkmarkCircle" style="font-size: 1.4rem; color: #2DCF42;" />
                    </div>
                    <div>
                      Résolue
                    </div>
                  </div>
                  <div v-else class="qh_resp">
                    <div style="margin-right: .2rem;">
                      <ion-icon :icon="time" style="font-size: 1.4rem; color: #9b9b9b; position: relative; top: .1rem;" />
                    </div>
                    <div style="color: gray;">
                      En attente
                    </div>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <img v-if="aide.price" :src="'../../imgs/couronne.png'" class="sp_r"
                      style="height: 1rem; position: relative; bottom: .1rem;" />

                    <div v-if="aide.get_views" class="qh_resp">
                      <div style="margin-right: .2rem;">
                        <ion-icon :icon="eye" style="font-size: 1.2rem; position: relative; top: .1rem;" />
                      </div>
                      <div>
                        {{ aide.get_views }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div @click="router.push('/conseil')" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <button class="g_ac more_but">
                  <ion-icon :icon="chevronForward" />
                </button>
                <div style="padding-top: .6rem; font-size: 1.1rem; ">
                  Tout voir
                </div>
              </div>
            </div>
            <div v-else class="question_cont">
              <ion-skeleton-text :animated="true"
                style="width: 75vw; min-width: 75vw; height: 12rem; margin-right: .6rem; border-radius: 15px;"></ion-skeleton-text>
              <ion-skeleton-text :animated="true"
                style="width: 75vw; min-width: 75vw; height: 12rem; margin-right: .6rem; border-radius: 15px;"></ion-skeleton-text>
              <ion-skeleton-text :animated="true"
                style="width: 75vw; min-width: 75vw; height: 12rem; margin-right: .6rem; border-radius: 15px; "></ion-skeleton-text>
            </div>
          </div>
          <div @click="router.push('/cask')" class="hc_but ion-activatable ripple-parent ">
            <ion-ripple-effect ></ion-ripple-effect>
            <div style="display: flex; align-items: center;">
              <button class="profil_d sp_r" style="background-color: #efd00948;">
                <ion-icon :icon="person" style="font-size: 1rem; color: #EFD109;" />
              </button>
              <div class="hc_but_text">
                Poser votre question
              </div>
            </div>
            <button style="font-size: 1.9rem; background-color: transparent ; position: relative; top: .1.3rem;">
              <ion-icon :icon="chevronForward" />
            </button>
          </div>
        </div>

        <divise-comp></divise-comp>

        <div v-if="false" class="home_comp">
          <div class="hc_header">
            <div class="hc_text">
              <div style="display: flex; align-items: center;">
                <div style=" margin-right: .3rem;">
                  <ion-icon :icon="sparkles"
                    style="font-size: 2.2rem; color: #74eff3; position: relative; top: .1rem; " />
                </div>
                <div class="hc_text">
                  Services spéciaux
                </div>
              </div>
            </div>
            <button class="post_menu ion-activatable ripple-parent">
              <ion-ripple-effect></ion-ripple-effect>
              <ion-icon :icon="ellipsisVerticalOutline" />
            </button>
          </div>
          <div class="wrapper">
            <div class="question_cont">
              <div class="question_h sp_r">
                <div class="sup_file cont_wrapper">
                  <div class="qh_img img_all" :style="{
                    backgroundImage: `url('${'../../imgs/image.png'}')`
                  }">
                  </div>

                </div>
                <div class="qh_text" style="margin-top: .4rem; font-weight: bold; padding-bottom: .3rem !important;">
                  Comment expliquer l'allaitement chez la femme après l'accouchement?
                </div>

              </div>
              <div class="question_h sp_r">
                <div class="sup_file cont_wrapper">
                  <div class="qh_img img_all" :style="{
                    backgroundImage: `url('${'../../imgs/image.png'}')`
                  }">
                  </div>

                </div>
                <div class="qh_text" style="margin-top: .4rem; font-weight: bold; padding-bottom: .3rem !important;">
                  Comment expliquer l'allaitement chez la femme après l'accouchement?
                </div>

              </div>
              <div class="question_h sp_r">
                <div class="sup_file cont_wrapper">
                  <div class="qh_img img_all" :style="{
                    backgroundImage: `url('${'../../imgs/image.png'}')`
                  }">
                  </div>

                </div>
                <div class="qh_text" style="margin-top: .4rem; font-weight: bold; padding-bottom: .3rem !important;">
                  Comment expliquer l'allaitement chez la femme après l'accouchement?
                </div>

              </div>
            </div>
          </div>
          <div class="hc_but ion-activatable ripple-parent">
            <ion-ripple-effect></ion-ripple-effect>
            <div style="display: flex; align-items: center;">

              <button class="profil_d sp_r" style="background-color: #74eff348;">
                <ion-icon :icon="person" style="font-size: 1rem; color: #74eff3;" />
              </button>
              <div class="hc_but_text ">
                Voir mes demandes
              </div>
            </div>
            <button style="font-size: 1.9rem; background-color: transparent ; position: relative; top: .1.3rem;">
              <ion-icon :icon="chevronForward" />
            </button>
          </div>
        </div>
      </div>
      <ion-action-sheet :is-open="aOpen" @didDismiss="aOpen = false" header="Options"
        :buttons="actionSheetButtons"></ion-action-sheet>

      <!-- <div class="post_cont">
        <div class="user_img sp_r" :style="{
          backgroundImage: `url('${'../../imgs/user.jpg'}')`
        }">

        </div>
        <div class="simul_inpt sp_r">
          Poster quelque chose ici...
        </div>
        <button class="micro ion-activatable ripple-parent ">
          <ion-ripple-effect></ion-ripple-effect>
          <ion-icon :icon="mic" />
        </button>
      </div>
      <divise-comp></divise-comp>
      <div class="post">
        <div class="post_cat">
          <div style="display: flex; align-items: center;">
            <div style="padding-top: 1vw; margin-right: .3rem;">
              <ion-icon :icon="helpCircle" style="font-size: 1.8rem; color: #2DCF42; " />
            </div>
            <div class="black">
              Aides pour cours/devoirs
            </div>
          </div>
        </div>
        <div class="scape_pad">
          <div style="width: 100%; height: 1px; background-color: rgb(199, 199, 199);">

          </div>
        </div>

        <div class="post_header">
          <div class="post_profil ion-activatable ripple-parent ">
            <ion-ripple-effect></ion-ripple-effect>
            <div class="post_image sp_r" :style="{
              backgroundImage: `url('${'../../imgs/user1.jpg'}')`
            }">

            </div>
            <div class="post_username ">
              georisbox
            </div>
          </div>
          <button class="post_menu ion-activatable ripple-parent">
            <ion-ripple-effect></ion-ripple-effect>
            <ion-icon :icon="ellipsisVerticalOutline" />
          </button>
        </div>
        <div class="post_body">
          <div v-if="false" class="post_only_text ">
            <div class="scape_pad">
              <div class="pot_cont" style="width: 100%;">
                Quand est ce que deux droites sont parallèles?
              </div>
            </div>

          </div>
          <div v-if="false" class="post_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, corporis deleniti veritatis blanditiis id
            laudantium, sapiente placeat nobis quisquam quae exercitationem vitae aliquam voluptatem! Quos earum suscipit
            animi molestiae ab?
          </div>
          <div v-if="false" class="post_bimage post_comp">
            <img :src="'../../imgs/image.png'" class="post_1image img_all" />
          </div>
          <div v-if="false" class="post_images post_comp ">
            <button v-if="false" class="post_more_but">
              <ion-icon :icon="chevronForward" />
            </button>
            <div class="plenty_of" style="width: 100%;">
              <img :src="'../../imgs/image.png'" class="post_1image img_all sp_r" style="width: 75vw;" />
              <img :src="'../../imgs/image.png'" class="post_1image img_all sp_r" style="width: 75vw;" />
              <img :src="'../../imgs/image.png'" class="post_1image img_all sp_r" style="width: 75vw;" />
            </div>
          </div>
          <div v-if="false" class="post_bimage">
            <div class="post_video img_all" :style="{
              backgroundImage: `url('${'../../imgs/image.png'}')`
            }">
              <button class="play_but">
                <ion-icon :icon="play" />
              </button>
            </div>
          </div>
          <div v-if="true" class="post_images post_comp ">
            <button v-if="false" class="post_more_but">
              <ion-icon :icon="chevronForward" />
            </button>
            <div class="plenty_of" style="min-width: 100%;">
              <div class="post_video img_all sp_r" :style="{
                backgroundImage: `url('${'../../imgs/image.png'}')`
              }" style="min-width: 75vw !important;" >
                <button class="play_but">
                  <ion-icon :icon="play" />
                </button>
              </div>
              <div class="post_video img_all sp_r" :style="{
                backgroundImage: `url('${'../../imgs/image.png'}')`
              }" style="min-width: 75vw !important;" >
                <button class="play_but">
                  <ion-icon :icon="play" />
                </button>
              </div>
              <div class="post_video img_all sp_r" :style="{
                backgroundImage: `url('${'../../imgs/image.png'}')`
              }" style="min-width: 75vw !important;" >
                <button class="play_but">
                  <ion-icon :icon="play" />
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div> -->

    </ion-content>
  </ion-page>
</template>

<style scoped>
.more_but {
  width: 4rem;
  min-width: 4rem;
  height: 4rem;
  border-radius: 100%;
  font-size: 2rem;
  color: #481c4b;
  background-color: #481c4b4f;
  margin: 0rem 1.4rem;
}

::-webkit-scrollbar {
  display: none;
}

/* home_comp  */
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

.qh_resp {
  font-size: 0.85rem;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.qh_bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: .5rem;

}

.cont_wrapper {
  margin: -.3rem -3.3vw;
}

.sup_file {
  flex-grow: 100;
}

.qh_img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  position: relative;
    min-height: 4rem;
}

.qh_text {
  padding-top: 0.3rem;
    min-height: 0;
    padding-bottom: 0.6rem;
    flex-grow: 1;
    overflow: hidden;
}

.question_cat {
  font-size: .8rem;
  font-weight: bold;

}

.question_h {
  width: 75vw;
  min-width: 75vw;
  height: 12rem;
  display: flex;
  flex-direction: column;
  padding: .3rem 3.3vw;
  font-size: .9rem;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px #481c4b65, 0 4px 6px -2px #17a74929;
}

.wrapper {
  margin-left: -3vw;
  margin-right: -3vw;
}

.question_cont {
  padding-top: .4rem;
  padding-bottom: 1.5rem;
  padding-left: 1rem;
  font-family: 'PT Serif';
  display: flex;
  overflow-y: auto;
}

.hc_text {
  font-size: 1.1rem;
  font-weight: bold;
}

.hc_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home_comp {
  padding: .8rem 3vw;
  font-family: 'PT Serif';
}

/*  end home_comp */

/* cont */
.poster_text {
  color: white;
  padding: 1vw;
  width: 60vw;
  font-size: 1.4rem;
  position: absolute;
  top: calc(4rem - 2rem);
  left: 2vw;
  font-weight: bold;

}

.second_circles {
  border-color: #2DCF42;
  margin-top: -16rem;
  margin-left: 75vw;
}

.first_circles {
  border-color: #EFD109;
  margin-top: 6rem;
  margin-left: -3rem;

}

.in_circles {
  width: 31vw;
  height: 31vw;
  border-width: 5px;
  border-style: solid;
  border-radius: 100%;
}

.poster {
  width: 100%;
  height: 8rem;
  border-radius: 18px;
  background-color: #4c1d50b9;
  overflow: hidden;
  position: relative;
  font-family: 'PT Serif';
}

.poster_body {
  padding: .3rem 3vw;
}

/* end cont */

/* post */
.play_but:active {
  background-color: #8d5b91;
}

.play_but {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
  background-color: #2DCF42;
  color: white;
  position: absolute;
  top: calc(50% - 1.2rem);
  right: calc(50% - 1.2rem);
  font-size: 1rem;
  box-shadow: 0 10px 15px -3px #481c4b65, 0 4px 6px -2px #17a74929;
}

.post_video {
  width: 100%;
  height: 30vh;
  border-radius: 10px;
  position: relative;
}

.pot_cont {
  padding: 8vw 12vw;
  font-size: 1.6rem;
  background-color: #481c4b;
  color: white;
  text-align: center;
}

.black {
  color: rgb(41, 41, 41);
}

.scape_pad {
  margin-left: -3vw;
  margin-right: -3vw;
}

.post_cat {
  padding-bottom: 0vw;
  font-size: 1rem;
  font-weight: bold;

}

.post_more_but {
  width: 2.6rem;
  height: 2.6rem;
  position: absolute;
  border-radius: 100%;
  font-size: 1.6rem;
  top: calc(50% - 1.3rem);

}

.post_images {
  margin-left: -3vw;
  margin-right: -3vw;
  width: 100%;
  position: relative;
  padding: 0vw 3vw;
  overflow-x: auto;

}

.plenty_of {
  display: flex;
  align-items: center;
}

.img_all {

  background-size: cover;
  background-position: top center;
}

.post_1image {
  width: 100%;
  max-height: 60vh;
  border-radius: 10px;
}

.post_bimage {
  width: 100%;
}

.post_comp {
  padding-top: 1.5vh;
}

.post_text {
  font-size: 0.9rem;
}

.post_body {
  padding: 1vh .5vw;
  color: rgb(29, 29, 29);
}

.post_menu {
  padding: 2vw;
  font-size: 1.4rem;
  position: relative;
  top: 1.2vw;
  background-color: transparent;
  border-radius: 10px;
}

.post_username {
  font-size: 1.1rem;
  font-weight: bold;

}

.post_image {
  width: 9vw;
  height: 9vw;
  border-radius: 100%;
  background-size: cover;
  background-position: top center;
  border-radius: 100%;
}

.post_profil {
  display: flex;
  align-items: center;
}

.post_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post {
  padding: 1vw 3vw;
  font-family: 'PT Serif';
}

/*post end */

.micro {
  width: 9vw;
  min-width: 9vw;
  height: 2.8rem;
  border-radius: 15px;
  font-size: 1.9rem;
  background-color: transparent;
  color: #E01D5B;
}

.simul_inpt {
  flex-grow: 1;
  width: 100%;
  height: 2rem;
  background-color: rgb(236, 236, 236);
  padding: .4rem .7rem;
  font-size: .9rem;
  border-radius: 12px;
  font-family: 'PT Serif';
}

.user_img {
  width: 11.5vw;
  min-width: 11.5vw;
  height: 11.5vw;
  border-radius: 100%;
  background-size: cover;
  background-position: top center;
  border-radius: 100%;
}

.post_cont {
  padding: .3rem .9rem;
  display: flex;
  align-items: center;

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
import { IonActionSheet, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRippleEffect, IonIcon, ActionSheetButton, onIonViewDidEnter, IonSkeletonText } from '@ionic/vue';
import DiviseComp from "@/components/DiviseComp.vue"

import { search, settings, mic, ellipsisVertical, ellipsisVerticalOutline, chevronForward, helpCircle, play, checkmarkCircle, time, eye, pencil, person, book, compass, sparkles } from 'ionicons/icons';
import AudioReader from '@/components/AudioReader.vue';
import { ref } from 'vue';
import { access_tok, show_alert } from "@/global/utils"
import axios from 'axios';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/global/pinia';
import { storeToRefs } from 'pinia';

const aides = ref([] as any[])
const conseils = ref([] as any[])
const fichiers = ref([] as any[])
const router = useRouter()

const aOpen = ref(false)
const get_home = async () => {
  try {
    const resp = await axios.get('api/get_home/', {
      headers: {
        Authorization: `Bearer ${await access_tok(router, undefined)}`
      }
    })
    if (resp.data['done']) {
      aides.value = resp.data['result']['aides']
      conseils.value = resp.data['result']['conseils']
      fichiers.value = resp.data['result']['fichiers']
    }
  } catch (e) {
    await show_alert('', 'Une erreur est survenue lors du chargement. Verifiez votre connexion et redemarrer l\'application.')
  }
}

get_home()

const actual = ref('/aide')

const actionSheetButtons: ActionSheetButton[] = [
  {
    text: 'Voir plus',
    handler: () => {
      router.push(actual.value)
    }
  },

];

const userStore_ = useUserStore()
const userStore = storeToRefs(userStore_)
const { user, notifs } = userStore

</script>
