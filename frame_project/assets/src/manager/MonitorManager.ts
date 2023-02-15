import { _decorator } from "cc";
const { ccclass, property } = _decorator;

export type MonitorData = { [key: string]: { funcArr: FuncData[] } };
export type FuncData = { func: Function, thisObject: any }
@ccclass
/**事件单例 */
export class MonitorManager {
    /**事件字典 */
    private static events: MonitorData = {};
    private static _instance: MonitorManager = null;
    /**单例 */
    public static get Instance(): MonitorManager {
        if (!MonitorManager._instance) {
            MonitorManager._instance = new MonitorManager();
        }
        return MonitorManager._instance;
    }
    /**添加事件（字典引索，方法，this） */
    public static on(eventType: MonitorType, thisObject: any, cb: Function): void {
        let event = this.events[eventType];
        if (!event) {
            event = { funcArr: [] };
            this.events[eventType] = event;
        }

        for (let i = 0; i < event.funcArr.length; i++) {
            const _func = event.funcArr[i];
            if (_func.func === cb && _func.thisObject === thisObject) {
                // console.log("过滤事件 == ", eventType);
                return;
            }
        }

        const func: FuncData = { func: cb, thisObject }
        event.funcArr.push(func);
        // console.log(`!!!!!!!!!!!增加监听成功type${eventType}。事件长度:${event.funcArr.length}!!!!!!!!!!!!`);    
    }
    /**派发事件(字典引索) */
    public static ev(eventType: MonitorType, ...args): void {
        const event = this.events[eventType];
        if (!event) {
            // console.log(`!!!!!!!!!!!不存在事件类型:${eventType}!!!!!!!!!!!!`);
            return;
        }
        // console.log("======event.funcArr", event.funcArr.length);
        event.funcArr.forEach(v => {
            const func = v.func;
            const thisObject = v.thisObject;
            func.call(thisObject, ...args);
        });
    }
    /**删除事件 */
    public static off(eventType: MonitorType, object: Object, cb: Function): void {
        const event = this.events[eventType];
        if (!event) {
            // console.log(`!!!!!!!!!!!不存在事件类型:${eventType}!!!!!!!!!!!!`);
            return;
        }

        let removeIndex = -1;
        for (let i = 0; i < event.funcArr.length; i++) {
            let func = event.funcArr[i];
            if (func.func === cb && func.thisObject === object) {
                removeIndex = i;
            }
        }

        if (removeIndex > -1) {
            event.funcArr.splice(removeIndex, 1);
            // console.log(`!!!!!!!!!!!成功移除事件!!!!!!!!!!!! index == `, eventType, removeIndex);
        }
    }
    public static getEvents(): MonitorData {
        return this.events;
    }
}


/** 事件类型 */
export const enum MonitorType {
    JoyStickBegin = "JoyStickBegin",
    JoyStickMove = "JoyStickMove",
    JoyStickEnd = "JoyStickEnd",
    JoyStickCancel = "JoyStickCancel",
    coinRefresh = "coinRefresh",
    isPlayerFull = "isPlayerFull",
    rackRefresh = "rackRefresh",
    mealRefresh = "mealRefresh",
    productionRefresh = "productionRefresh",
    materialRefresh = "materialRefresh",
    levelRefresh = "levelRefresh",
    buildSuccess = "buildSuccess",

    /** */
    ui_show_btn = "ui_show_btn",
    /**玩家捡起东西   */
    player_add_prod = "player_add_prod",

    guide1_refresh = "guide1_refresh",
    guide1_get_trash = "guide1_get_trash",
    guide1_drop_trash = "guide1_drop_trash",//丢垃圾
    guide1_get_coin = "guide1_get_coin",//捡起金币
    guide1_drop_wheat = "guide1_drop_wheat",//将灵谷放到摊位上
}