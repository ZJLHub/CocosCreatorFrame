import { ABEnum } from './const_game';
export type ui_config = {
    path:string,
    bundle:ABEnum
}
/**单独做ui场景配置(虽然个人觉得8m的包能容得下所有的ui界面,小声bb) */
export class UIScene  {
    public static indexUI:ui_config = {
        path:"",
        bundle:ABEnum.uiBundle
    }
    
}


