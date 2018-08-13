import {DatedObjectMap, HandlerInterface} from "../model/HandlerInterface";
import DataInterface from "../model/PresentableDataInterface";
import DatedObjectInfo = DataInterface.DatedObjectInfo;
import GoldInfoManager from "../managers/GoldInfoManager";
import {UrlIdentifier} from "../model/UrlIdentifier";



export default class CacheHandler{ //implements HandlerInterface

    private goldInfoManager: GoldInfoManager = new GoldInfoManager();

    constructor(){}

    public get(identifier: UrlIdentifier): DatedObjectInfo{
        let key: string = identifier.toString();
        if(identifier.objectType === 'gold'){
            return this.goldInfoManager.getGoldInfoCache(key);
        }
        //so far only 'gold' object type is handled
        return {effectiveDate: 'error'};
    }

    public put(identifier: UrlIdentifier, datedObjectInfo: DatedObjectInfo){
        let key: string = identifier.toString();
        if(identifier.objectType === 'gold'){
            this.goldInfoManager.putGoldInfoCache(key, datedObjectInfo);
        }
        //so far only 'gold' object type is handled
    }

}