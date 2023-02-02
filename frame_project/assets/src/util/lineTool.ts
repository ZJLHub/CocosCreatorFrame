/**线性工具 */
export default class lineTool {
    /**
    * 抛物线
    * @param anchorpoints: 三个点的数组 [{ x: 0, y: 200 }, { x: 300, y: 0 },{ x: 700, y: 300 }]
    * @param pointsAmount 返回多少个点
    */
    public static CreateBezierPoints(anchorpoints, pointsAmount = 20) {
        var points = [];
        for (var i = 0; i < pointsAmount; i++) {
            var point = this._multiPointBezier(anchorpoints, i / pointsAmount);
            points.push(point);
        }
        return points;
    }
    private static _multiPointBezier(points, t) {
        var len = points.length;
        var x = 0, y = 0;
        var erxiangshi = function (start, end) {
            var cs = 1, bcs = 1;
            while (end > 0) {
                cs *= start;
                bcs *= end;
                start--;
                end--;
            }
            return (cs / bcs);
        };
        for (var i = 0; i < len; i++) {
            var point = points[i];
            x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));
            y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));
        }
        return { x: x, y: y };
    }
}