import { _decorator, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StoragerManager')
export class StoragerManager {
    private static _instance: StoragerManager;
    /**单例 */
    public static get instance(): StoragerManager {
        if (!StoragerManager._instance) {
            StoragerManager._instance = new StoragerManager();
        }
        return StoragerManager._instance;
    }
    /**储存计数 */
    private _version: number = 0;
    // private _storage_version: number = 1.0;//记录存档版号  当存档版号不一致时，可进行相关操作

    /**声音 */
    private sound: boolean = false;
    /**音效大小 */
    private sound_num: number = 1;
    /**背景音乐大小 */
    private music_num: number = 0;
    /**声音 */
    public get Sound(): boolean {
        return this.sound
    }
    public set Sound(v: boolean) {
        this.sound = v;
    }
    /**背景音乐 */
    public get MusicNum(): number {
        return this.music_num
    }
    public set MusicNum(v: number) {
        this.music_num = v;
    }
    /**音效 */
    public get SoundNum(): number {
        return this.sound_num
    }
    public set SoundNum(v: number) {
        this.sound_num = v;
    }

    private _local_storage_key:string = `规则自定义`;
    Init(data) {
        let storage;
        if (sys.isBrowser) {
            let storage_data = JSON.parse(sys.localStorage.getItem(this._local_storage_key));
            storage = storage_data ? storage_data : {};
        } else {
            storage = data.archive.ext == null ? {} : data.archive.ext;
        }
        //储存计数
        this._version = data && data.archive.version ? data.archive.version : 0;
        //清查是否需要清除存档
        // if (!usedata.storage_version || usedata.storage_version != this._storage_version) {
        //     console.log("存档版本不对，清除存档");
        //     usedata = {
        //         storage_version: this._storage_version
        //     };
        // }
        // }

        this.sound = storage.sound == null ? true : storage.sound;
        this.sound_num = storage.soundnum == null ? 1 : storage.soundnum;
        this.music_num = storage.musicnum == null ? 1 : storage.musicnum;
    }
    SyncData() {
        this._version += 1;
        let ext = {
            sound: this.sound,
            soundnum: this.sound_num,
            musicnum: this.music_num,
        }
        if (sys.isBrowser) {
            console.log("··············存档···················");
            sys.localStorage.setItem(this._local_storage_key,JSON.stringify(ext) );
        }else {//非测试环境
            // LWGSDK.updateUserArchive({//XX公司sdk
            //     version: this._version,
            //     ext: ext,
            //     success: res => { },
            //     fail: res => { }
            // })
        }

    }
}