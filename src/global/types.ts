import { reactive} from "vue"

export const get_time_format = (time: number) => {
    let minutes: string | number = Math.floor(time / 60);
    let seconds: string | number = Math.floor(time - minutes * 60);
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
};

export interface FilterElt {
    id : number,
    name : string,
    slug : string
}

export class AudioPlayer {
    public is_playing = false;
    public current_a = "00:00";
    public total_a = "00:00"
    public myVal = "0";
    private audio: HTMLAudioElement = new Audio();
    public audio_interval: any = 0;
    private duration = 0;

    

    public constructor(src: string, size: string) {
        this.audio = new Audio(src);
        this.total_a = size;
        this.audio.addEventListener("pause", () => {
            this.is_playing = false;
        });
        this.audio.addEventListener("ended", () => {
            this.is_playing = false;
            this.current_a = "00:00";
        });
        this.audio.addEventListener("play", () => {
            this.is_playing = true;
        });
        this.audio.addEventListener("playing", () => {
            this.is_playing = true;
        });
        this.audio.addEventListener("durationchange", (e) => {
            if (this.audio.duration != Infinity && this.total_a == "00:00") {
                this.total_a = get_time_format(this.audio.duration as number);
                this.duration = this.audio.duration
            }
        })

        const tab = size.split(":");
        this.duration = parseInt(tab[0]) * 60 + parseInt(tab[1]);

        this.audio_interval = setInterval(() => {
            if (this.is_playing) {
                this.current_a = get_time_format(this.audio.currentTime as number);
                this.myVal = (
                    (this.audio.currentTime * 100) /
                    this.duration
                ).toString();
            }
        });
    }

    public get_audio_comp() {
        return this.audio
    }

    public set_current(val: string) {
        this.audio.currentTime = (parseInt(val) / 100) * this.duration;
    }

    public toogle_playing() {
        if (!this.is_playing) this.audio.play();
        else this.audio.pause();
    }
}