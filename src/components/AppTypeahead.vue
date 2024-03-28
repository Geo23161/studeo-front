<template>
    <ion-header :mode="'ios'" >
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="cancelChanges()">Fermer</ion-button>
            </ion-buttons>
            <ion-title>{{ $props.title }}</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="confirmChanges()">Terminer</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>

    <ion-content  color="light" class="ion-padding">
        <ion-list :mode="'ios'" id="modal-list" :inset="true">

            <ion-item v-for="item in [ {id : 0, name : 'Tout', slug : ''}, ...filteredItems]" :key="item.slug">
                <ion-checkbox :value="item.slug" :checked="isChecked(item.slug)" @ionChange="checkboxChange($event)">{{
                    item.name }}</ion-checkbox>
            </ion-item>
        </ion-list>
    </ion-content>
</template>
  
<script lang="ts">
import {
    IonButton,
    IonButtons,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonSearchbar,
    IonToolbar,
} from '@ionic/vue';
import type { CheckboxCustomEvent, SearchbarCustomEvent } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        items: Array,
        selectedItem: String,
        title: {
            type: String,
            default: 'Choisir',
        },
    },
    emits: ['selection-cancel', 'selection-change'],
    components: {
        IonButton,
        IonButtons,
        IonCheckbox,
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonTitle,
        IonSearchbar,
        IonToolbar,
    },
    setup(props, { emit }) {
        const filteredItems = ref([...props.items]);
        const workingSelectedValues = ref(props.selectedItem);

        const isChecked = (value: string) => {
            return value == workingSelectedValues.value;
        };

        const cancelChanges = () => {
            emit('selection-cancel');
        };

        const confirmChanges = () => {
            emit('selection-change', workingSelectedValues.value);
        };

        const searchbarInput = (ev: SearchbarCustomEvent) => {
            filterList(ev.target.value as string);
        };

        /**
         * Update the rendered view with
         * the provided search query. If no
         * query is provided, all data
         * will be rendered.
         */
        const filterList = (searchQuery: string | undefined) => {
            /**
             * If no search query is defined,
             * return all options.
             */
            if (searchQuery === undefined) {
                filteredItems.value = [...props.items];
            } else {
                /**
                 * Otherwise, normalize the search
                 * query and check to see which items
                 * contain the search query as a substring.
                 */
                const normalizedQuery = searchQuery.toLowerCase();
                filteredItems.value = props.items.filter((item : any) => {
                    return item.text.toLowerCase().includes(normalizedQuery);
                });
            }
        };

        const checkboxChange = (ev: CheckboxCustomEvent) => {
            const { checked, value } = ev.detail;

            if (checked) {
                workingSelectedValues.value = value;
            } else {
                workingSelectedValues.value = "";
            }
        };

        return {
            filteredItems,
            workingSelectedValues,
            isChecked,
            cancelChanges,
            confirmChanges,
            searchbarInput,
            checkboxChange,
        };
    },
});
</script>
