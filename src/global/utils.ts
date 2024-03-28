import { Storage, Drivers } from "@ionic/storage"
import { alertController, isPlatform, loadingController } from "@ionic/vue";
import axios from "axios";
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Router, useRouter } from "vue-router";
import { PushNotifications } from "@capacitor/push-notifications";
import { ref } from "vue";

export const set_notifications = () => {
    const platform = ref("android");
    const setPlatform = () => {
        if (isPlatform("ios")) platform.value = "ios";
        if (isPlatform("mobileweb")) platform.value = "web";
    };
    setPlatform();
    const registerNotifications = async () => {
	
	 if(platform.value != 'android') {
	 let permStatus = await PushNotifications.checkPermissions();

        if (permStatus.receive === "prompt") {
            permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive !== "granted") {
            throw new Error("User denied permissions!");
        }
	 }
        await PushNotifications.register();
    };
    
   registerNotifications();
	
    const router = useRouter()

    const addListerners = async () => {
        await PushNotifications.addListener("registration", async (token) => {
            axios({
                url: "api/devices/",
                method: "POST",
                data: {
                    registration_id: token.value,
                    type: platform.value,
                },
                headers: {
                    Authorization: `Bearer ${await access_tok(router, undefined)}`,
                },
            })
                .then((resp) => {
                    store_obj('notif_registred', 'true')
                })
                .catch((err) => {
                    console.log(err);
                });
        });
        await PushNotifications.addListener("registrationError", (err) => {
            console.error("Registration error: ", err.error);
        });
    }
	addListerners();
}

export const get_obj = async (key: string) => {
    const storage = new Storage({
        name: 'user_store',
        driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
    });

    await storage.defineDriver(CordovaSQLiteDriver);
    await storage.create()
    return await storage.get(key)
}

export const store_obj = async (key: string, obj: any) => {
    const storage = new Storage({
        name: 'user_store',
        driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
    });
    await storage.defineDriver(CordovaSQLiteDriver);
    await storage.create()
    await storage.set(key, obj)
}

export const remove_obj = async (key: string) => {
    const storage = new Storage({
        name: 'user_store',
        driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
    });

    await storage.defineDriver(CordovaSQLiteDriver);
    await storage.create()

    await storage.remove(key)
}

export const format_all = async () => {
    const storage = new Storage({
        name: 'user_store',
        driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
    });

    await storage.defineDriver(CordovaSQLiteDriver);
    await storage.create()
    await storage.clear()
}

export const showLoading = async (mess: string) => {
    const loading = await loadingController.create({
        message: mess,
        mode: 'ios'
    });
    loading.present();
    return loading
};

export const show_alert = async (title: string, mess: string) => {
    const alert = await alertController.create({
        header: title,
        message: mess,
        buttons: ["OK"],
        mode: 'ios'
    });
    await alert.present();
};

export const show_warn = async (title: string, mess: string, oktext: string, handle: (param: any, oth : any) => any, param: any, notext = "Cancel", is_group = false) => {
    const alert = await alertController.create({
        header: title,
        message: mess,
        buttons: [
            {
                text: notext,
                role: 'cancel',
            },
            {
                text: oktext,
                role: 'confirm',
                handler: () => {
                    handle(param, is_group)
                },
            },
        ],
        mode: 'ios',
    });

    await alert.present();
};

export const access_tok = async (router: Router, load: HTMLIonLoadingElement | undefined) => {
    const token: string | undefined = await get_obj('tokens')
    if (!token) {
        if (load) load.dismiss();
        let idents = await get_obj('ksjfniusfgiunsfjnfsin')
                        
                        idents = JSON.parse(idents);
                        
                        if (idents) {
                            const { email, password } = idents
                            try {
                                const resp = await axios.post('token/', {
                                    email,
                                    password
                                })
                                store_obj('tokens', JSON.stringify(resp.data))
                                return resp.data['access'] as string
                            } catch(e) {
                                console.log(e)
                            }
                        }
        return router.push(`/login`)
    }
    else {
        const json_tok = JSON.parse(token)
        
        try {
            const resp = await axios({
                url: 'api/ping',
                method: 'HEAD',
                headers: {
                    Authorization: `Bearer ${json_tok.access}`
                },
            })
            return json_tok.access as string
        } catch (err: any) {
            if (err.response.status == 401) {
                const form = new FormData()
                form.append('refresh', json_tok.refresh)
                try {
                    const refresh_res = await axios({
                        url: 'token/refresh/',
                        method: 'POST',
                        data: form
                    })
                    json_tok.access = refresh_res.data['access']
                    store_obj('tokens', JSON.stringify(json_tok))
                    return refresh_res.data['access'] as string
                } catch (err: any) {
                    if (err.response.status == 401) {
                        let idents = await get_obj('ksjfniusfgiunsfjnfsin')
                        
                        idents = JSON.parse(idents);
                        
                        if (idents) {
                            const { email, password } = idents
                            try {
                                const resp = await axios.post('token/', {
                                    email,
                                    password
                                })
                                store_obj('tokens', JSON.stringify(resp.data))
                                return resp.data['access'] as string
                            } catch(e) {
                                console.log(e)
                            }
                        }
                    }
                    return router?.push(`/login`)
                }
            }
        }
    }
}

export const extract_frames = (vid: any, callback: (b: Blob | null) => void, is_url = false) => {
    const video = document.createElement("video");
    const file = vid;
    const fileURL = is_url ? vid : URL.createObjectURL(file);
    video.src = fileURL;

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth * 3 / 4;
    video.addEventListener('loadeddata', function () {
        reloadRandomFrame();
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight
    }, false);

    video.addEventListener('seeked', function () {
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(callback);
    }, false);


    function reloadRandomFrame() {
        if (!isNaN(video.duration)) {
            const rand = Math.round(Math.random() * video.duration * 1000) + 1;
            video.currentTime = rand / 1000;
        }
    }
}

export const base64toBlob = (base64Data: any, contentType: any) => {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        const begin = sliceIndex * sliceSize;
        const end = Math.min(begin + sliceSize, bytesLength);

        const bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}

export const is_online = (last: string, minutes : number) => {
    return ((new Date()).getTime() - (new Date(last)).getTime()) < minutes * 60000
}