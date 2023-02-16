export class myMath {
    /*** 格式化数字 */
    public static NumberFormat(coin: number): string {
        coin = Math.floor(coin);
        let strTemp: string = coin.toString();
        let index = strTemp.indexOf('e+');
        if (index != -1) {
            let str1 = strTemp.slice(0, index);
            let str2 = strTemp.slice(index + 2);
            let len = Number(str2);
            let a = str1.indexOf('.');
            str2 = str1.slice(a + 1);
            str1 = str1.slice(0, a);
            let len2 = len - str2.length;
            strTemp = `${str1}${str2}`;
            for (let i = 0; i < len2; i++) {
                strTemp += '0';
            }
        }
        let result;
        if (strTemp.length > 3) {
            let unitArr = ['K', 'M', 'B', "T", 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
            let unit = Math.floor((strTemp.length - 4) / 3);
            let big = (coin / (Math.pow(1000, unit))).toFixed(0);
            if (big.length > 3) {
                result = big.substring(0, big.length - 3) + '.' + big.substring(big.length - 3, big.length - 2) + unitArr[unit]
            } else {
                result = big + unitArr[unit]
            }
        } else {
            if (coin.toString().length > 3) {
                let temp = coin.toString()
                result = temp.substring(0, temp.length - 3) + '.' + temp.substring(temp.length - 3, temp.length)
            } else {
                result = coin
            }
        }
        return result
    }

    /**
     * //直角边求角度
     * sideA 对边
     * sideC 斜边
     */
    public static MahtSin(sideA: number, sideC: number): number {
        //atan 是求反正切  asin求反正弦
        //atan 和 atan2 区别：
        //1：参数的填写方式不同；
        //2：atan2 的优点在于 如果 x2-x1等于0 依然可以计算，但是atan函数就会导致程序出错；
        //3：已经过滤掉 sideC == 0 的情况
        return 180 / Math.PI * Math.asin(sideA / sideC);
    }
    /**
     * 获取随机值
     * @param Min 最小值（包含）
     * @param Max 最大值(不包含)
     */
    public static GetRandom(Min, Max): number {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }

    //删除数组
    public static removeByValue(arr, val) {
        var i = arr.indexOf(val);
        if (i >= 0) {
            arr.splice(i, 1);
        }
    }
    /**从arr1 中 删除arr2数组元素 */
    public static removeFromAaary(arr1, arr2, arr1_length) {
        function removeNode() {
            for (var i = 0; i < arr1.length; i++) {
                for (var j = 0; j < arr2.length; j++) {
                    if (arr1[i] == arr2[j]) {
                        arr1.splice(i, 1); //删除下标为i的元素
                        return;
                    }
                }
            }
        }
        for (var k = 0; k < arr1_length; k++) {
            removeNode();
        }
        return arr1;
    }
    //混乱排序
    public static randomsort(a, b) {
        return Math.random() > .5 ? -1 : 1;
        //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    }


    /**
     * 获取[min~max)的随机值
     */
    public static RandomInt(min: number, max: number) {
        let length = max - min;
        return Math.floor(Math.random() * length + min);
    }

    //#region ····························数组操作··································
    /**将数组顺序打乱
 * 返回一个新的数组
 */
    public static shuffle(arr) {
        let i = arr.length;
        let _arr = [];
        arr.forEach((val) => { _arr.push(val) });
        while (i) {
            let j = Math.floor(Math.random() * i--);
            [_arr[j], _arr[i]] = [_arr[i], _arr[j]];
        }
        return _arr;
    }
    /**获得随机数组不相同数 不改变原数组
     * @param {Array} arr 数组
     * @param {number} num 数量
    */
    public static getRandomArr(arr, num: number) {
        let _arr = [];
        arr.forEach((val) => { _arr.push(val) });
        let arrOut = [];
        for (let i = 0; i < num; i++) {
            let len = _arr.length;
            let ran = Math.floor(Math.random() * len);
            arrOut[i] = _arr.splice(ran, 1)[0];
        }
        return arrOut;
    }
    /**从元数组中截取出指定个数的随机数组 
     * @param {Array} arr 源数组
     * @param {number} num 截取个数
     * 
     * */
    public static getRandomArr_splic(arr, num) {
        let _list = [...arr];
        let arrOut = [];
        for (let i = 0; i < num; i++) {
            let len = _list.length;
            let random = Math.floor(Math.random() * len);
            arrOut[i] = _list.splice(random, 1)[0];
        }
        return arrOut;
    }
    /**从数组中随机取指定num数量，不重复,num超出长度时，超出部分进行重复取值 */
    public static getArrRandNum(arr: any[], nums: number) {
        let get_rand_list: any[] = [];
        let index_list: number[] = [];
        for (let i = 0; i < arr.length; i++) {
            index_list.push(i);
        }
        for (let i = 0; i < nums && i < index_list.length; i++) {
            let index = index_list[myMath.RandomInt(0, index_list.length)];
            get_rand_list.push(arr[index]);
            index_list = index_list.filter((v) => { return v != index });
        }
        if (nums > arr.length) {
            let out_num = nums - arr.length;
            for (let i = 0; i < out_num; i++) {
                let rand_item = arr[myMath.RandomInt(0, arr.length)];
                get_rand_list.push(rand_item);
            }
        }
        return get_rand_list;
    }
    //#endregion ····························数组操作·······························

    //#region ····························权重操作·································
    /**获取随机权重
 * @return item.key 
 * */
    public static RandomWeight(weight_item: { key: string, weight: number }[]) {
        let data: { [key: string]: number } = {}
        weight_item.forEach((item) => { data[item.key] = item.weight });
        let get_key = this.RandomWeight3(data);
        return get_key;
    }

    /**
     * 随机权重 
     * @param weigthArr {[item:string]:number} item:是随机项  存值为权重值(int)，并且不可为负数
     * @returns 返回查询的key
     * @说明
     * let testWeigth:{[item:string]:number} = {
            'zjl':1000,
            's':1,
            'dsb':50,
            'dsg':50
        }
        myMath.RandomWeight3(testWeigth);
     * 
        @returns 返回key键
    */
    public static RandomWeight3(weigthArr: { [item: string]: number }): string {
        let items: string[] = [];
        let weigths: number[] = [];
        let weightMax: number = 0;
        for (let k in weigthArr) {
            items.push(k);
            let value = weigthArr[k];
            weigths.push(value);
            weightMax += value;
        }
        weightMax = Math.floor(weightMax);
        let rand: number = Math.floor(Math.random() * weightMax);
        //查询所属item
        let searchValueSum: number = 0;
        for (let i = 0; i < items.length; i++) {
            searchValueSum += weigths[i];
            if (rand <= searchValueSum) {
                let key = items[i];
                return key;
            }
        }
        return null;
    }

    /**获取权重5 终版 */
    public static randomWeight5(v_key:string,weightObj:any){//weight {}类型
        //TODO 咕咕咕
        // let weigths: number[] = [];
        // let weightMax: number = 0;
        // for (let k in weightObj) {
            
        //     let value = weightObj[k].weight;
        //     weigths.push(value);
        //     weightMax += value;
        // }
        // weightMax = Math.floor(weightMax);
        // let rand: number = Math.floor(Math.random() * weightMax);
        // //查询所属item
        // let searchValueSum: number = 0;
        // for (let i = 0; i < items.length; i++) {
        //     searchValueSum += weigths[i];
        //     if (rand <= searchValueSum) {
        //         let key = items[i];
        //         let item = weightObj[key]
        //         return item;
        //     }
        // }
        // return null;
    }
    //#endregion ····························权重操作······························


    //#region ·······················时间相关···········································
    public static getTime(date_str) {
        let timestrip: Date = new Date(date_str)
        if (Number.isNaN(timestrip.getTime())) timestrip = new Date(date_str.replace(/-/g, '/'))
        return timestrip;
    }

    /**获得本周的开端日期 */
    public static getWeekStartDate() {
        let now = new Date(); //当前日期
        let nowDayOfWeek = now.getDay(); //今天本周的第几天
        let nowDay = now.getDate(); //当前日
        let nowMonth = now.getMonth(); //当前月
        let nowYear = now.getFullYear(); //当前年
        let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
        return myMath.formatDate(weekStartDate);
    }

    public static getWeekEndDate() {
        let now = new Date(); //当前日期
        let nowDayOfWeek = now.getDay(); //今天本周的第几天
        let nowDay = now.getDate(); //当前日
        let nowMonth = now.getMonth(); //当前月
        let nowYear = now.getFullYear(); //当前年
        let weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
        return myMath.formatDate(weekEndDate);
    }


    /*时间戳改日期--不传第二个参数返回年月日,传第二个参数返回年月日时分秒*/
    public static formatDateTime(inputTime, type) {
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m: any = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d: any = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h: any = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute: any = date.getMinutes();
        let second: any = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        if (type) {
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        } else {
            return y + '-' + m + '-' + d;
        }
    }

    public static formatDate(date) {
        let myyear = date.getFullYear();
        let mymonth = date.getMonth() + 1;
        let myweekday = date.getDate();

        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        return (myyear + "-" + mymonth + "-" + myweekday);
    }
    //#region ·························时间格式·······························
    /*** 格式化数字 */
    public static NumberFormat2(coin: number): string {
        coin = Math.floor(coin);
        let strTemp: string = coin.toString();
        let index = strTemp.indexOf('e+');
        if (index != -1) {
            let str1 = strTemp.slice(0, index);
            let str2 = strTemp.slice(index + 2);
            let len = Number(str2);
            let a = str1.indexOf('.');
            str2 = str1.slice(a + 1);
            str1 = str1.slice(0, a);
            let len2 = len - str2.length;
            strTemp = `${str1}${str2}`;
            for (let i = 0; i < len2; i++) {
                strTemp += '0';
            }
        }
        let result;
        if (strTemp.length > 3) {
            let unitArr = ['K', 'M', 'B', "T", 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
            let unit = Math.floor((strTemp.length - 4) / 3);
            let big = (coin / (Math.pow(1000, unit))).toFixed(0);
            if (big.length > 3) {
                result = big.substring(0, big.length - 3) + '_' + big.substring(big.length - 3, big.length - 2) + unitArr[unit]
            } else {
                result = big + unitArr[unit]
            }
        } else {
            if (coin.toString().length > 3) {
                let temp = coin.toString()
                result = temp.substring(0, temp.length - 3) + '_' + temp.substring(temp.length - 3, temp.length)
            } else {
                result = coin
            }
        }
        return result
    }

    /** 时间格式化 */
    public static TimeFormat(num: number = 0): string {
        let min = Math.floor(num / 60);//分钟
        let hour = Math.floor(min / 60);//小时
        let day = Math.floor(hour / 24);//天
        let s = Math.floor(num % 60);
        if (day == 0) {
            if (hour == 0) {
                if (min == 0) {
                    if (s <= 9) {
                        return `${min}:0${s}`;
                    }
                    return `${min}:${s}`;
                }
                if (s <= 9) {
                    return `${min}:0${s}`;
                }
                return `${min}:${s}`;
            } else {
                return `${hour}:${min}:${s}`;
            }
        } else {
            return `${day}:${hour}:${min}:${s}`;
        }
    }
    /*** 定时器时间格式化 */
    public static TimerFormat(num: number = 0): string {
        let hour: any = Math.floor(num / 3600); // 小时
        let minute: any = Math.floor((num % 3600) / 60);// 分钟
        let second: any = Math.floor((num % 3600) % 60); // 秒
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        return `${hour}:${minute}:${second}`
    }
    /*** 定时器时间格式化 */
    public static TimerFormat_min_second(num: number = 0): string {
        // let hour: any = Math.floor(num / 3600); // 小时
        // let minute: any = Math.floor((num % 3600) / 60);// 分钟
        let minute: any = Math.floor(num / 60);// 分钟
        let second: any = Math.floor((num % 3600) % 60); // 秒
        // if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        return `${minute}:${second}`;
    }
    //#endregion ·························时间格式····························

    //#endregion ·······················时间相关········································


    //#region ·······························数操作····································
    public static angleToRad(angle: number) {//角度转弧度
        return Math.PI / 180 * angle;
    }
    public static radToAngle(rad: number) {//弧度转角度
        return 180 / Math.PI * rad;
    }

    /**
     * 从最大值和最小值之间取值 [min,max];
     * @param value 值
     * @param min 最小值
     * @param max 最大值
     * @returns 
     */
    public static Clamp(value, min, max) {
        if (value < min) {
            return min;
        } else {
            return value > max ? max : value;
        }
    }
    //#endregion ·······························数操作·································

    //#region ·······························线操作····································
    /** 求线段ab cd是否相交 */
    public static segmentsIntr(a, b, c, d) {

        // 三角形abc 面积的2倍 
        var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);

        // 三角形abd 面积的2倍 
        var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);

        // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理); 
        if (area_abc * area_abd >= 0) {
            return false;
        }

        // 三角形cda 面积的2倍 
        var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
        // 三角形cdb 面积的2倍 
        // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出. 
        var area_cdb = area_cda + area_abc - area_abd;
        if (area_cda * area_cdb >= 0) {
            return false;
        }

        //计算交点坐标 
        var t = area_cda / (area_abd - area_abc);
        var dx = t * (b.x - a.x),
            dy = t * (b.y - a.y);
        return { x: a.x + dx, y: a.y + dy };


    }
    //#endregion ·······························线操作·································
    
}
