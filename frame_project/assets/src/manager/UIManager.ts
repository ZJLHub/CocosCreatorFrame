import { _decorator, Component, Node, Prefab, assetManager, UITransform, view } from 'cc';
import { ABEnum } from '../const/const_game';
import { UIScene, ui_config } from '../const/UIScene';
import { ResManager } from './ResManager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager {
    private static _instance:UIManager = null;
    public static get instance(){
        if(!UIManager._instance)UIManager._instance = new UIManager();
        return UIManager._instance;
    }

    public async openUI(ui_config:ui_config,){
        let scene = await this._createUI(ui_config);
        //ok~接下来是层级问题 - 挂机~
        
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


