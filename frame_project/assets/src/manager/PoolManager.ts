import { _decorator, Component, Node, NodePool, instantiate, Prefab } from 'cc';
import { ResManager } from './ResManager';
const { ccclass, property } = _decorator;

/**
 * 
 * PoolManager
 * PoolManager
 * zjl1996
 * Thu Dec 08 2022 11:08:38 GMT+0800 (中国标准时间)
 * PoolManager.ts
 * PoolManager
 * db://assets/src/manager/PoolManager.ts
 * https://docs.cocos.com/creator/3.6/manual/zh/
 * 
 * --------关联【ResManager】管理器----------------
 *
 */

@ccclass('PoolManager')
export class PoolManager extends Component {
    private static _instance: PoolManager;

    public static get instance(): PoolManager {
        if (!PoolManager._instance) {
            PoolManager._instance = new PoolManager();
        }
        return PoolManager._instance;
    }

    private _node_pool: { [only_one: string]: NodePool } = {}
    public get_node(path: string, bundle: string) {
        return new Promise<Node>(async (resolve) => {
            let only_one = bundle+path;
            if (!this._node_pool[only_one]) this._node_pool[only_one] = new NodePool();
            if (this._node_pool[only_one].size()) {
                resolve(this._node_pool[only_one].get());
            }
            let pre = await ResManager.instance.loadRes(path,Prefab,bundle) as Prefab;
            let node = instantiate(pre);
            node[`only_one`] = only_one;
            resolve(node);
        });
    }

    /**
     * @说明 回收时会查询 node["only_one"] 字段是在取出时赋值 == bundle+path;
     * node["only_one"] 为null 时不做回收
     *  */
    public recover_node(node:Node){
        if(!node || !node[`only_one`]){
            console.warn("recover_node  节点不存在only_one字段 直接销毁================");
            node.destroy();
            return;
        }
        
        let only_one = node["only_one"];
        if (!this._node_pool[only_one]) this._node_pool[only_one] = new NodePool();
        this._node_pool[only_one].put(node);
    }

    /**清理所有对象池s */
    public clear_node_pool(){
        for(let key in this._node_pool){
            this._node_pool[key].clear();
        }
        this._node_pool = {};
    }

    //#region 
    /**
     * todo 尝试搞一个自主识别管理的对象池（不一定要做~~感觉做了也没用,仍然是在跳场景之后要对一些池子做清理操作）
     *  1:n毫秒内，使用以及销毁的数量做一个max数值确认，当池子内超过这个max，回收不存入池子
     * 
     * 
     * 刚刚还想干啥来着？
     */
    //#endregion
}