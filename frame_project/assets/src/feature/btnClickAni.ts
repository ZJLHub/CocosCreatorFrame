import { _decorator, Component, Node, Tween, tween, v3, easing, math } from 'cc';
import { ABEnum } from '../const/const_game';
import { SoundManager } from '../manager/SoundManager';
const { ccclass, property } = _decorator;

/**
 * 
 * btnClickAni
 * BtnClickAni
 * zjl1996
 * Mon Dec 12 2022 14:34:15 GMT+0800 (中国标准时间)
 * btnClickAni.ts
 * btnClickAni
 * db://assets/src/feature/btnClickAni.ts
 * https://docs.cocos.com/creator/3.6/manual/zh/
 *
 */

@ccclass('btnClickAni')
export class btnClickAni extends Component {
    @property
    ani_dur:number = 0.15;
    @property
    eraser_scale:number = 0.85;
    @property
    click_sound:string = "";
    @property
    sound_enum:ABEnum = ABEnum.sound

    private _ori_scale_x:number = 1;
    private _ori_scale_y:number = 1;

    start () {
        this._ori_scale_x = this.node.worldScale.x;
        this._ori_scale_y = this.node.worldScale.y;
        this.node.on(Node.EventType.TOUCH_START,this._down,this);
    }
    private _ani:Tween<math.Vec3>;
    private _down(){
        if(this._ani) this._ani.stop();
        this._ani = tween(this.node.worldScale).to(this.ani_dur/2,v3(this._ori_scale_x * this.eraser_scale,this._ori_scale_x * this.eraser_scale,1),{easing:easing.backOutIn}).
        then(tween(this.node.worldScale).to(this.ani_dur/2,v3(this._ori_scale_x * this.eraser_scale,this._ori_scale_x * this.eraser_scale,1),{easing:easing.backInOut})).start();
        SoundManager.Instance.playSound(this.click_sound,this.sound_enum);
    }
}