import { _decorator, Component, Node, Asset, AssetManager, assetManager, RenderStage, JsonAsset } from 'cc';
import { ABEnum } from '../const/const_game';
const { ccclass, property } = _decorator;

@ccclass('ResManager')
export class ResManager {
    private static _instance: ResManager = null;
    public static get instance() {
        if (!ResManager._instance) ResManager._instance = new ResManager();
        return ResManager._instance;
    }

    //#region ···········捕获手动load的资源·············
    /**
     * 为什么要捕获？：因为你并不知道cc的资源啥时候会释放掉~~（个人暂不理解）
     * 先写一个捕获的，做个开关随时切换为cc内置的方式get资源
     */
    private _cahes_res: { [only_one: string]: Asset } = {};
    private _get_cahes_res(path:string,bundle?:string|ABEnum) {
        let onlyone = "";
        if(bundle){
            onlyone = `${bundle}${path}`;
        }else{
            onlyone = path;
        }
        return this._cahes_res[onlyone];
    }
    private _set_cahes_res(path:string,res:Asset,bundle?:string|ABEnum){
        let onlyone = "";
        if(bundle){
            onlyone = `${bundle}${path}`;
        }else{
            onlyone = path;
        }
        this._cahes_res[onlyone] = res;
    }
    //#endregion

    public async toLoadBundle(bundle_str: string) {
        return new Promise<AssetManager.Bundle>((resolve) => {
            let ab = assetManager.getBundle(bundle_str);
            if (ab) {
                resolve(ab);
            }
            else {
                assetManager.loadBundle(bundle_str, (err, bundle: AssetManager.Bundle) => {
                    if (err) {
                        console.log(`加载Bundle包${bundle}失败`, err);
                        resolve(null);
                    } else {
                        resolve(bundle);
                    }
                });
            }
        });
    }

    /**
     * @param bundles 分包数组
     * @returns 加载完所有分包后返回
     */
    public async LoadBundles(bundles: string[]) {
        return new Promise<void>(async (resolve) => {
            let promises = [];
            for (let i = 0; i < bundles.length; i++) {
                let ab_s = bundles[i];
                let promise;
                promise = this.toLoadBundle(ab_s);
            }
            await Promise.all(promises);
            resolve();
        });
    }

    /**加载资源 */
    public loadRes<T extends Asset>(path:string,type: typeof Asset,bundle:string|ABEnum):Promise<T>{
        return new Promise(async (resolve,reject)=>{
            let ab = assetManager.getBundle(bundle);
            if(!ab){
                ab = await this.toLoadBundle(bundle);
            }
            if(!ab)console.error("resMng on loadRes err! no exites bundle_e::",bundle);
            let get_res = ab.get(path) as T;
            if(get_res){//····该包已存在次资源
                resolve(get_res);
            }else{//··········再尝试进行指定路劲加载
                ab.load(path,(err,load_res)=>{
                    if(load_res){
                        get_res = load_res as T;
                        resolve(get_res);
                    }else{
                        console.error(`resMng on loadRes err!   ${bundle} no exites ${path}  return null`);
                        resolve(null);
                    }
                });
            }
        });
    }

    /**加载远程资源 */
    public loadRemote<T extends Asset>(path:string,type: typeof Asset){
        return new Promise<T>((resolve,reject)=>{
            let get_res:Asset = null;
            if(this._get_cahes_res(path)){
                get_res = this._get_cahes_res(path);
            }
            if(get_res){
                resolve(get_res as T);
            }
            assetManager.loadRemote(path,(err,res:Asset)=>{
                if(!res){
                    console.error(`resMng on loadRemote can't load path：：`,path);
                    resolve(null);
                }else{
                    get_res = res;
                    this._set_cahes_res(path,res);
                    resolve(get_res as T);
                }
            });
        });
    }


    async LoadMapConfig(path: string, bundle: string): Promise<JsonAsset> {
        return new Promise<JsonAsset>(async (resolve) => {
            let ab = assetManager.getBundle(bundle);
            if (!ab) {
                ab = await this.toLoadBundle(bundle);
            }
            if (!ab) {
                console.error("LoadMapConfig ab===null  bundle::", bundle);
                resolve(null);
            }
            let json: JsonAsset = ab.get(path);
            if (json) {
                resolve(json);
            } else {
                ab.load(path, null, (err, map_json: JsonAsset) => {
                    if (err) {
                        console.error("LoadMapConfig path===null  path::", path, bundle);
                    }
                    resolve(map_json);
                });
            }
        });
    }
}


