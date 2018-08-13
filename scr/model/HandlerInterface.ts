import GoldDatedInfo from "./GoldDatedInfo";
import ObjectDatedInfo from "./ObjectDatedInfo";


export interface HandlerInterface{

    getApiGold(clientCode: string, date: string): Promise<GoldDatedInfo>;

}

export interface ObjectDatedMap{
    [key: string]: ObjectDatedInfo;
}

export interface GoldInfoMap {
    [key: string]: GoldDatedInfo;
}