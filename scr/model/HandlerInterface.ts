import DataInterface from "./PresentableDataInterface";
import GoldInfo = DataInterface.GoldInfo
import DatedObjectInfo = DataInterface.DatedObjectInfo;


export interface HandlerInterface{

    getApiGold(clientCode: string, date: string): Promise<GoldInfo>;

}

export interface DatedObjectMap{
    [key: string]: DatedObjectInfo;
}

export interface GoldInfoMap {
    [key: string]: GoldInfo;
}