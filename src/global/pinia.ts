import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useWebSocket } from "@vueuse/core"
import { access_tok, store_obj, set_notifications, get_obj } from "@/global/utils"
const socket_url = "wss://studeo-0zye.onrender.com/chat/?token="
//const socket_url = "ws://localhost:8080/chat/?token="

export const useUserStore = defineStore('user', () => {

    const is_saving = ref(false)
    

    const notifs = ref<{
        aides : number[],
        conseils : number[]
    }>({
        aides : [],
        conseils : []
    })
    const user = ref<any>()

    const worko = ref<{
        [key : string] : any
    }>({})

    const s_url = ref(socket_url)
    setTimeout(async () => {
        s_url.value = socket_url + (await access_tok(useRouter(), undefined))
    }, 50)
    const { send, status } = useWebSocket(s_url, {
        autoReconnect: {
            delay: 1000
        },
        onConnected: async (ws) => {
            console.log('Websocket connected: ')
           /*  setInterval(() => {
                send(JSON.stringify({
                    type : 'heartbeat'
                }))
            }, 5000) */

            if(!(await get_obj('notif_registred'))) {
                set_notifications()
            }
        },
        onDisconnected: async (ws, ev) => {
            console.error('ws disconnected, retrying...')
            s_url.value = socket_url + (await access_tok(useRouter(), undefined))
        },
        onMessage : async (ws, ev) => {
            const message = JSON.parse(ev.data)
            if(message.type == 'initialisation') {
                //notifs.value = message.result.notifs
                user.value = message.result.user
            } else if (message.type == 'aide_answer') {
                if(!a_answers.value.filter(e => e.id == message.result.id)[0]) a_answers.value.push(message.result)
            } else if (message.type == 'conseil_answer') {
                if(!c_answers.value.filter(e => e.id == message.result.id)[0]) c_answers.value.push(message.result)
            } else if (message.type == 'worko') {
                const res = message.result
                worko.value[res.channel] = res
            }
 
        }
    })

    const a_answers = ref<any[]>([])
    const c_answers = ref<any[]>([])



    return {
        notifs,
        user,
        send,
        a_answers,
        c_answers,
        worko
    }

})
