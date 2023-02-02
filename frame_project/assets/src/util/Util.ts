export default class Util {
    /**
     * 返回两个时间戳是否在同一天吧
     * @param time1 时间戳1
     * @param time2 时间戳2
     */
    public static ContrastDay(time1: number, time2: number) {
        let signDate = new Date(time1);
        let now = new Date(time2);
        if (now.getFullYear() != signDate.getFullYear() || now.getMonth() != signDate.getMonth() || now.getDate() != signDate.getDate()) {
            return false;
        } else {
            return true;
        }
    }


    /**
     * 平台判断
     * @param platfom 平台
     * 如果不传参，默认小游戏平台
     */
    public static checkPlatform(platfom?: string): boolean {
        let _platformList: Array<string> = ["wx", "qq", "tt", "qg"];
        let _isExistPlatform: boolean = false;
        if (platfom) {
            if (window[platfom]) {
                if (platfom === "wx") {
                    if (!window["tt"]) {
                        //输入wx,但是是tt平台
                        _isExistPlatform = true;
                    } else {
                        _isExistPlatform = true;
                    }
                } else {
                    _isExistPlatform = true;
                }
            }
        } else {
            for (let i = 0; i < _platformList.length; i++) {
                if (window[_platformList[i]]) {
                    _isExistPlatform = true;
                }
            }
        }
        return _isExistPlatform;
    }


}