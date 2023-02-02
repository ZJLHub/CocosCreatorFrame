
import { _decorator, Node, AudioSource, AudioClip, NodePool } from 'cc';
import { ABEnum } from '../const/const_game';
import { ResManager } from './ResManager';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager {

    private _voice: boolean = true;
    set Voice(isCan) {
        this._voice = isCan;
        if (!this._voice) {
            this.stopMusic();
        } else {
            this.resumeMusic();
        }
    }
    get Voice() {
        return this._voice;
    }

    private static _instance: SoundManager = null;
    /**单例 */
    public static get Instance(): SoundManager {
        if (!SoundManager._instance) {
            SoundManager._instance = new SoundManager();
        }
        return SoundManager._instance;
    }

    @property(AudioSource)
    music: AudioSource = null;
    private soundMap: Map<string, Node> = new Map();
    private nodePool: NodePool = null;


    get Pool() {
        if (!this.nodePool) {
            this.nodePool = new NodePool();
        }
        return this.nodePool;
    }


    resumeMusic() {
        // if (this.music && this.music.clip && !this.music.playing) {
        //     this.music.play();
        // }
    }
    // async playMusic({ bundleName, url }, loop: boolean = true) {
    //     // if (!this.music) {
    //     //     let node = this.createSound();
    //     //     this.music = node.getComponent(AudioSource);
    //     //     let audioClip = await BundleManager.Instance.loadBundleRes({ bundleName: bundleName, url: url }) as AudioClip;
    //     //     if (audioClip) {
    //     //         this.music.clip = audioClip;
    //     //         this.music.loop = loop;
    //     //         this.music.volume = 1;
    //     //     }
    //     // }
    //     // if (this.music.clip) {
    //     //     this.music.play();
    //     // }
    // }
    stopMusic() {
        // if (this.music.isValid) {
        //     this.music.playing && this.music.stop();
        // }
    }
    setMusicVolume(volume: number) {
        volume = this.limitVolume(volume);
        // this.music.volume = volume;
    }


    async playSound( url:string,bundleName:string|ABEnum, volume: number = 1, loop: boolean = false, isStopSameClip: boolean = false) {
        // console.log("========playSound", loop);
        if (!this.Voice) return
        
        let audioNode = this.soundMap.get(url);
        let audioClip = null;
        if (!audioClip) {
            audioClip = await ResManager.instance.loadRes(url,audioClip,bundleName) as AudioClip;
        }
        if (!audioNode) {
            audioNode = this.createSound();
            this.soundMap.set(url, audioNode);
        }
        //暂时不管是否需要暂停之前的
        // isStopSameClip && this.stopSound(url);
        // if (!audioSource || (audioSource.playing && !isStopSameClip)) {
        //     audioSource = this.createSound();
        //     audioSource.clip = audioClip;
        //     this.soundMap.set(url, audioSource);
        // }
        let audioSource = audioNode.getComponent(AudioSource);
        audioSource.clip = audioClip;
        audioSource.loop = loop;
        audioSource.play();
    }
    stopSound(url) {
        let soundNode = this.soundMap.get(url);
        if (soundNode) {
            let audioSource = soundNode.getComponent(AudioSource);
            if (audioSource && audioSource.playing) {
                audioSource.stop();
            }
        }
    }
    setSoundVolume(volume: number, url: string) {
        let soundNode = this.soundMap.get(url);
        volume = this.limitVolume(volume);
        if (soundNode) {
            let soundSource = soundNode.getComponent(AudioSource);
            soundSource.volume = volume;
        }
    }
    createSound() {
        let node = this.Pool.get();
        !node && (node = new Node());
        let audioSource = node.getComponent(AudioSource);
        if (!audioSource) {
            audioSource = node.addComponent(AudioSource);
            //先不做回收
            let self = this;
            node.on(AudioSource.EventType.ENDED, () => {
                self.recycleItem(node);
            }, node);
        }
        return node;
    }
    recycleItem(node: Node) {
        this.nodePool.put(node);
    }

    limitVolume(volume: number) {
        if (!volume || volume < 0) {
            volume = 0;
        }
        if (volume > 1) volume = 1;
        return volume;
    }
}