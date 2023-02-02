import { instantiate, Node, Prefab } from "cc";
import { mainGameSceneController } from "../control/game/mainGameSceneController";
import { ResManager } from "./ResManager";

export class SceneManager {
    private static _instance:SceneManager;
    private _map_data: any;
    public static get instance(){
        if(!SceneManager._instance){
            SceneManager._instance = new SceneManager();
        }
        return SceneManager._instance;
    }

    private _sceneConfig: { [scene3d: string]: scene_config } = {
        "game1": {
            bundles: ["Game1Res"],
            map_data_res: "",
            scene_ctr:mainGameSceneController,
        }
    }

    async intoScene(sceneTag: sceneTag) {
        return new Promise<{
            scene_node:Node,
            ctrl:any
        }>(async (resolve) => {
            let res:{scene_node:Node,ctrl:any} = {scene_node:null,ctrl:null}
            let config = this._sceneConfig[sceneTag];
            await ResManager.instance.LoadBundles(config.bundles);
            //加载场景预设 
            let scene_pre = await ResManager.instance.loadRes("scene_root",Prefab, `${config.bundles[0]}`) as Prefab;
            let scene_node = instantiate(scene_pre);
            //加载场景地图
            let map_data:any = await ResManager.instance.LoadMapConfig("game_map_data",`${config.bundles[0]}`);
            this._map_data =  map_data.json;
            let scene_ctrl = scene_node.getComponent(config.scene_ctr);
            res.ctrl = scene_ctrl;
            res.scene_node = scene_node;
            resolve(res);
        });
    }

}  
export enum sceneTag {
    game1 = "game1"
}
export type scene_config = {
    /**场景关联的bundle包 (用于预载,预载资源移步res_pre_load_manager.ts)*/
    bundles: string[],
    /**a星地图数据地址 */
    map_data_res?: string,
    /**场景控制器 */
    scene_ctr:any
}


