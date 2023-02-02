import { v3, Vec3 } from "cc";
/**astart数据 */
export type MapData = {
    xSize: number;
    zSize: number;
    offset: number;
    map: number[][];
    pos: { x: number; z: number }[][];
};