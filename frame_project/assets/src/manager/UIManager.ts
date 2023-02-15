import { _decorator, Component, Node, Prefab, assetManager, UITransform, view, instantiate, director } from 'cc';
import { ABEnum } from '../const/const_game';
import { UIScene, uizorder, ui_config } from '../const/UIScene';
import { ResManager } from './ResManager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager {
    private static _instance:UIManager = null;
    public static get instance(){
        if(!UIManager._instance)UIManager._instance = new UIManager();
        return UIManager._instance;
    }
    private _layer:{[zorder:number]:Node} = null;
    private _cur_scene_name:string = null;

    public async openUI(ui_config:ui_config,zorder:uizorder){
        if(this._cur_scene_name!=director.getScene().name){//切换场景自动清空节点
            this._layer = {};
        } 
        let load_pre = await this._createUI(ui_config);
        let ins_scene = instantiate(load_pre);
        //自动识别层级，对应怼入父节点相应位置
        let father:Node = null;
        if(this._layer[zorder]){
            father = this._layer[zorder];
        }else{
            let canvas = director.getScene().getChildByName("Canvas");
            father = canvas.getChildByName(`${zorder}`);
        }
        this.adapter(ins_scene.getComponent(UITransform));
        ins_scene.setParent(father);
    }

    
    private async _createUI(ui_scene:ui_config){ 
        return new Promise<Prefab>(async (resolve)=>{
            let bundle = ui_scene.bundle;
            let ui_ab = assetManager.getBundle(bundle);
            if(!ui_ab){
                ui_ab = await ResManager.instance.toLoadBundle(bundle);
            }
            let path = ui_scene.path;
            let ui_prefab:Prefab = ui_ab.get(path);
            if(ui_prefab){
                resolve(ui_prefab);
            }
            else {
                ui_ab.load(path,(err,pre:Prefab)=>{
                    if(err){console.log(`createUI:::::`,path,`err::`,err);resolve(null);}
                    resolve(pre);
                });
            }
        });
    }


    /**根据屏幕适配宽高 */
    adapter(scene:UITransform) {
        let dr = view.getDesignResolutionSize();
        var s = screen;
        var rw = s.width;
        var rh = s.height;
        var finalW = rw;
        var finalH = rh;

        if((rw/rh) > (dr.width / dr.height)){
            //!#zh: 是否优先将设计分辨率高度撑满视图高度。 */
            //cvs.fitHeight = true;

            //如果更长，则用定高
            finalH = dr.height;
            finalW = finalH * rw/rh;
        }
        else{
            /*!#zh: 是否优先将设计分辨率宽度撑满视图宽度。 */
            //cvs.fitWidth = true;
            //如果更短，则用定宽
            finalW = dr.width;
            finalH = rh/rw * finalW;
        }
        scene.width = finalW;
        scene.height = finalH;
        // cvs.setContentSize(finalW,finalH);
    }
}


