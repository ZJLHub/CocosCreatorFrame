import { _decorator, Component, Node } from 'cc';
import { ResManager } from './ResManager';
const { ccclass, property } = _decorator;

@ccclass('InstanceManager')
export class InstanceManager {
    //#region 静态管理器-。-！！！！！！！！
    /**2023-02-16
     * 照葫芦画瓢的思路~~~~~~~还未实践过
     * 
     * 游戏启动时，或者管理器初始化时，直接注入的管理器，不会进行拔插操作
     */
    //#endregion
    private static _static_mng:{[mgn_name:string]:any} = {}
    public static initMng(){
        // InstanceManager.resMng = SingletonFactory.getInstance(ResManager);
    }
    // public static resMng:ResManager;//-。-非单例  是不是必要的条件？


    //#region ·············会进行动态拔插的控制器·····················=。=
    /**
     * 也是一个比较~~~总感觉挺蛋疼的操作。。。。。。
     * 可能对于ui控制器的操作会看起来比较顺眼一点
     * 先不管~~~~反正是能够偷懒的一个利器~~~欸嘿嘿~
     */
    //#endregion
    private static _ctrl_dict:{[ctrl_enum:string]:any} = {};
    public static add_ctrl(ctrl_enum:InstCtrlEnum,ctrl:any){
        delete InstanceManager._ctrl_dict[ctrl_enum];
        InstanceManager._ctrl_dict[ctrl_enum] = ctrl;
    }
    public static delet_ctrl(ctrl_enum:InstCtrlEnum){
        delete InstanceManager._ctrl_dict[ctrl_enum];
    }
    public static get_ctrl_dict<T extends Component>(ctrl_enum:InstCtrlEnum):T{
        return InstanceManager._ctrl_dict[ctrl_enum];//as T;
    }

}
/**控制器枚举 */
export enum InstCtrlEnum{
    uia_ctrl = "uia_ctrl",
    gamea_ctrl = "gamea_ctrl"
}
// /**
//  * 单例工厂
//  */
// export class SingletonFactory {

//     private static instances: Map<{ new() }, Object> = new Map<{ new() }, Object>();

//     public static getInstance<T>(c: { new(): T }): T {
//         if (!SingletonFactory.instances.has(c)) {
//             let obj = new c();
//             SingletonFactory.instances.set(c, obj);
//             return obj;
//         }
//         return <T>SingletonFactory.instances.get(c);
//     }

// }